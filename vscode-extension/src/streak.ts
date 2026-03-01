import * as vscode from "vscode";
import { MILESTONES, ShareData } from "./data";

export interface StreakResult extends ShareData {
  milestone: string | null;
}

function getTodayDate(): string {
  return new Date().toISOString().split("T")[0];
}

function isYesterday(dateStr: string): boolean {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return dateStr === yesterday.toISOString().split("T")[0];
}

export function incrementStreak(state: vscode.Memento): StreakResult {
  const today = getTodayDate();
  const lastVisit: string = state.get("lastVisit", "");
  let count: number = state.get("count", 0);
  let currentStreak: number = state.get("currentStreak", 0);
  let longestStreak: number = state.get("longestStreak", 0);
  let milestone: string | null = null;

  if (lastVisit !== today) {
    count += 1;

    if (isYesterday(lastVisit)) {
      currentStreak += 1;
    } else {
      currentStreak = 1;
    }

    if (currentStreak > longestStreak) {
      longestStreak = currentStreak;
    }

    if (MILESTONES[count]) {
      milestone = MILESTONES[count];
    }

    state.update("count", count);
    state.update("lastVisit", today);
    state.update("currentStreak", currentStreak);
    state.update("longestStreak", longestStreak);
  }

  return { count, lastVisit: today, currentStreak, longestStreak, milestone };
}

export function getStreakData(state: vscode.Memento): ShareData {
  return {
    count: state.get("count", 0),
    lastVisit: state.get("lastVisit", "never"),
    currentStreak: state.get("currentStreak", 0),
    longestStreak: state.get("longestStreak", 0),
  };
}

export function resetStreak(state: vscode.Memento): void {
  state.update("count", 0);
  state.update("lastVisit", "");
  state.update("currentStreak", 0);
  state.update("longestStreak", 0);
}
