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

- **Next.js 16.0.3** - React framework with App Router for server-side rendering and API routes
- **React 19.2.0** - UI library for building interactive user interfaces
- **TypeScript 5.x** - Type-safe JavaScript for better development experience
- **TanStack Query 5.90.9** - Powerful data synchronization library for React (formerly React Query)
- **Tailwind CSS 4** - Utility-first CSS framework for rapid UI development
- **Radix UI** - Unstyled, accessible component primitives
  - `@radix-ui/react-scroll-area` - Accessible scroll area component
  - `@radix-ui/react-select` - Accessible select component
  - `@radix-ui/react-slot` - Slot component for composition
- **Lucide React 0.553.0** - Beautiful & consistent icon toolkit
- **Axios 1.13.2** - Promise-based HTTP client for API requests
- **class-variance-authority** - For building component variants
- **clsx & tailwind-merge** - Utility libraries for conditional classNames

### Backend

- **Next.js API Routes** - Serverless API endpoints built into Next.js
- **Prisma 6.19.0** - Next-generation ORM for Node.js and TypeScript
  - Type-safe database client
  - Database migrations
  - Prisma Studio for database management
- **PostgreSQL** - Primary database (configured in schema)
- **SQLite** - Alternative database for local development (via DATABASE_URL)

### Development Tools

- **ESLint 9** - Code linting with Next.js configuration
- **tsx 4.20.6** - TypeScript execution engine for running seed scripts
- **dotenv** - Environment variable management

## Setup and Run Instructions

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 22.x or later ([Download](https://nodejs.org/))
- **npm** (comes with Node.js) or **pnpm**
- **Git** (for cloning the repository)

### Step 1: Clone the Repository

```bash
git clone <repository-url>
cd 1fi
```

### Step 2: Install Dependencies

Install all required npm packages:

```bash
npm install
```

This will automatically run `prisma generate` after installation (via `postinstall` script).

### Step 3: Configure Environment Variables

Create a `.env` file in the root directory:

```bash
# For local development with SQLite
DATABASE_URL="file:./prisma/dev.db"
```

For production with PostgreSQL:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/database_name?schema=public"
```

### Step 4: Set Up the Database

Generate Prisma Client:

```bash
npm run prisma:generate
```

Run database migrations to create tables:

```bash
npm run prisma:migrate
```

This will:

- Create the database file (if using SQLite)
- Apply all migrations from `prisma/migrations/`
- Create all tables defined in `prisma/schema.prisma`

### Step 5: Seed the Database

Populate the database with sample product data:

```bash
npm run prisma:seed
```

This will:

- Clear existing products (if any)
- Load products from `public/api/products.json`
- Create products with their colors, storage options, and EMI plans

### Step 6: Start the Development Server

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

### Step 7: (Optional) Open Prisma Studio

To view and manage your database through a GUI:

```bash
npm run prisma:studio
```

This opens Prisma Studio at [http://localhost:5555](http://localhost:5555)

## Available Scripts

| Command                   | Description                                          |
| ------------------------- | ---------------------------------------------------- |
| `npm run dev`             | Start the Next.js development server with hot reload |
| `npm run build`           | Build the application for production                 |
| `npm run start`           | Start the production server (run after `build`)      |
| `npm run lint`            | Run ESLint to check code quality                     |
| `npm run prisma:generate` | Generate Prisma Client from schema                   |
| `npm run prisma:migrate`  | Create and apply database migrations                 |
| `npm run prisma:studio`   | Open Prisma Studio (database GUI)                    |
| `npm run prisma:seed`     | Seed the database with sample data                   |

## Project Structure

```
1fi/
├── app/                          # Next.js App Router
│   ├── api/                      # API routes
│   │   └── products/             # Products API endpoints
│   │       ├── route.ts          # GET /api/products
│   │       └── [id]/route.ts     # GET /api/products/[id]
│   ├── products/                 # Product pages
│   │   └── [id]/page.tsx         # Product detail page
│   ├── layout.tsx                # Root layout component
│   ├── page.tsx                  # Home page
│   ├── globals.css               # Global styles
│   └── favicon.ico               # Site favicon
├── components/                   # React components
│   ├── ui/                       # Reusable UI components
│   │   ├── badge.tsx
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   └── scroll-area.tsx
│   ├── product-list.tsx          # Product listing component
│   └── product-details.tsx       # Product detail component
├── hooks/                        # Custom React hooks
│   └── use-products.ts          # Products data fetching hook
├── lib/                          # Utility functions and configurations
│   ├── api.ts                    # API client configuration
│   ├── currency.ts               # Currency formatting utilities
│   ├── prisma.ts                 # Prisma client singleton
│   └── utils.ts                  # General utility functions
├── prisma/                       # Database schema and migrations
│   ├── schema.prisma             # Prisma schema definition
│   ├── seed.ts                   # Database seeding script
│   ├── dev.db                    # SQLite database file (generated)
│   └── migrations/               # Database migration history
│       └── 20251114203638_init/  # Initial migration
│           └── migration.sql
├── providers/                    # React context providers
│   └── query-provider.tsx        # TanStack Query provider
├── public/                       # Static assets
│   ├── api/
│   │   └── products.json         # Seed data source
│   └── *.svg                     # SVG icons
├── types/                        # TypeScript type definitions
│   └── product.ts               # Product type definitions
├── components.json               # shadcn/ui configuration
├── next.config.ts                # Next.js configuration
├── package.json                  # Project dependencies and scripts
├── tsconfig.json                 # TypeScript configuration
├── eslint.config.mjs             # ESLint configuration
└── README.md                     # This file
```

## Database Schema

The application uses a normalized relational database schema with the following models:

### User Model

```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

**Fields:**

- `id` (String, Primary Key): Unique identifier using CUID
- `email` (String, Unique): User email address
- `name` (String, Optional): User's full name
- `createdAt` (DateTime): Timestamp when user was created
- `updatedAt` (DateTime): Timestamp when user was last updated

### Product Model

```prisma
model Product {
  id             String          @id
  name           String
  brand          String
  tag            String?
  description    String
  price          Int
  originalPrice  Int
  savings        Int
  image          String
  colors         Color[]
  storageOptions StorageOption[]
  emiPlans       EmiPlan[]
  createdAt      DateTime        @default(now())
  updatedAt      DateTime        @updatedAt
}
```

**Fields:**

- `id` (String, Primary Key): Product identifier (e.g., "google-pixel-9-pro")
- `name` (String): Product name
- `brand` (String): Brand name (e.g., "Google", "Apple", "Samsung")
- `tag` (String, Optional): Product tag (e.g., "NEW", "BESTSELLER")
- `description` (String): Product description
- `price` (Int): Current price in smallest currency unit (paise for INR)
- `originalPrice` (Int): Original price before discount
- `savings` (Int): Amount saved (originalPrice - price)
- `image` (String): Product image URL
- `colors` (Relation): One-to-many relationship with Color model
- `storageOptions` (Relation): One-to-many relationship with StorageOption model
- `emiPlans` (Relation): One-to-many relationship with EmiPlan model
- `createdAt` (DateTime): Timestamp when product was created
- `updatedAt` (DateTime): Timestamp when product was last updated

### Color Model

```prisma
model Color {
  id        String  @id
  name      String
  hexCode   String
  productId String
  product   Product @relation(fields: [productId], references: [id], onDelete: Cascade)

  @@unique([productId, id])
}
```

**Fields:**

- `id` (String, Primary Key): Color identifier (e.g., "obsidian", "porcelain")
- `name` (String): Color name (e.g., "Obsidian", "Porcelain")
- `hexCode` (String): Hex color code (e.g., "#1a1a1a")
- `productId` (String, Foreign Key): Reference to Product
- `product` (Relation): Many-to-one relationship with Product

**Constraints:**

- Unique constraint on `[productId, id]` to prevent duplicate colors per product
- Cascade delete: Deleting a product deletes all its colors

### StorageOption Model

```prisma
model StorageOption {
  id              String  @id
  size            String
  priceAdjustment Int
  productId       String
  product         Product @relation(fields: [productId], references: [id], onDelete: Cascade)

  @@unique([productId, id])
}
```

**Fields:**

- `id` (String, Primary Key): Storage identifier (e.g., "256gb", "512gb")
- `size` (String): Storage size display (e.g., "256GB", "512GB", "1TB")
- `priceAdjustment` (Int): Price adjustment in smallest currency unit (0 for base, positive for upgrades)
- `productId` (String, Foreign Key): Reference to Product
- `product` (Relation): Many-to-one relationship with Product

**Constraints:**

- Unique constraint on `[productId, id]` to prevent duplicate storage options per product
- Cascade delete: Deleting a product deletes all its storage options

### EmiPlan Model

```prisma
model EmiPlan {
  id             String  @id @default(cuid())
  durationMonths Int
  monthlyAmount  Int
  cashback       Int
  interestRate   Float
  productId      String
  product        Product @relation(fields: [productId], references: [id], onDelete: Cascade)
}
```

**Fields:**

- `id` (String, Primary Key): Unique identifier using CUID
- `durationMonths` (Int): EMI duration in months (e.g., 3, 6, 12, 24, 36, 48, 60)
- `monthlyAmount` (Int): Monthly payment amount in smallest currency unit
- `cashback` (Int): Cashback amount in smallest currency unit
- `interestRate` (Float): Annual interest rate percentage (0.0 for no-interest plans)
- `productId` (String, Foreign Key): Reference to Product
- `product` (Relation): Many-to-one relationship with Product

**Constraints:**

- Cascade delete: Deleting a product deletes all its EMI plans

### Database Relationships

```
Product (1) ────< (Many) Color
Product (1) ────< (Many) StorageOption
Product (1) ────< (Many) EmiPlan
```

## API Endpoints

All API endpoints are RESTful and return JSON responses.

### Base URL

- Development: `http://localhost:3000`
- Production: `https://your-domain.com`

### 1. Get All Products

**Endpoint:** `GET /api/products`

**Description:** Retrieves all products with their related colors, storage options, and EMI plans.

**Request:**

```http
GET /api/products HTTP/1.1
Host: localhost:3000
```

**Response:** `200 OK`

```json
{
  "products": [
    {
      "id": "google-pixel-9-pro",
      "name": "Google Pixel 9 Pro",
      "brand": "Google",
      "tag": "NEW",
      "description": "Pure Android experience with Google AI and exceptional camera",
      "price": 89900,
      "originalPrice": 99900,
      "savings": 10000,
      "image": "https://rukminim2.flixcart.com/image/406/406/xif0q/mobile/0/m/t/-original-imahggevg3kpzazr.jpeg?q=70&crop=false",
      "createdAt": "2024-11-14T20:36:38.000Z",
      "updatedAt": "2024-11-14T20:36:38.000Z",
      "colors": [
        {
          "id": "google-pixel-9-pro-obsidian",
          "name": "Obsidian",
          "hexCode": "#1a1a1a",
          "productId": "google-pixel-9-pro"
        },
        {
          "id": "google-pixel-9-pro-porcelain",
          "name": "Porcelain",
          "hexCode": "#f5f5f5",
          "productId": "google-pixel-9-pro"
        },
        {
          "id": "google-pixel-9-pro-hazel",
          "name": "Hazel",
          "hexCode": "#8b7355",
          "productId": "google-pixel-9-pro"
        }
      ],
      "storageOptions": [
        {
          "id": "google-pixel-9-pro-256gb",
          "size": "256GB",
          "priceAdjustment": 0,
          "productId": "google-pixel-9-pro"
        },
        {
          "id": "google-pixel-9-pro-512gb",
          "size": "512GB",
          "priceAdjustment": 10000,
          "productId": "google-pixel-9-pro"
        }
      ],
      "emiPlans": [
        {
          "id": "clx1234567890",
          "durationMonths": 3,
          "monthlyAmount": 29967,
          "cashback": 4000,
          "interestRate": 0,
          "productId": "google-pixel-9-pro"
        },
        {
          "id": "clx1234567891",
          "durationMonths": 6,
          "monthlyAmount": 14983,
          "cashback": 4000,
          "interestRate": 0,
          "productId": "google-pixel-9-pro"
        },
        {
          "id": "clx1234567892",
          "durationMonths": 12,
          "monthlyAmount": 7492,
          "cashback": 4000,
          "interestRate": 0,
          "productId": "google-pixel-9-pro"
        },
        {
          "id": "clx1234567893",
          "durationMonths": 24,
          "monthlyAmount": 3746,
          "cashback": 4000,
          "interestRate": 0,
          "productId": "google-pixel-9-pro"
        },
        {
          "id": "clx1234567894",
          "durationMonths": 36,
          "monthlyAmount": 2865,
          "cashback": 4000,
          "interestRate": 10.5,
          "productId": "google-pixel-9-pro"
        },
        {
          "id": "clx1234567895",
          "durationMonths": 48,
          "monthlyAmount": 2258,
          "cashback": 4000,
          "interestRate": 10.5,
          "productId": "google-pixel-9-pro"
        },
        {
          "id": "clx1234567896",
          "durationMonths": 60,
          "monthlyAmount": 1894,
          "cashback": 4000,
          "interestRate": 10.5,
          "productId": "google-pixel-9-pro"
        }
      ]
    }
    // ... more products
  ]
}
```

**Error Response:** `500 Internal Server Error`

```json
{
  "error": "Failed to fetch products",
  "details": "Error message here"
}
```

---

### 2. Get Product by ID

**Endpoint:** `GET /api/products/[id]`

**Description:** Retrieves a single product by its ID with all related data.

**Path Parameters:**

- `id` (string, required): Product identifier (e.g., "google-pixel-9-pro")

**Request:**

```http
GET /api/products/google-pixel-9-pro HTTP/1.1
Host: localhost:3000
```

**Response:** `200 OK`

```json
{
  "id": "google-pixel-9-pro",
  "name": "Google Pixel 9 Pro",
  "brand": "Google",
  "tag": "NEW",
  "description": "Pure Android experience with Google AI and exceptional camera",
  "price": 89900,
  "originalPrice": 99900,
  "savings": 10000,
  "image": "https://rukminim2.flixcart.com/image/406/406/xif0q/mobile/0/m/t/-original-imahggevg3kpzazr.jpeg?q=70&crop=false",
  "createdAt": "2024-11-14T20:36:38.000Z",
  "updatedAt": "2024-11-14T20:36:38.000Z",
  "colors": [
    {
      "id": "google-pixel-9-pro-obsidian",
      "name": "Obsidian",
      "hexCode": "#1a1a1a",
      "productId": "google-pixel-9-pro"
    },
    {
      "id": "google-pixel-9-pro-porcelain",
      "name": "Porcelain",
      "hexCode": "#f5f5f5",
      "productId": "google-pixel-9-pro"
    },
    {
      "id": "google-pixel-9-pro-hazel",
      "name": "Hazel",
      "hexCode": "#8b7355",
      "productId": "google-pixel-9-pro"
    }
  ],
  "storageOptions": [
    {
      "id": "google-pixel-9-pro-256gb",
      "size": "256GB",
      "priceAdjustment": 0,
      "productId": "google-pixel-9-pro"
    },
    {
      "id": "google-pixel-9-pro-512gb",
      "size": "512GB",
      "priceAdjustment": 10000,
      "productId": "google-pixel-9-pro"
    }
  ],
  "emiPlans": [
    {
      "id": "clx1234567890",
      "durationMonths": 3,
      "monthlyAmount": 29967,
      "cashback": 4000,
      "interestRate": 0,
      "productId": "google-pixel-9-pro"
    }
    // ... more EMI plans
  ]
}
```

**Error Response:** `404 Not Found`

```json
{
  "error": "Product not found"
}
```

**Error Response:** `500 Internal Server Error`

```json
{
  "error": "Failed to fetch product",
  "details": "Error message here"
}
```

---

### Testing API Endpoints

You can test the API endpoints using:

**cURL:**

```bash
# Get all products
curl http://localhost:3000/api/products

# Get specific product
curl http://localhost:3000/api/products/google-pixel-9-pro
```

**Browser:**

- Navigate to `http://localhost:3000/api/products`
- Navigate to `http://localhost:3000/api/products/google-pixel-9-pro`

**Postman/Insomnia:**

- Create GET requests to the endpoints above

## Seed Data

The database is seeded with sample smartphone products from `public/api/products.json`. The seed script includes:

- **3 Products**: Google Pixel 9 Pro, iPhone 17 Pro, Samsung Galaxy S24 Ultra
- **Multiple Colors**: Each product has 3-4 color variants
- **Storage Options**: 2-3 storage variants per product (256GB, 512GB, 1TB)
- **EMI Plans**: 7 financing options per product (3, 6, 12, 24, 36, 48, 60 months)

To re-seed the database:

```bash
npm run prisma:seed
```

## Environment Variables

Create a `.env` file in the root directory:

### Development (SQLite)

```env
DATABASE_URL="file:./prisma/dev.db"
```

### Production (PostgreSQL)

```env
DATABASE_URL="postgresql://username:password@host:5432/database_name?schema=public"
```

**Note:** Never commit `.env` files to version control. Add `.env` to `.gitignore`.

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project in [Vercel](https://vercel.com)
3. Configure environment variables in Vercel dashboard:
   - `DATABASE_URL`: Your PostgreSQL connection string
4. Deploy

Vercel will automatically:

- Detect Next.js
- Run `npm install`
- Run `prisma generate` (via postinstall)
- Build the application
- Deploy

### Other Platforms

For other platforms (AWS, Railway, Render, etc.):

1. Set up a PostgreSQL database
2. Configure `DATABASE_URL` environment variable
3. Run migrations: `npm run prisma:migrate`
4. Seed database: `npm run prisma:seed` (optional)
5. Build: `npm run build`
6. Start: `npm run start`

## License

Private - All rights reserved
