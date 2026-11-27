# PITWALL Circuit Annotation Toolkit V4

Requires existing V3 toolkit and public/circuits.json. No production files or workflow changes.

Open index.html locally and load public/circuits.json. Select GP, enter turn ID (including letter suffix), click track or label. Auto place labels is a heuristic, not a collision guarantee. Orange markers show transformed input when a local draft is imported. Review each corner against an independently permitted reference; enter notes and mark reviewed. Export remains BLOCKED. Save drafts outside the repository. Existing Bahrain production annotations remain untouched.

Optional local fit: install Python dependencies with `python -m pip install numpy==2.2.6 scipy==1.15.3`. Only if you have permission to process the provider data, obtain a permitted JSON input containing corners with number, letter and trackPosition x/y. Run from repository root:

`python scripts/prepare-circuit-draft.py --gp Australia --year 2025 --input C:/temp/permitted.json --output C:/temp/australia-draft.json --permission-confirmed`

Import the output in the editor. Do not commit input or output. No automated provider downloads, no release conversion, no official sector verification. Madrid can be edited manually. Hungary letter IDs are retained; ordering requires independent review. Drafts are keyed by GP, so keep different years in separate files.
