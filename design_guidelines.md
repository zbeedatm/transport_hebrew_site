# Design Guidelines for UNBS Bus Service Website

## Design Approach: Design System - Material Design
This is a utility-focused transportation service website where efficiency and information accessibility are paramount. Material Design provides the ideal foundation for:
- Clear information hierarchy
- Familiar interaction patterns
- Strong visual feedback for user actions
- Excellent RTL (right-to-left) language support

**Key Design Principles:**
1. Information First: Prioritize quick access to routes, schedules, and announcements
2. Clarity Over Creativity: Use established patterns that users recognize instantly
3. Accessible Wayfinding: Visual hierarchy guides users to their destination
4. Trust Through Consistency: Reliable, professional appearance builds user confidence

## Core Design Elements

### A. Color Palette

**Light Mode:**
- Primary: 210 85% 45% (Deep Blue - for headers, primary buttons, route numbers)
- Primary Variant: 210 70% 35% (Darker Blue - for hover states)
- Background: 0 0% 98% (Off-white)
- Surface: 0 0% 100% (Pure white for cards)
- Text Primary: 0 0% 15% (Near black)
- Text Secondary: 0 0% 45% (Gray for labels)
- Accent: 25 95% 50% (Orange - sparingly for important CTAs or alerts)
- Border: 0 0% 90% (Light gray)

**Dark Mode:**
- Primary: 210 75% 55% (Lighter Blue for better contrast)
- Background: 210 15% 12% (Dark blue-gray)
- Surface: 210 12% 18% (Elevated surface)
- Text Primary: 0 0% 95% (Off-white)
- Text Secondary: 0 0% 70% (Light gray)
- Border: 210 10% 25% (Subtle borders)

### B. Typography

**Font Families:**
- Primary: 'Rubik', sans-serif (excellent Hebrew support, clean and modern)
- Fallback: system-ui, -apple-system, 'Segoe UI', sans-serif

**Type Scale:**
- Hero/Display: text-4xl md:text-5xl, font-bold
- H1: text-3xl md:text-4xl, font-bold
- H2: text-2xl md:text-3xl, font-semibold
- H3: text-xl md:text-2xl, font-semibold
- Body Large: text-lg, font-normal
- Body: text-base, font-normal
- Small: text-sm, font-normal
- Caption: text-xs, font-medium

### C. Layout System

**Spacing Primitives:** Use Tailwind units of 2, 4, 6, 8, 12, 16, 20
- Micro spacing (within components): p-2, gap-2, m-2
- Standard spacing (between elements): p-4, gap-4, m-4, p-6, gap-6
- Section spacing: py-8, py-12, py-16, py-20
- Major sections: py-16 md:py-20

**Grid & Containers:**
- Max container width: max-w-7xl
- Standard grid: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Route number grid: grid-cols-5 md:grid-cols-10 (for quick access buttons)
- Gutters: gap-4 md:gap-6

### D. Component Library

**Navigation:**
- Fixed top header with company logo (UNBS ש.א.מ.) on right (RTL)
- Main navigation links with clear hover states
- Mobile: Hamburger menu (right side for RTL)
- Background: Surface color with subtle shadow

**Route Search Form:**
- Three input fields arranged horizontally (desktop) / stacked (mobile)
- Autocomplete dropdowns with search icons
- Primary blue button for search action
- Labels above inputs: "מאיפה?" "לאן נוסעים?" "מספר קו"
- Rounded corners (rounded-lg), subtle shadows

**Quick Access Line Numbers:**
- Pill-shaped buttons with route numbers (1, 3, 5, 12, 16, etc.)
- Outlined style with primary blue border
- Hover: filled with primary blue background
- Grid layout: 5 columns mobile, 10 columns desktop
- Consistent sizing: px-6 py-3

**Announcement Cards:**
- Horizontal carousel with navigation arrows
- Each card: Icon (schedule/alert), timestamp, message text
- White background with subtle shadow
- Border-left accent in primary color (4px)
- Padding: p-6
- Date format: DD-MM-YYYY, HH:MM

**Promotional Banners:**
- Full-width image banners in carousel
- Aspect ratio: 1044x464 (maintain original proportions)
- Rounded corners: rounded-xl
- Subtle hover lift effect
- Navigation dots below carousel

**Information Cards:**
- Three-column grid (desktop), single column (mobile)
- Icon at top, heading, descriptive text
- White background, border, hover shadow
- Padding: p-6
- Icons: 48x48px, primary blue color

**Footer:**
- Company copyright: "© כל הזכויות שמורות לחברת UNBS"
- Links section (privacy policy, terms)
- Social media icons
- Background: slightly darker than page background
- Padding: py-12

### E. Images

**Hero Section:**
- Full-width hero image showing modern buses or cityscape (1920x600px)
- Overlay: Semi-transparent dark gradient (bottom to top) for text readability
- Overlay opacity: 40-60%
- Hero content (logo, tagline, search form) positioned center with backdrop-blur

**Banner Images:**
- Promotional banners: 1044x464px
- Use placeholder images showing:
  - Rav-Kav online payment card
  - Mobile payment app screenshot  
  - Route map/network diagram
  - Customer service interaction

**Icon Usage:**
- Schedule icon: Clock/calendar SVG from Heroicons
- Arrow icons: Chevron left/right for RTL carousel navigation
- Search icon: Magnifying glass in search inputs
- App store badges: Official Apple/Google assets

**Mobile App Section:**
- Google Play and App Store official badge images
- Positioned side by side (desktop) / stacked (mobile)
- Light background section with app preview mockup

### Accessibility & RTL Considerations

- **RTL Implementation:** dir="rtl" on html element, all margins/padding flip automatically
- **Text Alignment:** text-right for Hebrew content
- **Navigation Flow:** Right to left reading order
- **Forms:** Labels positioned appropriately for RTL, icons on left side of inputs
- **Carousels:** Right arrow goes to previous, left arrow to next (reversed for RTL)
- **Color Contrast:** Maintain WCAG AA standards (4.5:1 for normal text)
- **Focus States:** Clear outline for keyboard navigation
- **Dark Mode:** Consistent implementation across all components, including form inputs

### Animation Guidelines

**Use Sparingly:**
- Carousel transitions: Smooth slide (300ms ease-in-out)
- Hover states: Scale 1.02 or subtle shadow increase (200ms)
- Button clicks: Brief scale down (100ms)
- Loading states: Simple spinner, no elaborate animations
- No parallax or scroll-triggered animations