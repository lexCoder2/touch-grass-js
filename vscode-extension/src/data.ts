// ─── Art scenes ─────────────────────────────────────────────────────────────

export interface ArtScene {
  title: string;
  scene: string;
}

export const scenes: ArtScene[] = [
  {
    title: "~ The Meadow ~",
    scene: `      \\  |  /    .  *   .    *
       \\ | /  *           *  .   *
   _____\\|/_____
  ( ~~~ clouds ~~~ )     .    *
   \\_____________/    .      *

  ,  ,   ,  ,  ,  ,  ,  ,  ,  ,  ,
 /|\\ /|\\ /|\\ /|\\ /|\\ /|\\ /|\\ /|\\
/ |  V |  V |  V |  V |  V |  V |  V |
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 |||||||||||||||||||||||||||||||||||||||||||||||||
  | | | | | | | | | | | | | | | | | | | | | | |`,
  },
  {
    title: "~ The Park ~",
    scene: `  v        v           v        .  *
   .   *       .    *      .     .
        \\   .   /      *
     *   \\ _ /     *          .  *
         /| |\\           .      *
        / | | \\    *
      /   | |   \\      .    *
    /_____|_|_____\\       .
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\
 |||||||||||||||||||||||||||||||||||||||||||||||||
  | | | | | | | | | | | | | | | | | | | | | | |`,
  },
  {
    title: "~ The Mountain ~",
    scene: `      .    *       .    *    .  *
          /\\
         /  \\      .    *
        / go \\  .          *
       /      \\       .      *
      /outside!\\          .    *
     /___________\\   .    *
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  ,  ,   ,  ,  ,  ,  ,  ,  ,  ,  ,
 /|\\ /|\\ /|\\ /|\\ /|\\ /|\\ /|\\ /|\\
/ |  V |  V |  V |  V |  V |  V |  V |
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`,
  },
];

export function getArt(variant?: number): ArtScene {
  const index =
    variant !== undefined ? variant : Math.floor(Math.random() * scenes.length);
  return scenes[index];
}

// ─── Messages ────────────────────────────────────────────────────────────────

export const messages: string[] = [
  "Congratulations. You have successfully remembered that outside exists.",
  "Your IDE will still be there. Regrettably.",
  "The compiler says: skill issue. Grass says: come here.",
  "Stack Overflow has been there for you. Have YOU been there for vitamin D?",
  "Breaking: local developer discovers world beyond 80-column terminal.",
  "You have been in dark mode for 14 hours. The sun has better rendering.",
  "Your PR will wait. Your mitochondria will not.",
  "404: outdoor time not found. Initiating emergency protocol.",
  "Today's forecast: touch grass, high of 72°F, zero merge conflicts.",
  "npm install outside completed successfully. 0 vulnerabilities.",
  "git push yourself. Outside. Now.",
  "ERROR: Too much terminal. SOLUTION: Unplug face from monitor.",
  "Doctors hate this one weird trick: going outside.",
  "You've read more man pages today than a park ranger does in a year.",
  "The grass is always greener outside. Mostly because you are never there.",
  "Your linter found 0 issues. Your therapist found several.",
  "You can't merge a PR if you're outside. Sounds like a personal problem.",
  "BREAKING: Grass has better documentation than Stack Overflow.",
  "Tree.render() is working perfectly. Better than your last deploy.",
  "Touching grass: The only bug fix that actually heals you.",
  "Chlorophyll? More like Chloro-FEEL the sunshine.",
  "Your keyboard: still broken after 12 hours. Grass: still free.",
  "Ctrl+Alt+Delete your schedule and go outside.",
  "Sunscreen applied. Jira ticket: still haunting you. Go outside anyway.",
  "Roses are red, violets are blue, touch grass right now or you might lose your mind too.",
  'System.out.println("I went outside and it was weird but nice");',
  "Type: grass. Import: fresh air. Compile: success. Status: HUMAN.",
  "If you can't find the bug, the bug is probably behind you (it's a tree).",
  "Your standup can wait. Your Vitamin D levels cannot.",
  "New error: `touch: grass not found`. Seek grass immediately.",
  "DEBUG: why do I feel better outside? ANS: because you are finally alive.",
  "Your uptime is impressive. Your sunlight exposure is not.",
  "console.log('went outside') // currently unreachable code",
  "You've opened 47 tabs today. Zero of them were windows.",
  "The cloud is not above you. Look up. That is the sky.",
  "Touch grass. It is O(1) for your mental health.",
  "You haven't moved since the last standup. The standup was yesterday.",
  "Your posture.exe has stopped responding. Touch grass to restart.",
  "sudo go outside --force",
  "Your body has entered low-power mode. Sunlight is the charger.",
  "pip install vitamin-d --upgrade",
  "Warning: developer approaching terminal velocity. Step away from terminal.",
  "There is a whole API outside. No rate limits. No auth tokens.",
  "Burnout is a deprecated function. Outdoor breaks are the patch.",
  "Caffeine-driven development has limits. Grass-driven recovery does not.",
  "You have been in the zone for 4 hours. The zone does not have trees.",
  "Real-time alert: the sky is still rendering. Go witness it.",
  "The only sprint you need right now is to the front door.",
  "Your local environment is not your only environment.",
  "Nature runs on zero dependencies. You should visit sometime.",
  "You call yourself a full-stack developer. The stack includes the outside.",
  "Your eyes have rendered ~90,000 pixels today. Give them a horizon.",
  "The birds outside have shipped more than your last sprint. Just saying.",
  "You've refactored this three times. Go outside once.",
  "Out of scope: the outdoors. Time to widen your scope.",
  "Merge conflict detected: your brain vs. reality. Outside resolves it.",
  "No hotfix needed. Just go outside.",
  "Touch grass. Your future self will leave a glowing review.",
  "`undefined is not grass`. Go find some.",
  "Your README says you are passionate. Prove it by being alive.",
  "Production is fine. You are not. Prioritize accordingly.",
];

export function getRandomMessage(): string {
  return messages[Math.floor(Math.random() * messages.length)];
}

// ─── Social share templates ───────────────────────────────────────────────────

export interface ShareData {
  count: number;
  currentStreak: number;
  longestStreak: number;
  lastVisit: string;
}

const socialTemplates: string[] = [
  "🌿 just touched grass ✅ you should too! try: npx go-touch-grass",
  "🌱 i went outside. actually outside. grass was real. npx go-touch-grass if you dare",
  "🔥 day {streak} of touching grass as a developer. it gets easier. npx go-touch-grass",
  "⚡ my outdoor streak is {streak} days and i feel things. horrifying. npx go-touch-grass",
  "☀️ went outside today. no screens. no PRs. grass. 10/10 recommend. npx go-touch-grass",
  "🏕️ {streak} consecutive days of touching grass. my therapist is proud. npx go-touch-grass",
  "🌍 breaking: developer discovers photosynthesis exists. it's called touching grass. npx go-touch-grass",
  "💪 {streak} day grass-touching streak 🌿 my productivity is actually up??? npx go-touch-grass",
  "🎉 hit {streak} touches! my vitamin D levels have entered the chat. npx go-touch-grass",
  "🚀 just proved i can escape my desk for 10 minutes. npx go-touch-grass",
  "😎 {streak} touches deep into my grass-touching era. you could join. npx go-touch-grass",
  "🌟 pro tip: touching grass is the best debugging strategy. npx go-touch-grass",
  "🧠 went outside. the solution was there the whole time. literally in the air. npx go-touch-grass",
  "✨ {streak} days of touching grass and my posture is actually improving??? npx go-touch-grass",
];

export function buildShareText(data: ShareData): string {
  const tpl =
    socialTemplates[Math.floor(Math.random() * socialTemplates.length)];
  return tpl
    .replace("{count}", String(data.count ?? 0))
    .replace("{streak}", String(data.currentStreak ?? 1));
}

export function buildShareUrl(
  platform: "twitter" | "linkedin",
  text: string,
): string {
  const encoded = encodeURIComponent(text);
  if (platform === "twitter") {
    return `https://twitter.com/intent/tweet?text=${encoded}`;
  }
  const repo = encodeURIComponent(
    "https://github.com/lexCoder2/touch-grass-js",
  );
  return `https://www.linkedin.com/sharing/share-offsite/?url=${repo}&summary=${encoded}`;
}

// ─── Milestones ───────────────────────────────────────────────────────────────

export const MILESTONES: Record<number, string> = {
  1: "First time?! Bold move. Let's see if you survive.",
  5: "Five times. You're basically a park ranger now.",
  10: "Ten times. Your tan is visible from space.",
  25: "25 touches. You have surpassed all other developers.",
  50: "50 touches. Consider going professional.",
  100: "100 TOUCHES. You are no longer a developer. You are nature.",
};
