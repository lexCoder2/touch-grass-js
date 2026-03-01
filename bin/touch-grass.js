#!/usr/bin/env node

import meow from 'meow';
import chalk from 'chalk';
import { getArt } from '../src/art.js';
import { getRandomMessage } from '../src/messages.js';
import { incrementStreak, getStreakData, showStreakStats } from '../src/streak.js';
import { showReturnTime, runCountdown, showTimerPrompt } from '../src/timer.js';
import { openShareDialog } from '../src/share.js';
import {
  printHeader,
  printMessage,
  printStreakBadge,
  printSeparator,
  clearOnExit,
} from '../src/ui.js';
import { confirm, select } from '@inquirer/prompts';

const cli = meow(
  `
Usage
  $ npx go-touch-grass [options]

Options
  --streak, -s     Show your grass-touching streak stats
  --share, -S      Share your achievement to social media
  --time, -t       Outdoor timer duration in minutes (default: 10)
  --noTimer        Skip the countdown timer
  --noShare        Skip the social media share prompt
  --help           Show this help
  --version        Show version

Examples
  $ npx go-touch-grass
  $ npx go-touch-grass --streak
  $ npx go-touch-grass --share
  $ npx go-touch-grass --time 5
  $ npx go-touch-grass --noShare
`,
  {
    importMeta: import.meta,
    flags: {
      streak: {
        type: 'boolean',
        shortFlag: 's',
        default: false,
      },
      share: {
        type: 'boolean',
        shortFlag: 'S',
        default: false,
      },
      noTimer: {
        type: 'boolean',
        default: false,
      },
      noShare: {
        type: 'boolean',
        default: false,
      },
      time: {
        type: 'number',
        shortFlag: 't',
        default: 10,
      },
    },
  }
);

async function main() {
  clearOnExit();

  // --streak flag: show stats and exit
  if (cli.flags.streak) {
    console.log(showStreakStats(chalk));
    process.exit(0);
  }

  // --share flag: go straight to share (ask for platform)
  if (cli.flags.share) {
    const streakData = getStreakData();
    try {
      const platform = await select({
        message: 'Which platform would you like to shame your followers on?',
        choices: [
          { name: '🐦 Twitter/X', value: 'twitter' },
          { name: '💼 LinkedIn', value: 'linkedin' },
          { name: '📸 Instagram', value: 'instagram' },
          { name: '🚫 Actually, nevermind', value: 'none' },
        ],
      });
      if (platform !== 'none') {
        await openShareDialog(streakData, platform);
      }
    } catch {
      // Non-TTY, default to twitter
      await openShareDialog(streakData, 'twitter');
    }
    process.exit(0);
  }

  // Main experience flow
  const art = getArt();
  await printHeader(art);
  await printSeparator();

  const message = getRandomMessage();
  await printMessage(message);

  await printSeparator();

  const streakResult = incrementStreak();
  await printStreakBadge(streakResult, streakResult.milestone);

  await printSeparator();

  // Show timer experience
  showReturnTime(cli.flags.time);

  // Offer countdown if TTY
  if (!cli.flags.noTimer) {
    const wantCountdown = await showTimerPrompt(cli.flags.time);
    if (wantCountdown) {
      await runCountdown(cli.flags.time);
      console.log(chalk.bold.green('\n✓ Welcome back! Now go work on something.\n'));
    }
  }

  // Offer to share (unless --noShare is set)
  if (!cli.flags.noShare) {
    try {
      const wantShare = await confirm({
        message: 'Share your achievement on social media?',
        default: false,
      });

      if (wantShare) {
        const platform = await select({
          message: 'Which platform would you like to shame your followers on?',
          choices: [
            { name: '🐦 Twitter/X', value: 'twitter' },
            { name: '💼 LinkedIn', value: 'linkedin' },
            { name: '📸 Instagram', value: 'instagram' },
            { name: '🚫 Never mind', value: 'none' },
          ],
        });

        if (platform !== 'none') {
          await openShareDialog(streakResult, platform);
        }
      }
    } catch {
      // Non-TTY, skip
    }
  }

  console.log(chalk.dim('\nRespect. Now go touch that grass.\n'));
  process.exit(0);
}

main();
