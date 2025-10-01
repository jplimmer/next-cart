# 🛍️ E-commerce Platform in Next.js

Short description of the project, some about technologies, what the purpose is.  
A minimalist e-commerce platform built with **Next.js 15 App Router** and **TypeScript**.  
The project does this and that, includes this...

---

## 📑 Table of Contents
- 📖 [About the Project](#-about-the-project)
- ✨ [Features](#-features)
- 🛠 [Technologies](#-technologies)
- ⚙️ [Installation](#-installation)
- 🚀 [Usage](#-usage)
- 📂 [Project Structure](#-project-structure)
- 📈 [Workflow](#-workflow)
- 🗓 [Sprint Plan](#-sprint-plan)
- 🤝 [Contributing](#-contributing)
- 📚 [Learnings](#-learnings)
- 📜 [License](#-license)
- ✍️ [Contact](#-contact)

---

## 📖 About the Project
This is a group exercise where the goal was to build a **minimalist e-commerce platform**.  
The purpose is to practice:  
- this  
- and this  
- also this  

---

## ✨ Features
- ✅ Homepage with product overview  
- ✅ Hero section with CTA  
- ✅ Different pages  
- ✅ Search  
- ✅ Add  
- CRUD functions in /admin  

---

## 🛠 Technologies
- [Next.js 15 (App Router)](https://nextjs.org/)  
- [WAVE](https://wave.webaim.org/)  
- [API]  

---

## ⚙️ Installation
```bash
# Clone repo
git clone https://github.com/jplimmer/next-cart.git

# Go into project folder
cd repo-name

# Install dependencies
npm install

# Start development server
npm run dev
```

---

## 🚀 Usage
* Homepage -> shows products + hero  
* About us -> static page with text and image  
* etc  
* etc  
* etc  

---

## 📂 Project Structure
```
├── app
│   ├── about
│   │   └── page.tsx
│   ├── admin
│   │   ├── create-category
│   │   │   └── page.tsx
│   │   ├── create-product
│   │   │   └── page.tsx
│   │   ├── page.tsx
│   │   └── update-product
│   │       ├── [id]
│   │       │   └── page.tsx
│   │       └── page.tsx
│   ├── contact
│   │   └── page.tsx
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   ├── loading.tsx
│   ├── merchandise
│   │   └── page.tsx
│   ├── @modal
│   │   ├── (.)admin
│   │   │   ├── create-category
│   │   │   │   └── page.tsx
│   │   │   ├── create-product
│   │   │   │   └── page.tsx
│   │   │   └── update-product
│   │   │       ├── [id]
│   │   │       │   └── page.tsx
│   │   │       └── page.tsx
│   │   ├── default.tsx
│   │   └── (.)products
│   │       └── [slug]
│   │           └── page.tsx
│   ├── not-found.tsx
│   ├── page.tsx
│   └── products
│       ├── page.tsx
│       └── [slug]
│           └── page.tsx
├── components
│   ├── admin
│   │   ├── actions-menu.tsx
│   │   ├── categories-tab.tsx
│   │   ├── category-colums.tsx
│   │   ├── category-form.tsx
│   │   ├── product-columns.tsx
│   │   ├── product-form.tsx
│   │   ├── products-tab.tsx
│   │   └── success-message.tsx
│   ├── contact
│   │   ├── contact-form.tsx
│   │   └── success-message.tsx
│   ├── image-slider.tsx
│   ├── layout
│   │   ├── auth-toaster.tsx
│   │   ├── footer.tsx
│   │   ├── header.tsx
│   │   ├── index.ts
│   │   ├── logo.tsx
│   │   └── modal.tsx
│   ├── loading
│   │   ├── card-grid-skeleton.tsx
│   │   ├── loading-spinner.tsx
│   │   ├── multi-line-skeleton.tsx
│   │   └── product-card-skeleton.tsx
│   ├── loading-dots.tsx
│   ├── merchandise-card
│   │   ├── merchandise-card-loader.tsx
│   │   └── merchandise-card.tsx
│   ├── navigation
│   │   ├── basket-nav-item.tsx
│   │   ├── desktop-nav.tsx
│   │   ├── index.ts
│   │   ├── mobile-nav.tsx
│   │   ├── search-nav-item.tsx
│   │   ├── user-nav-item.tsx
│   │   └── utilities-nav-menu.tsx
│   ├── products
│   │   ├── add-to-cart-button.tsx
│   │   ├── card-grid.tsx
│   │   ├── category-select.tsx
│   │   ├── paginated-card-grid.tsx
│   │   ├── product-card.tsx
│   │   ├── product-detail.tsx
│   │   ├── product-filters.tsx
│   │   ├── product-image-carousel.tsx
│   │   └── product-pagination.tsx
│   ├── quantity-selector.tsx
│   ├── root-page
│   │   ├── featured-products.tsx
│   │   ├── hero-img-text.tsx
│   │   ├── hero.tsx
│   │   └── new-products.tsx
│   ├── table
│   │   ├── data-table.tsx
│   │   ├── expandable-cell.tsx
│   │   └── sortable-column-header.tsx
│   ├── text-outliner.tsx
│   └── ui
│       ├── accordion.tsx
│       ├── alert-dialog.tsx
│       ├── alert.tsx
│       ├── button.tsx
│       ├── card.tsx
│       ├── carousel.tsx
│       ├── command.tsx
│       ├── dialog.tsx
│       ├── disabled-tooltip-button.tsx
│       ├── dropdown-menu.tsx
│       ├── hover-prefetch-link.tsx
│       ├── input.tsx
│       ├── label.tsx
│       ├── navigation-menu.tsx
│       ├── pagination.tsx
│       ├── separator.tsx
│       ├── sheet.tsx
│       ├── sidebar.tsx
│       ├── skeleton.tsx
│       ├── table.tsx
│       ├── tabs.tsx
│       ├── textarea.tsx
│       └── tooltip.tsx
├── fonts
│   └── Icons Social Media 15-COLR.ttf
├── hooks
│   └── use-mobile.ts
├── lib
│   ├── actions
│   │   ├── cart.ts
│   │   ├── contact-form.ts
│   │   ├── products.ts
│   │   └── search.ts
│   ├── constants
│   │   ├── assets.ts
│   │   ├── routes.ts
│   │   └── searchParams.ts
│   ├── data
│   │   ├── graphql
│   │   │   ├── graphql-fetch.ts
│   │   │   ├── mutations.ts
│   │   │   └── queries.ts
│   │   ├── helpers.ts
│   │   ├── pages-nav-data.ts
│   │   ├── product-data-service.ts
│   │   └── services
│   │       ├── api-product-service.ts
│   │       └── mock-product-service.ts
│   ├── hooks
│   │   ├── products-data-client.ts
│   │   └── use-cart.ts
│   ├── mocks
│   │   ├── experimental-data.ts
│   │   ├── fallback-data
│   │   │   └── fallback-data-manager.ts
│   │   └── mock-data.ts
│   ├── schemas
│   │   ├── contactForm.ts
│   │   └── product-form.ts
│   ├── types
│   │   ├── product.ts
│   │   ├── table.d.ts
│   │   └── types.ts
│   └── utils.ts
└── middleware.ts
```

---

## 📈 Workflow
* 👥 Group work in agile sprints (SCRUM)  
* 🌱 Feature branches  
* 🔍 PR + code review  
* DSUs  
* Keep team meeting open  

---

## 🗓 Sprint Plan

### Sprint 1 - Basic Structure
* Set up Next.js project  
* Created menus & static pages  

### Sprint 2 - Basic Structure
* Uses [slug] for dynamic routing  
* Filter and search for /products  

### Sprint 3 - Basic Structure
* Created /admin route with a DataTable  
* Create, Update, and Delete functionality for products with server actions  
* Zod validation on create/update forms  

### Sprint 4 - Fine Tuning
* WAVE and Lighthouse analysis  
* Refactor fetch and GraphQL functions  
* Responsive styling  

---

## 🤝 Contributing
Want to contribute?  

1. Fork the project  
2. Create a feature branch (`git checkout ......`)  
3. Commit & push  
4. Send a Pull Request  

---

## 📚 Learnings
* Difference between Server & Client Components in Next.js  
* Agile methods  
* API  
* Responsiveness  

---

## 📜 License
This project is developed for educational purposes and is not intended for production.  

---

## ✍️ Contact
Any contact details  
