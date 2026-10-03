# CareerHQ appearance

**DeepSeaFoam** is the default dark theme. The header switch changes to **Harbor
Daylight**, its warm-paper and sea-glass light companion, with a brief sunrise or
sunset. Reduced-motion preferences suppress that animation.

The sun and moon share one compositor-friendly orbit with a 1.2-second continuous
easing curve. Reversing the switch continues from its current position rather
than restarting keyframes. Sky and stars cross-fade locally; the rest of the page
changes palette without creating hundreds of simultaneous color transitions.
The decorative daytime sky blends the heritage blue with daylight paper; the
yellow sun has a warm sunset-colored outline. Night retains the deep-water sky.

The local preference uses `careerhq.theme.v1`, separately from career workspace
data. Workspace export, import and reset do not include or change appearance.
If preference storage is unavailable, switching still works for the current tab
and the interface explains that it could not save the choice.

## Roles and integration

`src/themes.css` loads after the existing layout stylesheet. The root contract is
`html[data-theme="dark"|"light"]`; prefixed `--dsf-*` tokens supply page, surface,
paper, reading ink, headings, controls and status colors. Layout and typography
remain in `src/styles.css`. The switch owns its decorative animation separately.

Canonical solids are copied without recoloring. Dark cards use the panel role;
daylight cards use paper, distinct from structural sea-glass surfaces. Hero,
north-star and guide panels deliberately remain inverse in both modes.

Mission icons retain small canonical signal or Solarized-heritage accents.
Their chip labels use reading ink rather than assuming every hue is legible as
text. Quiet washes, grid lines and shadows are alpha/color-mix derivations, not
new canonical solids. Hover and text selection use stronger ink; filled actions
have a separate selection recipe. Errors keep readable heading ink with a rose
boundary, not opaque red fills. Keyboard focus uses the solid interaction color.
Print uses light paper and ink even when the on-screen theme is dark.

These mappings are not a blanket accessibility certification. Check actual
composited states, keyboard operation, responsive layouts and reduced motion.

## Provenance and license

- [DeepSeaFoam](https://github.com/Zanark/DeepSeaFoam):
  [dark palette](https://github.com/Zanark/DeepSeaFoam/blob/main/palette/deepseafoam.json),
  [Harbor Daylight palette](https://github.com/Zanark/DeepSeaFoam/blob/main/palette/harbor-daylight.json)
  and [light-role safeguards](https://github.com/Zanark/DeepSeaFoam/blob/main/docs/HARBOR-DAYLIGHT.md).
- Origin: [SpriteCanvas](https://github.com/Zanark/SpriteCanvas).
- Palette lineage: [Ethan Schoonover's Solarized](https://ethanschoonover.com/solarized/).
  Harbor Daylight is a companion, not an inversion or a Solarized Light import.
- The upstream [MIT notice](https://github.com/Zanark/DeepSeaFoam/blob/main/licenses/MIT.txt)
  is copied to [`public/licenses/DeepSeaFoam-MIT.txt`](../public/licenses/DeepSeaFoam-MIT.txt).

Everything needed at runtime is bundled in CareerHQ. No sibling checkout,
external fonts, images, music, network theme service or private source-document
assets are required. Theme integration does not establish GitHub Pages
deployment; repository Pages configuration remains a separate owner action.
