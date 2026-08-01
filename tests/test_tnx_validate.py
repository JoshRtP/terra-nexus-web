"""Tests for tnx_validate.py (Terra Nexus domain validator)."""

from __future__ import annotations

import textwrap
from pathlib import Path

import pytest

REPO_ROOT = Path(__file__).resolve().parent.parent
import sys
sys.path.insert(0, str(REPO_ROOT / "scripts"))

from tnx_validate import validate, validate_file


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def _write(tmp_path: Path, rel: str, content: str) -> Path:
    p = tmp_path / rel
    p.parent.mkdir(parents=True, exist_ok=True)
    p.write_text(textwrap.dedent(content), encoding="utf-8")
    return p


def _errors_for(tmp_path: Path, rel: str, content: str) -> list[str]:
    _write(tmp_path, rel, content)
    errors: list[str] = []
    validate_file(tmp_path / rel, tmp_path, errors, strict=False)
    return errors


# ---------------------------------------------------------------------------
# Status validation
# ---------------------------------------------------------------------------

def test_valid_status_stable(tmp_path):
    errors = _errors_for(tmp_path, "concept.md", """\
        ---
        type: Expertise Topic
        title: Test
        status: stable
        generated:
          by: test
          at: '2026-08-01T00:00:00Z'
        ---
        Body
    """)
    assert not any("invalid status" in e for e in errors)


def test_invalid_status_rejected(tmp_path):
    errors = _errors_for(tmp_path, "concept.md", """\
        ---
        type: Expertise Topic
        title: Test
        status: approved
        generated:
          by: test
          at: '2026-08-01T00:00:00Z'
        ---
        Body
    """)
    assert any("invalid status" in e for e in errors)


# ---------------------------------------------------------------------------
# Stable + agent-draft detection
# ---------------------------------------------------------------------------

def test_stable_with_agent_draft_flagged(tmp_path):
    errors = _errors_for(tmp_path, "concept.md", """\
        ---
        type: Expertise Topic
        title: Test
        status: stable
        generated:
          by: test
          at: '2026-08-01T00:00:00Z'
        ---
        # Section [agent-draft]
        Some content
    """)
    assert any("agent-draft" in e for e in errors)


def test_draft_with_agent_draft_ok(tmp_path):
    errors = _errors_for(tmp_path, "concept.md", """\
        ---
        type: Website Brief
        title: Test Brief
        status: draft
        generated:
          by: test
          at: '2026-08-01T00:00:00Z'
        ---
        # Section [agent-draft]
        Some content
    """)
    assert not any("agent-draft" in e for e in errors)


# ---------------------------------------------------------------------------
# Publication block
# ---------------------------------------------------------------------------

def test_public_without_approval_flagged(tmp_path):
    errors = _errors_for(tmp_path, "concept.md", """\
        ---
        type: Case Study
        title: Test
        status: draft
        generated:
          by: test
          at: '2026-08-01T00:00:00Z'
        publication:
          audience: public
          state: preview
          attribution: named
          approved_by: null
          approved_at: null
        ---
        Body
    """)
    assert any("not 'approved'" in e or "approved_by is null" in e for e in errors)


def test_deprecated_publication_status_flagged(tmp_path):
    errors = _errors_for(tmp_path, "concept.md", """\
        ---
        type: Service Offering
        title: Test
        status: draft
        generated:
          by: test
          at: '2026-08-01T00:00:00Z'
        publication_status: do-not-publish-without-review
        ---
        Body
    """)
    assert any("deprecated field 'publication_status'" in e for e in errors)


def test_deprecated_publication_permission_flagged(tmp_path):
    errors = _errors_for(tmp_path, "concept.md", """\
        ---
        type: Case Study
        title: Test
        status: draft
        generated:
          by: test
          at: '2026-08-01T00:00:00Z'
        publication_permission:
          public: false
        ---
        Body
    """)
    assert any("deprecated field 'publication_permission'" in e for e in errors)


# ---------------------------------------------------------------------------
# Timestamp validation
# ---------------------------------------------------------------------------

def test_valid_timestamp(tmp_path):
    errors = _errors_for(tmp_path, "concept.md", """\
        ---
        type: Expertise Topic
        title: Test
        status: stable
        generated:
          by: test
          at: '2026-08-01T00:00:00Z'
        ---
        Body
    """)
    assert not any("ISO 8601" in e for e in errors)


def test_invalid_timestamp_flagged(tmp_path):
    errors = _errors_for(tmp_path, "concept.md", """\
        ---
        type: Expertise Topic
        title: Test
        status: stable
        generated:
          by: test
          at: 'not-a-date'
        ---
        Body
    """)
    assert any("ISO 8601" in e for e in errors)


# ---------------------------------------------------------------------------
# Publication field values
# ---------------------------------------------------------------------------

def test_invalid_pub_audience_flagged(tmp_path):
    errors = _errors_for(tmp_path, "concept.md", """\
        ---
        type: Case Study
        title: Test
        status: draft
        generated:
          by: test
          at: '2026-08-01T00:00:00Z'
        publication:
          audience: restricted
          state: blocked
        ---
        Body
    """)
    assert any("publication.audience" in e for e in errors)


# ---------------------------------------------------------------------------
# Relationship identifiers
# ---------------------------------------------------------------------------

def test_display_name_as_related_services_flagged(tmp_path):
    errors = _errors_for(tmp_path, "concept.md", """\
        ---
        type: Website Brief
        title: Test
        status: draft
        generated:
          by: test
          at: '2026-08-01T00:00:00Z'
        related_services:
        - Carbon & Ecosystem Services
        ---
        Body
    """)
    assert any("use bundle-relative path ID" in e for e in errors)
