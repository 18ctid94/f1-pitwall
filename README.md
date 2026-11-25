# PITWALL v0.3.5
Unofficial F1 career companion. `npm install` then `npm run build`.
Static circuit assets are bundled; no Overpass request is required. To regenerate: `python3 -m pip install fonttools==4.63.0`, then `python3 scripts/build-circuits.py`.
Keep the existing GitHub Pages deployment workflow. Upload all files including hidden `.github/workflows/circuits.yml` to replace the old collector. Back up local data before updating.
See THIRD_PARTY_NOTICES.md and QA.md.
