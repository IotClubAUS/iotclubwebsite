# Club Website — Full Technical, UI/UX & Architecture Specification

A modern, high-performance club website built with **Next.js App Router**, using a **server-first architecture** and a hybrid UI system combining **Preline UI**, **shadcn/ui**, and **Motion (motion.dev)**.

This project follows an **island architecture model** for performance, scalability, and maintainability.

---

# ⚙️ TECH STACK OVERVIEW

## Core Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Preline UI
- shadcn/ui
- Motion (motion.dev)

---

## UI LAYER ARCHITECTURE

| Layer | Tool | Role |
|------|------|------|
| Structure | Preline UI + Tailwind | Layout + pages |
| Interaction | shadcn/ui | Forms, menus, calendar |
| Animation | Motion | Transitions + effects |

---

# 🧠 ARCHITECTURE MODEL

## Island Architecture

```text
PAGE (Server Component)
 ├── STATIC LAYOUT (Preline UI)
 ├── CONTENT (Server Components)
 ├── INTERACTIVE ISLANDS (Client Components)
 │     ├── Calendar
 │     ├── Carousel
 │     ├── Forms
 │     ├── Navbar
 │     ├── Mobile Menu
 │     └── Popovers
 └── MOTION LAYERS (Client Wrappers)

 # RULE

Everything is server-first.
Only interactive components use "use client".




# APP STRUCTURE


app/
├── layout.tsx
├── page.tsx
├── events/
│   ├── page.tsx
│   └── [slug]/page.tsx
├── newsletter/
│   ├── page.tsx
│   └── [issue]/page.tsx
├── team/
│   └── page.tsx
├── about/
│   └── page.tsx
└── contact/
    └── page.tsx



    COMPONENT ARCHITECTURE
shadcn/ui (CLIENT ONLY)
Calendar
Carousel
Popover
Sheet
Navigation Menu
Input / Textarea / Button
Toasts
Preline UI (SERVER ONLY)
Navbar
Footer
Cards
Grids
Hero sections
Timeline
Stats blocks
FEATURE COMPONENTS
HOME
Hero
Stats bar
Featured events
Sponsor cloud
Newsletter preview
EVENTS
Calendar (interactive)
Timeline
Event cards
NEWSLETTER
Carousel
Archive grid
TEAM
Leadership
Departments
Member cards
CONTACT
Contact form
Info panel
🎨 DESIGN SYSTEM
Principles
Clean engineering layout
Content-first structure
Minimal motion
Grid-based UI
Accessibility-first design
Visual Style
Dark neutral theme
Cyan / electric green accents
12-column grid
Large spacing system
Typography
Headings: Inter / Space Grotesk
Body: Inter
🚀 PERFORMANCE
Rendering Split
SERVER (fast, no JS)
Pages
Layouts
Cards
Static UI
CLIENT (interactive islands)
Calendar
Carousel
Forms
Navbar interactions
Animations
RULES
Dynamic import heavy components
Lazy load images
Use next/image everywhere
Keep client components minimal
📁 PROJECT STRUCTURE
app/
components/
  ├── ui/
  ├── layout/
  ├── features/
  ├── animations/

lib/
hooks/
types/
config/
styles/
public/
🧭 NAVIGATION
Home
Events
Newsletter
Team
About
Contact

Mobile uses Sheet menu.
Desktop uses NavigationMenu.

📊 UX FLOW
New user

Home → Events → Newsletter → Team

Member

Home → Events → Calendar → Signup

Recruit

About → Team → Contact

⚡ KEY FEATURES
Server-first rendering
Island architecture
Fully responsive UI
Accessible components (Radix/shadcn)
Event system
Newsletter system
Motion animations
📦 DEPLOYMENT
Node.js required
Recommended: Vercel
Not compatible with static hosting
🧪 FUTURE (v2)
Database (Supabase)
Admin dashboard
Email system (Resend)
RSVP system
CMS for events/newsletters
🧠 SUMMARY

Next.js + Preline + shadcn + Motion + Tailwind

Focus:

Performance
Clean architecture
Scalability
UX clarity

--- 