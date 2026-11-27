# Circuit architecture V6.3
Primary: F1DB geometry (CC BY 4.0 in supplied archive), FIA documents for reference validation. Core: existing PITWALL Native Engine V6.1 and editor. Runtime: static assets only. Keep production unchanged until accuracy, season compatibility and rights review pass.

## Offline audit
Run `python scripts/audit-f1db-assets.py /path/to/f1db-main.zip`. Standard library only. Output defaults to local-references/f1db/audit.json; do not commit local references. No asset copying or geometry generation. Use black single-path variant as candidate; preserve transforms and coordinate system when implementing sampling. Literal path equality is not rendered equivalence. FIA PDF extraction remains pending.

## Cleanup
See history/CIRCUIT-RESEARCH.md. Delete only listed obsolete files if present, using GitHub Desktop or git rm. Do not remove shared editor or native engine. Add `/local-references/` to existing .gitignore manually; do not overwrite it. Verify production build after cleanup.
