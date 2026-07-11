---
name: Task Utility System
colors:
  surface: '#f8f9ff'
  surface-dim: '#ccdbf3'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e6eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d5e3fc'
  on-surface: '#0d1c2e'
  on-surface-variant: '#464555'
  inverse-surface: '#233144'
  inverse-on-surface: '#eaf1ff'
  outline: '#777587'
  outline-variant: '#c7c4d8'
  surface-tint: '#4d44e3'
  primary: '#3525cd'
  on-primary: '#ffffff'
  primary-container: '#4f46e5'
  on-primary-container: '#dad7ff'
  inverse-primary: '#c3c0ff'
  secondary: '#4648d4'
  on-secondary: '#ffffff'
  secondary-container: '#6063ee'
  on-secondary-container: '#fffbff'
  tertiary: '#7e3000'
  on-tertiary: '#ffffff'
  tertiary-container: '#a44100'
  on-tertiary-container: '#ffd2be'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e2dfff'
  primary-fixed-dim: '#c3c0ff'
  on-primary-fixed: '#0f0069'
  on-primary-fixed-variant: '#3323cc'
  secondary-fixed: '#e1e0ff'
  secondary-fixed-dim: '#c0c1ff'
  on-secondary-fixed: '#07006c'
  on-secondary-fixed-variant: '#2f2ebe'
  tertiary-fixed: '#ffdbcc'
  tertiary-fixed-dim: '#ffb695'
  on-tertiary-fixed: '#351000'
  on-tertiary-fixed-variant: '#7b2f00'
  background: '#f8f9ff'
  on-background: '#0d1c2e'
  surface-variant: '#d5e3fc'
typography:
  headline-sm:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: -0.01em
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0em
  body-sm:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
    letterSpacing: 0em
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-xs:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.03em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 4px
  container-padding: 1.5rem
  element-gap: 0.5rem
  chip-gap: 0.25rem
  section-margin: 2rem
---

## Brand & Style

This design system is engineered for functional density and cognitive clarity. It prioritizes a **Corporate Modern** aesthetic with a lean toward **Minimalism**, stripping away decorative elements to favor high-utility task management. 

The target audience consists of power users who require a high information-to-pixel ratio without the feeling of clutter. The emotional response is one of "calm productivity"—where the interface recedes into the background, allowing the user's tasks to take center stage. The style utilizes crisp borders, systematic spacing, and subtle tonal shifts to define hierarchy rather than heavy shadows or vibrant gradients.

## Colors

The palette is anchored in a professional **Slate** scale to maintain a neutral, grounded environment. 
- **Primary (Indigo):** Used sparingly for focus states, primary actions, and active indicators to draw attention without overwhelming the eye.
- **Neutrals (Slate/Zinc):** A range of cool grays defines the structural layout. `Slate-50` for backgrounds, `Slate-200` for borders, and `Slate-600` for secondary text.
- **Semantic Colors:** Error states use a restrained red (#dc2626) that maintains the same saturation levels as the primary indigo to ensure visual harmony.

## Typography

The system utilizes **Inter** for its exceptional legibility and neutral character. 
- **Scale:** The type scale is intentionally compact. The base body size is set to 14px to maximize screen real estate while remaining accessible.
- **Labels:** Small caps or uppercase labels are used for metadata to distinguish "data" from "content."
- **Hierarchy:** Weight is used more frequently than size to denote hierarchy, keeping headers relatively close in scale to body text to maintain the "utility" feel.

## Layout & Spacing

This design system uses a **Fluid Grid** approach within constrained containers. It follows a strict 4px baseline rhythm to ensure alignment in high-density views.
- **Desktop:** A 12-column system with 16px gutters. Main utility panels should ideally span a maximum width of 1200px to maintain line-length readability.
- **Density:** Elements are packed tightly. Vertical padding in lists and chip-arrays is reduced to 4px-6px to minimize scrolling.
- **Responsiveness:** On mobile, margins shrink to 16px, and multi-column inputs stack vertically, while chip-groups transition to a flex-wrap behavior.

## Elevation & Depth

Hierarchy is achieved primarily through **Tonal Layers** and **Low-Contrast Outlines** rather than physical depth.
- **Surfaces:** The main background is a light gray (`Slate-50`), while active work surfaces (cards, input areas) are pure white.
- **Borders:** A 1px solid border (`Slate-200`) is the primary method of separation. 
- **Shadows:** Only one level of shadow is used—a "Soft Ambient" shadow (0 1px 3px rgba(0,0,0,0.05))—exclusively for floating menus or focused cards. Everything else remains flat to emphasize the tool-like nature of the interface.

## Shapes

The design system uses a **Soft** shape language. This provides a professional look that is slightly more approachable than sharp corners but avoids the "bubbly" appearance of fully rounded systems. 
- **Standard Radius:** 4px for inputs, buttons, and chips.
- **Large Radius:** 8px for containers and modals.
- **Focus Indicators:** A 2px ring offset by 1px is used to highlight focused elements, utilizing the primary Indigo color.

## Components

### Task Chips
Chips are the core unit of information. They feature a `Slate-100` background, 12px text, and a compact 4px horizontal padding. The delete action is a simple 'x' icon that appears on hover or remains visible at 40% opacity, turning red only on direct hover.

### Input Fields
Minimalist styling with a 1px `Slate-200` border. On focus, the border transitions to `Primary-Indigo` with a subtle glow. Error states replace the indigo with red and include a small descriptive label below the field in 11px semi-bold text.

### Buttons
Primary buttons use a solid Indigo background with white text. Secondary buttons are "Ghost" style with a `Slate-200` border and Slate-700 text, ensuring they do not compete with the primary task actions.

### Validation & Feedback
Inline validation is preferred over global alerts. Small, high-contrast badges or subtle tint shifts in the input background (e.g., a very faint red wash) indicate issues without disrupting the layout flow.