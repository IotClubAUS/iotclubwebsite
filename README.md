# Club Website — Full Technical & UI/UX Architecture

A modern, high-performance club website built with **Next.js App Router**, using a **server-first architecture** and a hybrid UI system combining **Preline UI**, **shadcn/ui**, and **Motion (motion.dev)**.

This project is designed for **performance, scalability, and clean separation of concerns** using an **island architecture model**.

---

# ⚙️ Tech Stack Overview

## Core Stack

- Next.js (App Router) → Server-first React framework
- TypeScript → Type safety
- Tailwind CSS → Utility-first styling
- Preline UI → Layout + page structure (static UI system)
- shadcn/ui → Interactive components (client-side islands)
- Motion (motion.dev) → Animations

---

## UI Layering System

| Layer | Tool | Purpose |
|------|------|--------|
| Structure | Preline UI + Tailwind | Layout, grids, sections |
| Interaction | shadcn/ui | Forms, calendar, menus, popovers |
| Animation | Motion | Transitions + scroll effects |

---

# 🧠 Architecture Model

## Island Architecture (Core Concept)

The site is mostly **server-rendered HTML**, with small interactive “islands”.

```text
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