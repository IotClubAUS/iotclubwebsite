📘 Club Website — Full Technical & UI/UX Architecture

A modern, high-performance club website built with Next.js App Router, using a server-first architecture and a hybrid UI system combining Preline UI, shadcn/ui, and Motion (motion.dev).

This project is designed for performance, scalability, and clean separation of concerns using an “island architecture” model.

⚙️ Tech Stack Overview
Core Stack
Next.js (App Router) → Server-first React framework
TypeScript → Type safety
Tailwind CSS → Utility-first styling
Preline UI → Layout + page structure (static UI system)
shadcn/ui → Interactive components (client-side islands)
Motion (motion.dev) → Animations
UI Layering System
Layer	Tool	Purpose
Structure	Preline UI + Tailwind	Layout, grids, sections
Interaction	shadcn/ui	Forms, calendar, menus, popovers
Animation	Motion	Transitions + scroll effects
🧠 Architecture Model
Island Architecture (Core Concept)

The site is mostly server-rendered HTML, with small interactive “islands”.

Page (Server Component)
 ├── Static Layout (Preline UI)
 ├── Content Sections (Server)
 ├── Interactive Islands (Client)
 │     ├── Calendar
 │     ├── Carousel
 │     ├── Forms
 │     ├── Navbar dropdowns
 │     └── Mobile menu
 └── Motion Animations (Client wrappers)
Key Rule:

Everything is server-side by default. Only interactive components use "use client".

📄 Pages Structure
app/
├── page.tsx              # Home
├── events/
│   └── page.tsx
├── newsletter/
│   └── page.tsx
├── team/
│   └── page.tsx
├── about/
│   └── page.tsx
└── contact/
    └── page.tsx
🧩 Component Architecture
UI Components (shadcn)

Used for interactivity only:

Calendar
Carousel
Popover
Sheet (mobile menu)
Navigation Menu
Input / Textarea / Button
Sonner (toasts)
Layout Components (Preline UI)

Used for static structure:

Navbar shell
Footer
Grid sections
Hero layouts
Cards
Timeline
Stats blocks
Feature Components
Home
Hero Section
Stats Bar
Featured Events
Sponsor Cloud
Newsletter Preview
Events
Calendar (interactive)
Timeline
Event Cards
Filters
Newsletter
Carousel (issues)
Archive grid
Team
Leadership section
Department grids
Member cards
Contact
Contact form (client)
Info panel
🎨 UI/UX DESIGN SYSTEM
Design Principles
Clean engineering-style layout
Content-first design
Minimal motion, purposeful animation
Grid-based structure
Accessibility-first UI
Visual Style
Dark-neutral base theme
Accent color (cyan / green / electric tone)
12-column grid system
Large spacing system (Tailwind scale)
Typography
Headings: Inter / Space Grotesk
Body: Inter
🚀 Performance Strategy
Server vs Client Split
Server (fast, no JS)
Pages
Layout sections
Cards
Grids
Static content
Client (interactive islands)
Calendar
Carousel
Forms
Navbar interactions
Animations
Optimization Rules
Dynamic import heavy components
Lazy load below-fold images
Use next/image for all images
Enable ISR for event content (optional)
📁 Project Structure
app/
components/
  ├── ui/                 # shadcn components
  ├── layout/            # navbar, footer
  ├── features/          # page sections
  ├── animations/        # motion wrappers

lib/                     # data + helpers
hooks/                   # reusable client logic
types/                   # TypeScript types
config/                  # site config + nav
styles/                  # global styles
public/                  # images + assets
🧭 Navigation Structure
Home
Events
Newsletter
Team
About
Contact

Mobile uses a sheet drawer menu, desktop uses navigation menu dropdowns.

📊 Key UX Flow
New User Journey

Home → Events → Newsletter → Team

Member Journey

Home → Events → Calendar → Signup

Recruit Journey

About → Team → Contact

⚡ Key Features
Server-first rendering (fast load)
Island-based interactivity
Fully responsive design
Accessible components (Radix/shadcn)
Dynamic event system
Newsletter archive system
Motion-based micro-interactions
📦 Deployment
Requires Node.js environment
Recommended: Vercel
Not compatible with static hosting (GitHub Pages)
🧪 Future (v2 Scope)
Event database (Supabase)
Admin dashboard
Email system (Resend / Loops)
RSVP system
Member authentication
CMS for newsletters
🧠 Summary

This project follows a strict modern architecture:

Next.js Server Components + Preline layout system + shadcn interactive islands + Motion animations + Tailwind styling

It prioritizes:

Performance
Clean architecture
Maintainability
Scalability
UX clarity

If you want, I can next:

convert this into a GitHub-ready README.md file
or generate your actual repo boilerplate (fully coded starter)
or build the Home page + Navbar fully implemented in code