<div align="center">

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="./touch_grass_logo_dark.png" />
  <source media="(prefers-color-scheme: light)" srcset="./toucn_grass_logo.png" />
  <img src="./touch_grass_logo.png" alt="go-touch-grass CLI logo — a mouse cursor touching grass blades, representing developer break reminders" width="280" />
</picture>

# go-touch-grass

### A Fun CLI that reminds developers to go outside, touch grass, and stop staring at screens

Track your outdoor streak, earn milestones, and share your grass-touching stats on Twitter/X, LinkedIn, and Instagram — all from your terminal.

[![npm version](https://img.shields.io/npm/v/go-touch-grass.svg?style=flat-square)](https://www.npmjs.com/package/go-touch-grass)
[![npm downloads](https://img.shields.io/npm/dm/go-touch-grass.svg?style=flat-square)](https://www.npmjs.com/package/go-touch-grass)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](./LICENSE)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D20-brightgreen.svg?style=flat-square)](https://nodejs.org/)

[**Get Started**](#-installation) · [**Features**](#-features) · [**Usage**](#-usage) · [**Commands**](#-command-reference)

</div>

---

## What is go-touch-grass?

**go-touch-grass** is a zero-config Node.js CLI tool that nudges developers to take outdoor breaks. Run one command and you'll see colorful ASCII art, get roasted with a sarcastic message, receive a 10-minute outdoor assignment, and optionally share your streak on social media. It tracks your daily grass-touching habit locally and rewards consistency with milestone achievements.

```bash
npx go-touch-grass
```

> **One command. One break. Every day.**

---

## 📦 Installation

### Global install (recommended for daily use)

```bash
npm install -g go-touch-grass
go-touch-grass
```

### One-time execution (zero install)

```bash
npx go-touch-grass
```

### Local project dependency

```bash
npm install go-touch-grass
npx go-touch-grass
```

### VS Code / Cursor Extension

Install the extension directly from the `vscode-extension/` folder:

```bash
cd vscode-extension
npm install
npm run package          # produces go-touch-grass-1.0.0.vsix
code --install-extension go-touch-grass-1.0.0.vsix
```

Or press **F5** inside `vscode-extension/` to launch the Extension Development Host.

---

## 🎯 Features

| Feature                        | Description                                                                                              |
| ------------------------------ | -------------------------------------------------------------------------------------------------------- |
| **31 Sarcastic Messages**      | A different quip every time — all about your screen-addicted life choices                                |
| **3 ASCII Art Scenes**         | Meadow, park, and mountain environments rendered in your terminal                                        |
| **Persistent Streak Tracking** | Your history lives in `~/.config/go-touch-grass/` (Linux/Mac) or `%APPDATA%\\go-touch-grass\\` (Windows) |
| **Milestone Achievements**     | Unlock special messages at 1, 5, 10, 25, 50, and 100 touches                                             |
| **10-Minute Countdown Timer**  | Optional animated progress bar for your outdoor assignment                                               |
| **Social Media Sharing**       | Post your streak to **Twitter/X**, **LinkedIn**, or **Instagram**                                        |
| **8.5 kB Package Size**        | Tiny footprint — optimized for `npx` cold starts                                                         |
| **ESM-Native**                 | Pure ES modules, no CommonJS                                                                             |
| **VS Code / Cursor Extension** | Status bar streak counter, in-editor panel with timer, periodic reminders, and social sharing            |

---

## 🚀 Usage

### Full experience

```bash
npx go-touch-grass
```

Runs the complete flow:

1. Displays a random ASCII art outdoor scene
2. Delivers a sarcastic message about your screen time
3. Shows your current streak, total touches, and longest streak
4. Assigns a 10-minute outdoor break with optional countdown
5. Offers to share your achievement on social media

### Check your streak stats

```bash
npx go-touch-grass --streak
# or
npx go-touch-grass -s
```

### Share to social media

```bash
npx go-touch-grass --share
# or
npx go-touch-grass -S
```

Choose your platform interactively:

- **Twitter/X** — Tweet your grass touching streak
- **LinkedIn** — Share your touching grass acheivements, professionally
- **Instagram** — Copy text for a post
- **Skip** — Keep it private

### Skip optional features

```bash
npx go-touch-grass --noTimer          # Skip the countdown timer
npx go-touch-grass --noShare          # Skip the social media prompt
npx go-touch-grass --noTimer --noShare  # Minimalist mode
```

### Show help

```bash
npx go-touch-grass --help
```

---

## 📸 Example Output

```
        ^        *   *
       /|\          *
      / | \
  ___/  |  \___
 (  touch    )
  \  grass  /
   \       /
~~~~~~~~~~~~~~~~~~~~

────────────────────────────────────────────────────────────
>>> You have been in dark mode for 14 hours. The sun has better rendering.

────────────────────────────────────────────────────────────
  streak: 5 days | total: 42 touches | longest: 12 days

────────────────────────────────────────────────────────────

   ╭─────────────────────────────────╮
   │                                 │
   │   ⏱ YOUR OUTDOOR ASSIGNMENT    │
   │                                 │
   │   Duration: 10 minutes          │
   │   Return by: 3:45 PM           │
   │                                 │
   │   Do NOT touch your keyboard.   │
   │   Do NOT check Slack.           │
   │   Touch grass. Breathe air.     │
   │                                 │
   ╰─────────────────────────────────╯

? Share your achievement on social media? (y/N)
```

---

## 📊 Social Sharing Examples

Each share message is randomized. Here are some examples:

```
🌿 just touched grass ✅ you should too! try: npx go-touch-grass

🔥 day 7 of touching grass as a developer. it gets easier. npx go-touch-grass

💪 7 day grass-touching streak 🌿 my productivity is actually up??? npx go-touch-grass

🧠 went outside. the solution was there the whole time. literally in the air. npx go-touch-grass

☀️ 30 consecutive days of touching grass. my therapist is proud. npx go-touch-grass
```

---

## 🗂️ Data Storage

Streak data is stored locally — no cloud, no telemetry, no accounts.

| Platform          | Config path                              |
| ----------------- | ---------------------------------------- |
| **Linux / macOS** | `~/.config/go-touch-grass/config.json`   |
| **Windows**       | `%APPDATA%\\go-touch-grass\\config.json` |

<details>
<summary>Example config file</summary>

```json
{
  "count": 42,
  "lastVisit": "2026-03-01",
  "currentStreak": 7,
  "longestStreak": 12
}
```

</details>

---

## 🎯 Command Reference

| Command                        | Alias | Description              |
| ------------------------------ | ----- | ------------------------ |
| `npx go-touch-grass`           | —     | Run the full experience  |
| `npx go-touch-grass --streak`  | `-s`  | Show streak stats        |
| `npx go-touch-grass --share`   | `-S`  | Open social sharing menu |
| `npx go-touch-grass --noTimer` | —     | Skip the countdown timer |
| `npx go-touch-grass --noShare` | —     | Skip social media prompt |
| `npx go-touch-grass --help`    | —     | Print help text          |
| `npx go-touch-grass --version` | —     | Print version number     |

---

## 💡 Tips

- **Only one touch per day is counted.** Running it multiple times on the same day won't inflate your stats.
- **Streaks reset after one missed day.** Consistency is the point.
- **Vary your sharing platform.** LinkedIn for professional audiences, Twitter for unhinged honesty.
- **Use `--noTimer` when you're short on time.** The outdoor assignment is optional.
- **Pipe-friendly.** `go-go-go-touch-grass | tee grass.log` works for logging your sessions.

---

## 📚 How It Works Internally

1. Compares today's date to your last visit
2. Increments your streak if it's a new day (idempotent on repeat runs)
3. Renders a random ASCII art outdoor scene
4. Picks one of 31 sarcastic messages
5. Displays your streak, total touches, and longest streak
6. Assigns a 10-minute outdoor break
7. Optionally runs an animated countdown timer
8. Offers social sharing to Twitter/X, LinkedIn, or Instagram
9. Exits — time to touch grass

---

## ⚙️ Requirements

- **Node.js 20 or higher**
- A terminal emulator
- Access to the outdoors (grass optional, parks acceptable)

---

## 🤝 Contributing

Contributions are welcome from developers who go outside sometimes.

- **Bug reports:** [Open an issue](https://github.com/lexCoder2/touch-grass-js/issues)
- **Feature requests:** [Start a discussion](https://github.com/lexCoder2/touch-grass-js/discussions)
- **Pull requests:** Reviewed between outdoor breaks

---

## 📄 License

[MIT](./LICENSE) © 2026 go-touch-grass contributors

---

<div align="center">

**Made with ☀️ and 🌿 for developers who need a reminder to go outside**

Your code will still be there in 10 minutes. Your mental health might not be.

[**⬆ Back to top**](#go-touch-grass)

</div>
