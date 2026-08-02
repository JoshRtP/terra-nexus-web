#!/usr/bin/env python3
"""Terra Nexus domain validator.

Enforces Terra Nexus publication, relationship, and content governance rules
beyond OKF structural conformance.

Usage:
    python scripts/tnx_validate.py knowledge
    python scripts/tnx_validate.py knowledge --strict
    python scripts/tnx_validate.py knowledge --quiet

Exit codes:
    0  all checks pass
    1  validation errors found
    2  usage or configuration error
"""

from __future__ import annotations

import argparse
import re
import sys
from pathlib import Path

try:
    import yaml
except ImportError:
    yaml = None

# ---------------------------------------------------------------------------
# Allowed-value registries (mirrors schemas/ directory values)
# ---------------------------------------------------------------------------

VALID_STATUS = {"draft", "stable", "deprecated"}

VALID_PUB_AUDIENCE = {"internal", "proposal-only", "public"}

VALID_PUB_STATE = {"blocked", "preview", "approved"}

VALID_ATTRIBUTION = {"none", "anonymized", "named"}

VALID_CONFIDENTIALITY = {"unconfirmed", "confidential", "anonymized", "public"}

VALID_ENGAGEMENT_MODELS = {"advise", "manage", "operate"}

VALID_SERVICE_FAMILIES = {
    "services/strategy-and-innovation",
    "services/financial-investments-and-new-venture-development",
    "services/sustainable-supply-chain-and-operations",
    "services/corporate-sustainability",
    "services/carbon-and-ecosystem-services",
}

VALID_EXPERTISE_TOPICS = {
    "expertise/regenerative-agriculture",
    "expertise/regenerative-rangeland",
    "expertise/agroforestry",
    "expertise/aquaculture",
    "expertise/biodiversity-and-ecosystem-resilience",
    "expertise/sustainable-supply-chains",
    "expertise/low-carbon-energy-and-biofuels",
    "expertise/purpose-driven-food-brands-and-retailers",
    "expertise/food-waste-prevention-diversion-recovery",
}

VALID_AUDIENCE_SEGMENTS = {
    "audiences/food-and-agribusiness-value-chain/inputs-companies",
    "audiences/food-and-agribusiness-value-chain/agricultural-producers-and-integrated-protein-companies",
    "audiences/food-and-agribusiness-value-chain/commodity-traders",
    "audiences/food-and-agribusiness-value-chain/ingredient-and-feed-processors",
    "audiences/food-and-agribusiness-value-chain/energy-and-biofuels-refiners",
    "audiences/food-and-agribusiness-value-chain/food-and-beverage-companies",
    "audiences/food-and-agribusiness-value-chain/food-retail-and-distribution",
    "audiences/food-and-agribusiness-value-chain/food-waste-prevention-diversion-and-recovery",
    "audiences/enabling-markets-technology-and-capital/environmental-markets-and-ecosystem-services",
    "audiences/enabling-markets-technology-and-capital/enabling-tech-and-solution-providers",
    "audiences/enabling-markets-technology-and-capital/private-equity-venture-capital-and-impact-investors",
}

CARBON_FAMILY = "services/carbon-and-ecosystem-services"

ISO_8601_RE = re.compile(
    r"^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}(?:\.\d+)?(Z|[+-]\d{2}:\d{2})?)?$"
)

RESERVED = {"index.md", "log.md"}

# Illustrative company names that must never be presented as clients.
# These are a sample from the approved audience documents.
ILLUSTRATIVE_COMPANIES = {
    "bayer", "syngenta", "corteva", "nutrien", "basf", "yara",
    "jbs", "tyson", "smithfield", "perdue", "wilmar",
    "adm", "bunge", "cargill", "viterra", "louis dreyfus", "chs",
    "ingredion", "ardent mills",
    "poet", "valero", "green plains", "neste",
    "nestlé", "nestle", "mars", "danone", "general mills", "pepsico",
    "coca-cola", "kraft heinz", "mondelez",
    "walmart", "kroger", "sysco", "aramark",
    "indigo ag", "verra", "gold standard",
}


def split_frontmatter(text: str) -> tuple[dict | None, str]:
    if not text.startswith("---\n"):
        return None, text
    end = text.find("\n---\n", 4)
    if end < 0:
        return None, text
    raw = text[4:end]
    body = text[end + 5:]
    if yaml is None:
        return {}, body
    try:
        meta = yaml.safe_load(raw)
        return (meta if isinstance(meta, dict) else {}), body
    except Exception:
        return None, body


def _str(val: object) -> str:
    return str(val) if val is not None else ""


def validate_file(path: Path, bundle: Path, errors: list[str], strict: bool) -> None:
    rel = path.relative_to(bundle).as_posix()
    text = path.read_text(encoding="utf-8")
    meta, body = split_frontmatter(text)

    if meta is None:
        # Already caught by OKF validator; skip detailed checks
        return

    status = _str(meta.get("status")).strip().lower()
    typ = _str(meta.get("type")).strip()

    # ── 1. Lifecycle status ────────────────────────────────────────────────
    if status and status not in VALID_STATUS:
        errors.append(f"{rel}: invalid status '{status}' — must be one of {sorted(VALID_STATUS)}")

    # ── 2. Publication block ───────────────────────────────────────────────
    pub = meta.get("publication") or {}
    if isinstance(pub, dict):
        aud = _str(pub.get("audience")).lower()
        state = _str(pub.get("state")).lower()
        attr = _str(pub.get("attribution")).lower()
        if aud and aud not in VALID_PUB_AUDIENCE:
            errors.append(f"{rel}: publication.audience '{aud}' invalid — must be one of {sorted(VALID_PUB_AUDIENCE)}")
        if state and state not in VALID_PUB_STATE:
            errors.append(f"{rel}: publication.state '{state}' invalid — must be one of {sorted(VALID_PUB_STATE)}")
        if attr and attr not in VALID_ATTRIBUTION:
            errors.append(f"{rel}: publication.attribution '{attr}' invalid — must be one of {sorted(VALID_ATTRIBUTION)}")
        # No public content without human approval
        if aud == "public" and state != "approved":
            errors.append(f"{rel}: publication.audience is 'public' but state is not 'approved'")
        if aud == "public" and not pub.get("approved_by"):
            errors.append(f"{rel}: publication.audience is 'public' but approved_by is null")
        # No public proof with unconfirmed confidentiality
        confidentiality = _str(meta.get("confidentiality")).lower()
        if aud == "public" and confidentiality in ("unconfirmed", ""):
            if "proof" in _str(meta.get("tags")).lower() or "qualification" in _str(meta.get("tags")).lower():
                errors.append(f"{rel}: public proof record has unconfirmed confidentiality")
    elif pub:
        errors.append(f"{rel}: publication must be a YAML mapping, got {type(pub).__name__}")

    # ── 3. Confidentiality ─────────────────────────────────────────────────
    conf = _str(meta.get("confidentiality")).lower()
    if conf and conf not in VALID_CONFIDENTIALITY:
        errors.append(f"{rel}: confidentiality '{conf}' invalid — must be one of {sorted(VALID_CONFIDENTIALITY)}")

    # ── 4. No stable concept containing [agent-draft] body sections ────────
    # Match [agent-draft] as a section heading label, not in table cells or inline code
    if status == "stable":
        # Check for [agent-draft] appearing as a heading suffix or standalone marker
        # Exclude occurrences inside backtick code spans or table cells
        agent_draft_pattern = re.compile(r"^#+.*\[agent-draft\]|\[agent-draft\]\s*$|\n\[agent-draft\]", re.MULTILINE)
        if agent_draft_pattern.search(body):
            errors.append(f"{rel}: stable concept contains [agent-draft] body sections — split into a draft brief")

    # ── 5. Carbon & Ecosystem Services gate ───────────────────────────────
    if rel.startswith("services/carbon-and-ecosystem-services/") and rel not in (
        "services/carbon-and-ecosystem-services/overview.md",
        "services/carbon-and-ecosystem-services/index.md",
    ):
        if isinstance(pub, dict):
            if pub.get("audience") == "public" and pub.get("state") == "approved":
                if not pub.get("approved_by"):
                    errors.append(f"{rel}: C&ES offering marked public/approved but approved_by is missing")
        # Warn if publication block is absent on C&ES offering files
        if not pub and strict:
            errors.append(f"{rel}: C&ES offering file missing publication block (strict mode)")

    # ── 6. Required generated provenance ──────────────────────────────────
    generated = meta.get("generated") or {}
    if isinstance(generated, dict):
        if not generated.get("by"):
            if strict:
                errors.append(f"{rel}: missing generated.by (strict mode)")
        ts = _str(generated.get("at"))
        if ts and not ISO_8601_RE.match(ts):
            errors.append(f"{rel}: generated.at '{ts}' is not a valid ISO 8601 timestamp")
    elif strict and generated:
        errors.append(f"{rel}: generated must be a YAML mapping")

    # ── 7. No illustrative company presented as a client ──────────────────
    body_lower = body.lower()
    for company in ILLUSTRATIVE_COMPANIES:
        if company in body_lower:
            # Look for client claim patterns
            context_pattern = re.compile(
                r".{0,60}" + re.escape(company) + r".{0,60}",
                re.IGNORECASE,
            )
            matches = context_pattern.findall(body)
            for m in matches:
                ml = m.lower()
                if any(kw in ml for kw in ("client", "partner", "worked with", "our work with", "engagement with")):
                    errors.append(
                        f"{rel}: possible illustrative company '{company}' presented as client — review: '{m.strip()}'"
                    )

    # ── 8. No conflicting old-style publication flags ─────────────────────
    if "publication_status" in meta:
        errors.append(
            f"{rel}: deprecated field 'publication_status' — migrate to publication: block"
        )
    if "publication_permission" in meta:
        errors.append(
            f"{rel}: deprecated field 'publication_permission' — migrate to publication: block"
        )

    # ── 9. Relationship identifiers must use concept paths not display names ──
    # Check related_services uses path slugs not display names
    for field in ("related_services", "service_family"):
        val = meta.get(field)
        if isinstance(val, list):
            for item in val:
                item_str = _str(item)
                if item_str and not item_str.startswith("services/") and "/" not in item_str:
                    errors.append(
                        f"{rel}: {field} item '{item_str}' — use bundle-relative path ID, not display name"
                    )
        elif val and isinstance(val, str):
            if not val.startswith("services/") and "/" not in val and "carbon" in val.lower():
                errors.append(
                    f"{rel}: {field} '{val}' — use bundle-relative path ID, not display name"
                )


def validate(bundle: Path, strict: bool) -> list[str]:
    errors: list[str] = []
    for path in sorted(bundle.rglob("*.md")):
        if path.name in RESERVED:
            continue
        validate_file(path, bundle, errors, strict)
    return errors


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Terra Nexus domain validator for the OKF knowledge bundle."
    )
    parser.add_argument(
        "bundle",
        nargs="?",
        default="knowledge",
        help="Bundle root directory (default: knowledge)",
    )
    parser.add_argument(
        "--strict", action="store_true", help="Enable additional advisory checks."
    )
    parser.add_argument(
        "--quiet", action="store_true", help="Suppress success message."
    )
    args = parser.parse_args()
    bundle = Path(args.bundle).resolve()
    if not bundle.is_dir():
        print(f"Bundle directory not found: {bundle}", file=sys.stderr)
        return 2
    errors = validate(bundle, args.strict)
    if errors:
        print("Terra Nexus validation failed:")
        for err in errors:
            print(f"  - {err}")
        return 1
    if not args.quiet:
        print("Terra Nexus domain validation passed.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
