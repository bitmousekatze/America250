/* ============================================================
   AMERICA 250 — beat engine, bullet rain, item stamps
   ============================================================

   TIMING — the only numbers you should ever need to touch:

   • BPM / BEAT_OFFSET drive the red/white/blue flash.
     If the flash feels early/late, nudge BEAT_OFFSET (seconds
     until the FIRST downbeat of the song).

   • LIST1_START is when he shouts "McDonald's!" (you said 47s).

   • LIST2_START is when he shouts "Starbucks!" — this one is an
     ESTIMATE. Press C while the song plays to open the timecode
     HUD, press L the moment he says "Starbucks", and put that
     number here.

   Items are spaced on the beat grid (85bpm → 1 beat = 0.7059s),
   each entry is [beatsAfterListStart, label, emoji].
   ============================================================ */

const BPM = 85;
const BEAT = 60 / BPM;            // 0.70588s
const BEAT_OFFSET = 0.0;          // time of first downbeat

const LIST1_START = 47.0;         // "McDonald's!"
const LIST2_START = 110.0;        // "Starbucks!"  << ESTIMATE — calibrate me (press C, then L)

// [beats after list start, label, emoji, optional flag]
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

// build one flat, sorted cue table
const CUES = [
  ...LIST1.map(([b, label, emoji, flag]) => ({ t: LIST1_START + b * BEAT, label, emoji, flag })),
  ...LIST2.map(([b, label, emoji, flag]) => ({ t: LIST2_START + b * BEAT, label, emoji, flag })),
].sort((a, b) => a.t - b.t);

/* ---------- elements ---------- */
const audio      = document.getElementById("anthem");
const flash      = document.getElementById("flash");
const hero       = document.querySelector(".hero");
const startBtn   = document.getElementById("start");
const bulletLayer = document.getElementById("bullets");
const stampZone  = document.getElementById("stamp-zone");
const chorusZone = document.getElementById("chorus-zone");
const hud        = document.getElementById("hud");
const hudTime    = hud.querySelector(".hud-time");
const hudLog     = hud.querySelector(".hud-log");

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- flag marquees ---------- */
for (const line of document.querySelectorAll(".flagline")) {
  line.textContent = "🇺🇸 ".repeat(80);
}

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

/* ---------- main loop: beat flash + cue firing ---------- */
const FLASH_COLORS = ["#B22234", "#ffffff", "#3C3B6E"];
let lastBeat = -1;
let nextCue = 0;

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

  // fire item cues
  while (nextCue < CUES.length && t >= CUES[nextCue].t) {
    // skip cues we're way past (e.g. after seeking)
    if (t - CUES[nextCue].t < 1.5) showStamp(CUES[nextCue]);
    nextCue++;
  }
  // rewind support (calibration seeking)
  if (nextCue > 0 && t < CUES[nextCue - 1].t) {
    nextCue = CUES.findIndex(c => c.t > t);
    if (nextCue === -1) nextCue = CUES.length;
  }

  if (hudOpen) hudTime.textContent = t.toFixed(2);

  if (!audio.ended) requestAnimationFrame(tick);
  else finale();
}

/* ---------- item stamps ---------- */
function showStamp({ label, emoji, flag }) {
  const el = document.createElement("div");
  el.className = "stamp" + (flag === "awkward" ? " awkward" : "");
  el.style.setProperty("--tilt", (Math.sin(nextCue * 7) * 8).toFixed(1) + "deg");
  el.innerHTML =
    `<div class="emoji">${emoji}</div>` +
    `<div class="label">${label}</div>` +
    `<div class="yeah">${flag === "awkward" ? "...fuck yeah?" : "FUCK YEAH!"}</div>`;
  stampZone.appendChild(el);
  setTimeout(() => el.remove(), flag === "awkward" ? 1700 : 1400);
}

/* ---------- finale ---------- */
function finale() {
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

/* ---------- calibration HUD ---------- */
let hudOpen = false;
addEventListener("keydown", (e) => {
  if (e.key === "c" || e.key === "C") {
    hudOpen = !hudOpen;
    hud.hidden = !hudOpen;
  }
  if (!hudOpen) return;
  if (e.key === "l" || e.key === "L") {
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
