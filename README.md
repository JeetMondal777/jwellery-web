## Project Overview

Welcome to **Jewels**, a premium-looking jewelry e-commerce platform built with the MERN stack and Next.js. This project showcases a storytelling homepage, a comprehensive product catalog, individual product detail pages, shopping cart functionality, and seamless checkout flow.

## What You Can Do Here

- **Browse Collections:** Explore a curated selection of necklaces, earrings, rings, and bracelets.  
- **View Product Details:** Read rich, SEO-friendly descriptions, view high-resolution images, and examine product specifications.  
- **Add to Cart:** Select items, choose quantities, and add products to your shopping cart.  
- **Checkout:** Fill in delivery details, review your order summary, and complete payment securely.  
- **Responsive Design:** Enjoy an optimized experience on both desktop and mobile devices.

## Key Features

- **Storytelling Homepage:** Engaging hero section with brand narrative and featured products.  
- **All Products Page:** Grid layout displaying all available jewelry pieces with filters and sorting.  
- **Individual Product Pages:** Detailed descriptions (150–200 words each), technical specs, and image gallery.  
- **User-Friendly Cart:** Editable cart with real-time price updates.  
- **Delivery Form:** Collects user shipping information with validation.  
- **Payment Integration:** Secure payment handling (stubbed or integrated).  
- **Mobile-First Design:** Fully responsive layouts using Tailwind CSS.

## Tech Stack

- **Frontend:** Next.js, React, Tailwind CSS, shadcn/ui  
- **Backend:** Node.js, Express, MongoDB (for persistence)  
- **Image Hosting:** Cloudinary (for product images)  
- **State Management:** React Context / Redux (as needed)  
- **Charts & Visualization:** Recharts (for any analytics/dashboard)

## Setup Instructions

1. **Clone the repository**  
   ```bash
   git clone https://github.com/your-username/elegant-jewels.git
   cd jwellery-web

# Frontend
```bash
cd frontend
npm install

# Backend
```bash
cd ../backend
npm install

# Backend Environment Variables 
```bash
# In one terminal
cd backend && npm run dev
MONGODB_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
PORT = your_port

# In one terminal
cd backend && npm run dev

# In another terminal
cd frontend && npm run dev
