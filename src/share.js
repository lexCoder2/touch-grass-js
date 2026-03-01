import open from 'open';

const SOCIAL_TEMPLATES = [
  '🌿 just touched grass ✅ you should too! try: npx touch-grass',
  '🌱 i went outside. actually outside. grass was real. npx touch-grass if you dare',
  '🔥 day {streak} of touching grass as a developer. it gets easier. npx touch-grass',
  '⚡ my outdoor streak is {streak} days and i feel things. horrifying. npx touch-grass',
  '☀️ went outside today. no screens. no PRs. grass. 10/10 recommend. npx touch-grass',
  '🏕️ {streak} consecutive days of touching grass. my therapist is proud. npx touch-grass',
  '🌍 breaking: developer discovers photosynthesis exists. it\'s called touching grass. npx touch-grass',
  '💪 {streak} day grass-touching streak 🌿 my productivity is actually up??? npx touch-grass',
  '🎉 hit {streak} touches! my vitamin D levels have entered the chat. npx touch-grass',
  '🚀 just proved i can escape my desk for 10 minutes. npx touch-grass',
  '😎 {streak} touches deep into my grass-touching era. you could join. npx touch-grass',
  '🌟 pro tip: touching grass is the best debugging strategy. npx touch-grass',
  '🧠 went outside. the solution was there the whole time. literally in the air. npx touch-grass',
  '✨ {streak} days of touching grass and my posture is actually improving??? npx touch-grass',
];

export function buildShareText(streakData) {
  const template = SOCIAL_TEMPLATES[Math.floor(Math.random() * SOCIAL_TEMPLATES.length)];
  return template
    .replace('{count}', streakData.count || 0)
    .replace('{streak}', streakData.currentStreak || 1);
}

export function buildTwitterUrl(text) {
  const encoded = encodeURIComponent(text);
  return `https://twitter.com/intent/tweet?text=${encoded}`;
}

export function buildLinkedInUrl(text) {
  const encoded = encodeURIComponent(text);
  return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://github.com/anthropics/touch-grass')}&summary=${encoded}`;
}

export function buildInstagramShareText(text) {
  // Instagram doesn't have a direct URL intent, so we return the text for manual sharing
  return text;
}

export async function openShareDialog(streakData, platform) {
  const shareText = buildShareText(streakData);
  console.log('\n📱 Here\'s what we\'ll share:\n');
  console.log(`  "${shareText}"\n`);

  if (platform === 'twitter') {
    const url = buildTwitterUrl(shareText);
    console.log('Opening Twitter/X... go shame your followers into being healthy.\n');
    await open(url);
  } else if (platform === 'linkedin') {
    const url = buildLinkedInUrl(shareText);
    console.log('Opening LinkedIn... time to network your outdoor achievements.\n');
    await open(url);
  } else if (platform === 'instagram') {
    console.log('Copy the text above and paste it into your Instagram post caption.\n');
    console.log('✨ Pro tip: Add some grass/nature photos to really sell it!\n');
  }
}
