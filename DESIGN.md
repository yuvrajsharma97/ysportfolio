# Software Developer Portfolio --- Design Specification

## 0. Purpose

Build a premium, dark, editorial software-developer portfolio inspired
by the supplied visual reference.

The reference's visual language should be preserved:

-   Dark near-black canvas
-   Large editorial typography
-   Strong central hero visual
-   Thin green divider lines
-   Compact pill navigation
-   Dense but controlled composition
-   Muted technology logos
-   Small circular green arrow controls
-   High contrast between oversized typography and tiny supporting copy

Add **tasteful glassmorphism** to the navbar, cards, CTA surfaces, and
selected floating UI elements.

The result must **not** look like a generic SaaS template or a neon
cyberpunk website.

The visual identity should communicate:

> creative engineer + product builder + technically serious + premium
> personal brand

------------------------------------------------------------------------

# 1. Core Design Direction

### Keywords

`dark editorial`\
`premium developer portfolio`\
`minimal futuristic`\
`glassmorphism`\
`technical`\
`personal`\
`cinematic`\
`high contrast`\
`restrained emerald accent`

### Avoid

-   Generic SaaS layouts
-   Excessive gradients
-   Excessive glowing effects
-   Purple/blue "AI startup" aesthetics
-   Huge animated backgrounds
-   Particle spam
-   Excessive glass blur
-   Excessive rounded "bubble" UI
-   Stock photos
-   Fake statistics
-   Decorative UI with no purpose

Glassmorphism should support the visual hierarchy, not become the visual
identity by itself.

------------------------------------------------------------------------

# 2. Color System

Use CSS variables.

``` css
:root {
  --bg: #070908;
  --bg-secondary: #0a0d0c;
  --surface: rgba(16, 22, 19, 0.52);
  --surface-strong: rgba(15, 21, 18, 0.72);
  --surface-hover: rgba(22, 31, 26, 0.68);

  --border: rgba(71, 125, 101, 0.28);
  --border-strong: rgba(65, 205, 135, 0.42);

  --green: #00d968;
  --green-bright: #18f078;
  --green-muted: #1d7650;

  --text: #f1f4f2;
  --text-secondary: #a4aca7;
  --text-muted: #68716c;

  --shadow: rgba(0, 0, 0, 0.42);
}
```

### Color proportions

-   85--90% dark background/surfaces
-   7--10% white/gray typography
-   2--5% green accent

Green must remain an accent.

------------------------------------------------------------------------

# 3. Glassmorphism System

Glassmorphism is required for:

-   Navbar
-   Navigation pills
-   Project cards
-   Capability cards
-   Floating technology panels
-   CTA button/surface
-   Optional floating hero metadata

Do **not** make every element glass.

## Base glass style

``` css
.glass {
  background: rgba(14, 20, 17, 0.48);
  border: 1px solid rgba(101, 151, 126, 0.20);
  backdrop-filter: blur(18px) saturate(125%);
  -webkit-backdrop-filter: blur(18px) saturate(125%);
  box-shadow:
    0 18px 50px rgba(0, 0, 0, 0.24),
    inset 0 1px 0 rgba(255, 255, 255, 0.035);
}
```

## Strong glass

For navbar and important floating elements:

``` css
.glass-strong {
  background: rgba(11, 16, 14, 0.68);
  border: 1px solid rgba(101, 151, 126, 0.25);
  backdrop-filter: blur(24px) saturate(135%);
  -webkit-backdrop-filter: blur(24px) saturate(135%);
}
```

## Glass rules

1.  Keep backgrounds dark enough for text readability.
2.  Use blur between 14px and 28px.
3.  Use subtle borders rather than bright outlines.
4.  Never use a giant white glass highlight.
5.  Avoid excessive transparency over busy imagery.
6.  Green glow should appear only near important interactive states.
7.  Use `overflow: hidden` where inner gradients/noise are needed.
8.  Provide a fallback solid background if `backdrop-filter` is
    unavailable.

------------------------------------------------------------------------

# 4. Typography

Recommended:

-   Headings: **Manrope** or **Satoshi**
-   Body: **Inter**
-   Technical labels/code: **JetBrains Mono**

## Type hierarchy

``` text
Hero eyebrow:
12–14px
uppercase
letter-spacing: 0.28em

Hero title:
clamp(72px, 12vw, 170px)
font-weight: 400
line-height: 0.82–0.9
letter-spacing: -0.07em

Section heading:
36–52px
font-weight: 400
letter-spacing: -0.04em

Project title:
18–22px

Body:
14–16px
line-height: 1.55

Metadata:
10–12px
uppercase
letter-spacing: 0.12em

Code/stack labels:
11–13px
JetBrains Mono
```

Typography should feel oversized and editorial.

Do not use heavy bold typography everywhere.

------------------------------------------------------------------------

# 5. Global Layout

Maximum content width:

``` text
1200–1280px
```

Desktop horizontal padding:

``` text
32–48px
```

Mobile horizontal padding:

``` text
20–24px
```

Major section spacing:

``` text
120–180px desktop
80–110px mobile
```

Use an 8px spacing system:

``` text
8 / 16 / 24 / 32 / 48 / 64 / 96 / 128 / 160
```

------------------------------------------------------------------------

# 6. Background

The background should feel almost black but have subtle depth.

Base:

``` css
body {
  background: #070908;
  color: var(--text);
}
```

Add extremely subtle radial green lighting behind the hero:

``` css
.hero::before {
  content: "";
  position: absolute;
  inset: -20%;
  background:
    radial-gradient(
      circle at 50% 35%,
      rgba(0, 217, 104, 0.055),
      transparent 34%
    );
  pointer-events: none;
}
```

Add optional subtle grain at approximately 2--4% opacity.

Do not make the texture obvious.

------------------------------------------------------------------------

# 7. Navigation

The navigation should float above the page rather than behaving like a
standard website header.

## Desktop composition

``` text
[ → View Work ]       [ ⌘ Stack ]       [ ✓ Contact ]
```

Use a centered or wide floating navbar.

Recommended:

``` css
.navbar {
  position: fixed;
  top: 24px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;

  display: flex;
  align-items: center;
  gap: 10px;

  padding: 7px;

  border-radius: 999px;

  background: rgba(9, 13, 11, 0.62);
  border: 1px solid rgba(83, 139, 111, 0.25);

  backdrop-filter: blur(24px) saturate(140%);
  -webkit-backdrop-filter: blur(24px) saturate(140%);

  box-shadow:
    0 16px 50px rgba(0, 0, 0, 0.35),
    inset 0 1px 0 rgba(255, 255, 255, 0.04);
}
```

Each navigation item:

``` text
height: 40–44px
padding: 0 14–18px
border-radius: 999px
```

Use a small green circular icon.

Example:

``` text
(→) View Work
(⌘) Stack
(✓) Contact
```

The green circle should be approximately 22--26px.

### Hover

-   Slightly brighter glass
-   Border becomes greener
-   Icon moves 2--4px
-   Very subtle green glow

Do not use aggressive scaling.

------------------------------------------------------------------------

# 8. Hero Section

The hero is the visual centerpiece.

Use a three-part composition:

``` text
LEFT                    CENTER                 RIGHT

SOFTWARE                [3D DEVELOPER]         Hi, I'm Alex.
ENGINEER                [    AVATAR    ]       I build...
```

On desktop:

-   Left: 25%
-   Center: 45--50%
-   Right: 25--30%

On mobile, stack vertically.

------------------------------------------------------------------------

# 9. Hero Left Content

Use:

``` text
SOFTWARE
ENGINEER
```

Optional secondary line:

``` text
FULL-STACK DEVELOPER
```

Style:

-   Small-to-medium editorial typography
-   Thin green horizontal line above or beside it
-   Large vertical breathing room

Do not make the left label compete with the name.

------------------------------------------------------------------------

# 10. Hero Visual

Use a stylized 3D developer avatar or premium abstract technical
character.

Visual direction:

-   Dark skin/clothing if using a person
-   Cinematic lighting
-   Dark neutral clothing
-   Subtle green rim light
-   Semi-realistic 3D illustration
-   Head-and-shoulders framing
-   No exaggerated cyberpunk armor
-   No floating code everywhere

The visual should feel like a personal brand asset.

Place the visual slightly behind the oversized name.

------------------------------------------------------------------------

# 11. Hero Right Content

Example:

``` text
Hi, I'm Alex.

I'm a software engineer and product
builder focused on creating scalable
web applications, useful developer
tools and thoughtful digital products.
```

Keep this around 13--16px.

Maximum width:

``` text
250–300px
```

Use `text-secondary`.

------------------------------------------------------------------------

# 12. Developer Name

This is one of the most important elements.

Example:

``` text
ALEX
MORGAN
```

or:

``` text
ALEX MORGAN
```

Use very large thin typography.

Recommended:

``` css
.hero-name {
  font-size: clamp(76px, 13vw, 175px);
  font-weight: 400;
  line-height: 0.82;
  letter-spacing: -0.075em;
}
```

The name may overlap the lower portion of the avatar.

Use a subtle gradient from white/gray into muted gray.

Do not make the name neon green.

------------------------------------------------------------------------

# 13. Technology Strip

Under the hero name, create a horizontal muted technology strip.

Example:

``` text
React   Next.js   TypeScript   Node.js   PostgreSQL   Docker   AWS   Git
```

Technology logos should initially be muted:

``` text
opacity: 0.25–0.45
filter: grayscale(1)
```

On hover:

``` text
opacity: 1
filter: grayscale(0)
```

Avoid colorful logo spam.

------------------------------------------------------------------------

# 14. Intro Statement

Create a large editorial statement.

Example:

> Building thoughtful software that solves real problems, scales
> cleanly, and feels great to use.

Structure:

``` text
──────────────

Building thoughtful software that solves
real problems, scales cleanly, and feels
great to use.

Small supporting paragraph...
```

Use a thin green divider approximately 110--150px wide.

Supporting text should be small.

------------------------------------------------------------------------

# 15. Selected Work

Section label:

``` text
──────────────
SELECTED WORK
```

Then a grid of project cards.

Recommended desktop:

``` text
3 columns
```

Tablet:

``` text
2 columns
```

Mobile:

``` text
1 column
```

------------------------------------------------------------------------

# 16. Project Card Glassmorphism

Project cards must be glass, but the project screenshot should remain
the dominant visual.

``` css
.project-card {
  position: relative;
  overflow: hidden;

  background: rgba(13, 19, 16, 0.46);
  border: 1px solid rgba(95, 147, 119, 0.22);
  border-radius: 10px;

  backdrop-filter: blur(18px) saturate(125%);
  -webkit-backdrop-filter: blur(18px) saturate(125%);

  box-shadow:
    0 20px 60px rgba(0, 0, 0, 0.24),
    inset 0 1px 0 rgba(255, 255, 255, 0.035);

  transition:
    transform 300ms ease,
    border-color 300ms ease,
    background 300ms ease;
}
```

Hover:

``` css
.project-card:hover {
  transform: translateY(-4px);
  border-color: rgba(0, 217, 104, 0.38);
  background: rgba(17, 25, 21, 0.58);
}
```

Do not lift cards more than approximately 4--6px.

------------------------------------------------------------------------

# 17. Project Card Structure

``` text
┌─────────────────────────────────────┐
│                                     │
│        PRODUCT SCREENSHOT           │
│                                     │
│                                     │
├─────────────────────────────────────┤
│ FINTECH PLATFORM                 ↗  │
│ Real-time financial dashboard       │
│                                     │
│ Next.js · TypeScript · PostgreSQL   │
└─────────────────────────────────────┘
```

Image area:

``` text
aspect-ratio: 16 / 10
```

Use slightly desaturated screenshots.

Add a subtle dark gradient at the bottom of the image.

------------------------------------------------------------------------

# 18. Project Data

Each project should communicate:

1.  Project name
2.  Category
3.  One-sentence problem/description
4.  Technology stack
5.  Link
6.  Optional measurable result

Example:

``` text
Pulse Analytics

SaaS / FULL-STACK

Analytics platform for monitoring product
usage and customer behavior.

Next.js · TypeScript · PostgreSQL · Redis

→ View case study
```

Do not invent metrics.

Only show real outcomes.

------------------------------------------------------------------------

# 19. What I Build

Section:

``` text
──────────────
WHAT I BUILD
```

Use six compact glass cards:

``` text
FULL-STACK APPLICATIONS       →
BACKEND SYSTEMS               →
AI-POWERED PRODUCTS           →
DEVELOPER TOOLS               →
MOBILE APPLICATIONS           →
CLOUD & INFRASTRUCTURE        →
```

Each card should include:

-   Small icon
-   Category
-   One-line description
-   Circular green arrow

------------------------------------------------------------------------

# 20. Capability Card

Example:

``` text
┌────────────────────────────────────────────┐
│ ◇                                          │
│                                            │
│ FULL-STACK DEVELOPMENT                 →  │
│ Modern web apps, APIs and product          │
│ experiences built end-to-end.              │
└────────────────────────────────────────────┘
```

Glass treatment should be slightly stronger than the project cards.

Hover:

-   Green border
-   Very subtle inner green gradient
-   Arrow translates 4px right
-   Icon becomes green

------------------------------------------------------------------------

# 21. Technology Stack

Section title:

``` text
TECH STACK
```

Organize by category.

``` text
LANGUAGES
TypeScript    JavaScript    Python    Go

FRONTEND
React    Next.js    React Native

BACKEND
Node.js    FastAPI    PostgreSQL    Redis

INFRASTRUCTURE
Docker    AWS    Vercel    Kubernetes

TOOLS
Git    GitHub    Linux    Figma
```

Use glass grouping panels only where useful.

Do not put every technology inside a giant glass container.

------------------------------------------------------------------------

# 22. Optional Experience Section

If professional experience exists, add:

``` text
──────────────
EXPERIENCE
```

Use a vertical timeline.

Example:

``` text
2025 — PRESENT

Senior Software Engineer
Company Name

Building scalable systems and developer
tools used across the organization.

────────────────────────────

2023 — 2025

Software Engineer
Company Name

...
```

Keep it minimal.

If there is little professional experience, prioritize projects and open
source rather than padding the page.

------------------------------------------------------------------------

# 23. GitHub / Open Source

Include a compact developer identity section.

Possible layout:

``` text
OPEN SOURCE

Building in public, contributing to tools,
and experimenting with new technologies.

[ GitHub → ]
```

Do not display vanity metrics unless they are real and relevant.

------------------------------------------------------------------------

# 24. Contact Section

Create a dramatic but simple ending.

``` text
──────────────

LET'S BUILD
SOMETHING
INTERESTING.
```

Then:

``` text
Available for selected freelance projects,
product collaborations and engineering work.
```

CTA:

``` text
[ START A CONVERSATION → ]
```

The CTA should use glass + green accent.

------------------------------------------------------------------------

# 25. CTA Glass Button

``` css
.cta {
  display: inline-flex;
  align-items: center;
  gap: 10px;

  padding: 12px 18px;

  border-radius: 999px;

  background: rgba(0, 217, 104, 0.08);
  border: 1px solid rgba(0, 217, 104, 0.42);

  color: var(--text);

  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);

  transition: 250ms ease;
}
```

Hover:

``` text
background becomes slightly greener
border becomes brighter
arrow moves right
subtle green shadow appears
```

------------------------------------------------------------------------

# 26. Social Links

At the bottom:

``` text
GitHub    LinkedIn    X    Email
```

Use small glass pills.

Example:

``` text
[ GitHub ↗ ] [ LinkedIn ↗ ] [ Email ↗ ]
```

Avoid giant social icons.

------------------------------------------------------------------------

# 27. Footer

Minimal:

``` text
© 2026 Alex Morgan

Software Engineer · Full-Stack Developer

Built with Next.js
```

Small muted typography.

------------------------------------------------------------------------

# 28. Responsive Design

## Desktop ≥ 1100px

-   Floating navbar
-   Three-part hero
-   3-column project grid
-   2--3 column capability grid
-   Large typography
-   Hero visual overlaps name

## Tablet 768--1099px

-   Smaller hero
-   Two-column projects
-   Two-column capabilities
-   Navbar remains floating
-   Reduce oversized type

## Mobile \< 768px

Stack everything.

Order:

``` text
NAV
↓
HERO VISUAL
↓
SOFTWARE ENGINEER
↓
NAME
↓
INTRO
↓
TECHNOLOGIES
↓
INTRO STATEMENT
↓
PROJECTS
↓
CAPABILITIES
↓
STACK
↓
EXPERIENCE
↓
CONTACT
```

Navbar can become a compact floating pill with fewer items.

Project cards become full width.

Do not allow horizontal overflow.

------------------------------------------------------------------------

# 29. Motion Design

Use restrained motion.

## Page entrance

``` text
opacity: 0 → 1
transform: translateY(12px) → translateY(0)
duration: 500–800ms
```

## Cards

On hover:

``` text
translateY(-4px)
```

## Arrows

``` text
translateX(0 → 4px)
```

## Hero visual

Very subtle floating:

``` text
translateY(0 → -6px → 0)
```

Long duration:

``` text
5–7 seconds
```

Use ease-in-out.

## Avoid

-   Constant spinning
-   Cursor trails
-   Particle fields
-   Aggressive parallax
-   Text scrambling
-   Excessive magnetic buttons
-   Every section animating independently

Animation should make the interface feel alive, not distract from the
work.

------------------------------------------------------------------------

# 30. Glassmorphism Rules

This is critical.

Use glassmorphism as a **layering system**:

``` text
BACKGROUND
    ↓
SUBTLE GREEN LIGHT
    ↓
HERO / CONTENT
    ↓
GLASS PANELS
    ↓
TEXT / CONTROLS
```

Do not create:

``` text
glass panel
  inside glass panel
    inside glass panel
      inside glass panel
```

Maximum recommended nesting depth:

``` text
2
```

For example:

``` text
Navbar
  └── navigation buttons

Project card
  └── project metadata
```

That's enough.

------------------------------------------------------------------------

# 31. Borders and Highlights

Use very subtle glass highlights.

Top edge:

``` css
box-shadow:
  inset 0 1px 0 rgba(255,255,255,0.035);
```

Green interaction state:

``` css
box-shadow:
  0 0 30px rgba(0, 217, 104, 0.07);
```

Do not use strong neon shadows.

------------------------------------------------------------------------

# 32. Accessibility

Maintain readable contrast.

Do not use the transparent glass effect behind important body text if
the background becomes unpredictable.

For reduced-motion users:

``` css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

Ensure:

-   Keyboard focus states
-   Visible focus ring
-   Semantic headings
-   Accessible button labels
-   Alt text for meaningful images
-   Proper color contrast
-   No interaction that depends exclusively on hover

------------------------------------------------------------------------

# 33. Component Architecture

If implementing with React/Next.js, structure components approximately
like:

``` text
components/
├── Navbar.tsx
├── Hero.tsx
├── TechStrip.tsx
├── IntroStatement.tsx
├── SectionHeading.tsx
├── ProjectGrid.tsx
├── ProjectCard.tsx
├── Capabilities.tsx
├── CapabilityCard.tsx
├── TechStack.tsx
├── Experience.tsx
├── OpenSource.tsx
├── Contact.tsx
├── SocialLinks.tsx
└── Footer.tsx
```

Create reusable primitives:

``` text
GlassPanel
GlassButton
GreenArrow
SectionDivider
TechBadge
```

Do not duplicate glass CSS across every component.

------------------------------------------------------------------------

# 34. Suggested Project Content Model

Use structured data.

``` ts
type Project = {
  title: string
  category: string
  description: string
  image: string
  technologies: string[]
  href?: string
  github?: string
  result?: string
}
```

Capabilities:

``` ts
type Capability = {
  title: string
  description: string
  icon: string
}
```

Technologies:

``` ts
type TechnologyGroup = {
  category: string
  technologies: string[]
}
```

This makes the portfolio easy to maintain.

------------------------------------------------------------------------

# 35. Image Direction

Do not use random stock images.

Project images should be:

-   Actual product screenshots
-   Browser mockups
-   Mobile app screenshots
-   Architecture diagrams
-   Terminal/product UI
-   Custom technical illustrations

Treatment:

``` text
slightly desaturated
darkened edges
subtle green atmospheric lighting
rounded 6–10px
```

The screenshot should remain recognizable.

------------------------------------------------------------------------

# 36. Visual Rhythm

Alternate between:

``` text
large typography
↓
small metadata
↓
visual
↓
large typography
↓
compact cards
↓
large whitespace
```

Do not make every section a grid.

The reference works partly because the composition changes from section
to section.

------------------------------------------------------------------------

# 37. Content Rules

The portfolio should answer these questions quickly:

### Who are you?

Software engineer / developer identity.

### What do you build?

Specific categories.

### What have you built?

Real projects.

### What technologies do you use?

Relevant stack.

### What was your contribution?

Clear role.

### What was the result?

Only real measurable outcomes.

### How can someone contact you?

One obvious CTA.

Avoid:

-   Long biography
-   Generic claims such as "passionate developer"
-   Fake metrics
-   Skill percentages
-   "10x developer" language
-   Huge technology lists with no evidence
-   Buzzword-heavy descriptions

------------------------------------------------------------------------

# 38. Final Visual Target

The final site should feel like:

``` text
Dark editorial portfolio
        +
Premium glass UI
        +
Creative developer identity
        +
Strong typography
        +
Real engineering evidence
```

Not:

``` text
Generic SaaS landing page
        +
Neon cyberpunk
        +
Glassmorphism everywhere
        +
Animated background
```

The difference is restraint.

------------------------------------------------------------------------

# 39. Implementation Priority

Build in this order:

1.  Global dark theme
2.  Typography
3.  Floating glass navbar
4.  Hero composition
5.  Oversized name
6.  Technology strip
7.  Intro statement
8.  Project cards
9.  Capability cards
10. Tech stack
11. Experience
12. Contact CTA
13. Footer
14. Responsive behavior
15. Motion
16. Grain/background polish

Do not start with animations.

Get the typography, spacing, proportions and hierarchy correct first.

------------------------------------------------------------------------

# 40. Definition of Done

The implementation is successful when:

-   The page immediately reads as a personal software-engineer
    portfolio.
-   The visual relationship to the supplied reference is obvious without
    being a literal copy.
-   Glassmorphism is visible but restrained.
-   Navbar, project cards and capability cards share one coherent glass
    system.
-   Green is an accent, not the primary page color.
-   The hero is visually dominant.
-   The developer's name is one of the largest elements.
-   Projects are more prominent than decorative effects.
-   Screenshots look integrated with the dark visual system.
-   Typography feels editorial rather than corporate.
-   Mobile layout remains intentional.
-   Hover states are subtle.
-   Accessibility is preserved.
-   No section feels overloaded.
-   There is no generic SaaS-template feeling.

------------------------------------------------------------------------

# 41. Claude Code Implementation Instruction

When implementing this specification:

> First inspect the existing project structure and reuse the project's
> current framework, routing, asset pipeline and styling system where
> practical. Do not rewrite the application architecture unnecessarily.
>
> Implement the portfolio as a polished production interface, not a
> prototype.
>
> Prioritize visual fidelity to this design specification over adding
> unnecessary functionality.
>
> Build reusable components and shared design tokens.
>
> Use real assets supplied by the project when available. Do not
> fabricate project metrics or professional experience.
>
> If content is missing, use clearly identifiable placeholder content
> that can easily be replaced.
>
> Implement responsive behavior from the beginning rather than treating
> mobile as a later adjustment.
>
> The glassmorphism must use real backdrop blur, translucent dark
> surfaces and subtle borders, but must remain restrained.
>
> Avoid excessive gradients, excessive glow, excessive animation,
> generic SaaS patterns and cyberpunk aesthetics.
>
> Before finishing, verify:
>
> -   Desktop layout
> -   Tablet layout
> -   Mobile layout
> -   Keyboard navigation
> -   Reduced-motion behavior
> -   Text contrast
> -   No horizontal overflow
> -   No broken images
> -   No console errors
> -   No unnecessary dependencies
>
> The final result should feel like a high-end creative developer
> portfolio rather than a generated template.

------------------------------------------------------------------------

# 42. Reference Composition Summary

Use the supplied reference image as the **visual composition
reference**, especially for:

-   Dark background
-   Three-part hero
-   Central character
-   Oversized name
-   Thin green dividers
-   Compact cards
-   Circular green arrow controls
-   Muted logos
-   Sparse navigation
-   Strong whitespace
-   Editorial typography

Adapt its content from:

``` text
Graphic / Product / Brand Designer
```

to:

``` text
Software Engineer
Full-Stack Developer
Product Builder
```

and from:

``` text
Design services
```

to:

``` text
Software projects
Engineering capabilities
Technology stack
```

The final design should feel like the same **visual universe**, but
clearly belong to a software engineer.
