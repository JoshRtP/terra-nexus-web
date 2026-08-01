"""Tests for validate_okf.py (OKF structural conformance validator)."""

from __future__ import annotations

import json
import textwrap
from pathlib import Path

import pytest

# Resolve scripts directory regardless of where pytest is run from
REPO_ROOT = Path(__file__).resolve().parent.parent
import sys
sys.path.insert(0, str(REPO_ROOT / "scripts"))

from validate_okf import validate, split_frontmatter


# ---------------------------------------------------------------------------
# split_frontmatter
# ---------------------------------------------------------------------------

def test_split_frontmatter_parses_valid():
    raw, body = split_frontmatter("---\ntype: Foo\n---\nBody text\n")
    assert raw == "type: Foo"
    assert "Body text" in body


def test_split_frontmatter_no_frontmatter():
    raw, body = split_frontmatter("No frontmatter here")
    assert raw is None
    assert "No frontmatter" in body


def test_split_frontmatter_unclosed():
    raw, body = split_frontmatter("---\ntype: Foo\n")
    assert raw is None


# ---------------------------------------------------------------------------
# validate() integration tests using tmp_path
# ---------------------------------------------------------------------------

def _write(tmp_path: Path, rel: str, content: str) -> Path:
    p = tmp_path / rel
    p.parent.mkdir(parents=True, exist_ok=True)
    p.write_text(textwrap.dedent(content), encoding="utf-8")
    return p


def test_valid_bundle(tmp_path):
    _write(tmp_path, "index.md", """\
        ---
        okf_version: "0.2"
        ---
        # Index
    """)
    _write(tmp_path, "concept.md", """\
        ---
        type: Expertise Topic
        title: Test Concept
        status: stable
        ---
        Body
    """)
    errors = validate(tmp_path)
    assert errors == []


def test_missing_root_index(tmp_path):
    errors = validate(tmp_path)
    assert any("Missing root index" in e for e in errors)


def test_missing_okf_version(tmp_path):
    _write(tmp_path, "index.md", "# No frontmatter\n")
    errors = validate(tmp_path)
    assert any("okf_version" in e for e in errors)


def test_missing_type_field(tmp_path):
    _write(tmp_path, "index.md", '---\nokf_version: "0.2"\n---\n# Index\n')
    _write(tmp_path, "no-type.md", "---\ntitle: Missing Type\n---\nBody\n")
    errors = validate(tmp_path)
    assert any("missing non-empty type field" in e for e in errors)


def test_sub_index_no_frontmatter_allowed(tmp_path):
    _write(tmp_path, "index.md", '---\nokf_version: "0.2"\n---\n# Index\n')
    _write(tmp_path, "sub/index.md", "# Sub index — no frontmatter, should be fine\n")
    errors = validate(tmp_path)
    assert errors == []


def test_sub_index_with_frontmatter_rejected(tmp_path):
    _write(tmp_path, "index.md", '---\nokf_version: "0.2"\n---\n# Index\n')
    _write(tmp_path, "sub/index.md", "---\ntype: Foo\n---\n# Sub\n")
    errors = validate(tmp_path)
    assert any("only the root index.md may have frontmatter" in e for e in errors)


def test_log_md_skipped(tmp_path):
    _write(tmp_path, "index.md", '---\nokf_version: "0.2"\n---\n# Index\n')
    _write(tmp_path, "log.md", "# Log — no frontmatter, skipped\n")
    errors = validate(tmp_path)
    assert errors == []
