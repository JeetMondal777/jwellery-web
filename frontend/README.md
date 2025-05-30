# Frontend README

## Overview

The frontend of **Jewels** is crafted with modern React, leveraging:

- **Font - Libre Baskerville** - used for making engaging and premium UI.
- **Zustand** for lightweight, scalable state management.
- **Tailwind CSS** for utility-first styling and responsive design.
- **GSAP (GreenSock Animation Platform)** for complex, performant animations.
- **Framer Motion** for declarative, interactive UI transitions.
- **React Hot Toast** for global toast notifications.
- **React Icons** for the icons used in the UI (e.g- wishlist, cart icon etc.).

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Development Server](#development-server)
- [Production Build](#production-build)
- [Project Structure](#project-structure)

## Prerequisites

- Node.js v16+ and npm v8++
- Yarn (optional)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/elegant-jewels-frontend.git
   cd elegant-jewels-frontend
   ```

2. Install dependencies:
   ```bash
    npm install
    # or yarn install
   ```

## Environment Variables
To run the development server, you'll need to set up environment variables. Create a `.env.development` file in the root directory with the following content:
```
VITE_API_URL=http://localhost:3000
```
Replace `http://localhost:3000` with your actual backend API URL.


## Development Server
To start the development server, run:
```bash
npm run dev
# or yarn dev
```
This will start the development server for frontend at `http://localhost:5137` or your own configured port.

## Production Build
To build the production version of the app, run:
```bash
npm run build
# or yarn build
```
This will create a production build in the `dist` folder.

## Project Structure
The project structure is as follows:
```
elegant-jewels-frontend/
├── public/
│   ├── favicon.ico
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── assets/
│   ├── components/
│   ├── pages/
│   ├── store/
│   ├── App.jsx
│   ├── main.jsx
│   └── router.js
├── .env.development
├── .env.production
├── .gitignore
├── package.json
└── README.md
```

## Routing & Notifications

Routing handled by react-router-dom in App.jsx. Key routes:

- / → Home

- /login → Login

- /registration → Registration

- /products → ProductPage

- /prod → ProdDetails

- /profile → ProfilePanel

- /cart → CartPage

- /wish → WishlistPage

- /order → OrderPage

Global toast notifications are configured using react-hot-toast centered at the top of the screen.

Additional Notes

Styling: Tailwind CSS with custom theming.

State Management: React Context is available; consider migrating to Redux for complex scenarios.

Testing: Jest and React Testing Library setup is available in /tests.

Feel free to extend routes by updating App.jsx and adding new page components.