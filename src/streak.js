import Conf from 'conf';
import boxen from 'boxen';

const config = new Conf({
  projectName: 'touch-grass',
  schema: {
    count: {
      type: 'number',
      default: 0,
      minimum: 0,
    },
    lastVisit: {
      type: 'string',
      default: '',
    },
    longestStreak: {
      type: 'number',
      default: 0,
      minimum: 0,
    },
    currentStreak: {
      type: 'number',
      default: 0,
      minimum: 0,
    },
  },
});

const MILESTONES = {
  1: 'First time?! Bold move. Let\'s see if you survive.',
  5: 'Five times. You\'re basically a park ranger now.',
  10: 'Ten times. Your tan is visible from space.',
  25: '25 touches. You have surpassed all other developers.',
  50: '50 touches. Consider going professional.',
  100: '100 TOUCHES. You are no longer a developer. You are nature.',
};

function getTodayDate() {
  return new Date().toISOString().split('T')[0];
}

function isYesterday(dateStr) {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  return dateStr === yesterday.toISOString().split('T')[0];
}

export function incrementStreak() {
  const today = getTodayDate();
  const lastVisit = config.get('lastVisit') || '';
  let currentStreak = config.get('currentStreak') || 0;
  let count = config.get('count') || 0;
  let longestStreak = config.get('longestStreak') || 0;
  let milestone = null;

  // Only increment count if it's a new day
  if (lastVisit !== today) {
    count += 1;

    // Update streak logic
    if (isYesterday(lastVisit)) {
      // Streak continues
      currentStreak += 1;
    } else {
      // Streak broken or first time
      currentStreak = 1;
    }

    // Update longest streak
    if (currentStreak > longestStreak) {
      longestStreak = currentStreak;
    }

    // Check for milestones
    if (MILESTONES[count]) {
      milestone = MILESTONES[count];
    }

    // Save to config
    config.set({
      count,
      lastVisit: today,
      currentStreak,
      longestStreak,
    });
  }

  return {
    count,
    lastVisit: today,
    currentStreak,
    longestStreak,
    milestone,
  };
}

export function getStreakData() {
  return {
    count: config.get('count'),
    lastVisit: config.get('lastVisit'),
    currentStreak: config.get('currentStreak'),
    longestStreak: config.get('longestStreak'),
  };
}

export function resetStreak() {
  config.clear();
}

export function showStreakStats(chalk) {
  const data = getStreakData();
  const statsBox = boxen(
    `🌿 GRASS TOUCHING STATS\n\n  Total touches: ${chalk.cyan(data.count)}\n  Current streak: ${chalk.cyan(data.currentStreak)} days\n  Longest streak: ${chalk.cyan(data.longestStreak)} days\n  Last touched: ${chalk.cyan(data.lastVisit || 'never')}`,
    {
      padding: 1,
      margin: 1,
      borderStyle: 'round',
      borderColor: 'green',
    }
  );
  return statsBox;
}
