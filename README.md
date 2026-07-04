# AMERICA 250 🦅

A deeply patriotic, deeply satirical single-page shrine for America's 250th birthday
(July 4, 2026). Flags everywhere. Bullets raining down. The screen flashes red, white,
and blue locked to the 85 BPM of *America, F*** Yeah*, and every time the man lists
a Great American Thing, it gets stamped onto your screen like a county-fair prize hog.

## Run it
   Open `index.html` in a browser and press the big gold **PRESS FOR FREEDOM**
   button. (Browsers block autoplaying audio, so freedom requires one click.
   Ironic.)

## What's on screen

- **Lyrics** cycle at the bottom of the screen, every word colored
  white → red → blue in turn.
- **Both item lists** (McDonald's → Slavery, Starbucks → Books) appear as giant
  center-stage tricolor call-outs with emoji — and every crowd **"FUCK YEAH!"**
  response slams in below them in gold, at its exact transcribed timestamp.
- **49 satire stock photos** pop up as tilted polaroids with deadpan captions
  ("HEALTH FOOD", "POTHOLE" [the Grand Canyon], "NEIGHBORHOOD WATCH" [a tank],
  "THE ORIGINAL TWEET" [the Declaration of Independence]…). All images are
  public-domain / freely-licensed photos pulled from Wikimedia Commons into `img/`.
- **Replay button** appears after the show ends, in case freedom wasn't enough
  the first time.

## Act 2: Free Bird

When the anthem ends ("HAPPY 250TH 🎂"), the show rolls straight into
**MOONLGHT — Free Bird** (supply your own copy as `moonlght-freebird.mp3`,
also gitignored). The flash re-locks to **142 BPM**, the satire polaroids stop,
and a **"WHAT HAS AMERICA DONE?"** montage takes over: 33 slides of the real
best-of — 1776 Declaration → Wright Flyer → D-Day → Jackie Robinson → MLK →
the Moon → ARPANET → the Lunar Rover → Voyager's Golden Record → the Shuttle →
"Tear Down This Wall" → Hubble → the ISS → Mars. All images are public-domain
(NASA / National Archives / Library of Congress via Wikimedia Commons).

Beat-matched cuts, tuned to the track's measured loudness curve:
- **6 beats per slide** during the intro
- bass drops at **19.9s** → **1.5 beats per slide** (a cut every 0.63s), deck loops
- **73–75s**: the music cuts out and giant shaking red subtitles scream
  **"THE FUCK IS A KILOMETORRRRR"** until the bass slams back (shake + jets + fireworks)

There's a 🕊️ FREE BIRD chip on the start menu to jump straight to it.
- **Eagles and fighter jets** cruise across the screen; jets sometimes fly in a
  three-ship formation with contrails.
- **The sad slow ending** (103s) slow-fades the screen to black & white (3s fade)
  and stops the flashing — and it *stays* gray through the final chorus. Color
  comes roaring back when Free Bird begins.
- **Start-menu section jumps** — chips under the big button deploy you straight
  into Verse 1, List 1, List 2, the Sad Part, or 🕊️ Free Bird.

## How the sync works

Every timestamp in the `TIMELINE` array in `app.js` was extracted from this exact
mp3 using [whisper.cpp](https://github.com/ggml-org/whisper.cpp) with word-level
transcription — no guessing. Fun facts learned from the transcript: list 1 hits at
**47.3s**, list 2 at **67.1s** (right after it), there's a guitar solo ~100–112s,
and the slow finale chorus runs from ~113s to the end.

If you ever swap in a different rip of the song, nudge `GLOBAL_OFFSET` at the top
of `app.js` (shifts every cue at once) or re-transcribe:


## Warning

Contains flashing lights (≈1.4 Hz — below photosensitivity thresholds, and disabled
entirely under `prefers-reduced-motion`), raining ammunition, and Bed Bath & Beyond.
