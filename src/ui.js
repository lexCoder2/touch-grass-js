import chalk from 'chalk';

// Color palette
const colors = {
  grass: chalk.hex('#4CAF50'),
  sun: chalk.hex('#FFD700'),
  sky: chalk.hex('#87CEEB'),
  dirt: chalk.hex('#8B4513'),
  accent: chalk.bold.white,
  dim: chalk.dim,
  error: chalk.bold.red,
  streak: chalk.bold.cyan,
  warning: chalk.yellow,
};

export function printHeader(art) {
  let colored = art.scene;
  // Color grass tildes green
  colored = colored.replace(/~/g, colors.grass('~'));
  // Color asterisks gold
  colored = colored.replace(/\*/g, colors.sun('*'));
  // Color caret (tree) green
  colored = colored.replace(/\^/g, colors.grass('^'));

  console.log('\n' + colored + '\n');
}

export function printMessage(message) {
  const prefix = colors.warning('>>>');
  console.log(`${prefix} ${colors.accent(message)}\n`);
}

export function printStreakBadge(data, milestone) {
  const streakLine = `  ${colors.streak(`streak: ${data.currentStreak} days`)} | ${colors.streak(`total: ${data.count} touches`)} | ${colors.streak(`longest: ${data.longestStreak} days`)}`;
  console.log(streakLine);

  if (milestone) {
    console.log(`\n  ${colors.warning('✨')} ${colors.accent(milestone)}\n`);
  }
}

export function printSeparator() {
  console.log(colors.dim('─'.repeat(60)));
}

export function printSuccess(text) {
  console.log(`  ${chalk.green('✓')} ${text}`);
}

export function clearOnExit() {
  process.on('SIGINT', () => {
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
