import * as vscode from 'vscode';
import { ArtScene, ShareData, buildShareText, buildShareUrl } from './data';
import { StreakResult } from './streak';

let currentPanel: vscode.WebviewPanel | undefined;

export function openGrassPanelOrReveal(
  context: vscode.ExtensionContext,
  art: ArtScene,
  message: string,
  streakResult: StreakResult,
  outdoorMinutes: number = 10
): void {
  if (currentPanel) {
    currentPanel.reveal(vscode.ViewColumn.Beside);
    currentPanel.webview.html = buildHtml(currentPanel.webview, art, message, streakResult, outdoorMinutes);
    return;
  }

  currentPanel = vscode.window.createWebviewPanel(
    'touchGrass',
    '🌿 Touch Grass',
    { viewColumn: vscode.ViewColumn.Beside, preserveFocus: true },
    { enableScripts: true, retainContextWhenHidden: true }
  );

  currentPanel.webview.html = buildHtml(currentPanel.webview, art, message, streakResult, outdoorMinutes);

  currentPanel.webview.onDidReceiveMessage(
    async (msg: { command: string; platform?: string; minutes?: number }) => {
      if (msg.command === 'share') {
        const platform = msg.platform as 'twitter' | 'linkedin' | 'instagram';
        const shareData: ShareData = {
          count: streakResult.count,
          currentStreak: streakResult.currentStreak,
          longestStreak: streakResult.longestStreak,
          lastVisit: streakResult.lastVisit,
        };
        const text = buildShareText(shareData);
        if (platform === 'instagram') {
          await vscode.env.clipboard.writeText(text);
          vscode.window.showInformationMessage(
            '📋 Copied to clipboard! Paste it into your Instagram caption.'
          );
          return;
        }
        const url = buildShareUrl(platform, text);
        await vscode.env.openExternal(vscode.Uri.parse(url));
      }
      if (msg.command === 'setDuration' && msg.minutes && msg.minutes >= 1) {
        await vscode.workspace
          .getConfiguration('touchGrass')
          .update('outdoorMinutes', msg.minutes, vscode.ConfigurationTarget.Global);
      }
    },
    undefined,
    context.subscriptions
  );

  currentPanel.onDidDispose(() => {
    currentPanel = undefined;
  });
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** Color the ASCII art the same way ui.js does — returns per-line HTML array */
function colorArtLines(raw: string): string[] {
  return raw.split('\n').map(line =>
    escapeHtml(line)
      .replace(/~/g,  '<span class="grass">~</span>')
      .replace(/\*/g, '<span class="sun">*</span>')
      .replace(/\^/g, '<span class="grass">^</span>')
      .replace(/,/g,  '<span class="grass">,</span>')
      .replace(/v/g,  '<span class="grass">v</span>')
      .replace(/\|/g, '<span class="grass">|</span>')
  );
}

function buildHtml(
  _webview: vscode.Webview,
  art: ArtScene,
  message: string,
  streak: StreakResult,
  outdoorMinutes: number = 10
): string {
  const milestoneHtml = streak.milestone
    ? `<div class="milestone">✨ ${escapeHtml(streak.milestone)}</div>`
    : '';

  const artHtml = colorArtLines(art.scene).join('\n');
  const pad = (n: number) => String(Math.floor(n)).padStart(2, '0');
  const initDisplay = `${pad(outdoorMinutes)}:00`;

  return /* html */ `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Touch Grass</title>
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg:      #0d1117;
    --surface: #161b22;
    --border:  #21262d;
    --grass:   #3fb950;
    --sun:     #d29922;
    --blue:    #79c0ff;
    --dim:     #8b949e;
    --text:    #e6edf3;
    --warn:    #f0883e;
  }

  html, body {
    background: var(--bg);
    color: var(--text);
    font-family: 'Cascadia Code', 'Fira Code', Consolas, monospace;
    font-size: 12px;
    line-height: 1.5;
    height: 100%;
  }

  /* ── Card shell ──────────────────────────────────── */
  .card {
    margin: 10px;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 10px;
    overflow: hidden;
  }

  /* ── Header ──────────────────────────────────────── */
  .card-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 7px 12px;
    border-bottom: 1px solid var(--border);
    background: #0d1117;
  }
  .card-head-title { color: var(--grass); font-size: 12px; font-weight: 700; letter-spacing: .5px; }
  .card-head-scene { color: var(--dim);   font-size: 10px; }

  /* ── Art ─────────────────────────────────────────── */
  pre.art {
    font-size: 10.5px;
    line-height: 1.35;
    padding: 10px 14px;
    border-bottom: 1px solid var(--border);
    overflow-x: auto;
    background: var(--surface);
    color: var(--grass);
    white-space: pre;
  }

  .grass { color: var(--grass); }
  .sun   { color: var(--sun);   }

  /* ── Message ─────────────────────────────────────── */
  .msg-row {
    display: flex;
    align-items: baseline;
    gap: 6px;
    padding: 8px 12px;
    border-bottom: 1px solid var(--border);
  }
  .msg-prefix { color: var(--sun); font-weight: 700; flex-shrink: 0; font-size: 11px; }
  .msg-text   { color: var(--text); font-size: 11px; font-weight: 600; line-height: 1.4; }

  /* ── Stats row ───────────────────────────────────── */
  .stats-row {
    display: flex;
    gap: 14px;
    padding: 6px 12px;
    border-bottom: 1px solid var(--border);
    font-size: 10px;
  }
  .stat-label { color: var(--dim); }
  .stat-val   { color: var(--blue); font-weight: 700; }

  /* ── Milestone ───────────────────────────────────── */
  .milestone {
    font-size: 10px;
    color: var(--sun);
    padding: 5px 12px;
    border-bottom: 1px solid var(--border);
    border-left: 2px solid var(--sun);
    background: #1a1500;
  }

  /* ── Timer area ──────────────────────────────────── */
  .timer-area {
    padding: 8px 12px;
    border-bottom: 1px solid var(--border);
  }

  /* Duration picker */
  .dur-label { font-size: 10px; color: var(--dim); margin-bottom: 5px; }
  .dur-pills { display: flex; gap: 4px; flex-wrap: wrap; margin-bottom: 8px; }
  .pill {
    font-size: 10px;
    padding: 2px 8px;
    border-radius: 99px;
    border: 1px solid var(--border);
    background: transparent;
    color: var(--dim);
    cursor: pointer;
    font-family: inherit;
    transition: background .12s, color .12s, border-color .12s;
  }
  .pill:hover              { background: #21262d; color: var(--text); border-color: var(--dim); }
  .pill.active             { background: #0f2016; color: var(--grass); border-color: var(--grass); }
  .pill-custom input {
    width: 34px; font-size: 10px; font-family: inherit;
    background: transparent; color: var(--text);
    border: none; outline: none; text-align: center;
  }

  /* Timer display */
  .timer-inner {
    display: none;
    margin-top: 6px;
  }
  .timer-inner.active { display: block; }
  .timer-clock {
    font-size: 24px;
    font-weight: 700;
    color: var(--warn);
    letter-spacing: 2px;
    line-height: 1;
    margin-bottom: 4px;
  }
  .timer-sub { font-size: 10px; color: var(--dim); margin-bottom: 6px; }
  .progress-track { background: var(--border); border-radius: 99px; height: 4px; overflow: hidden; }
  .progress-fill  { background: var(--grass); height: 100%; width: 0%; transition: width 1s linear; }
  .timer-done { font-size: 11px; color: var(--grass); font-weight: 700; margin-top: 6px; display: none; }
  .timer-done.show { display: block; }

  /* Start / Stop buttons */
  .timer-btns { display: flex; gap: 4px; margin-bottom: 0; }
  .btn {
    font-size: 10px;
    padding: 3px 10px;
    border-radius: 5px;
    border: 1px solid var(--border);
    background: #21262d;
    color: var(--text);
    cursor: pointer;
    font-family: inherit;
    transition: background .12s;
    line-height: 1.6;
  }
  .btn:hover     { background: #30363d; }
  .btn-go        { background: #0f2d16; border-color: var(--grass); color: var(--grass); }
  .btn-go:hover  { background: #1a3d22; }
  .btn-stop      { background: #2d160f; border-color: #f85149; color: #f85149; }
  .btn-stop:hover{ background: #3d1a0f; }

  /* ── Share row ───────────────────────────────────── */
  .share-row {
    display: flex;
    align-items: center;
    gap: 5px;
    padding: 7px 12px;
  }
  .share-lbl { font-size: 10px; color: var(--dim); flex-shrink: 0; margin-right: 2px; }
  .sbtn {
    font-size: 10px;
    padding: 2px 8px;
    border-radius: 5px;
    border: 1px solid var(--border);
    background: #21262d;
    color: var(--text);
    cursor: pointer;
    font-family: inherit;
    transition: background .12s;
    line-height: 1.6;
  }
  .sbtn:hover        { background: #30363d; }
  .sbtn-tw:hover     { background: #0d8fdc; border-color: #1da1f2; }
  .sbtn-li:hover     { background: #006097; border-color: #0077b5; }
  .sbtn-ig:hover     { background: #a02b6d; border-color: #c13584; }
</style>
</head>
<body>

<div class="card">

  <!-- header -->
  <div class="card-head">
    <span class="card-head-title">🌿 Touch Grass</span>
    <span class="card-head-scene">${escapeHtml(art.title)}</span>
  </div>

  <!-- art -->
  <pre class="art">${artHtml}</pre>

  <!-- message -->
  <div class="msg-row">
    <span class="msg-prefix">&gt;&gt;&gt;</span>
    <span class="msg-text">${escapeHtml(message)}</span>
  </div>

  <!-- stats -->
  <div class="stats-row">
    <span><span class="stat-label">streak </span><span class="stat-val">${streak.currentStreak}d</span></span>
    <span><span class="stat-label">total </span><span class="stat-val">${streak.count}</span></span>
    <span><span class="stat-label">best </span><span class="stat-val">${streak.longestStreak}d</span></span>
    <span><span class="stat-label">last </span><span class="stat-val">${escapeHtml(streak.lastVisit)}</span></span>
  </div>

  ${milestoneHtml}

  <!-- timer -->
  <div class="timer-area">
    <div class="dur-label">outdoor time</div>
    <div class="dur-pills" id="pills">
      <button class="pill${outdoorMinutes === 5  ? ' active' : ''}" onclick="pickDur(5)">5m</button>
      <button class="pill${outdoorMinutes === 10 ? ' active' : ''}" onclick="pickDur(10)">10m</button>
      <button class="pill${outdoorMinutes === 15 ? ' active' : ''}" onclick="pickDur(15)">15m</button>
      <button class="pill${outdoorMinutes === 20 ? ' active' : ''}" onclick="pickDur(20)">20m</button>
      <button class="pill${outdoorMinutes === 30 ? ' active' : ''}" onclick="pickDur(30)">30m</button>
      <span class="pill pill-custom">
        <input id="customMin" type="number" min="1" max="120"
          placeholder="?" title="Custom minutes"
          onchange="pickDur(+this.value)"
          onfocus="clearActive()"
        />m
      </span>
    </div>

    <div class="timer-btns" id="timerBtns">
      <button class="btn btn-go" id="btnStart" onclick="startTimer()">⏱ Start</button>
    </div>

    <div class="timer-inner" id="timerInner">
      <div class="timer-clock" id="clock">${initDisplay}</div>
      <div class="timer-sub" id="timerSub">go. outside. now.</div>
      <div class="progress-track"><div class="progress-fill" id="fill"></div></div>
      <div class="timer-done" id="timerDone">✓ Welcome back. Now ship something.</div>
    </div>
  </div>

  <!-- share -->
  <div class="share-row">
    <span class="share-lbl">share</span>
    <button class="sbtn sbtn-tw" onclick="share('twitter')">🐦 X</button>
    <button class="sbtn sbtn-li" onclick="share('linkedin')">💼 in</button>
    <button class="sbtn sbtn-ig" onclick="share('instagram')">📸 ig</button>
  </div>

</div>

<script>
  const vscode = acquireVsCodeApi();
  let selectedMinutes = ${outdoorMinutes};
  let timerInterval   = null;
  let totalSeconds    = selectedMinutes * 60;

  function pickDur(m) {
    if (!m || m < 1) return;
    selectedMinutes = m;
    totalSeconds    = m * 60;
    // update pills
    document.querySelectorAll('.pill:not(.pill-custom)').forEach(p => {
      p.classList.toggle('active', p.textContent === m + 'm');
    });
    // reset display if timer not running
    if (!timerInterval) {
      const pad = n => String(Math.floor(n)).padStart(2, '0');
      document.getElementById('clock').textContent = pad(m) + ':00';
    }
    // notify extension so the setting can be persisted
    vscode.postMessage({ command: 'setDuration', minutes: m });
  }

  function clearActive() {
    document.querySelectorAll('.pill:not(.pill-custom)').forEach(p => p.classList.remove('active'));
  }

  function startTimer() {
    if (timerInterval) return;
    document.getElementById('btnStart').style.display = 'none';

    // add stop button
    const stop = document.createElement('button');
    stop.className = 'btn btn-stop';
    stop.id = 'btnStop';
    stop.textContent = '✕ Stop';
    stop.onclick = stopTimer;
    document.getElementById('timerBtns').appendChild(stop);

    document.getElementById('timerInner').classList.add('active');
    document.getElementById('timerDone').classList.remove('show');
    document.getElementById('fill').style.background = '#3fb950';

    let remaining = totalSeconds;
    const pad = n => String(Math.floor(n)).padStart(2, '0');

    function tick() {
      const m = Math.floor(remaining / 60);
      const s = remaining % 60;
      document.getElementById('clock').textContent = pad(m) + ':' + pad(s);
      document.getElementById('fill').style.width =
        ((totalSeconds - remaining) / totalSeconds * 100) + '%';
      if (remaining <= 0) {
        clearInterval(timerInterval); timerInterval = null;
        document.getElementById('clock').textContent = '00:00';
        document.getElementById('fill').style.width = '100%';
        document.getElementById('fill').style.background = '#f0883e';
        document.getElementById('timerSub').textContent = '✓ time is up!';
        document.getElementById('timerDone').classList.add('show');
        resetTimerUI();
        return;
      }
      remaining--;
    }
    tick();
    timerInterval = setInterval(tick, 1000);
  }

  function stopTimer() {
    if (timerInterval) { clearInterval(timerInterval); timerInterval = null; }
    resetTimerUI();
    // reset clock to selected duration
    const pad = n => String(Math.floor(n)).padStart(2, '0');
    document.getElementById('clock').textContent = pad(selectedMinutes) + ':00';
    document.getElementById('fill').style.width = '0%';
    document.getElementById('timerSub').textContent = 'go. outside. now.';
  }

  function resetTimerUI() {
    document.getElementById('btnStart').style.display = '';
    const s = document.getElementById('btnStop');
    if (s) s.remove();
  }

  function share(platform) {
    vscode.postMessage({ command: 'share', platform });
  }
</script>
</body>
</html>`;
}
