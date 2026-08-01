# Terra Nexus Canonical Schema Registry

This directory contains allowed-value registries and schema definitions used
by `scripts/tnx_validate.py` and by agents when creating or editing OKF files.

These registries are the authoritative source of canonical identifiers for
relationships between concepts. Use bundle-relative path IDs (without `.md`)
as relational keys — never display names.

## Files

| File | Contents |
|---|---|
| `service-families.yml` | Canonical service family path IDs and display names |
| `expertise-topics.yml` | Canonical expertise topic path IDs and display names |
| `audience-segments.yml` | Canonical audience segment path IDs and display names |
| `engagement-models.yml` | Advise, Manage, Operate definitions |
| `proof-record-types.yml` | Allowed proof record type values |
| `publication-fields.yml` | Canonical publication block field values |
