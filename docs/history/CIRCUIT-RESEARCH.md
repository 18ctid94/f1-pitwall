# Archived circuit research
MultiViewer/FastF1 validation V1–V3 and Wikimedia discovery V6.2 are retired from active development to reduce external dependencies. Preserve prior commits. Formula 1 website asset exploration is not an active source. Native V6.1 remains active. Historical experiments do not authorize release of derived coordinates.

## Explicit removal checklist (if present)
- `.github/workflows/validate-circuit-data.yml`
- `.github/workflows/discover-circuit-references.yml`
- `scripts/validate-circuit-data.py`
- `scripts/circuit-validation-targets.json`
- `scripts/circuit-validation-baseline-v2.json`
- `scripts/CIRCUIT-VALIDATION-V3.md`
- `scripts/discover-circuit-references.py`
- `scripts/inspect_reference_svg.py`
- `scripts/circuit-reference-targets.json`
- `tools/circuit-editor/reference-registry.json`
- `tools/circuit-editor/REFERENCE-DISCOVERY.md`

Check references before deleting. Keep circuit_fit_v3.py and draft preparation scripts until dependency review of current checkout. ZIP overlay cannot delete tracked files. No automated destructive cleanup is supplied.
