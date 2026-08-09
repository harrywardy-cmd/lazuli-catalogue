# Lazuli Catalogue

A modern e-commerce catalogue website built for **Lazuli**, showcasing handmade jewellery, charms, keychains, and other curated pieces.

The project integrates with the **Square Catalog API** to retrieve product information and uses **Resend** to handle customer enquiries through the contact form.

## ✨ Features

- 🛍️ **Product Catalogue**
  - Browse products retrieved from the Square Catalog API
  - Product images, pricing, categories, and stock availability
  - Individual product detail pages

- ⭐ **Featured & Trending Products**
  - Highlight featured products
  - Display trending products throughout the storefront
  - Rotating featured products on the homepage

- ❤️ **Favourites**
  - Add products to favourites
  - Remove products from favourites
  - View all saved favourites
  - Favourites persist using `localStorage`

- 🔎 **Catalogue Experience**
  - Category filtering
  - Product browsing
  - Responsive product grid
  - Stock availability indicators

- 📧 **Contact Form**
  - Customer enquiry form
  - Sends enquiries using Resend
  - Messages are delivered to the Lazuli email inbox
  - Customer email is configured as the reply-to address
  - Success and error feedback

- 📱 **Responsive Design**
  - Desktop navigation
  - Mobile navigation
  - Responsive product grids
  - Mobile-friendly product pages

- 🎨 **Lazuli Design System**
  - Soft lavender colour palette
  - Serif typography
  - Minimal luxury-inspired layout
  - Responsive cards and interactions
  - Subtle animations and hover states

- 🔒 **Secure API Integration**
  - Square API credentials remain server-side
  - Resend API credentials remain server-side
  - Contact requests are processed through Next.js API routes

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **Next.js** | React framework and application routing |
| **React** | User interface |
| **TypeScript** | Type-safe development |
| **Tailwind CSS** | Styling and responsive design |
| **Square Catalog API** | Product catalogue data |
| **Resend** | Contact form email delivery |
| **Lucide React** | UI icons |
| **React Icons** | Social media icons |
| **Vercel** | Deployment |

---

## 📁 Project Structure

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
│   ├── about/
│   │   └── page.tsx
│   │
│   ├── favourites/
│   │   └── page.tsx
│   │
│   ├── page.tsx
│   ├── layout.tsx
│   └── globals.css
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
