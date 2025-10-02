# 🛍️ NextCart

A minimalist e-commerce platform built with Next.js 15 and TypeScript, using data from [Platzi's GraphQL API](https://fakeapi.platzi.com/en/gql/products/). Features server-side rendering and streaming, real-time search, authentication with Clerk and an admin dashboard with CRUD functionality.

## 📑 Contents

- 📖 [About the project](#-about-the-project)
- ✨ [Features](#-features)
- 🛠 [Technologies Used](#-technologies)
- ⚙️ [Installation](#-installation)
- 📂 [Project Structure](#-project-structure)
- 🚀 [Workflow](#-workflow)
- 🤝 [Contributing](#-contributing)
- 📜 [License](#-license)

## 📖 About the project

This is a group exercise focused on building a minimalist e-commerce platform to practise modern web development patterns.

**Key learnings:**

- Server-side rendering and routing with Next.js 15 App Router
- Type-safe development with TypeScript and Zod validation
- GraphQL API integration with queries, mutations and error-handling
- Implementing mock data fallback for development with environment variables
- Authentication and route protection using Clerk
- Form management with server actions for CRUD operations and contact forms
- Advanced routing patterns with parallel routes and route interception for modals
- Performance optimization through lazy loading and React Suspense
- Dynamic routing with searchParams for filtering and pagination
- Building accessible, responsive UI with Tailwind CSS and shadcn/ui
- Agile methodology with iterative development and continuous feedback & communication.

## ✨ Features

### 🏠 Storefront

- **Product Discovery** - Browse featured products and new arrivals with a clean, responsive grid layout
- **Search** - Global command palette (⌘K/Ctrl+K) for instant product search
- **Smart Filtering** - Filter products by category, search query, and combine multiple filters
- **Product Details** - Dynamic product pages with image carousels, descriptions, and specifications
- **Modal Overlays** - Product quick-view and search in modal windows

### 🛒 Shopping Experience

- **Add to Cart** - Simple add-to-cart functionality using cookies, with toast notifications
- **Responsive Design** - Optimised for mobile, tablet, and desktop viewing
- **Contact Form** - Get in touch with validated server-side form handling

### 🔐 Authentication

- **User Management** - Sign in with Clerk authentication to access protected admin areas

### ⚙️ Admin Dashboard

- **Product Management** - Create, edit, and delete products in Platzi's public API server
- **Data Tables** - Sortable, filterable tables for managing inventory
- **Server Actions** - secure mutations handled server-side with real-time feedback

### 🚀 Performance

- **SSR & Streaming** - Server-side rendering with React Suspense for optimal loading
- **Image Optimization** - Automatic image optimization with Next.js Image component
- **Fallback Data** - Develop with mock data when API is unavailable

## 🛠 Technologies Used

#### Core Framework & Language

- **[Next.js 15 (App Router)](https://nextjs.org/docs)** - React framework for server-side rendering, routing, and modern app architecture
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript for improved developer experience and code reliability

#### Styling & UI

- **[Tailwind CSS](https://tailwindcss.com/docs/styling-with-utility-classes)** - Utility-first CSS framework for responsive design
- **[shadcn/ui](https://ui.shadcn.com/docs)** - Composable UI component library built on Radix UI
- **[Radix UI](https://www.radix-ui.com/primitives/docs/overview/introduction)** - Unstyled, accessible component primitives
- **[Lucide React](https://lucide.dev/icons/)** - Modern icon library

#### Features & Functionality

- **[Clerk](https://clerk.com/)** - Authentication and protected routes
- **[GraphQL](https://graphql.org/)** - API queries for product and category data
- **[React Hot Toast](https://react-hot-toast.com/)** - Toast notification system for user feedback
- **[Zod](https://zod.dev/)** - Runtime type validation for forms and data schemas

#### Development Tools

- **[ESLint](https://eslint.org/) & [Prettier](https://prettier.io/)** - Code linting and formatting for consistent code style
- **[Husky](https://typicode.github.io/husky/)** - Git hooks for automated pre-commit quality checks

## ⚙️ Installation

1. Clone this repository and navigate to the folder:

```bash
git clone https://github.com/jplimmer/next-cart.git
cd next-cart
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open http://localhost:3000 in your browser to view the site.

## 📂 Project Structure

```
├── public/                         # Static assets
├── src/
│   ├── app/                        # Next.js App Router pages and routes
│   │   ├── about/
│   │   ├── admin/
│   │   │   ├── create-category/
│   │   │   ├── create-product/
│   │   │   └── update-product/
│   │   │       └── [id]/
│   │   ├── contact/
│   │   ├── products/
│   │   │   └── [slug]/
│   │   └── @modal/                 # Parallel slot for intercepting modal routes
│   │       ├── (.)admin/
│   │       │   ├── create-category/
│   │       │   ├── create-product/
│   │       │   └── update-product/
│   │       │       └── [id]/
│   │       └── (.)products/
│   │           └── [slug]/
│   ├── components/                 # Reusable React components organised by feature
│   │   ├── admin/
│   │   ├── contact/
│   │   ├── layout/
│   │   ├── loading/
│   │   ├── navigation/
│   │   ├── products/
│   │   ├── root-page/
│   │   ├── table/
│   │   └── ui/                     # Shared UI primitives (buttons, cards, inputs, dialogs, etc.)
│   ├── fonts/                      # Custom font files
│   ├── hooks/                      # Custom React hooks
│   ├── lib/                        # Core shared logic and utilities
│   │   ├── actions/
│   │   ├── constants/
│   │   ├── data/
│   │   │   ├── graphql/            # GraphQL queries, mutations, and fetch utils
│   │   │   └── services/           # API service implementations (mock and real)
│   │   ├── hooks/
│   │   ├── mocks/                  # Mock and experimental data for development/testing
│   │   ├── schemas/                # Zod validation schemas
│   │   ├── types/
│   │   └── utils.ts
│   └── middleware.ts               # Clerk configuration
├── .gitignore
├── next.config.ts
├── package.json
└── README.md
```

## 📈 Workflow

- 👥 Group work in agile sprints (SCRUM)
- 🌱 Feature branches
- 🔍 PR + code review
- DSUs
- Keep team meeting open

### 🗓 Sprint Plan

#### Sprint 1 - Basic Structure

- Set up Next.js project
- Created menus & static pages

#### Sprint 2 - Basic Structure

- Uses [slug] for dynamic routing
- Filter and search for /products

#### Sprint 3 - Basic Structure

- Created /admin route with a DataTable
- Create, Update, and Delete functionality for products with server actions
- Zod validation on create/update forms

#### Sprint 4 - Fine Tuning

- WAVE and Lighthouse analysis
- Refactor fetch and GraphQL functions
- Responsive styling

## 🤝 Contributing

Want to contribute? Great! Here's how to get started:

#### Quick Start

1. Fork and clone the repo:

```bash
git clone https://github.com/<your-username>/next-cart.git
```

2. Navigate to your repo root and install dependencies:

```bash
cd next-cart
npm install
```

3. Create a feature branch:

```bash
git checkout -b feature/your-feature
```

4. Make changes, commit, and push.
5. Open a Pull Request (PR) with a clear description.

#### Guidelines

- Follow code style with ESLint/Prettier config.
- Use clear commit messages.
- All PRs need review.

For questions, use GitHub Issues. Thanks for helping! 🚀

## 📜 License

This project is developed for educational purposes and is not intended for production.
