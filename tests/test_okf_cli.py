"""Subprocess smoke tests for the public OKF CLI interface."""

from __future__ import annotations

import subprocess
import sys
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parent.parent
CLI = REPO_ROOT / "scripts" / "okf_cli.py"


def run_cli(*arguments: str) -> subprocess.CompletedProcess[str]:
    return subprocess.run(
        [sys.executable, str(CLI), "--bundle", "knowledge", *arguments],
        cwd=REPO_ROOT,
        capture_output=True,
        text=True,
        check=False,
    )


def test_index_command_smoke():
    result = run_cli("index")
    assert result.returncode == 0, result.stderr
    assert "Terra Nexus Website Knowledge Bundle" in result.stdout


def test_find_command_smoke():
    result = run_cli("find", "regenerative agriculture")
    assert result.returncode == 0, result.stderr
    assert "expertise/regenerative-agriculture.md" in result.stdout


def test_read_command_smoke():
    result = run_cli("read", "brand/brand-platform")
    assert result.returncode == 0, result.stderr
    assert "Brand Platform" in result.stdout


def test_nonexistent_record_returns_nonzero():
    result = run_cli("read", "brand/not-a-record")
    assert result.returncode != 0
    assert "Not found:" in result.stderr
