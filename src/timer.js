import chalk from 'chalk';
import boxen from 'boxen';
import logUpdate from 'log-update';
import { confirm } from '@inquirer/prompts';

export function showReturnTime() {
  const returnTime = new Date(Date.now() + 10 * 60 * 1000);
  const timeStr = returnTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const timerBox = boxen(
    `⏱ YOUR OUTDOOR ASSIGNMENT\n\nDuration: ${chalk.yellow('10 minutes')}\nReturn by: ${chalk.cyan(timeStr)}\n\n${chalk.dim('Do NOT touch your keyboard.')}\n${chalk.dim('Do NOT check Slack.')}\n${chalk.dim('Touch grass. Breathe air.')}`,
    {
      padding: 1,
      margin: 1,
      borderStyle: 'round',
      borderColor: 'yellow',
    }
  );

  console.log('\n' + timerBox + '\n');
}

function buildProgressBar(done, total, width = 30) {
  const filledWidth = Math.floor((done / total) * width);
  const emptyWidth = width - filledWidth;
  return '█'.repeat(filledWidth) + '░'.repeat(emptyWidth);
}

export async function runCountdown(minutes = 10) {
  return new Promise((resolve) => {
    const totalSeconds = minutes * 60;
    let remaining = totalSeconds;

    const interval = setInterval(() => {
      const mins = Math.floor(remaining / 60).toString().padStart(2, '0');
      const secs = (remaining % 60).toString().padStart(2, '0');
      const bar = buildProgressBar(totalSeconds - remaining, totalSeconds);

      logUpdate(
        chalk.green(`\n  ⏱ GO OUTSIDE TIMER\n\n`) +
        chalk.yellow(`  ${mins}:${secs} remaining\n\n`) +
        chalk.gray(`  ${bar}\n\n`) +
        chalk.dim(`  Press Ctrl+C to admit defeat\n`)
      );

      remaining--;
      if (remaining < 0) {
        clearInterval(interval);
        logUpdate.done();
        resolve();
      }
    }, 1000);
  });
}

export async function showTimerPrompt() {
  // Skip in non-TTY environments
  if (!process.stdout.isTTY) {
    return false;
  }

  try {
    const wantCountdown = await confirm({
      message: 'Count down 10 minutes for you?',
      default: false,
    });
    return wantCountdown;
  } catch {
    // If prompt fails (e.g., in piped context), return false
    return false;
  }
}
