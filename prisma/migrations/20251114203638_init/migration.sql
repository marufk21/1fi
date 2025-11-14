-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "tag" TEXT,
    "description" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "originalPrice" INTEGER NOT NULL,
    "savings" INTEGER NOT NULL,
    "image" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Color" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "hexCode" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    CONSTRAINT "Color_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "StorageOption" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "size" TEXT NOT NULL,
    "priceAdjustment" INTEGER NOT NULL,
    "productId" TEXT NOT NULL,
    CONSTRAINT "StorageOption_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "EmiPlan" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "durationMonths" INTEGER NOT NULL,
    "monthlyAmount" INTEGER NOT NULL,
    "cashback" INTEGER NOT NULL,
    "interestRate" REAL NOT NULL,
    "productId" TEXT NOT NULL,
    CONSTRAINT "EmiPlan_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Color_productId_id_key" ON "Color"("productId", "id");

-- CreateIndex
CREATE UNIQUE INDEX "StorageOption_productId_id_key" ON "StorageOption"("productId", "id");
