#!/usr/bin/env python3
"""Synchronize the canonical skill from .github/skills/ to .agents/skills/.

The canonical source is:
    .github/skills/terra-nexus-content/SKILL.md

The generated copy is:
    .agents/skills/terra-nexus-content/SKILL.md

Usage:
    python scripts/sync_skills.py             # sync
    python scripts/sync_skills.py --check     # fail if copies differ
"""

from __future__ import annotations

import argparse
import sys
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parent.parent
CANONICAL = REPO_ROOT / ".github" / "skills" / "terra-nexus-content" / "SKILL.md"
GENERATED = REPO_ROOT / ".agents" / "skills" / "terra-nexus-content" / "SKILL.md"


def main() -> int:
    parser = argparse.ArgumentParser(description="Sync canonical skill to .agents/ copy.")
    parser.add_argument(
        "--check",
        action="store_true",
        help="Fail (exit 1) if copies differ without writing.",
    )
    args = parser.parse_args()

    if not CANONICAL.exists():
        print(f"Canonical skill not found: {CANONICAL}", file=sys.stderr)
        return 2

    canonical_text = CANONICAL.read_text(encoding="utf-8")

    if args.check:
        if not GENERATED.exists():
            print(f"DRIFT: {GENERATED} does not exist.", file=sys.stderr)
            return 1
        if GENERATED.read_text(encoding="utf-8") != canonical_text:
            print(f"DRIFT: {GENERATED} differs from canonical {CANONICAL}.", file=sys.stderr)
            return 1
        print("Skills are in sync.")
        return 0

    GENERATED.parent.mkdir(parents=True, exist_ok=True)
    GENERATED.write_text(canonical_text, encoding="utf-8")
    print(f"Synced {CANONICAL.relative_to(REPO_ROOT)} → {GENERATED.relative_to(REPO_ROOT)}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
