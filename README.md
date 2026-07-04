# AMERICA 250 🦅

A deeply patriotic, deeply satirical single-page shrine for America's 250th birthday
(July 4, 2026). Flags everywhere. Bullets raining down. The screen flashes red, white,
and blue locked to the 85 BPM of *America, F*** Yeah*, and every time the man lists
a Great American Thing, it gets stamped onto your screen like a county-fair prize hog.

## Run it

Open `index.html` in a browser and press the big gold **PRESS FOR FREEDOM** button.
(Browsers block autoplaying audio, so freedom requires one click. Ironic.)

## Tuning the timing

All timing lives at the top of `app.js`:

| Constant | What it is |
|---|---|
| `BPM` / `BEAT_OFFSET` | Drives the tricolor flash. Nudge `BEAT_OFFSET` if the flash is early/late. |
| `LIST1_START` | When he shouts "McDonald's!" — set to **47.0s**. |
| `LIST2_START` | When he shouts "Starbucks!" — currently an **estimate (110s)**. Calibrate it! |

Items are spaced in beats after their list start, so shifting a `*_START` moves the
whole list at once.

### Calibration mode

While the song plays:

- **C** — toggle the timecode HUD
- **L** — log the current timestamp (on screen + console)
- **← / →** — seek 2 seconds
- **Space** — pause/play

Play the song, press **L** exactly when he says "Starbucks", and paste that number
into `LIST2_START`.

## Warning

Contains flashing lights (≈1.4 Hz — below photosensitivity thresholds, and disabled
entirely under `prefers-reduced-motion`), raining ammunition, and Bed Bath & Beyond.
