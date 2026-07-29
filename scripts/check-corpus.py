#!/usr/bin/env python3
"""Validate the authored card corpus against the original deck metadata.

Checks that every rewritten card still matches the source deck on id/number/
name/suit/image, that every new field is populated in both languages, and that
no two cards share a meaning (the templating bug this rewrite exists to fix).

Usage: python3 scripts/check-corpus.py [suit.json ...]   (default: all)
"""
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CARDS_DIR = ROOT / "src/renderer/src/data/cards"
REFERENCE = ROOT / "tarot-json/tarot-images.json"

PREFIX = {"Major Arcana": "m", "Wands": "w", "Cups": "c", "Swords": "s", "Pentacles": "p"}
LANGS = ("zh", "en")
ORIENTATIONS = ("upright", "reversed")


def load_reference() -> dict:
    ref = {}
    for c in json.loads(REFERENCE.read_text())["cards"]:
        p = PREFIX["Major Arcana"] if c["arcana"] == "Major Arcana" else PREFIX[c["suit"]]
        ref[f"{p}{int(c['number']):02d}"] = c
    return ref


def main() -> int:
    ref = load_reference()
    files = [Path(a) for a in sys.argv[1:]] or sorted(CARDS_DIR.glob("*.json"))
    problems, meanings, total = [], {}, 0

    for path in files:
        cards = json.loads(path.read_text())
        total += len(cards)
        for c in cards:
            cid = c.get("id", "?")
            src = ref.get(cid)
            if not src:
                problems.append(f"{cid}: not in the source deck")
                continue
            if c["number"] != int(src["number"]):
                problems.append(f"{cid}.number {c['number']} != {src['number']}")
            if c["name"] != src["name"]:
                problems.append(f"{cid}.name {c['name']!r} != {src['name']!r}")
            if c["image"] != src["img"]:
                problems.append(f"{cid}.image {c['image']!r} != {src['img']!r}")

            for lang in LANGS:
                if not c.get("symbolism", {}).get(lang):
                    problems.append(f"{cid}.symbolism.{lang} empty")
            for field in ("keywords", "meaning", "watchFor"):
                for o in ORIENTATIONS:
                    for lang in LANGS:
                        if not c.get(field, {}).get(o, {}).get(lang):
                            problems.append(f"{cid}.{field}.{o}.{lang} empty")

            if c["arcana"] == "minor" and not c.get("element"):
                problems.append(f"{cid}.element missing")

            for o in ORIENTATIONS:
                for lang in LANGS:
                    text = c.get("meaning", {}).get(o, {}).get(lang)
                    if not text:
                        continue
                    if text in meanings:
                        problems.append(f"{cid}.meaning.{o}.{lang} duplicates {meanings[text]}")
                    meanings[text] = f"{cid}.{o}.{lang}"

    print(f"checked {total} cards across {len(files)} file(s)")
    if problems:
        print(f"\n{len(problems)} PROBLEM(S):")
        for p in problems:
            print(" ", p)
        return 1
    print("all checks passed")
    return 0


if __name__ == "__main__":
    sys.exit(main())
