import chalk from "chalk";

// Color palette
const colors = {
  grass: chalk.hex("#4CAF50"),
  sun: chalk.hex("#FFD700"),
  sky: chalk.hex("#87CEEB"),
  dirt: chalk.hex("#8B4513"),
  accent: chalk.bold.white,
  dim: chalk.dim,
  error: chalk.bold.red,
  streak: chalk.bold.cyan,
  warning: chalk.yellow,
};

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function colorLine(line) {
  return line
    .replace(/~/g, colors.grass("~"))
    .replace(/\*/g, colors.sun("*"))
    .replace(/\^/g, colors.grass("^"))
    .replace(/,/g, colors.grass(","))
    .replace(/v/g, colors.grass("v"))
    .replace(/[|]/g, colors.grass("|"));
}

export async function printHeader(art) {
  const lines = art.scene.split("\n");
  console.log();
  for (const line of lines) {
    console.log(colorLine(line));
    // Longer pause on blank lines and ground/grass rows — gives each visual
    // layer a moment to register before the next one appears.
    if (line.trim() === "") {
      await sleep(350);
    } else if (/^[~\/\\|, ]+$/.test(line.trim()) && line.trim().length > 4) {
      await sleep(200);
    } else {
      await sleep(55);
    }
  }
  console.log();
  await sleep(300);
}

export async function printMessage(message) {
  await sleep(120);
  const prefix = colors.warning(">>>");
  process.stdout.write(`${prefix} `);

  // Typewriter: write each character individually with a small delay.
  // Punctuation gets a slightly longer beat so it feels like natural pacing.
  for (const char of message) {
    process.stdout.write(colors.accent(char));
    if (".!?,;:".includes(char)) {
      await sleep(120);
    } else {
      await sleep(22);
    }
  }

  process.stdout.write("\n");
  await sleep(1000); // pause so the full message lands before moving on
  process.stdout.write("\n");
}

export async function printStreakBadge(data, milestone) {
  await sleep(120);
  const streakLine = `  ${colors.streak(`streak: ${data.currentStreak} days`)} | ${colors.streak(`total: ${data.count} touches`)} | ${colors.streak(`longest: ${data.longestStreak} days`)}`;
  console.log(streakLine);

  if (milestone) {
    await sleep(200);
    console.log(`\n  ${colors.warning("✨")} ${colors.accent(milestone)}\n`);
  }
}

export async function printSeparator() {
  await sleep(80);
  console.log(colors.dim("─".repeat(60)));
}

export function printSuccess(text) {
  console.log(`  ${chalk.green("✓")} ${text}`);
}

export function clearOnExit() {
  process.on("SIGINT", () => {
    process.exit(0);
  });
}

export default {
  colors,
  printHeader,
  printMessage,
  printStreakBadge,
  printSeparator,
  printSuccess,
  clearOnExit,
};
