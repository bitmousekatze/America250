# AMERICA 250 🦅

A deeply patriotic, deeply satirical single-page shrine for America's 250th birthday
(July 4, 2026). Flags everywhere. Bullets raining down. The screen flashes red, white,
and blue locked to the 85 BPM of *America, F*** Yeah*, and every time the man lists
a Great American Thing, it gets stamped onto your screen like a county-fair prize hog.

## Run it

1. **Bring your own anthem.** The song is copyrighted, so it's not in this repo —
   get your own copy of *America, F*** Yeah* (Team America: World Police,
   Trey Parker / Paramount) and drop it next to `index.html` named exactly
   `america-fk-yeah.mp3`. All the sync timestamps were extracted from the
   2:43 soundtrack version — other rips may need `GLOBAL_OFFSET` nudged.
2. Open `index.html` in a browser and press the big gold **PRESS FOR FREEDOM**
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
- **Eagles and fighter jets** cruise across the screen; jets sometimes fly in a
  three-ship formation with contrails.
- **The sad slow part** (103s) slow-fades the screen to black & white (3s fade)
  and stops the flashing. When the music kicks back in at **146.8s**: color snaps
  back instantly, the screen shakes, a 16-firework barrage goes off, a jet
  squadron scrambles, and fireworks launch on every beat until the end.
- **Start-menu section jumps** — chips under the big button deploy you straight
  into Verse 1, List 1, List 2, the Sad Part, or The Drop.

## How the sync works

Every timestamp in the `TIMELINE` array in `app.js` was extracted from this exact
mp3 using [whisper.cpp](https://github.com/ggml-org/whisper.cpp) with word-level
transcription — no guessing. Fun facts learned from the transcript: list 1 hits at
**47.3s**, list 2 at **67.1s** (right after it), there's a guitar solo ~100–112s,
and the slow finale chorus runs from ~113s to the end.

If you ever swap in a different rip of the song, nudge `GLOBAL_OFFSET` at the top
of `app.js` (shifts every cue at once) or re-transcribe:

```
ffmpeg -i song.mp3 -ar 16000 -ac 1 song.wav
whisper-cli -m ggml-small.en.bin -f song.wav --max-len 1 --split-on-word -oj
```

## Fine-tuning

While the song plays:

- **C** — toggle the timecode HUD
- **L** — log the current timestamp (on screen + console)
- **← / →** — seek 2 seconds
- **Space** — pause/play

Log timestamps with **L** and tweak any line in the `TIMELINE` array.

## Warning

Contains flashing lights (≈1.4 Hz — below photosensitivity thresholds, and disabled
entirely under `prefers-reduced-motion`), raining ammunition, and Bed Bath & Beyond.
