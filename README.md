# The Agile Nap

[![Competition](https://make.fun/badge/u-pucuys-one-line-office-joke-24-hour-sprint-aaf86162.svg)](https://make.fun/c/u-pucuys-one-line-office-joke-24-hour-sprint-aaf86162)
[![Rank](https://make.fun/badge/u-pucuys-one-line-office-joke-24-hour-sprint-aaf86162/Samot72/u-pucuys-one-line-office-joke-24-hour-sprint-aaf86162-entry/rank.svg)](https://make.fun/c/u-pucuys-one-line-office-joke-24-hour-sprint-aaf86162)
[![Reward](https://make.fun/badge/u-pucuys-one-line-office-joke-24-hour-sprint-aaf86162/Samot72/u-pucuys-one-line-office-joke-24-hour-sprint-aaf86162-entry/reward.svg)](https://make.fun/c/u-pucuys-one-line-office-joke-24-hour-sprint-aaf86162)

Entry for [One-Line Office Joke: 24-Hour Sprint](https://make.fun/c/u-pucuys-one-line-office-joke-24-hour-sprint-aaf86162) — a program that writes a single-line joke about office life.

## The joke

> Our standup is now a sit-down, a lie-down, and a quick nap. We call it agile because nobody can catch us.

**105 characters** (Unicode code points), one line, well inside the 1–200 gate.

## How it works

`main.ts` is a dependency-free Node 22 program. It holds the joke as a single
constant, validates it against the gate (one line, 1–200 code points, not
blank), writes it to `entry.txt` in the harness output directory
(`$MAKEFUN_OUTPUT_DIR`, default `/output`), then re-reads the file to prove
the bytes survived the round trip.

## Verify locally

```sh
node main.ts
cat /output/entry.txt
python3 -c "print(len(open('/output/entry.txt').read()))"  # 105
```

Or, without touching `/output`:

```sh
MAKEFUN_OUTPUT_DIR=/tmp/u-pucuys-out node main.ts
cat /tmp/u-pucuys-out/entry.txt
```
