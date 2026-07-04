/* ============================================================
   AMERICA 250 — beat engine, bullet rain, synced lyrics
   ============================================================

   TIMING — every timestamp below was extracted from Joel's
   actual mp3 with whisper.cpp (word-level transcription), so
   the sync is exact for this specific file. If you ever swap
   in a different rip of the song, re-run the transcription or
   nudge GLOBAL_OFFSET.

   • BPM / BEAT_OFFSET drive the red/white/blue flash.
   • GLOBAL_OFFSET shifts EVERY lyric/item cue at once (seconds,
     positive = later). Use the HUD (press C) to check drift.
   ============================================================ */

const BPM = 85;
const BEAT = 60 / BPM;            // 0.70588s
const BEAT_OFFSET = 0.0;          // time of first downbeat
const GLOBAL_OFFSET = 0.0;        // shift all cues at once

/* ------------------------------------------------------------
   TIMELINE — one entry per lyric line / item call-out.
   { t: start (s), d: seconds shown, text }
   item: true → giant center-stage call-out (both lists now
   use this same style).
   ------------------------------------------------------------ */
const TIMELINE = [
  { t: 0.96,  d: 2.8, text: "America…" },
  { t: 4.18,  d: 2.8, text: "America…" },
  { t: 7.93,  d: 1.0, text: "AMERICA" },
  { t: 9.03,  d: 1.6, text: "FUCK YEAH!" },
  { t: 10.83, d: 2.9, text: "Comin' again to save the motherfuckin' day, yeah" },
  { t: 13.89, d: 0.9, text: "AMERICA" },
  { t: 14.87, d: 1.5, text: "FUCK YEAH!" },
  { t: 16.55, d: 2.8, text: "Freedom is the only way, yeah" },
  { t: 19.53, d: 2.4, text: "Terrorists, your game is through" },
  { t: 22.07, d: 2.7, text: "'Cause now you have to answer to" },
  { t: 25.00, d: 0.9, text: "AMERICA" },
  { t: 26.03, d: 1.5, text: "FUCK YEAH!" },
  { t: 27.70, d: 2.7, text: "So lick my butt and suck on my balls" },
  { t: 30.62, d: 0.9, text: "AMERICA" },
  { t: 31.70, d: 1.4, text: "FUCK YEAH!" },
  { t: 33.20, d: 3.4, text: "Whatcha gonna do when we come for you now?" },
  { t: 37.20, d: 2.5, text: "It's the dream that we all share" },
  { t: 39.90, d: 2.9, text: "It's the hope for tomorrow" },
  { t: 43.20, d: 2.2, text: "FUCK YEAH!" },

  // ---- list 1 ----
  { t: 47.30, d: 1.4, text: "McDonald's 🍔",    item: true },
  { t: 48.90, d: 1.2, text: "Wal-Mart 🛒",      item: true },
  { t: 50.20, d: 1.3, text: "The Gap 👖",       item: true },
  { t: 51.70, d: 1.3, text: "Baseball ⚾",      item: true },
  { t: 53.20, d: 1.2, text: "The NFL 🏈",       item: true },
  { t: 54.60, d: 1.1, text: "Rock and Roll 🎸", item: true },
  { t: 55.90, d: 1.3, text: "The Internet 💻",  item: true },
  { t: 57.46, d: 1.3, text: "Slavery ⛓️",       item: true },
  { t: 60.10, d: 1.8, text: "FUCK YEAH!" },

  // ---- list 2 ----
  { t: 67.10, d: 1.3, text: "Starbucks ☕",          item: true },
  { t: 68.60, d: 1.3, text: "Disney World 🏰",       item: true },
  { t: 70.10, d: 1.2, text: "Porno 🔞",              item: true },
  { t: 71.50, d: 1.2, text: "Valium 💊",             item: true },
  { t: 72.90, d: 1.2, text: "Reeboks 👟",            item: true },
  { t: 74.30, d: 1.2, text: "Fake Tits 🎈🎈",        item: true },
  { t: 75.70, d: 1.2, text: "Sushi 🍣",              item: true },
  { t: 77.10, d: 1.2, text: "Taco Bell 🌮",          item: true },
  { t: 78.50, d: 1.1, text: "Rodeos 🤠",             item: true },
  { t: 79.80, d: 1.1, text: "Bed Bath & Beyond 🛁",  item: true },
  { t: 81.10, d: 1.6, text: "FUCK YEAH! FUCK YEAH!" },
  { t: 84.20, d: 1.2, text: "Liberty 🗽",            item: true },
  { t: 85.60, d: 1.4, text: "Wax Lips 👄",           item: true },
  { t: 87.23, d: 1.0, text: "The Alamo 🧱",          item: true },
  { t: 88.40, d: 1.3, text: "Band-Aids 🩹",          item: true },
  { t: 89.90, d: 1.2, text: "Las Vegas 🎰",          item: true },
  { t: 91.30, d: 1.2, text: "Christmas 🎄",          item: true },
  { t: 92.70, d: 1.2, text: "Immigrants 🌍",         item: true },
  { t: 94.10, d: 1.2, text: "Popeye 💪",             item: true },
  { t: 95.50, d: 1.2, text: "Democrats 🫏",          item: true },
  { t: 96.90, d: 1.3, text: "Republicans 🐘",        item: true },
  { t: 98.40, d: 1.1, text: "Sportsmanship 🤝",      item: true },
  { t: 99.70, d: 1.6, text: "Books 📚",              item: true },

  // ---- instrumental ----
  { t: 102.5, d: 9.0, text: "🎸 GUITAR SOLO OF FREEDOM 🎸" },

  // ---- big slow finale ----
  { t: 112.94, d: 4.0, text: "AMERICA…" },
  { t: 117.50, d: 1.0, text: "FUCK YEAH!" },
  { t: 118.60, d: 5.5, text: "Comin' again to save the motherfuckin' day, yeah" },
  { t: 124.51, d: 1.5, text: "AMERICA" },
  { t: 126.20, d: 3.3, text: "FUCK YEAH!" },
  { t: 129.90, d: 5.4, text: "Freedom is the only way, yeah" },
  { t: 135.60, d: 4.9, text: "Terrorists, your game is through" },
  { t: 140.92, d: 5.5, text: "'Cause now you have to answer to…" },
  { t: 146.80, d: 3.1, text: "AMERICA" },
  { t: 150.20, d: 2.3, text: "FUCK YEAH!" },
  { t: 152.80, d: 3.1, text: "AMERICA" },
  { t: 156.20, d: 4.5, text: "FUCK YEAH!" },
];

/* ---------- elements ---------- */
const audio       = document.getElementById("anthem");
const flash       = document.getElementById("flash");
const hero        = document.querySelector(".hero");
const startBtn    = document.getElementById("start");
const bulletLayer = document.getElementById("bullets");
const chorusZone  = document.getElementById("chorus-zone");
const lyricsEl    = document.getElementById("lyrics");
const hud         = document.getElementById("hud");
const hudTime     = hud.querySelector(".hud-time");
const hudLog      = hud.querySelector(".hud-log");

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- flag marquees ---------- */
for (const line of document.querySelectorAll(".flagline")) {
  line.textContent = "🇺🇸 ".repeat(80);
}

/* ---------- event table ---------- */
const EVENTS = TIMELINE
  .map(e => ({ ...e, t: e.t + GLOBAL_OFFSET }))
  .sort((a, b) => a.t - b.t);
let nextEvt = 0;

/* ---------- start ---------- */
startBtn.addEventListener("click", () => {
  audio.play();
  hero.classList.add("playing");
  if (!reducedMotion) {
    startBullets();
    startFireworks();
  }
  requestAnimationFrame(tick);
});

/* ---------- main loop: beat flash + event firing ---------- */
const FLASH_COLORS = ["#B22234", "#ffffff", "#3C3B6E"];
let lastBeat = -1;

function tick() {
  const t = audio.currentTime;

  // beat-locked tricolor flash
  if (!reducedMotion && !audio.paused) {
    const beatPos = (t - BEAT_OFFSET) / BEAT;
    const beatIdx = Math.floor(beatPos);
    if (beatIdx !== lastBeat && beatIdx >= 0) {
      lastBeat = beatIdx;
      flash.style.background = FLASH_COLORS[beatIdx % 3];
      if (beatIdx % 8 === 0) launchFirework();
    }
    // decay the flash across the beat
    const intoBeat = beatPos - Math.floor(beatPos);
    flash.style.opacity = Math.max(0, 0.5 * (1 - intoBeat * 2.2));
  }

  // fire events (skip any we're way past, e.g. after seeking)
  while (nextEvt < EVENTS.length && t >= EVENTS[nextEvt].t) {
    if (t - EVENTS[nextEvt].t < 1.5) showLyricLine(EVENTS[nextEvt]);
    nextEvt++;
  }
  // rewind support (HUD seeking)
  if (nextEvt > 0 && t < EVENTS[nextEvt - 1].t) {
    nextEvt = EVENTS.findIndex(e => e.t > t);
    if (nextEvt === -1) nextEvt = EVENTS.length;
    clearLyric();
  }

  if (hudOpen) hudTime.textContent = t.toFixed(2);

  if (!audio.ended) requestAnimationFrame(tick);
  else finale();
}

/* ---------- cycling lyric lines / item call-outs ---------- */
let lyricTimer = null;

function showLyricLine({ text, d, item }) {
  lyricsEl.innerHTML = "";
  lyricsEl.classList.toggle("item-line", !!item);
  text.split(/\s+/).forEach((word, i) => {
    const span = document.createElement("span");
    span.className = "lw c" + (i % 3);           // white → red → blue → repeat
    span.textContent = word;
    span.style.animationDelay = (i * 0.09).toFixed(2) + "s";
    lyricsEl.appendChild(span);
  });
  clearTimeout(lyricTimer);
  lyricTimer = setTimeout(clearLyric, (d || 2) * 1000);
}

function clearLyric() {
  lyricsEl.innerHTML = "";
  lyricsEl.classList.remove("item-line");
}

/* ---------- finale ---------- */
function finale() {
  clearLyric();
  const el = document.createElement("div");
  el.className = "chorus";
  el.textContent = "HAPPY 250TH 🎂";
  el.style.animationDuration = "3s";
  chorusZone.appendChild(el);
  flash.style.opacity = 0;
  for (let i = 0; i < 12; i++) setTimeout(launchFirework, i * 250);
}

/* ---------- bullet rain ---------- */
let bulletTimer = null;
function startBullets() {
  bulletTimer = setInterval(() => {
    if (bulletLayer.childElementCount > 90) return; // cap
    const b = document.createElement("span");
    b.className = "bullet" + (Math.random() < 0.12 ? " tracer" : "");
    b.style.left = Math.random() * 100 + "vw";
    b.style.animationDuration = (0.9 + Math.random() * 1.2).toFixed(2) + "s";
    b.style.animationDelay = (Math.random() * 0.3).toFixed(2) + "s";
    b.addEventListener("animationend", () => b.remove());
    bulletLayer.appendChild(b);
  }, 90);
}

/* ---------- fireworks (canvas particles) ---------- */
const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");
let particles = [];
let fwRunning = false;

function sizeCanvas() {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
}
addEventListener("resize", sizeCanvas);
sizeCanvas();

function launchFirework() {
  if (reducedMotion) return;
  const x = canvas.width * (0.15 + Math.random() * 0.7);
  const y = canvas.height * (0.1 + Math.random() * 0.4);
  const color = FLASH_COLORS[Math.floor(Math.random() * 3)];
  for (let i = 0; i < 42; i++) {
    const angle = (Math.PI * 2 * i) / 42;
    const speed = 2 + Math.random() * 3.5;
    particles.push({
      x, y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: 1,
      color: color === "#ffffff" ? "#FFD700" : color,
    });
  }
}

function startFireworks() {
  if (fwRunning) return;
  fwRunning = true;
  (function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles = particles.filter(p => p.life > 0);
    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.045;      // gravity
      p.life -= 0.016;
      ctx.globalAlpha = Math.max(p.life, 0);
      ctx.fillStyle = p.color;
      ctx.fillRect(p.x, p.y, 3, 3);
    }
    ctx.globalAlpha = 1;
    requestAnimationFrame(loop);
  })();
}

/* ---------- calibration HUD (press C) ---------- */
let hudOpen = false;
addEventListener("keydown", (e) => {
  const key = e.key.toLowerCase();
  if (key === "c") {
    hudOpen = !hudOpen;
    hud.hidden = !hudOpen;
  }
  if (!hudOpen) return;
  if (key === "l") {
    const stamp = "t = " + audio.currentTime.toFixed(2);
    console.log(stamp);
    hudLog.textContent = stamp + "\n" + hudLog.textContent;
  }
  if (e.key === "ArrowLeft")  audio.currentTime = Math.max(0, audio.currentTime - 2);
  if (e.key === "ArrowRight") audio.currentTime += 2;
  if (e.key === " ") {
    e.preventDefault();
    audio.paused ? audio.play() : audio.pause();
  }
});
