# Design Guidelines: SmartSolutions Microsserviço de Piadas

## Design Approach: Functional Documentation Interface

**Selected Approach:** Design System - Material Design (Utility-Focused)
This is a backend API project, so the interface will be a minimal documentation/testing page that prioritizes clarity and functionality over visual complexity.

**Core Principle:** Developer-friendly, minimal interface focused on API testing and documentation clarity.

---

## Color Palette

**Dark Mode (Primary):**
- Background: 220 15% 12%
- Surface: 220 15% 16%
- Text Primary: 220 10% 95%
- Text Secondary: 220 10% 70%
- Accent: 142 76% 36% (Green - success/API active)
- Border: 220 15% 25%

**Light Mode:**
- Background: 0 0% 98%
- Surface: 0 0% 100%
- Text Primary: 220 15% 15%
- Text Secondary: 220 10% 45%
- Accent: 142 71% 45%
- Border: 220 15% 85%

---

## Typography

**Font Stack:** 'JetBrains Mono' (code), 'Inter' (UI text) via Google Fonts

**Hierarchy:**
- Page Title: text-3xl font-bold
- Section Headers: text-xl font-semibold
- Body Text: text-base font-normal
- Code/JSON: text-sm font-mono
- Endpoint Badge: text-xs font-bold uppercase

---

## Layout System

**Spacing Units:** Tailwind units of 4, 6, 8, 12, 16
- Component padding: p-6, p-8
- Section gaps: space-y-8, space-y-12
- Container: max-w-5xl mx-auto px-4

**Grid:** Single column, max-width centered layout for optimal code readability

---

## Component Library

### 1. Header Section
- Logo/Title: "SmartSolutions API" with microservice badge
- Endpoint count indicator
- Status indicator (green dot + "Online")

### 2. API Endpoint Card
- Method badge (GET in green)
- Endpoint path in monospace: `/piada`
- Description text
- "Try it" button (primary accent color)

### 3. Interactive Testing Panel
- "Send Request" button with loading state
- Response display area with syntax-highlighted JSON
- Request counter/timestamp
- Copy response button

### 4. Code Examples Section
- Tabbed interface: cURL, JavaScript, Python
- Dark syntax-highlighted code blocks
- Copy code button for each example

### 5. Response Schema Documentation
- Table format showing JSON structure
- Field name, type, description columns
- Example values

### 6. Footer
- SCRUM Sprint attribution
- Documentation link
- GitHub/API endpoint URL

---

## Animations

**Minimal Functional Animations Only:**
- Button click: subtle scale(0.98) feedback
- Loading state: simple pulse on "Send Request"
- Success response: gentle slide-in for JSON display
- No decorative or unnecessary animations

---

## Images

**No Hero Image Required** - This is a utility/documentation interface where clarity trumps visual impact. A clean, organized layout serves the purpose better than imagery.

---

## Key Design Decisions

1. **Code-First Visual Language:** Monospace fonts, terminal-inspired dark theme, syntax highlighting
2. **One-Page Experience:** All documentation and testing on single scrollable page
3. **Instant Feedback:** Live API testing without leaving the page
4. **Developer UX:** Copy buttons, multiple code examples, clear response formatting
5. **Minimal Distraction:** No gradients, no hero sections, no marketing fluff - pure functionality

This design prioritizes the backend developer experience with a clean, professional testing interface.