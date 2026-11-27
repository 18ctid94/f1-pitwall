# 0.4.0 stabilization QA
- Baseline: bb807761f9926fcaf6d2a1a5cc2113f5586065f4; user reported 18/18 candidate checks complete.
- Changed TS/TSX syntax and duplicate English translation keys: checked.
- Full type check and Vite build: blocked by unavailable npm registry and uncached dependencies.
- Browser and data regression: pending for this patch.
- Storage keys and circuit assets unchanged.
- Native confirmation retained; custom dialogs, toast, complete localization, legacy CSS cleanup and CI action upgrades deferred.

## 0.4.1
- Verify existing backup restore, season isolation, historical GP edits, deletion confirmation, language and mobile layout after deployment.

## 0.4.1.1
- Verify deletion of middle season preserves remaining IDs and next number.
- Verify statistics, backup restore and dialog cancellation in browser.
- Full build and browser regression pending.

## 0.4.1.2 — Career Analytics & Feedback Refinement
- Add shared SVG charts for race position, GP points, cumulative points and season totals.
- Expand deletion details and portal-based notifications.
- Preserve existing storage keys and season numbering.
- Verify build and browser regression tests before release.

## 0.4.2
- Verify both edition lists, home navigation, metadata, translations and existing records.
- Real-world metadata from supplied F1DB snapshot; game layout and lap counts not independently verified. Setup guidance is generic, not measured.


## 0.4.3
- Verify shared map, turn navigation, disabled unavailable layers, localization and career preservation.
- Annotation data and browser regression pending.
