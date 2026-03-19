# VELOURA — Luxury Bag Store

A modern Single Page Application built with Vue 3, TypeScript, Tailwind CSS and Vite.

## Tech Stack
- Vue 3 (Composition API)
- TypeScript
- Vite
- Tailwind CSS
- Pinia (State Management)
- Vue Router

## Features
- Browse luxury bag collection from DummyJSON API
- Real-time search
- Filter by category
- Product detail page with image gallery
- Add to cart with persistent storage
- Authentication simulation with JWT token
- Dark mode toggle
- Fully responsive (Mobile, Tablet, Desktop)

## How to Run

### Install dependencies
```
npm install
```

### Run development server
```
npm run dev
```

### Build for production
```
npm run build
```

## API
This project uses [DummyJSON](https://dummyjson.com) public API.
- Products: https://dummyjson.com/products/category/womens-bags
- Auth: https://dummyjson.com/auth/login

## Test Login Credentials
- Username: emilys
- Password: emilyspass

## Project Structure
```
src/
├── components/
│   ├── NavBar.vue
│   ├── ProductCard.vue
│   ├── FilterBar.vue
│   ├── SearchBar.vue
│   ├── CartDrawer.vue
│   └── CartItem.vue
├── views/
│   ├── HomeView.vue
│   ├── ProductDetail.vue
│   └── LoginView.vue
├── stores/
│   ├── cart.ts
│   └── auth.ts
├── composables/
│   └── useProducts.ts
├── router/
│   └── index.ts
└── types/
    └── index.ts
```

## GitHub Repository
https://github.com/YOURUSERNAME/bag-store