# QA v0.3.5
PASS: 25 original SVG layouts; 26 GP keys including Spain/Barcelona alias; every existing calendar entry covered. Single closed path, finite coordinates, 501 samples including closure, bounds 320x200, deterministic regeneration checked. TypeScript transpile syntax check passed (not full typecheck).
BLOCKED: npm dependencies unavailable in local environment (registry DNS failure); full tsc/Vite build and browser/mobile visual QA not run. GitHub Deploy PITWALL must verify build. Game-specific layouts and driver availability not independently checked. Roster includes real-season participants from supplied F1DB, including replacement drivers; default team is season-opening team where available. Existing round order retained. Diagram coordinates are not GPS or verified racing-line distances. Existing profile is treated as custom unless user selects roster; storage key unchanged. Backup before update.

## v0.3.6
- TSX syntax checked; full build and mobile visual QA pending. Circuit assets unchanged.

## v0.3.7
- 기존 서킷 데이터 및 저장 스키마 유지.
- 포인트 수동 보정은 기존 총점 덮어쓰기 의미 유지.
- 게임 내 레이아웃 및 제원 미대조. 배포 후 모바일 및 기록 편집 회귀 테스트 필요.

## v0.3.8
- PASS: TSX transpilation syntax check; existing storage key and State/Entry schema unchanged by inspection.
- BLOCKED: npm dependencies not cached; full TypeScript typecheck, Vite build and browser regression tests pending.
- Verify: existing JSON restore, 0-point vs missing result, sprint toggle, GP editor auto-save, filters, glossary search, settings navigation, circuit assets and mobile layout.
- Settings exposes only implemented categories; controller and assists remain one collapsible panel. No authentication or multi-season migration in this release.
