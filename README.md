# Lazuli Catalogue

A modern, responsive product catalogue website built for Lazuli.

The application provides a polished storefront experience backed by the **Square Catalog API**, with product discovery, favourites, featured and trending products, individual product pages, and a contact form powered by **Resend**.

---

## Overview

Lazuli Catalogue is a full-stack Next.js application designed to provide customers with a simple and elegant way to browse Lazuli's product collection.

The project combines a minimal luxury-inspired interface with server-side integrations for catalogue data and customer enquiries.

### Key Features

- Product catalogue powered by Square
- Featured and trending products
- Individual product detail pages
- Product categories and stock availability
- Persistent browser-based favourites
- Favourites dropdown in the navigation
- Dedicated favourites page
- Responsive desktop and mobile navigation
- Contact form with email delivery
- FAQ page
- About page
- Responsive design across desktop, tablet, and mobile
- Reusable product cards and layout components
- Server-side API routes for external services

---

## Tech Stack

### Frontend

- **Next.js 16**
- **React**
- **TypeScript**
- **Tailwind CSS**
- **Lucide React**
- **React Icons**

### Backend & Integrations

- **Square Catalog API** for product data
- **Resend** for contact form emails
- **Next.js API Routes** for server-side functionality

### Deployment

- **Vercel**

---

## Architecture

The application uses the Next.js App Router and separates the interface into reusable components and service integrations.

```text
src/
├── app/
│   ├── api/
│   │   ├── contact/
│   │   │   └── route.ts
│   │   └── products/
│   │       └── [id]/
│   │           └── route.ts
│   │
│   ├── about/
│   │   └── page.tsx
│   │
│   ├── catalogue/
│   │   ├── [id]/
│   │   │   └── page.tsx
│   │   └── page.tsx
│   │
│   ├── contact/
│   │   └── page.tsx
│   │
│   ├── faq/
│   │   └── page.tsx
│   │
│   ├── favourites/
│   │   └── page.tsx
│   │
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── catalogue/
│   │   └── ProductCard.tsx
│   │
│   ├── home/
│   │   ├── Hero.tsx
│   │   └── FeaturedProducts.tsx
│   │
│   └── layout/
│       ├── Header.tsx
│       ├── Footer.tsx
│       └── FavouritesMenu.tsx
│
├── lib/
│   └── square/
│       └── catalog.ts
│
└── types/
    └── product.ts
