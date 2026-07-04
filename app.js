/* ============================================================
   AMERICA 250 — beat engine, bullet rain, synced lyrics,
   polaroids, eagles, fighter jets, and cinema-grade sadness
   ============================================================

   TIMING — every timestamp below was extracted from Joel's
   actual mp3 with whisper.cpp (word-level transcription), so
   the sync is exact for this specific file. If you ever swap
   in a different rip, nudge GLOBAL_OFFSET.

   Structure (from the transcript):
     47.3   list 1 (McDonald's → Slavery)
     67.1   list 2 (Starbucks → Books)
     ~101   the sad slow part      → screen goes black & white
     146.8  the music kicks back   → color + shake + fireworks
   ============================================================ */

const BPM = 85;
const BEAT = 60 / BPM;            // 0.70588s
const BEAT_OFFSET = 0.0;          // time of first downbeat
const GLOBAL_OFFSET = 0.0;        // shift all act-1 cues at once

// act 2: MOONLGHT — Free Bird (the most American solo in history)
const BPM2 = 142;
const BEAT2 = 60 / BPM2;          // 0.42254s
const BEAT_OFFSET2 = 0.0;
const DROP2 = 19.9;               // bass drop (measured from the loudness curve)
const REDROP2 = 75.0;             // the cut-out at 73s slams back here
const KILO_START = 72.3;          // "THE FUCK IS A KILOMETORRRRR"
const KILO_END = 75.0;            // ...right until the bass slams back
const PRE_BEATS = 6;              // slide cadence before the drop
const POST_BEATS = 1.5;           // slide cadence after the drop (a cut every 0.63s)

const SLOW_START = 103.0;         // sad part → black & white fades in and STAYS
                                  // (color comes back when Free Bird begins)

/* ------------------------------------------------------------
   TIMELINE — { t, d, text } lyric lines.
   item: true → giant center-stage call-out.
   fy:   true → gold "FUCK YEAH!" crowd response (text ignored).
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

  // ---- list 1: item, then the crowd answers ----
  { t: 47.30, d: 1.50, text: "McDonald's 🍔",    item: true }, { t: 48.20, fy: true },
  { t: 48.90, d: 1.25, text: "Wal-Mart 🛒",      item: true }, { t: 49.60, fy: true },
  { t: 50.20, d: 1.40, text: "The Gap 👖",       item: true }, { t: 51.00, fy: true },
  { t: 51.70, d: 1.40, text: "Baseball ⚾",      item: true }, { t: 52.50, fy: true },
  { t: 53.20, d: 1.30, text: "The NFL 🏈",       item: true }, { t: 53.90, fy: true },
  { t: 54.60, d: 1.20, text: "Rock and Roll 🎸", item: true }, { t: 55.20, fy: true },
  { t: 55.90, d: 1.45, text: "The Internet 💻",  item: true }, { t: 56.60, fy: true },
  { t: 57.46, d: 1.50, text: "Slavery ⛓️",       item: true }, { t: 58.10, fy: true },
  { t: 60.10, d: 1.8,  text: "FUCK YEAH!" },

  // ---- list 2 ----
  { t: 67.10, d: 1.45, text: "Starbucks ☕",          item: true }, { t: 67.90, fy: true },
  { t: 68.60, d: 1.45, text: "Disney World 🏰",       item: true }, { t: 69.30, fy: true },
  { t: 70.10, d: 1.35, text: "Porno 🔞",              item: true }, { t: 70.80, fy: true },
  { t: 71.50, d: 1.35, text: "Valium 💊",             item: true }, { t: 72.10, fy: true },
  { t: 72.90, d: 1.35, text: "Reeboks 👟",            item: true }, { t: 73.50, fy: true },
  { t: 74.30, d: 1.35, text: "Fake Tits 🎈🎈",        item: true }, { t: 75.00, fy: true },
  { t: 75.70, d: 1.35, text: "Sushi 🍣",              item: true }, { t: 76.40, fy: true },
  { t: 77.10, d: 1.35, text: "Taco Bell 🌮",          item: true }, { t: 77.80, fy: true },
  { t: 78.50, d: 1.25, text: "Rodeos 🤠",             item: true }, { t: 79.10, fy: true },
  { t: 79.80, d: 2.30, text: "Bed Bath & Beyond 🛁",  item: true },
  { t: 80.60, fy: true }, { t: 81.10, fy: true }, { t: 81.50, fy: true },
  { t: 84.20, d: 1.35, text: "Liberty 🗽",            item: true }, { t: 84.90, fy: true },
  { t: 85.60, d: 1.55, text: "Wax Lips 👄",           item: true }, { t: 86.30, fy: true },
  { t: 87.23, d: 1.10, text: "The Alamo 🧱",          item: true }, { t: 87.70, fy: true },
  { t: 88.40, d: 1.45, text: "Band-Aids 🩹",          item: true }, { t: 89.20, fy: true },
  { t: 89.90, d: 1.35, text: "Las Vegas 🎰",          item: true }, { t: 90.60, fy: true },
  { t: 91.30, d: 1.35, text: "Christmas 🎄",          item: true }, { t: 92.00, fy: true },
  { t: 92.70, d: 1.35, text: "Immigrants 🌍",         item: true }, { t: 93.40, fy: true },
  { t: 94.10, d: 1.35, text: "Popeye 💪",             item: true }, { t: 94.90, fy: true },
  { t: 95.50, d: 1.35, text: "Democrats 🫏",          item: true }, { t: 96.20, fy: true },
  { t: 96.90, d: 1.45, text: "Republicans 🐘",        item: true }, { t: 97.70, fy: true },
  { t: 98.40, d: 1.25, text: "Sportsmanship 🤝",      item: true },
  { t: 99.70, d: 1.60, text: "Books 📚",              item: true },

  // ---- the sad slow part (black & white) ----
  { t: 103.5, d: 8.0, text: "🎸 the sad part… 🎸" },
  { t: 112.94, d: 4.0, text: "AMERICA…" },
  { t: 117.50, d: 1.0, text: "FUCK YEAH!" },
  { t: 118.60, d: 5.5, text: "Comin' again to save the motherfuckin' day, yeah" },
  { t: 124.51, d: 1.5, text: "AMERICA" },
  { t: 126.20, d: 3.3, text: "FUCK YEAH!" },
  { t: 129.90, d: 5.4, text: "Freedom is the only way, yeah" },
  { t: 135.60, d: 4.9, text: "Terrorists, your game is through" },
  { t: 140.92, d: 5.5, text: "'Cause now you have to answer to…" },

  // ---- final chorus (still black & white — the grief holds) ----
  { t: 146.80, d: 3.1, text: "AMERICA" },
  { t: 150.20, d: 2.3, text: "FUCK YEAH!" },
  { t: 152.80, d: 3.1, text: "AMERICA" },
  { t: 156.20, d: 4.5, text: "FUCK YEAH!" },
];

/* ---------- satire stock photos (all Wikimedia Commons) ---------- */
const PHOTOS = [
  ["img/eagle.jpg",         "ACTUAL FOOTAGE OF FREEDOM"],
  ["img/unclesam.jpg",      "HR DEPARTMENT"],
  ["img/delaware.jpg",      "AMERICA'S FIRST UBER"],
  ["img/moon.jpg",          "THE MOON (OURS)"],
  ["img/burger.jpg",        "HEALTH FOOD"],
  ["img/hotdog.jpg",        "VEGETABLE"],
  ["img/fireworks.jpg",     "QUIET NIGHT IN"],
  ["img/rushmore.jpg",      "THE ORIGINAL BOY BAND"],
  ["img/liberty.jpg",       "FRENCH IMPORT (WE'RE KEEPING HER)"],
  ["img/vegas.jpg",         "RETIREMENT PLAN"],
  ["img/jet.jpg",           "AIR CONDITIONING"],
  ["img/monstertruck2.jpg", "SENSIBLE COMMUTER CAR"],
  ["img/nascar2.jpg",       "LEFT TURNS ONLY"],
  ["img/tank.jpg",          "NEIGHBORHOOD WATCH"],
  ["img/carrier.jpg",       "POOL FLOATIE"],
  ["img/stealth.jpg",       "YOU CAN'T SEE THIS"],
  ["img/blueangels.jpg",    "CARPOOL LANE"],
  ["img/saturnv.jpg",       "FIREWORK (LARGE)"],
  ["img/astronaut.jpg",     "REMOTE WORKER"],
  ["img/whitehouse.jpg",    "PUBLIC HOUSING"],
  ["img/capitol.jpg",       "THE GROUP CHAT"],
  ["img/goldengate.jpg",    "BRIDGE (FREEDOM EDITION)"],
  ["img/grandcanyon.jpg",   "POTHOLE"],
  ["img/route66.jpg",       "THE COMMUTE"],
  ["img/hollywood.jpg",     "LOCAL SIGNAGE"],
  ["img/timessquare.jpg",   "QUIET STREET"],
  ["img/niagara.jpg",       "LEAKY FAUCET"],
  ["img/oldfaithful.jpg",   "SPRINKLER SYSTEM"],
  ["img/bison.jpg",         "LAWN ORNAMENTS"],
  ["img/turkey.jpg",        "ALMOST THE NATIONAL BIRD (TRUE STORY)"],
  ["img/retriever.jpg",     "GOOD BOY (VERIFIED)"],
  ["img/applepie.jpg",      "THE FOOD PYRAMID"],
  ["img/ribs.jpg",          "SALAD"],
  ["img/corndog.jpg",       "STATE FAIR CAVIAR"],
  ["img/deepdish.jpg",      "PIZZA (LEGALLY DISTINCT)"],
  ["img/donuts.jpg",        "BREAKFAST OF CHAMPIONS"],
  ["img/pancakes.jpg",      "LIGHT BREAKFAST"],
  ["img/pbj.jpg",           "NATIONAL DISH"],
  ["img/cheeseburger.jpg",  "DOCTOR RECOMMENDED"],
  ["img/pickup.jpg",        "COMPACT CAR"],
  ["img/harley.jpg",        "LIBRARY VOICE"],
  ["img/suburbs.jpg",       "CHARACTER & VARIETY"],
  ["img/elvis.jpg",         "THE KING (ONLY MONARCHY WE ACCEPT)"],
  ["img/washington.jpg",    "FOUNDING INFLUENCER"],
  ["img/lincoln.jpg",       "HONEST ABE (NO CAP)"],
  ["img/teddy.jpg",         "FIRST GYM BRO"],
  ["img/declaration.jpg",   "THE ORIGINAL TWEET"],
  ["img/ballpark.jpg",      "CHURCH"],
  ["img/thanksgiving.jpg",  "PORTION CONTROL"],
];

/* ------------------------------------------------------------
   ACT 2 MONTAGE — what has America done in 250 years?
   Shown in order, evenly spread across the Free Bird solo.
   ------------------------------------------------------------ */
const MONTAGE = [
  { year: "1776 – 2026", title: "WHAT HAS AMERICA DONE?" },   // title card
  { img: "img/declaration.jpg",  year: "1776", title: "DECLARED INDEPENDENCE" },
  { img: "img/constitution.jpg", year: "1787", title: "WROTE THE RULEBOOK FOR FREEDOM" },
  { img: "img/lincoln.jpg",      year: "1865", title: "ENDED SLAVERY" },
  { img: "img/goldenspike.jpg",  year: "1869", title: "CONNECTED THE COASTS" },
  { img: "img/oldfaithful.jpg",  year: "1872", title: "INVENTED THE NATIONAL PARK" },
  { img: "img/liberty.jpg",      year: "1886", title: "LIFTED THE TORCH" },
  { img: "img/ellis.jpg",        year: "1892", title: "WELCOMED THE WORLD" },
  { img: "img/wrightflyer.jpg",  year: "1903", title: "TAUGHT HUMANITY TO FLY" },
  { img: "img/modelt.jpg",       year: "1913", title: "PUT THE PLANET ON WHEELS" },
  { img: "img/suffrage.jpg",     year: "1920", title: "WOMEN WON THE VOTE" },
  { img: "img/armstrong.jpg",    year: "1926", title: "GAVE THE WORLD JAZZ" },
  { img: "img/goldengate.jpg",   year: "1937", title: "BUILT THE IMPOSSIBLE" },
  { img: "img/dday.jpg",         year: "1944", title: "LIBERATED A CONTINENT" },
  { img: "img/vjday.jpg",        year: "1945", title: "CAME HOME" },
  { img: "img/eniac.jpg",        year: "1946", title: "BUILT THE FIRST COMPUTER" },
  { img: "img/jackie.jpg",       year: "1947", title: "BROKE THE COLOR BARRIER" },
  { img: "img/airlift.jpg",      year: "1948", title: "FED BERLIN FROM THE SKY" },
  { img: "img/salk.jpg",         year: "1955", title: "BEAT POLIO" },
  { img: "img/elvis.jpg",        year: "1956", title: "INVENTED ROCK AND ROLL" },
  { img: "img/mlk.jpg",          year: "1963", title: "HAD A DREAM" },
  { img: "img/earthrise.jpg",    year: "1968", title: "SAW OURSELVES FROM THE MOON" },
  { img: "img/moon.jpg",         year: "1969", title: "WALKED ON IT" },
  { img: "img/arpanet.png",      year: "1969", title: "INVENTED THE INTERNET" },
  { img: "img/chip.jpg",         year: "1971", title: "PUT A COMPUTER ON A CHIP" },
  { img: "img/lunarrover.jpg",   year: "1971", title: "BROUGHT A CAR TO THE MOON" },
  { img: "img/goldenrecord.jpg", year: "1977", title: "SENT A MIXTAPE TO THE STARS" },
  { img: "img/shuttle.jpg",      year: "1981", title: "GAVE THE SPACESHIP WINGS" },
  { img: "img/reaganwall.jpg",   year: "1987", title: "“TEAR DOWN THIS WALL”" },
  { img: "img/desertstorm.jpg",  year: "1991", title: "LIBERATED KUWAIT" },
  { img: "img/hubble.jpg",       year: "1995", title: "STARED INTO CREATION" },
  { img: "img/iss.jpg",          year: "1998", title: "STARTED BUILDING A HOUSE IN SPACE" },
  { img: "img/groundzero.jpg",   year: "2001", title: "GOT KNOCKED DOWN. GOT BACK UP." },
  { img: "img/iraq.jpg",         year: "2003", title: "EXPORTED FREEDOM (REVIEWS MIXED)" },
  { img: "img/genome.jpg",       year: "2003", title: "READ OUR OWN SOURCE CODE" },
  { img: "img/iphone.jpg",       year: "2007", title: "PUT THE INTERNET IN EVERY POCKET" },
  { img: "img/obama.jpg",        year: "2008", title: "FIRST BLACK PRESIDENT" },
  { img: "img/marsrover.jpg",    year: "2012", title: "DROVE ON MARS" },
  { img: "img/falcon.jpg",       year: "2015", title: "TAUGHT ROCKETS TO LAND THEMSELVES" },
  { img: "img/fireworks.jpg",    year: "2026", title: "250 YEARS. HERE'S TO 250 MORE." },
];

/* ---------- elements ---------- */
const audio       = document.getElementById("anthem");
const audio2      = document.getElementById("anthem2");
const montageEl   = document.getElementById("montage");
const kiloEl      = document.getElementById("kilo");
const flash       = document.getElementById("flash");
const bwEl        = document.getElementById("bw");
const hero        = document.querySelector(".hero");
const startBtn    = document.getElementById("start");
const bulletLayer = document.getElementById("bullets");
const chorusZone  = document.getElementById("chorus-zone");
const lyricsEl    = document.getElementById("lyrics");
const fyEl        = document.getElementById("fy");
const photoLayer  = document.getElementById("photos");
const flyerLayer  = document.getElementById("flyers");
const hud         = document.getElementById("hud");
const hudTime     = hud.querySelector(".hud-time");
const hudLog      = hud.querySelector(".hud-log");
const rootEl      = document.documentElement;

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const isMobile = window.matchMedia("(max-width: 700px)").matches;

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
let started = false;
let act = 1;

function startShow(at = 0, whichAct = 1) {
  if (started) return;
  started = true;
  // warm the cache — at 1.5 beats per slide there's no time to fetch
  for (const s of MONTAGE) if (s.img) { const i = new Image(); i.src = s.img; }
  hero.classList.add("playing");
  if (!reducedMotion) {
    startBullets();
    startFireworks();
    startFlyers();
    if (whichAct === 1) startPhotos();
  }
  if (whichAct === 1) {
    audio.currentTime = at;
    nextEvt = EVENTS.findIndex(e => e.t >= at);
    if (nextEvt === -1) nextEvt = EVENTS.length;
    audio.play();
  } else {
    enterActTwo();
  }
  requestAnimationFrame(tick);
}

startBtn.addEventListener("click", () => startShow(0));
for (const chip of document.querySelectorAll(".chip")) {
  chip.addEventListener("click", () =>
    chip.dataset.act === "2" ? startShow(0, 2) : startShow(parseFloat(chip.dataset.t)));
}

// the repo ships without the (copyrighted) anthem — tell visitors what to do
audio.addEventListener("error", () => {
  document.querySelector(".warning").textContent =
    "⚠ ANTHEM MISSING — put your own copy of the song next to index.html, named america-fk-yeah.mp3";
});

/* ---------- main loop (both acts) ---------- */
const FLASH_COLORS = ["#B22234", "#ffffff", "#3C3B6E"];
let lastBeat = -1;
let inSadPart = false;
let dropped2 = false;
let redropped2 = false;
let kiloFired = false;

function tick() {
  const a = act === 1 ? audio : audio2;
  const beat = act === 1 ? BEAT : BEAT2;
  const beatOffset = act === 1 ? BEAT_OFFSET : BEAT_OFFSET2;
  const t = a.currentTime;

  if (act === 1) {
    // sad ending: fade to black & white, no flashing — let the nation grieve
    // all the way out. Free Bird brings the color back.
    if (!inSadPart && t >= SLOW_START + GLOBAL_OFFSET) {
      inSadPart = true;
      bwEl.classList.add("on");
      flash.style.opacity = 0;
    }
  }

  // beat-locked tricolor flash (85bpm in act 1, 142bpm in act 2;
  // paused during the sad part)
  if (!reducedMotion && !a.paused && !inSadPart) {
    const beatPos = (t - beatOffset) / beat;
    const beatIdx = Math.floor(beatPos);
    if (beatIdx !== lastBeat && beatIdx >= 0) {
      lastBeat = beatIdx;
      flash.style.background = FLASH_COLORS[beatIdx % 3];
      if (act === 2) {
        if (beatIdx % 4 === 0) launchFirework();
      } else if (beatIdx % 8 === 0) {
        launchFirework();
      }
    }
    const intoBeat = beatPos - Math.floor(beatPos);
    const peak = act === 2 ? 0.42 : 0.5;
    flash.style.opacity = Math.max(0, peak * (1 - intoBeat * 2.2));
  }

  if (act === 1) {
    // fire events (skip any we're way past, e.g. after seeking)
    while (nextEvt < EVENTS.length && t >= EVENTS[nextEvt].t) {
      if (t - EVENTS[nextEvt].t < 1.5) fireEvent(EVENTS[nextEvt]);
      nextEvt++;
    }
    // rewind support (HUD seeking)
    if (nextEvt > 0 && t < EVENTS[nextEvt - 1].t) {
      nextEvt = EVENTS.findIndex(e => e.t > t);
      if (nextEvt === -1) nextEvt = EVENTS.length;
      clearLyric();
      if (t < SLOW_START + GLOBAL_OFFSET) { inSadPart = false; bwEl.classList.remove("on"); }
    }
  } else {
    // act 2: montage cuts on the beat — 6 beats/slide until the bass drops,
    // then 3 beats/slide. Deck loops (skipping the title card) so the cuts
    // never stop until the song does.
    const preDur = PRE_BEATS * BEAT2;
    const postDur = POST_BEATS * BEAT2;
    const n = t < DROP2
      ? Math.floor(t / preDur)
      : Math.floor(DROP2 / preDur) + Math.floor((t - DROP2) / postDur);
    const idx = n < MONTAGE.length ? n : 1 + ((n - MONTAGE.length) % (MONTAGE.length - 1));
    showSlide(idx, t < DROP2 ? preDur : postDur);

    // hit the drops hard
    if (!dropped2 && t >= DROP2) { dropped2 = true; bigShake(); for (let i = 0; i < 8; i++) setTimeout(launchFirework, i * 120); }
    if (!redropped2 && t >= REDROP2) { redropped2 = true; bigShake(); jetSquadron(); for (let i = 0; i < 8; i++) setTimeout(launchFirework, i * 120); }

    // the imperial rage interlude
    const inKilo = t >= KILO_START && t < KILO_END;
    kiloEl.hidden = !inKilo;
    montageEl.style.visibility = inKilo ? "hidden" : "visible";
    if (inKilo && !kiloFired) { kiloFired = true; bigShake(); }
  }

  if (hudOpen) hudTime.textContent = t.toFixed(2);

  if (!a.ended) requestAnimationFrame(tick);
  else if (act === 1) act1Finale();
  else grandFinale();
}

function fireEvent(evt) {
  if (evt.fy) showFY();
  else showLyricLine(evt);
}

/* ---------- lyric lines / item call-outs ---------- */
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

/* ---------- crowd response ---------- */
let fyTimer = null;
function showFY() {
  fyEl.hidden = false;
  fyEl.style.animation = "none";
  void fyEl.offsetWidth;                          // restart the pop
  fyEl.style.animation = "";
  clearTimeout(fyTimer);
  fyTimer = setTimeout(() => { fyEl.hidden = true; }, 600);
}

/* ---------- screen shake ---------- */
function bigShake() {
  rootEl.classList.remove("shake-big");
  void rootEl.offsetWidth;
  rootEl.classList.add("shake-big");
}
function beatShake() {
  rootEl.classList.remove("shake-beat");
  void rootEl.offsetWidth;
  rootEl.classList.add("shake-beat");
}

/* ---------- satire polaroids (act 1 only) ---------- */
let photoBag = [];
let photoTimer = null;
function startPhotos() {
  photoTimer = setInterval(() => {
    if (audio.paused || audio.ended) return;
    if (photoLayer.childElementCount >= (isMobile ? 3 : 5)) return;
    if (photoBag.length === 0) photoBag = [...PHOTOS].sort(() => Math.random() - 0.5);
    const [src, caption] = photoBag.pop();
    const el = document.createElement("div");
    el.className = "polaroid";
    el.style.setProperty("--tilt", (Math.random() * 28 - 14).toFixed(1) + "deg");
    // narrower spawn band on phones so polaroids never hang off the edge
    el.style.left = (isMobile ? 2 + Math.random() * 50 : 3 + Math.random() * 65) + "vw";
    el.style.top = (isMobile ? 8 + Math.random() * 46 : 6 + Math.random() * 52) + "vh";
    el.innerHTML = `<img src="${src}" alt=""><div class="caption">${caption}</div>`;
    photoLayer.appendChild(el);
    setTimeout(() => el.classList.add("out"), 2900);
    setTimeout(() => el.remove(), 3250);
  }, 2100);
}

/* ---------- eagles & fighter jets ---------- */
const JET_SVG = `<svg viewBox="0 0 120 40" xmlns="http://www.w3.org/2000/svg">
  <polygon points="118,20 78,14 48,12 30,2 34,13 8,15 2,20 8,25 34,27 30,38 48,28 78,26"
    fill="#39404d" stroke="#c8cede" stroke-width="1.5"/>
  <polygon points="30,17 12,20 30,23" fill="#B22234"/>
</svg>`;

function spawnFlyer(kind, opts = {}) {
  const el = document.createElement("div");
  const rtl = opts.rtl ?? Math.random() < 0.5;
  el.className = `flyer ${kind}` + (rtl ? " rtl" : "");
  el.style.top = (opts.top ?? 8 + Math.random() * 60) + "vh";
  if (kind === "eagle") {
    el.innerHTML = `<span class="bob"><span class="flip">🦅</span></span>`;
    el.style.animationDuration = (8 + Math.random() * 5).toFixed(1) + "s";
  } else {
    el.innerHTML = `<span class="bob" style="animation-duration:0.5s">${JET_SVG}<span class="contrail"></span></span>`;
    el.style.animationDuration = (2.4 + Math.random() * 1.4).toFixed(1) + "s";
  }
  el.addEventListener("animationend", (e) => { if (e.target === el) el.remove(); });
  flyerLayer.appendChild(el);
}

function jetSquadron() {
  const top = 10 + Math.random() * 40;
  const rtl = Math.random() < 0.5;
  for (let i = 0; i < 3; i++) {
    setTimeout(() => spawnFlyer("jet", { top: top + i * 7, rtl }), i * 180);
  }
}

function startFlyers() {
  setInterval(() => {
    if (audio.paused || audio.ended) return;
    const roll = Math.random();
    if (roll < 0.5) spawnFlyer("eagle");
    else if (roll < 0.8) spawnFlyer("jet");
    else jetSquadron();
  }, 3800);
}

/* ---------- act transition + finales ---------- */
function chorusPop(text, secs, small = false) {
  const el = document.createElement("div");
  el.className = "chorus" + (small ? " chorus-small" : "");
  el.textContent = text;
  el.style.animationDuration = secs + "s";
  chorusZone.appendChild(el);
  setTimeout(() => el.remove(), secs * 1000 + 200);
}

// act 1 ends → birthday pop, then Free Bird carries us home
function act1Finale() {
  clearLyric();
  fyEl.hidden = true;
  flash.style.opacity = 0;
  chorusPop("HAPPY 250TH 🎂", 3);
  for (let i = 0; i < 10; i++) setTimeout(launchFirework, i * 250);
  setTimeout(() => {
    enterActTwo();
    requestAnimationFrame(tick);
  }, 3000);
}

function enterActTwo() {
  act = 2;
  lastBeat = -1;
  inSadPart = false;
  clearInterval(photoTimer);          // satire's over — history time
  photoLayer.innerHTML = "";
  bwEl.classList.remove("on");
  clearLyric();
  document.body.classList.add("act2");
  if (audio2.error) { grandFinale(); return; }   // no Free Bird file → wrap it up
  audio2.currentTime = 0;
  audio2.play().catch(() => grandFinale());
}

/* ---------- act 2 montage rendering ---------- */
let currentSlide = -1;
function showSlide(idx, slideDur) {
  if (idx === currentSlide) return;
  currentSlide = idx;
  const { img, year, title } = MONTAGE[idx];
  for (const old of montageEl.children) {
    old.classList.add("out");
    setTimeout(() => old.remove(), 240);
  }
  const el = document.createElement("div");
  el.className = "slide" + (img ? "" : " title-card");
  el.innerHTML =
    (img ? `<img src="${img}" alt="" style="animation-duration:${slideDur + 1}s">` : "") +
    `<div class="m-year">${year}</div>` +
    `<div class="m-title">${title}</div>`;
  montageEl.appendChild(el);
}

// the end of the whole show
function grandFinale() {
  flash.style.opacity = 0;
  chorusPop("HERE'S TO 250 MORE 🦅", 3.5, true);
  for (let i = 0; i < 14; i++) setTimeout(launchFirework, i * 220);
  jetSquadron();
  setTimeout(() => { document.getElementById("replay").hidden = false; }, 3000);
}
document.getElementById("replay").addEventListener("click", () => location.reload());

/* ---------- bullet rain ---------- */
let bulletTimer = null;
function startBullets() {
  bulletTimer = setInterval(() => {
    if (bulletLayer.childElementCount > (isMobile ? 35 : 90)) return; // cap
    const b = document.createElement("span");
    b.className = "bullet" + (Math.random() < 0.12 ? " tracer" : "");
    b.style.left = Math.random() * 100 + "vw";
    b.style.animationDuration = (0.9 + Math.random() * 1.2).toFixed(2) + "s";
    b.style.animationDelay = (Math.random() * 0.3).toFixed(2) + "s";
    b.addEventListener("animationend", () => b.remove());
    bulletLayer.appendChild(b);
  }, isMobile ? 150 : 90);
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

/* ---------- calibration HUD (press C) — drives whichever act is playing ---------- */
let hudOpen = false;
addEventListener("keydown", (e) => {
  const a = act === 1 ? audio : audio2;
  const key = e.key.toLowerCase();
  if (key === "c") {
    hudOpen = !hudOpen;
    hud.hidden = !hudOpen;
  }
  if (!hudOpen) return;
  if (key === "l") {
    const stamp = `act ${act}, t = ` + a.currentTime.toFixed(2);
    console.log(stamp);
    hudLog.textContent = stamp + "\n" + hudLog.textContent;
  }
  if (e.key === "ArrowLeft")  a.currentTime = Math.max(0, a.currentTime - 2);
  if (e.key === "ArrowRight") a.currentTime += 2;
  if (e.key === " ") {
    e.preventDefault();
    a.paused ? a.play() : a.pause();
  }
});
