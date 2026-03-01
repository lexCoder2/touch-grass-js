<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="touch_logo_dark.png">
    <source media="(prefers-color-scheme: light)" srcset="touch_logo.png">
    <img src="touch_logo.png" alt="Go Touch Grass" width="128" />
  </picture>
</p>

<h1 align="center">Go Touch Grass</h1>

<p align="center">
  <strong>Your editor knows you haven't moved in 3 hours. So do we.</strong>
</p>

<p align="center">
  <a href="https://github.com/lexCoder2/touch-grass-js"><img alt="GitHub" src="https://img.shields.io/badge/github-touch--grass--js-3fb950?logo=github&style=flat-square"></a>
  <a href="https://www.npmjs.com/package/go-touch-grass"><img alt="npm" src="https://img.shields.io/npm/v/go-touch-grass?color=3fb950&style=flat-square&logo=npm"></a>
  <img alt="VS Code" src="https://img.shields.io/badge/VS%20Code-%5E1.85-79c0ff?style=flat-square&logo=visualstudiocode">
  <img alt="License" src="https://img.shields.io/badge/license-MIT-d29922?style=flat-square">
</p>

---

> A sarcastic, streak-tracking, ASCII-art-powered reminder to step away from your screen and go touch some actual grass.
> Born as a CLI — [`npx go-touch-grass`](https://www.npmjs.com/package/go-touch-grass) — now living rent-free inside VS Code and Cursor.

---

## ✨ What it does

<table>
<tr>
<td width="48">🌿</td>
<td><strong>Status bar streak counter</strong><br>
<code>start to touch 🌿</code> → <code>🌿 1 day streak</code> → <code>🌿 7 day streak</code>.<br>
Hover for a tooltip with your full stats and quick-action links. Click to open the panel.</td>
</tr>
<tr>
<td>🖼️</td>
<td><strong>Compact side panel</strong><br>
Opens beside your code without stealing focus. Shows a random ASCII art scene (meadow, park, or mountain), a sarcastic developer wellness message, and your streak data — all instantly, no slow reveals.</td>
</tr>
<tr>
<td>⏱️</td>
<td><strong>Configurable outdoor timer</strong><br>
Pick your duration right in the panel: <code>5m · 10m · 15m · 20m · 30m</code> or any custom value. The selection is saved globally so it sticks across sessions.</td>
</tr>
<tr>
<td>🔔</td>
<td><strong>Periodic reminders</strong><br>
A notification appears every N minutes (default 60, configurable) with a random message and a one-click <em>"Touch Grass Now"</em> button.</td>
</tr>
<tr>
<td>📊</td>
<td><strong>Persistent streak tracking</strong><br>
Daily streak · longest streak ever · total touches · last date. Stored in VS Code global state — survives restarts, syncs with Settings Sync.</td>
</tr>
<tr>
<td>📢</td>
<td><strong>Social sharing</strong><br>
Share to <strong>Twitter / X</strong> or <strong>LinkedIn</strong> in one click. Instagram copies the caption to your clipboard. 14 unique post templates that use your real streak numbers.</td>
</tr>
</table>

---

## 🚀 Commands

Open the Command Palette (`Ctrl+Shift+P` / `Cmd+Shift+P`) and type **Touch Grass**:

| Command                          | What it does                                             |
| -------------------------------- | -------------------------------------------------------- |
| `Touch Grass: Go Outside Now`    | Opens the panel, increments your streak                  |
| `Touch Grass: Show Streak Stats` | Shows a stats notification with panel / share shortcuts  |
| `Touch Grass: Share Achievement` | Platform picker → opens share URL or copies to clipboard |
| `Touch Grass: Reset Streak`      | Wipes streak data (requires confirmation)                |

---

## ⚙️ Settings

| Setting                              | Default | Description                                |
| ------------------------------------ | ------- | ------------------------------------------ |
| `touchGrass.enableReminders`         | `true`  | Toggle periodic reminders on / off         |
| `touchGrass.reminderIntervalMinutes` | `60`    | Minutes between reminders (min 5)          |
| `touchGrass.outdoorMinutes`          | `10`    | Default outdoor timer duration (1–120 min) |

```jsonc
// .vscode/settings.json
{
  "touchGrass.enableReminders": true,
  "touchGrass.reminderIntervalMinutes": 45,
  "touchGrass.outdoorMinutes": 10,
}
```

Duration can also be changed live from the panel — no settings file needed.

---

## 🌿 ASCII art scenes

```
  v        v           v        .  *       .    *       .    *    .  *
                                        /\
        \   .   /      *               /  \      .    *
     *   \ _ /     *                  / go \  .          *
         /| |\           .           /      \       .      *
        / | | \    *                /outside!\          .    *
      /   | |   \      .    *      /___________\   .    *
    /_____|_|_____\       .   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\
 |||||||||||||||||||||||||||||||||||||||||||||||||
```

31 sarcastic messages. 3 scenes. Zero mercy.

---

## 📦 Install

**From the VS Code Marketplace:**
Search `Go Touch Grass` in the Extensions view or run:

```
ext install lexCoder.gotouchgrass
```

**From a `.vsix` file:**

```bash
code --install-extension go-touch-grass-*.vsix
```

---

## 🌱 Also available as a CLI

[![npm](https://img.shields.io/npm/v/go-touch-grass?color=3fb950&style=flat-square&logo=npm)](https://www.npmjs.com/package/go-touch-grass)
[![npm downloads](https://img.shields.io/npm/dm/go-touch-grass?style=flat-square&color=3fb950)](https://www.npmjs.com/package/go-touch-grass)

Prefer the terminal? The same art, messages, and streak tracking are available as a zero-install CLI:

```bash
npx go-touch-grass
```

Supports `--streak`, `--share`, `--noTimer`, `--noShare`, and `--time <minutes>` flags. See the [CLI README](https://github.com/lexCoder2/touch-grass-js#readme) for full details.

---

## 🤝 Contributing

Issues and PRs welcome at [github.com/lexCoder2/touch-grass-js](https://github.com/lexCoder2/touch-grass-js).

---

<p align="center">
  <sub>MIT License · Made with too much screen time and not enough grass</sub>
</p>
