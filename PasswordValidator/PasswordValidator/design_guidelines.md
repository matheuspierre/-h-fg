# Design Guidelines: Password Validator API

## Project Context
This is a **pure backend microservice** with no UI requirements specified. The project focuses on business logic and API responses.

## If a Testing Interface is Required

### Design Approach
**Utility-Focused / Design System Approach** - This is a developer tool requiring clarity and efficiency over visual flair.

### Core Design Elements

**A. Color Palette**
- Background: 222 15% 12% (dark mode)
- Primary: 217 91% 60% (blue for valid states)
- Error: 0 84% 60% (red for validation errors)
- Success: 142 71% 45% (green for valid passwords)
- Text: 210 20% 98%
- Muted: 217 10% 50%

**B. Typography**
- Font Family: 'Inter' from Google Fonts
- Headers: 600 weight, 1.5rem
- Body: 400 weight, 1rem
- Code/JSON: 'JetBrains Mono', monospace, 0.875rem

**C. Layout System**
- Tailwind spacing: 4, 6, 8, 12, 16 units
- Max-width: max-w-2xl centered
- Vertical rhythm: py-8 for sections, py-4 for components

**D. Component Library**

**Testing Form:**
- Single input field with label "Senha" (Password)
- Type="password" with toggle visibility option
- Primary button "Validar Senha"
- Clear visual feedback area for results

**Response Display:**
- JSON syntax highlighting for responses
- Error list with bullet points and icons
- Success indicator with checkmark
- Clear separation between request/response

**Card-Based Layout:**
- Input section in elevated card (bg-neutral-800)
- Response section in separate card below
- Rounded corners (rounded-lg)
- Subtle shadows for depth

**E. Interaction Patterns**
- Real-time character counter
- Instant visual feedback on submit
- Error messages in Portuguese matching API responses
- Copy-to-clipboard for JSON responses

### Accessibility
- Maintain dark mode throughout
- High contrast for text (WCAG AA compliant)
- Clear focus states on interactive elements
- Screen reader friendly error announcements

### Layout Structure
Single-page centered layout with:
1. Header with project title "Validador de Senhas"
2. Input card with password field and submit button
3. Results card showing validation status and detailed errors
4. Optional: API documentation section below

**No hero image needed** - This is a functional utility interface.