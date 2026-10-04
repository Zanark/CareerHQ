# CareerHQ appearance

**DeepSeaFoam** is the default dark theme. The header switch changes to **Harbor
Daylight**, its warm-paper and sea-glass light companion, with a brief sunrise or
sunset. Reduced-motion preferences suppress that animation.

The north-up scene uses **east on the right and west on the left**. The sun rises
from the right and sets on the left, continuing counter-clockwise over successive
days. Retargeting uses the actual current angle and the next matching phase, so
quick clicks do not restart the motion or accumulate extra revolutions.

The sun and moon share one compositor-friendly orbit with a 1.2-second easing
curve. Sky, stars and two small daytime clouds fade locally; clouds also drift
slightly. Six transform/opacity effects animate the control.
The pale-blue daytime sky, outlined yellow sun and soft daylight clouds use the
same palette lineage. Night retains the deep-water sky with clouds hidden.

The rest of the page changes through one composited opacity layer: a short
350 ms cover in the deep-water color, followed by a 1050 ms gentle reveal.
The palette switches only while fully covered, preventing a sudden light flash.
A cutout leaves the sun/cloud scene visible, and the layer does not block clicks.
Rapid requests are coalesced or queued rather than cutting a fade off abruptly.
Reduced-motion settings skip the page fade. This uses standard Web Animations,
not per-element color transitions or native snapshot transitions that block
interaction on some browsers. Tutorial exit and external preference changes
cancel any pending practice fade safely.

The local preference uses `careerhq.theme.v1`, separately from career workspace
data. Workspace export, import and reset do not include or change appearance.
Theme switches during the tutorial are temporary and do not overwrite that preference.
If preference storage is unavailable, switching still works for the current tab
and the interface explains that it could not save the choice.

## Career and life OS identity

The logo joins two rounded loops, representing career and life, around one shared
core. The wordmark keeps **CareerHQ** with the descriptor **Career & life OS**.
This is a visual identity, not a change to the available tracking tools.

[`src/assets/careerhq-mark.svg`](../src/assets/careerhq-mark.svg) is the single
editable source for navigation, safe recovery and the favicon. Vite emits a
content-hashed asset so updated tabs and the app use the same mark. Its deep-water
tile and canonical seafoam, ivory and yellow stay consistent in both themes;
the surrounding wordmark follows the current theme's heading and muted roles.

## Roles and integration

`src/themes.css` loads after the existing layout stylesheet. The root contract is
`html[data-theme="dark"|"light"]`; prefixed `--dsf-*` tokens supply page, surface,
paper, reading ink, headings, controls and status colors. Layout and typography
remain in `src/styles.css`. The switch owns its decorative animation separately.

Canonical solids are copied without recoloring. Dark cards use the panel role;
daylight cards use paper, distinct from structural sea-glass surfaces. Hero,
north-star and guide panels deliberately remain inverse in both modes.

### The full accent palette

The neutral workspace stays deep-water / warm-paper, but teal is not the only
content color. `src/accents.css` carries the palette into visible headings,
card borders, navigation identities, daily rows and roadmap stages, including
when a workspace has zero completed checkpoints.

| Content | Accent |
| --- | --- |
| System Design, overview navigation | Blue `#268BD2` |
| Architecture, recall, focus timer | Violet `#6C71C4` |
| Certifications, daily planning, encouragement | Yellow `#EBE565` |
| Opportunities | Orange `#CB4B16` |
| Service Fabric | Rose `#E84A5F` / daylight berry `#AD3E55` |
| Saved-work navigation | Magenta `#D33682` |
| DSA | Green document signal |
| AI and freelance tracks | Seafoam |

Blue, orange, violet and magenta come from DeepSeaFoam's Solarized-heritage
extension group. Colored ink is an explicit application adaptation: mix the
identity color with the current heading ink (72% accent in dark mode, 28% in
daylight). This keeps small labels readable instead of putting raw yellow or
violet text on an unsuitable background. These derived inks and 9% paper washes
are not new canonical palette solids.

Overview counters and personal-history cards have distinct accents. Full-map
stage bands aid scanning; the actual current checkpoint still has its labeled
seafoam glow, and completed states still use the green status signal. A rose
mission border is an identity, not an error. Errors retain their explicit
messages and boundaries; color never replaces a name, status label, or icon.
Primary actions, keyboard focus and tutorial glows stay seafoam for consistency.
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
