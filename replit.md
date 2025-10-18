# UNBS Bus Service Website

## Project Overview
A Hebrew-language bus service website for UNBS (שירותי אוטובוסים מאוחדים), inspired by the Nazareth UNBS website. The site features full RTL (right-to-left) support, route search functionality, service announcements, and comprehensive bus line information.

## Recent Changes
**Date**: October 18, 2025
- Initial project setup with full RTL Hebrew support
- Created comprehensive data schema for announcements and routes
- Generated hero and promotional banner images
- Built complete frontend with all MVP features:
  - Hero section with route search form
  - Quick access bus line buttons (1, 3, 5, 12, 16, 34, 36, 39, 57, 68)
  - Service announcements display
  - Promotional banners carousel
  - Information cards section
  - Mobile app download section
  - Footer with copyright and links

## User Preferences
- **Language**: Hebrew (עברית) with full RTL support
- **Font**: Rubik (excellent Hebrew support)
- **Color Scheme**: Blue and white theme matching the original UNBS branding
- **Design Style**: Clean, professional, Material Design-inspired transportation website
- **Company Name**: UNBS ש.א.מ. (שירותי אוטובוסים מאוחדים)

## Project Architecture

### Frontend
- **Framework**: React with TypeScript
- **Routing**: Wouter
- **Styling**: Tailwind CSS with Shadcn UI components
- **RTL Support**: Full Hebrew RTL implementation via `dir="rtl"` on HTML element
- **State Management**: React hooks, TanStack Query for data fetching
- **Components**:
  - `client/src/pages/home.tsx` - Main landing page with all sections
  - Uses Shadcn components: Card, Button, Input
  - Responsive design with mobile-first approach

### Backend
- **Server**: Express.js
- **Storage**: In-memory storage (MemStorage)
- **Data Models**:
  - Announcements: Service updates and notifications
  - Routes: Bus line information (line number, origin, destination, schedule)

### Design System
- **Primary Color**: Deep Blue (210 85% 45%) for headers, buttons, route numbers
- **Background**: Off-white (0 0% 98%)
- **Card Background**: Pure white (0 0% 100%)
- **Accent**: Orange (25 95% 50%) for important CTAs
- **Typography**: Rubik font family
- **Spacing**: Consistent use of Tailwind spacing units (2, 4, 6, 8, 12, 16, 20)
- **Border Radius**: Rounded (md) for most elements

### Key Features
1. **Hero Section**: Full-width hero with background image, company branding, and route search form
2. **Route Search**: Three-field form (origin, destination, line number) with quick-access line buttons
3. **Announcements**: Service updates displayed in card format with timestamps
4. **Promotional Banners**: Carousel showcasing various services (mobile payment, route maps, customer service)
5. **Quick Lines**: Grid of commonly used bus line numbers
6. **Info Cards**: Three cards highlighting key services (schedules, customer service, important info)
7. **Mobile Apps**: Download links for Google Play and App Store
8. **Footer**: Copyright and legal links

## Technical Notes
- All text content is in Hebrew
- RTL layout applied via HTML `dir="rtl"` attribute
- Generated images stored in `attached_assets/generated_images/`
- Vite alias `@assets` configured for easy image imports
- Full TypeScript type safety using Drizzle schemas
- Responsive breakpoints: mobile (default), md (768px+), lg (1024px+)

## Next Steps
- Implement backend API endpoints for announcements and route search
- Connect frontend to backend with TanStack Query
- Add loading and error states
- Test complete user journey
