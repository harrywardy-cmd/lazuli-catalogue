# Lazuli Catalogue

A modern, responsive product catalogue website built for **Lazuli**.

The application provides a polished storefront experience backed by the **Square Catalog API**, with product discovery, favourites, featured and trending products, individual product pages, and a contact form powered by **Resend**.

---

## Overview

Lazuli Catalogue is a full-stack Next.js application designed to provide customers with a simple and elegant way to browse Lazuli's product collection.

The project combines a minimal, luxury-inspired interface with server-side integrations for catalogue data and customer enquiries.

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
```

---

## Product Catalogue

Product data is retrieved from Square and transformed into the application's product model.

```ts
type Product = {
  id: string;
  variationId: string;
  name: string;
  description?: string;
  price: number;
  currency: string;
  imageUrl?: string;
  category?: string;
  stock: number;
  featured?: boolean;
  trending?: boolean;
};
```

This allows the application to display product information consistently throughout the storefront.

### Product Information

Each product can include:

- Name
- Description
- Price
- Currency
- Product image
- Category
- Stock quantity
- Featured status
- Trending status

---

## Favourites

The application includes a client-side favourites system.

Users can:

- Add products to their favourites
- Remove products from their favourites
- View their saved products from the header
- Open a dedicated favourites page
- Navigate directly to a saved product

Favourites are stored using browser `localStorage`.

```text
lazuli-favourites
```

A custom browser event is also dispatched when favourites change so that components such as the navigation can update without requiring a page refresh.

> Favourites are currently stored locally and are not synchronised between devices or user accounts.

---

## Contact Form

The contact page provides customers with a way to send enquiries directly to Lazuli.

Form submissions are sent to a Next.js API route:

```text
POST /api/contact
```

The API validates the submitted information before sending the message through Resend.

### Email Flow

```text
Customer
   │
   ▼
Contact Form
   │
   ▼
Next.js API Route
   │
   ▼
Resend
   │
   ▼
Lazuli Inbox
```

The customer's email address is configured as the reply-to address, allowing Lazuli to respond directly to the customer.

---

## Environment Variables

Create a `.env.local` file in the project root.

```env
SQUARE_ACCESS_TOKEN=your_square_access_token
SQUARE_ENVIRONMENT=sandbox
RESEND_API_KEY=your_resend_api_key
```

### Variables

| Variable | Description |
|---|---|
| `SQUARE_ACCESS_TOKEN` | Square API authentication token |
| `SQUARE_ENVIRONMENT` | Square environment such as `sandbox` or `production` |
| `RESEND_API_KEY` | API key used to send contact emails |

**Never commit API keys or `.env.local` to the repository.**

---

## Getting Started

### Prerequisites

Make sure you have installed:

- Node.js
- npm

### Installation

Clone the repository:

```bash
git clone <repository-url>
```

Navigate into the project:

```bash
cd lazuli-catalogue
```

Install dependencies:

```bash
npm install
```

Create your environment file:

```text
.env.local
```

Add the required environment variables.

Start the development server:

```bash
npm run dev
```

Open the application at:

```text
http://localhost:3000
```

---

## Available Scripts

### Development

```bash
npm run dev
```

Starts the Next.js development server.

### Production Build

```bash
npm run build
```

Creates an optimized production build.

### Production Server

```bash
npm start
```

Starts the production application.

### Lint

```bash
npm run lint
```

Runs the project's linting configuration.

---

## Design

The Lazuli interface follows a minimal, refined visual language focused on product presentation.

### Design Principles

- Minimal layouts
- Soft lavender and purple colour palette
- Serif typography for brand elements
- Responsive product grids
- Rounded imagery
- Subtle shadows
- Lightweight animations
- Clear visual hierarchy
- Mobile-first responsive behaviour

The interface is designed to keep the products at the centre of the experience without unnecessary visual clutter.

---

## API Routes

### Get Product

```text
GET /api/products/[id]
```

Retrieves product information for an individual product page.

### Send Contact Message

```text
POST /api/contact
```

Validates and sends customer enquiries through Resend.

---

## Deployment

The application can be deployed using Vercel.

Before deploying, configure the required environment variables in the Vercel project settings:

```text
SQUARE_ACCESS_TOKEN
SQUARE_ENVIRONMENT
RESEND_API_KEY
```

Then deploy the project.

For production email delivery, ensure the appropriate sending domain and sender configuration are set up in Resend.

---

## Future Improvements

Potential future development includes:

- Customer accounts
- Cloud-synchronised favourites
- Shopping cart functionality
- Online checkout
- Order management
- Product search
- Advanced filtering
- Customer reviews
- Product recommendations
- Inventory synchronisation
- Order confirmation emails

---

## Project Status

**Active development**

The Lazuli Catalogue is currently being developed and refined, with additional storefront and customer functionality planned.

---

## License

This project is developed for Lazuli.

All Lazuli branding, product imagery, and catalogue content remain the property of their respective owners.
