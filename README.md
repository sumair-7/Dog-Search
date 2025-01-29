# Fetch Frontend Take-Home Exercise

## Overview

This is a React application demonstrating:
- User login via a POST /auth/login endpoint (HttpOnly cookie-based auth).
- Dog searching with sorting by breed, name, or age, plus pagination.
- Adding dogs to a favorites list and generating a match on a separate page.
- Location fetching/searching via ZIP codes or city/state filters.

## Requirements

- Node.js (version 14+) and npm (version 6+) recommended.

## Installation and Local Setup

1. **Clone** or **download** this repository.
2. **Install dependencies**:
3. **Start the development server**:
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. **Login** at `/login` with any name and email. An HttpOnly cookie will be set on success.
2. **Search dogs** at `/search`:
- Select a sort field (breed, name, or age).
- Toggle ascending/descending order.
- Paginate results via the next/prev buttons.
- Favorite any dogs you like.
3. **View your favorites** on the **Match** page (`/match`) and generate a single dog match.
4. **Fetch or search** location data at `/locations`:
- Enter multiple ZIP codes, separated by commas.
- Or filter by city/state, with pagination.

## Deployment

- **Build** for production:


- **Deploy** the `build/` folder to any static hosting provider (Netlify, Vercel, GitHub Pages, etc.).

