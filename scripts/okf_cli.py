#!/usr/bin/env python3
"""OKF bundle navigator: index, find, and read operations.

Usage:
    python scripts/okf_cli.py --bundle knowledge index
    python scripts/okf_cli.py --bundle knowledge find "regenerative agriculture"
    python scripts/okf_cli.py --bundle knowledge read brand/brand-platform
"""

from __future__ import annotations

import argparse
import re
import sys
from pathlib import Path


RESERVED = {"index.md", "log.md"}


def split_frontmatter(text: str) -> tuple[dict[str, object], str]:
    """Parse the small top-level subset needed for navigation without dependencies."""
    if not text.startswith("---\n"):
        return {}, text
    end = text.find("\n---\n", 4)
    if end < 0:
        return {}, text
    raw = text[4:end]
    body = text[end + 5:]
    meta: dict[str, object] = {}
    current_key: str | None = None
    list_values: list[str] | None = None

    for line in raw.splitlines():
        if not line.strip() or line.lstrip().startswith("#"):
            continue
        if not line.startswith(" ") and ":" in line:
            key, value = line.split(":", 1)
            key = key.strip()
            value = value.strip()
            current_key = key
            list_values = None
            if not value:
                meta[key] = []
                list_values = meta[key]  # type: ignore[assignment]
            elif value.startswith("[") and value.endswith("]"):
                inner = value[1:-1].strip()
                meta[key] = [x.strip().strip("'\"") for x in inner.split(",") if x.strip()]
            else:
                meta[key] = value.strip("'\"")
        elif line.lstrip().startswith("- ") and current_key:
            if not isinstance(meta.get(current_key), list):
                meta[current_key] = []
            item = line.lstrip()[2:].strip()
            if ":" not in item:
                meta[current_key].append(item.strip("'\""))  # type: ignore[union-attr]
    return meta, body


def concept_files(root: Path) -> list[Path]:
    return sorted(
        p for p in root.rglob("*.md")
        if p.name not in RESERVED
    )


def show_index(root: Path, subpath: str | None) -> int:
    target = root / (subpath or "")
    if target.is_file():
        target = target.parent
    index = target / "index.md"
    if not index.exists():
        rel = target.relative_to(root) if target != root else Path(".")
        print(f"No index.md found at {rel}", file=sys.stderr)
        return 1
    print(index.read_text(encoding="utf-8"))
    return 0


def find(root: Path, query: str) -> int:
    terms = [t.lower() for t in re.findall(r"\w+", query)]
    results: list[tuple[int, str, str, str, str]] = []
    for p in concept_files(root):
        text = p.read_text(encoding="utf-8")
        meta, body = split_frontmatter(text)
        title = str(meta.get("title") or p.stem.replace("-", " ").title())
        desc = str(meta.get("description") or "")
        typ = str(meta.get("type") or "")
        tags = meta.get("tags") or []
        if isinstance(tags, list):
            tag_text = " ".join(str(x) for x in tags)
        else:
            tag_text = str(tags)
        haystack = f"{title}\n{desc}\n{typ}\n{tag_text}\n{body}".lower()
        score = sum(haystack.count(term) for term in terms)
        if score:
            results.append((score, str(p.relative_to(root)).replace("\\", "/"), title, typ, desc))
    results.sort(key=lambda x: (-x[0], x[1]))
    if not results:
        print("No matches.")
        return 1
    for score, path, title, typ, desc in results[:50]:
        print(f"{score:>3}  {path}\n     {title} [{typ}]\n     {desc}")
    return 0


def read(root: Path, path: str) -> int:
    p = root / path
    if p.suffix != ".md":
        p = p.with_suffix(".md")
    if not p.exists():
        rel = p.relative_to(root) if p.is_relative_to(root) else p
        print(f"Not found: {rel}", file=sys.stderr)
        return 1
    print(p.read_text(encoding="utf-8"))
    return 0


def main() -> int:
    parser = argparse.ArgumentParser(description="Navigate a Terra Nexus OKF bundle.")
    parser.add_argument(
        "--bundle",
        default="knowledge",
        help="Bundle root directory (default: knowledge)",
    )
    sub = parser.add_subparsers(dest="command", required=True)

    p_index = sub.add_parser("index", help="Print an index.md file.")
    p_index.add_argument("subpath", nargs="?", help="Optional sub-path within the bundle.")

    p_find = sub.add_parser("find", help="Ranked keyword search.")
    p_find.add_argument("query")

    p_read = sub.add_parser("read", help="Print a concept file.")
    p_read.add_argument("path", help="Bundle-relative path (without .md extension).")

    args = parser.parse_args()
    root = Path(args.bundle).resolve()
    if not root.is_dir():
        print(f"Bundle directory not found: {root}", file=sys.stderr)
        return 2

    if args.command == "index":
        return show_index(root, getattr(args, "subpath", None))
    if args.command == "find":
        return find(root, args.query)
    if args.command == "read":
        return read(root, args.path)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

from __future__ import annotations

import argparse
import re
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parent
RESERVED = {"index.md", "log.md"}


def split_frontmatter(text: str) -> tuple[dict[str, object], str]:
    """Parse the small top-level subset needed for navigation without dependencies."""
    if not text.startswith("---\n"):
        return {}, text
    end = text.find("\n---\n", 4)
    if end < 0:
        return {}, text
    raw = text[4:end]
    body = text[end + 5 :]
    meta: dict[str, object] = {}
    current_key: str | None = None
    list_values: list[str] | None = None

    for line in raw.splitlines():
        if not line.strip() or line.lstrip().startswith("#"):
            continue
        if not line.startswith(" ") and ":" in line:
            key, value = line.split(":", 1)
            key = key.strip()
            value = value.strip()
            current_key = key
            list_values = None
            if not value:
                meta[key] = []
                list_values = meta[key]  # type: ignore[assignment]
            elif value.startswith("[") and value.endswith("]"):
                inner = value[1:-1].strip()
                meta[key] = [x.strip().strip("'\"") for x in inner.split(",") if x.strip()]
            else:
                meta[key] = value.strip("'\"")
        elif line.lstrip().startswith("- ") and current_key:
            if not isinstance(meta.get(current_key), list):
                meta[current_key] = []
            item = line.lstrip()[2:].strip()
            if ":" not in item:
                meta[current_key].append(item.strip("'\""))  # type: ignore[union-attr]
    return meta, body


def concept_files() -> list[Path]:
    return sorted(
        p for p in ROOT.rglob("*.md")
        if p.name not in RESERVED
    )


def show_index(subpath: str | None) -> int:
    target = ROOT / (subpath or "")
    if target.is_file():
        target = target.parent
    index = target / "index.md"
    if not index.exists():
        print(f"No index.md found at {target.relative_to(ROOT) if target != ROOT else '.'}", file=sys.stderr)
        return 1
    print(index.read_text(encoding="utf-8"))
    return 0


def find(query: str) -> int:
    terms = [t.lower() for t in re.findall(r"\w+", query)]
    results: list[tuple[int, str, str, str, str]] = []
    for p in concept_files():
        text = p.read_text(encoding="utf-8")
        meta, body = split_frontmatter(text)
        title = str(meta.get("title") or p.stem.replace("-", " ").title())
        desc = str(meta.get("description") or "")
        typ = str(meta.get("type") or "")
        tags = meta.get("tags") or []
        if isinstance(tags, list):
            tag_text = " ".join(str(x) for x in tags)
        else:
            tag_text = str(tags)
        haystack = f"{title}\n{desc}\n{typ}\n{tag_text}\n{body}".lower()
        score = sum(haystack.count(term) for term in terms)
        if score:
            results.append((score, str(p.relative_to(ROOT)).replace("\\", "/"), title, typ, desc))
    results.sort(key=lambda x: (-x[0], x[1]))
    if not results:
        print("No matches.")
        return 1
    for score, path, title, typ, desc in results[:50]:
        print(f"{score:>3}  {path}\n     {title} [{typ}]\n     {desc}")
    return 0


def read(path: str) -> int:
    p = ROOT / path
    if p.suffix != ".md":
        p = p.with_suffix(".md")
    if not p.exists():
        print(f"Not found: {p.relative_to(ROOT) if p.is_relative_to(ROOT) else p}", file=sys.stderr)
        return 1
    print(p.read_text(encoding="utf-8"))
    return 0


def main() -> int:
    parser = argparse.ArgumentParser(description="Navigate the Terra Nexus OKF bundle.")
    sub = parser.add_subparsers(dest="command", required=True)

    p_index = sub.add_parser("index", help="Print an index.md file.")
    p_index.add_argument("subpath", nargs="?", help="Optional directory path.")

    p_find = sub.add_parser("find", help="Ranked keyword search.")
    p_find.add_argument("query")

    p_read = sub.add_parser("read", help="Print a concept document.")
    p_read.add_argument("path")

    args = parser.parse_args()
    if args.command == "index":
        return show_index(args.subpath)
    if args.command == "find":
        return find(args.query)
    if args.command == "read":
        return read(args.path)
    return 2


if __name__ == "__main__":
    raise SystemExit(main())
