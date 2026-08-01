#!/usr/bin/env python3
"""Validate the structural conformance of an OKF v0.2 bundle."""

from __future__ import annotations

import argparse
import sys
from pathlib import Path

try:
    import yaml
except ImportError:
    yaml = None


RESERVED = {"index.md", "log.md"}


def split_frontmatter(text: str) -> tuple[str | None, str]:
    if not text.startswith("---\n"):
        return None, text
    end = text.find("\n---\n", 4)
    if end < 0:
        return None, text
    return text[4:end], text[end + 5:]


def validate(bundle: Path) -> list[str]:
    errors: list[str] = []
    root_index = bundle / "index.md"
    if not root_index.exists():
        errors.append("Missing root index.md")
    else:
        raw, _ = split_frontmatter(root_index.read_text(encoding="utf-8"))
        if raw is None:
            errors.append("Root index.md should declare okf_version: \"0.2\"")
        elif yaml is not None:
            try:
                meta = yaml.safe_load(raw) or {}
                if str(meta.get("okf_version")) != "0.2":
                    errors.append("Root index.md does not declare okf_version: \"0.2\"")
            except Exception as exc:
                errors.append(f"Root index.md frontmatter is invalid YAML: {exc}")

    for path in sorted(bundle.rglob("*.md")):
        rel = path.relative_to(bundle).as_posix()
        text = path.read_text(encoding="utf-8")
        if path.name == "index.md":
            if path != root_index and text.startswith("---\n"):
                errors.append(f"{rel}: only the root index.md may have frontmatter")
            continue
        if path.name == "log.md":
            continue
        raw, _ = split_frontmatter(text)
        if raw is None:
            errors.append(f"{rel}: missing YAML frontmatter")
            continue
        if yaml is None:
            # Conservative fallback: verify a non-empty top-level type line.
            type_lines = [line for line in raw.splitlines() if line.startswith("type:")]
            if not type_lines or not type_lines[0].split(":", 1)[1].strip():
                errors.append(f"{rel}: missing non-empty type field")
        else:
            try:
                meta = yaml.safe_load(raw)
            except Exception as exc:
                errors.append(f"{rel}: invalid YAML frontmatter: {exc}")
                continue
            if not isinstance(meta, dict):
                errors.append(f"{rel}: frontmatter must be a YAML mapping")
                continue
            if not str(meta.get("type", "")).strip():
                errors.append(f"{rel}: missing non-empty type field")

    return errors


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("bundle", nargs="?", default=".", help="Bundle root directory")
    args = parser.parse_args()
    bundle = Path(args.bundle).resolve()
    errors = validate(bundle)
    if errors:
        print("OKF validation failed:")
        for err in errors:
            print(f"  - {err}")
        return 1
    if yaml is None:
        print("OKF structural validation passed (PyYAML not installed; YAML syntax was not fully parsed).")
    else:
        print("OKF v0.2 validation passed.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
