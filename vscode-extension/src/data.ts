// ─── Art scenes ─────────────────────────────────────────────────────────────

import scenesData from './art.json';
import messagesData from './messages.json';

export interface ArtScene {
  title: string;
  scene: string;
}

export const scenes: ArtScene[] = scenesData;

export function getArt(variant?: number): ArtScene {
  const index =
    variant !== undefined ? variant : Math.floor(Math.random() * scenes.length);
  return scenes[index];
}

// ─── Messages ────────────────────────────────────────────────────────────────

export const messages: string[] = messagesData;

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
