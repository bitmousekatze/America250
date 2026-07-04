# AMERICA 250 🦅

A deeply patriotic, deeply satirical single-page shrine for America's 250th birthday
(July 4, 2026). Flags everywhere. Bullets raining down. The screen flashes red, white,
and blue locked to the 85 BPM of *America, F*** Yeah*, and every time the man lists
a Great American Thing, it gets stamped onto your screen like a county-fair prize hog.

## Run it

Open `index.html` in a browser and press the big gold **PRESS FOR FREEDOM** button.
(Browsers block autoplaying audio, so freedom requires one click. Ironic.)

## What's on screen

- **List 1** (McDonald's → Slavery) gets rubber-stamp cards.
- **List 2** (Starbucks → Books) gets giant tricolor lyric call-outs — no stamp
  animation. (Set `LIST2_AS_STAMPS = true` in `app.js` to bring the cards back.)
- **Lyrics** cycle at the bottom of the screen, every word colored
  white → red → blue in turn. The verse lines ship **blank on purpose** — the full
  copyrighted lyrics shouldn't live in the repo. Each blank slot in the `LYRICS`
  array in `app.js` has a comment saying which line goes there; paste them in from
  your favorite lyrics site.

## Syncing the timing (the easy way)

While the song plays, just tap:

- **M** — the instant he shouts *"McDonald's!"* → list 1 snaps to that moment
- **S** — the instant he shouts *"Starbucks!"* → list 2 (and the outro chant) snap to that moment

Both are saved in your browser (localStorage), so you only ever do it once.
`LIST2_START` starts out as an estimate (110s), so give **S** one tap on your
first playthrough.

## Fine-tuning (the nerd way)

All timing lives at the top of `app.js`: `BPM` / `BEAT_OFFSET` drive the tricolor
flash; items and lyric lines sit on the 85 BPM beat grid. While the song plays:

- **C** — toggle the timecode HUD
- **L** — log the current timestamp (on screen + console)
- **← / →** — seek 2 seconds
- **Space** — pause/play

Log timestamps with **L** and paste them into the `LYRICS` array to tighten up
any line.

## Warning

Contains flashing lights (≈1.4 Hz — below photosensitivity thresholds, and disabled
entirely under `prefers-reduced-motion`), raining ammunition, and Bed Bath & Beyond.
