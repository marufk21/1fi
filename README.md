# 1Fi - E-commerce Application

A full-stack Next.js application for browsing and purchasing smartphones with EMI plans.

## Features

- **Product Catalog**: Browse through featured smartphones with detailed information
- **Product Details**: View comprehensive product specifications, color options, and storage variants
- **EMI Plans**: Multiple financing options backed by mutual funds
- **Real-time Pricing**: Dynamic price calculation based on selected storage options
- **Responsive Design**: Fully responsive UI built with Tailwind CSS
- **Database Integration**: PostgreSQL/SQLite database with Prisma ORM
- **API Routes**: Built-in Next.js API routes for backend functionality

## Tech Stack

### Frontend
- **Next.js 16** - React framework with App Router
- **React 19** - UI library
- **TanStack Query** - Data fetching and state management
- **Tailwind CSS 4** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Lucide React** - Icon library

### Backend
- **Next.js API Routes** - Serverless API endpoints
- **Prisma** - Type-safe ORM
- **SQLite** - Local database (can be switched to PostgreSQL)

## Getting Started

### Prerequisites
- Node.js 22.x or later
- npm or pnpm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up the database:
```bash
# Generate Prisma client
npm run prisma:generate

# Run migrations
npm run prisma:migrate

# Seed the database with sample products
npm run prisma:seed
```

3. Start the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint
- `npm run prisma:generate` - Generate Prisma client
- `npm run prisma:migrate` - Run database migrations
- `npm run prisma:studio` - Open Prisma Studio (database GUI)
- `npm run prisma:seed` - Seed the database with sample data

## Project Structure

```
1fi/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   └── products/      # Products API endpoints
│   ├── products/          # Product pages
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ui/               # UI components (Button, Card, etc.)
│   ├── product-list.tsx  # Product list component
│   └── product-details.tsx # Product details component
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
│   ├── api.ts           # API client
│   ├── currency.ts      # Currency formatting
│   ├── prisma.ts        # Prisma client
│   └── utils.ts         # General utilities
├── prisma/              # Database schema and migrations
│   ├── schema.prisma    # Prisma schema
│   └── seed.ts          # Database seeder
├── providers/           # React context providers
├── public/              # Static assets
└── types/               # TypeScript type definitions
```

## Database Schema

The application uses a normalized database schema with the following models:

- **Product** - Main product information
- **Color** - Product color variants
- **StorageOption** - Storage capacity options with price adjustments
- **EmiPlan** - Financing plans with different durations
- **User** - User accounts (for future features)

## API Endpoints

- `GET /api/products` - Fetch all products with relations
- `GET /api/products/[id]` - Fetch a single product by ID

## Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL="file:./dev.db"
```

For production, use PostgreSQL:
```env
DATABASE_URL="postgresql://user:password@host:5432/database"
```

## Deployment

The application is optimized for deployment on Vercel:

1. Push your code to GitHub
2. Import the project in Vercel
3. Configure environment variables
4. Deploy

## License

Private - All rights reserved
