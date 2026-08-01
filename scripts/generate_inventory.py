#!/usr/bin/env python3
"""Generate or verify the Terra Nexus bundle inventory.

Usage:
    python scripts/generate_inventory.py knowledge                  # write inventory
    python scripts/generate_inventory.py knowledge --check          # fail if stale
    python scripts/generate_inventory.py knowledge --tree           # also write TREE.txt

Exit codes:
    0  success (or --check passed)
    1  --check failed (committed artifact is stale)
    2  usage error
"""

from __future__ import annotations

import argparse
import json
import sys
from datetime import datetime, timezone
from pathlib import Path

try:
    import yaml
except ImportError:
    yaml = None


RESERVED = {"index.md", "log.md"}


def split_frontmatter(text: str) -> tuple[dict, str]:
    if not text.startswith("---\n"):
        return {}, text
    end = text.find("\n---\n", 4)
    if end < 0:
        return {}, text
    raw = text[4:end]
    body = text[end + 5:]
    if yaml is None:
        return {}, body
    try:
        meta = yaml.safe_load(raw)
        return (meta if isinstance(meta, dict) else {}), body
    except Exception:
        return {}, body


def gather(bundle: Path) -> dict:
    concepts: list[dict] = []
    type_counts: dict[str, int] = {}
    status_counts: dict[str, int] = {}
    pub_audience_counts: dict[str, int] = {}
    pub_state_counts: dict[str, int] = {}
    confidentiality_counts: dict[str, int] = {}

    for path in sorted(bundle.rglob("*.md")):
        if path.name in RESERVED:
            continue
        text = path.read_text(encoding="utf-8")
        meta, _ = split_frontmatter(text)
        rel = path.relative_to(bundle).as_posix()
        typ = str(meta.get("type") or "").strip()
        status = str(meta.get("status") or "").strip()
        pub = meta.get("publication") or {}
        pub_audience = str(pub.get("audience") if isinstance(pub, dict) else "").strip()
        pub_state = str(pub.get("state") if isinstance(pub, dict) else "").strip()
        conf = str(meta.get("confidentiality") or "").strip()

        entry = {
            "path": rel,
            "type": typ or None,
            "title": str(meta.get("title") or "").strip() or None,
            "status": status or None,
        }
        if pub_audience:
            entry["pub_audience"] = pub_audience
        if pub_state:
            entry["pub_state"] = pub_state
        if conf:
            entry["confidentiality"] = conf
        concepts.append(entry)

        if typ:
            type_counts[typ] = type_counts.get(typ, 0) + 1
        if status:
            status_counts[status] = status_counts.get(status, 0) + 1
        if pub_audience:
            pub_audience_counts[pub_audience] = pub_audience_counts.get(pub_audience, 0) + 1
        if pub_state:
            pub_state_counts[pub_state] = pub_state_counts.get(pub_state, 0) + 1
        if conf:
            confidentiality_counts[conf] = confidentiality_counts.get(conf, 0) + 1

    return {
        "okf_version": "0.2",
        "generated_at": datetime.now(tz=timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
        "concept_count": len(concepts),
        "by_type": dict(sorted(type_counts.items())),
        "by_status": dict(sorted(status_counts.items())),
        "by_publication_audience": dict(sorted(pub_audience_counts.items())),
        "by_publication_state": dict(sorted(pub_state_counts.items())),
        "by_confidentiality": dict(sorted(confidentiality_counts.items())),
        "concepts": concepts,
    }


def build_tree(bundle: Path) -> str:
    lines = [f"{bundle.name}/"]
    def _walk(directory: Path, prefix: str) -> None:
        items = sorted(directory.iterdir(), key=lambda p: (p.is_file(), p.name))
        for i, item in enumerate(items):
            connector = "└── " if i == len(items) - 1 else "├── "
            lines.append(f"{prefix}{connector}{item.name}")
            if item.is_dir():
                extension = "    " if i == len(items) - 1 else "│   "
                _walk(item, prefix + extension)
    _walk(bundle, "")
    return "\n".join(lines) + "\n"


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Generate or verify the Terra Nexus bundle inventory."
    )
    parser.add_argument(
        "bundle",
        nargs="?",
        default="knowledge",
        help="Bundle root directory (default: knowledge)",
    )
    parser.add_argument(
        "--check",
        action="store_true",
        help="Fail (exit 1) if committed inventory is stale.",
    )
    parser.add_argument(
        "--tree",
        action="store_true",
        help="Also write/check TREE.txt.",
    )
    args = parser.parse_args()
    bundle = Path(args.bundle).resolve()
    if not bundle.is_dir():
        print(f"Bundle directory not found: {bundle}", file=sys.stderr)
        return 2

    inventory = gather(bundle)
    inventory_path = bundle / "bundle-inventory.json"
    new_json = json.dumps(inventory, indent=2, ensure_ascii=False) + "\n"

    if args.check:
        stale = False
        if not inventory_path.exists():
            print(f"STALE: {inventory_path} does not exist.", file=sys.stderr)
            stale = True
        else:
            # Compare concept list ignoring generated_at timestamp
            committed = json.loads(inventory_path.read_text(encoding="utf-8"))
            committed.pop("generated_at", None)
            fresh = json.loads(new_json)
            fresh.pop("generated_at", None)
            if committed != fresh:
                print(f"STALE: {inventory_path} is out of date — run generate_inventory.py to refresh.", file=sys.stderr)
                stale = True
        if args.tree:
            tree_path = bundle / "TREE.txt"
            new_tree = build_tree(bundle)
            if not tree_path.exists() or tree_path.read_text(encoding="utf-8") != new_tree:
                print(f"STALE: {tree_path} is out of date.", file=sys.stderr)
                stale = True
        return 1 if stale else 0

    inventory_path.write_text(new_json, encoding="utf-8")
    print(f"Wrote {inventory_path.relative_to(Path.cwd())} ({inventory['concept_count']} concepts)")

    if args.tree:
        tree_path = bundle / "TREE.txt"
        tree_path.write_text(build_tree(bundle), encoding="utf-8")
        print(f"Wrote {tree_path.relative_to(Path.cwd())}")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
