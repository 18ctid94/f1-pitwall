# Circuit Validation Toolkit V3

Run Validate Circuit Data manually; download circuit-validation-report-v3. Existing application files are untouched. V3 refits similarity transforms against ordered correspondences, trying both handednesses and traversal directions. Candidate thresholds are heuristic, not independent corner verification. V2 aggregate baseline is included for comparison. Duplicate corner numbers remain review-only; letter counts are reported. Madrid discovery remains subject to upstream access.

## Local editor
Open tools/circuit-editor/index.html directly in a browser. Select public/circuits.json using Geometry JSON. Choose circuit, turn and mode; click map to snap track anchors or place labels. Clear selected removes a corner or selected marker; pit clear removes last point. Export/import draft JSON locally. Do not commit draft coordinates without permission and reference review. Draft format is intentionally not production schema. No provider coordinates are exported by the diagnostic workflow. Editor does not import provider data, auto-place collision-free labels, or validate official timing sectors.
