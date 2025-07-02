# Intimacy Toy Shop - Dubai UAE

## Project Overview

Premium intimate wellness products catalog for Dubai, UAE market. Features include product browsing, filtering, sharing capabilities, and WhatsApp integration for orders.

## Features

- **Product Catalog**: Browse premium adult products with detailed information
- **Advanced Filtering**: Filter by category, price range, and search terms
- **Media Gallery**: High-quality images and videos for each product
- **WhatsApp Integration**: Direct ordering and customer support via WhatsApp
- **Share Products**: Share individual products via social media and messaging
- **Mobile Optimized**: Responsive design for all devices
- **Privacy Focused**: Anonymous packaging and discrete delivery

## Tech Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Radix UI primitives with shadcn/ui
- **Build Tool**: Vite
- **State Management**: React hooks and context

## Key Components

- **Product Cards**: Interactive product display with hover effects
- **Media Carousel**: Video and image gallery with fullscreen support
- **Filter System**: Category and price range filtering
- **Share System**: Multi-platform sharing capabilities
- **Admin Panel**: Product management interface

## Installation

```sh
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Product Management

Products are managed through the data file at `src/data/products.ts`. Each product includes:
- SKU and specifications
- Feature descriptions
- Price ranges
- Media assets (images/videos)

## Media Assets

- **Images**: Stored in `public/images/` with naming convention `{sku}.jpeg`
- **Videos**: Stored in `public/videos/` with naming convention `{sku}.mp4`
- **Thumbnails**: Multiple images per product supported

## Deployment

The application is optimized for static hosting and can be deployed to any modern hosting platform.

## Privacy & Security

- No user data collection
- Anonymous browsing
- Secure payment via cash on delivery
- Discrete packaging and delivery

## Contact

For business inquiries, contact via WhatsApp integration within the application.