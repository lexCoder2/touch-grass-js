import * as vscode from "vscode";
import {
  getArt,
  getRandomMessage,
  buildShareText,
  buildShareUrl,
  ArtScene,
} from "./data";
import { incrementStreak, getStreakData, resetStreak } from "./streak";
import { openGrassPanelOrReveal } from "./panel";

let reminderTimer: ReturnType<typeof setInterval> | undefined;
let statusBarItem: vscode.StatusBarItem;

// Last-used art + message kept for the tooltip
let lastArt: ArtScene | undefined;
let lastMessage: string | undefined;

export function activate(context: vscode.ExtensionContext): void {
  // ── Status bar ──────────────────────────────────────────────────────────────
  statusBarItem = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Right,
    100,
  );
  statusBarItem.command = "touchGrass.go";
  updateStatusBar(context);
  statusBarItem.show();
  context.subscriptions.push(statusBarItem);

  // ── Commands ────────────────────────────────────────────────────────────────
  context.subscriptions.push(
    vscode.commands.registerCommand("touchGrass.go", () =>
      cmdTouchGrass(context),
    ),
    vscode.commands.registerCommand("touchGrass.stats", () =>
      cmdShowStats(context),
    ),
    vscode.commands.registerCommand("touchGrass.share", () =>
      cmdShare(context),
    ),
    vscode.commands.registerCommand("touchGrass.reset", () =>
      cmdReset(context),
    ),
  );

  // ── Reminder timer ──────────────────────────────────────────────────────────
  startReminderTimer(context);

  // Re-schedule whenever settings change
  context.subscriptions.push(
    vscode.workspace.onDidChangeConfiguration((e) => {
      if (
        e.affectsConfiguration("touchGrass.enableReminders") ||
        e.affectsConfiguration("touchGrass.reminderIntervalMinutes")
      ) {
        startReminderTimer(context);
      }
    }),
  );
}

export function deactivate(): void {
  clearReminderTimer();
}

// ── Command implementations ─────────────────────────────────────────────────

function cmdTouchGrass(context: vscode.ExtensionContext): void {
  lastArt = getArt();
  lastMessage = getRandomMessage();
  const streakResult = incrementStreak(context.globalState);
  const outdoorMinutes: number = vscode.workspace
    .getConfiguration("touchGrass")
    .get("outdoorMinutes", 10);
  updateStatusBar(context);
  openGrassPanelOrReveal(
    context,
    lastArt,
    lastMessage,
    streakResult,
    outdoorMinutes,
  );
}

async function cmdShowStats(context: vscode.ExtensionContext): Promise<void> {
  const d = getStreakData(context.globalState);
  const action = await vscode.window.showInformationMessage(
    `🌿 Streak: ${d.currentStreak} days | Total: ${d.count} touches | Best: ${d.longestStreak} days | Last: ${d.lastVisit || "never"}`,
    "Open Panel",
    "Share",
  );

  if (action === "Open Panel") {
    void vscode.commands.executeCommand("touchGrass.go");
  } else if (action === "Share") {
    void vscode.commands.executeCommand("touchGrass.share");
  }
}

async function cmdShare(context: vscode.ExtensionContext): Promise<void> {
  const platform = await vscode.window.showQuickPick(
    [
      {
        label: "🐦 Twitter / X",
        description: "Opens twitter.com",
        value: "twitter",
      },
      {
        label: "💼 LinkedIn",
        description: "Opens linkedin.com",
        value: "linkedin",
      },
      {
        label: "📸 Instagram",
        description: "Copies text to clipboard",
        value: "instagram",
      },
    ],
    {
      placeHolder: "Which platform would you like to shame your followers on?",
    },
  );

  if (!platform) return;

  const data = getStreakData(context.globalState);
  const text = buildShareText(data);

  if (platform.value === "instagram") {
    await vscode.env.clipboard.writeText(text);
    vscode.window.showInformationMessage(
      "📋 Copied to clipboard! Paste it into your Instagram caption.",
    );
    return;
  }

  const url = buildShareUrl(platform.value as "twitter" | "linkedin", text);
  await vscode.env.openExternal(vscode.Uri.parse(url));
}

async function cmdReset(context: vscode.ExtensionContext): Promise<void> {
  const confirm = await vscode.window.showWarningMessage(
    "Reset your entire grass-touching streak? This cannot be undone.",
    { modal: true },
    "Reset",
  );
  if (confirm === "Reset") {
    resetStreak(context.globalState);
    updateStatusBar(context);
    vscode.window.showInformationMessage(
      "🌱 Streak reset. Fresh start — go touch some grass.",
    );
  }
}

// ── Reminder timer ───────────────────────────────────────────────────────────

function startReminderTimer(context: vscode.ExtensionContext): void {
  clearReminderTimer();

  const config = vscode.workspace.getConfiguration("touchGrass");
  const enabled: boolean = config.get("enableReminders", true);
  if (!enabled) return;

  const minutes: number = Math.max(
    5,
    config.get("reminderIntervalMinutes", 60),
  );
  const ms = minutes * 60 * 1000;

  reminderTimer = setInterval(() => showReminder(context), ms);
}

function clearReminderTimer(): void {
  if (reminderTimer !== undefined) {
    clearInterval(reminderTimer);
    reminderTimer = undefined;
  }
}

async function showReminder(context: vscode.ExtensionContext): Promise<void> {
  const message = getRandomMessage();
  const action = await vscode.window.showInformationMessage(
    `🌿 ${message}`,
    "Touch Grass Now",
    "Skip",
  );
  if (action === "Touch Grass Now") {
    void vscode.commands.executeCommand("touchGrass.go");
  }
}

// ── Status bar helpers ────────────────────────────────────────────────────────

function updateStatusBar(context: vscode.ExtensionContext): void {
  const d = getStreakData(context.globalState);

  // Label
  statusBarItem.text =
    d.currentStreak > 0
      ? `🌿 ${d.currentStreak} day streak`
      : d.count === 0
        ? "start to touch 🌿"
        : "🌿 Touch Grass";

  // Rich tooltip
  const tip = new vscode.MarkdownString("", true);
  tip.isTrusted = true; // needed for command: links
  tip.supportThemeIcons = true;

  // Last message (if any)
  if (lastMessage) {
    tip.appendMarkdown(`**>>>** ${lastMessage}\n`);
  } else {
    tip.appendMarkdown(`**🌿 Go Touch Grass**\n`);
  }

  tip.appendMarkdown("\n---\n");

  // Stats table
  tip.appendMarkdown(
    `| | |\n` +
      `|---|---|\n` +
      `| 🔥 streak | **${d.currentStreak}** day${d.currentStreak !== 1 ? "s" : ""} |\n` +
      `| 🌿 total | **${d.count}** touch${d.count !== 1 ? "es" : ""} |\n` +
      `| 🏆 best | **${d.longestStreak}** day${d.longestStreak !== 1 ? "s" : ""} |\n` +
      `| 📅 last | ${d.lastVisit || "never"} |\n`,
  );

  tip.appendMarkdown("\n---\n");

  // Command links
  tip.appendMarkdown(
    `[$(run) Go outside now](command:touchGrass.go)` +
      `\u2002·\u2002` +
      `[$(graph) Stats](command:touchGrass.stats)` +
      `\u2002·\u2002` +
      `[$(megaphone) Share](command:touchGrass.share)` +
      `\u2002·\u2002` +
      `[$(settings-gear) Settings](command:workbench.action.openSettings?%5B%22touchGrass%22%5D)`,
  );

  statusBarItem.tooltip = tip;
}
