/* ============================================================
   AMERICA 250 — beat engine, bullet rain, lyrics, item cues
   ============================================================

   TIMING — everything you'd ever tune is in this block:

   • BPM / BEAT_OFFSET drive the red/white/blue flash.
   • LIST1_START — when he shouts "McDonald's!"  (47s, per Joel)
   • LIST2_START — when he shouts "Starbucks!"   (ESTIMATE)

   LIVE TAP-SYNC (no code editing needed): while the song plays,
   press  M  the instant he says "McDonald's", or  S  the instant
   he says "Starbucks". The list snaps to that moment and the
   setting is saved in your browser (localStorage) forever.

   Items and lyric lines are spaced on the 85bpm beat grid
   (1 beat = 0.7059s).
   ============================================================ */

const BPM = 85;
const BEAT = 60 / BPM;            // 0.70588s
const BEAT_OFFSET = 0.0;          // time of first downbeat

let LIST1_START = parseFloat(localStorage.getItem("a250.list1")) || 47.0;
let LIST2_START = parseFloat(localStorage.getItem("a250.list2")) || 110.0;

const TAP_LATENCY = 0.12;         // subtracted from tap-sync to cover reaction time

// List 1 → rubber-stamp cards.  [beats after list start, label, emoji, flag]
const LIST1 = [
  [0,  "McDonald's",    "🍔"],
  [2,  "Wal-Mart",      "🛒"],
  [4,  "The Gap",       "👖"],
  [6,  "Baseball",      "⚾"],
  [8,  "The NFL",       "🏈"],
  [10, "Rock and Roll", "🎸"],
  [12, "The Internet",  "💻"],
  [14, "Slavery",       "⛓️", "awkward"],   // the song gets weird here too
];

// List 2 → tricolor lyric call-outs (no stamp animation).
// Flip LIST2_AS_STAMPS to true if you ever want the cards back.
const LIST2_AS_STAMPS = false;
const LIST2 = [
  [0,  "Starbucks",          "☕"],
  [2,  "Disney World",       "🏰"],
  [4,  "Porno",              "🔞"],
  [5,  "Valium",             "💊"],
  [6,  "Reeboks",            "👟"],
  [7,  "Fake Tits",          "🎈🎈"],
  [8,  "Sushi",              "🍣"],
  [9,  "Taco Bell",          "🌮"],
  [10, "Rodeos",             "🤠"],
  [11, "Bed Bath & Beyond",  "🛁"],
  [14, "Liberty",            "🗽"],
  [15, "Wax Lips",           "👄"],
  [16, "The Alamo",          "🧱"],
  [17, "Band-Aids",          "🩹"],
  [18, "Las Vegas",          "🎰"],
  [19, "Christmas",          "🎄"],
  [20, "Immigrants",         "🌍"],
  [21, "Popeye",             "💪"],
  [22, "Democrats",          "🫏"],
  [23, "Republicans",        "🐘"],
  [26, "Sportsmanship",      "🤝"],
  [28, "Books",              "📚"],
];

/* ------------------------------------------------------------
   LYRICS — cycling lines, words colored white/red/blue in turn.
   { t: seconds, d: seconds shown, text }
   Times are ESTIMATES — use the HUD (press C, then L) to tune.
   Lines with text: "" are skipped: those are the verse lines,
   left blank so the repo doesn't ship the full copyrighted
   lyrics — paste them in from your favorite lyrics site.
   ------------------------------------------------------------ */
const LYRICS = [
  { t: 1.0,  d: 5.5, text: "America… America…" },
  { t: 8.0,  d: 1.4, text: "AMERICA" },
  { t: 9.4,  d: 1.8, text: "FUCK YEAH!" },
  { t: 11.5, d: 3.4, text: "Comin' again to save the motherfuckin' day yeah" },
  { t: 15.2, d: 1.4, text: "AMERICA" },
  { t: 16.6, d: 1.8, text: "FUCK YEAH!" },
  { t: 18.6, d: 3.0, text: "Freedom is the only way yeah" },
  { t: 22.0, d: 3.2, text: "" },   // paste: the "terrorists" line
  { t: 25.4, d: 3.0, text: "" },   // paste: the "answer to" line
  { t: 28.6, d: 1.4, text: "AMERICA" },
  { t: 30.0, d: 1.8, text: "FUCK YEAH!" },
  { t: 32.2, d: 3.4, text: "" },   // paste: the "so lick my…" line
  { t: 35.8, d: 1.4, text: "AMERICA" },
  { t: 37.2, d: 1.8, text: "FUCK YEAH!" },
  { t: 39.4, d: 3.4, text: "" },   // paste: the "whatcha gonna do…" line
  { t: 43.0, d: 1.8, text: "" },   // paste: the "dream that we all share" line
  { t: 44.9, d: 1.9, text: "" },   // paste: the "hope for tomorrow" line
  //             ---- list 1 stamps own the screen 47–58s ----
  { t: 58.5, d: 1.6, text: "FUCK YEAH!" },
  { t: 61.0, d: 1.4, text: "AMERICA" },
  { t: 62.4, d: 1.8, text: "FUCK YEAH!" },
  { t: 64.5, d: 3.4, text: "Comin' again to save the motherfuckin' day yeah" },
  { t: 68.2, d: 1.4, text: "AMERICA" },
  { t: 69.6, d: 1.8, text: "FUCK YEAH!" },
  { t: 71.6, d: 3.0, text: "Freedom is the only way yeah" },
  { t: 75.0, d: 3.2, text: "" },   // paste: verse line
  { t: 78.4, d: 3.0, text: "" },   // paste: verse line
  { t: 81.6, d: 1.4, text: "AMERICA" },
  { t: 83.0, d: 1.8, text: "FUCK YEAH!" },
  { t: 85.2, d: 3.4, text: "" },   // paste: verse line
  { t: 88.8, d: 1.4, text: "AMERICA" },
  { t: 90.2, d: 1.8, text: "FUCK YEAH!" },
  { t: 92.5, d: 3.8, text: "" },   // paste: bridge line (the slow bit)
  { t: 96.5, d: 3.8, text: "" },   // paste: bridge line
  { t: 101.0, d: 2.0, text: "FUCK YEAH!" },
  //             ---- list 2 call-outs own the screen ----
];

// outro chant, placed relative to the end of list 2 so tap-sync moves it too
const OUTRO_YEAHS = 6;

/* ---------- elements ---------- */
const audio       = document.getElementById("anthem");
const flash       = document.getElementById("flash");
const hero        = document.querySelector(".hero");
const startBtn    = document.getElementById("start");
const bulletLayer = document.getElementById("bullets");
const stampZone   = document.getElementById("stamp-zone");
const chorusZone  = document.getElementById("chorus-zone");
const lyricsEl    = document.getElementById("lyrics");
const toastEl     = document.getElementById("toast");
const hud         = document.getElementById("hud");
const hudTime     = hud.querySelector(".hud-time");
const hudLog      = hud.querySelector(".hud-log");

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- flag marquees ---------- */
for (const line of document.querySelectorAll(".flagline")) {
  line.textContent = "🇺🇸 ".repeat(80);
}

/* ---------- event table (stamps + lyric lines, one timeline) ---------- */
let EVENTS = [];
let nextEvt = 0;

function buildEvents() {
  EVENTS = [];

  for (const { t, d, text } of LYRICS) {
    if (text) EVENTS.push({ t, d, type: "lyric", text });
  }

  for (const [b, label, emoji, flag] of LIST1) {
    EVENTS.push({ t: LIST1_START + b * BEAT, type: "stamp", label, emoji, flag });
  }

  LIST2.forEach(([b, label, emoji, flag], i) => {
    const t = LIST2_START + b * BEAT;
    if (LIST2_AS_STAMPS) {
      EVENTS.push({ t, type: "stamp", label, emoji, flag });
    } else {
      const nextB = i + 1 < LIST2.length ? LIST2[i + 1][0] : b + 2.5;
      EVENTS.push({ t, d: (nextB - b) * BEAT, type: "lyric", text: `${label} ${emoji}`, item: true });
    }
  });

  const outroStart = LIST2_START + (LIST2[LIST2.length - 1][0] + 3) * BEAT;
  for (let i = 0; i < OUTRO_YEAHS; i++) {
    EVENTS.push({ t: outroStart + i * 2 * BEAT, d: 1.3, type: "lyric", text: "FUCK YEAH!" });
  }

  EVENTS.sort((a, b) => a.t - b.t);
  nextEvt = EVENTS.findIndex(e => e.t > audio.currentTime);
  if (nextEvt === -1) nextEvt = EVENTS.length;
}
buildEvents();

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
    if (t - EVENTS[nextEvt].t < 1.5) fireEvent(EVENTS[nextEvt]);
    nextEvt++;
  }
  // rewind support (calibration seeking)
  if (nextEvt > 0 && t < EVENTS[nextEvt - 1].t) {
    nextEvt = EVENTS.findIndex(e => e.t > t);
    if (nextEvt === -1) nextEvt = EVENTS.length;
    clearLyric();
  }

  if (hudOpen) hudTime.textContent = t.toFixed(2);

  if (!audio.ended) requestAnimationFrame(tick);
  else finale();
}

function fireEvent(evt) {
  if (evt.type === "stamp") showStamp(evt);
  else showLyricLine(evt);
}

/* ---------- cycling lyric lines ---------- */
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

/* ---------- item stamps (list 1) ---------- */
function showStamp({ label, emoji, flag }) {
  const el = document.createElement("div");
  el.className = "stamp" + (flag === "awkward" ? " awkward" : "");
  el.style.setProperty("--tilt", (Math.sin(nextEvt * 7) * 8).toFixed(1) + "deg");
  el.innerHTML =
    `<div class="emoji">${emoji}</div>` +
    `<div class="label">${label}</div>` +
    `<div class="yeah">${flag === "awkward" ? "...fuck yeah?" : "FUCK YEAH!"}</div>`;
  stampZone.appendChild(el);
  setTimeout(() => el.remove(), flag === "awkward" ? 1700 : 1400);
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

/* ---------- tap-sync + toast ---------- */
function toast(msg) {
  toastEl.hidden = false;
  toastEl.textContent = msg;
  // restart the fade animation
  toastEl.style.animation = "none";
  void toastEl.offsetWidth;
  toastEl.style.animation = "";
}

function syncList(which) {
  const t = Math.max(0, audio.currentTime - TAP_LATENCY);
  if (which === 1) {
    LIST1_START = t;
    localStorage.setItem("a250.list1", t.toFixed(2));
    toast(`🍔 LIST 1 SYNCED TO ${t.toFixed(2)}s`);
  } else {
    LIST2_START = t;
    localStorage.setItem("a250.list2", t.toFixed(2));
    toast(`☕ LIST 2 SYNCED TO ${t.toFixed(2)}s`);
  }
  buildEvents();
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

/* ---------- keys: tap-sync + calibration HUD ---------- */
let hudOpen = false;
addEventListener("keydown", (e) => {
  const key = e.key.toLowerCase();

  // tap-sync works any time the song is playing, HUD open or not
  if (key === "m" && !audio.paused) return syncList(1);
  if (key === "s" && !audio.paused) return syncList(2);

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
