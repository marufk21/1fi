import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

async function main() {
  const productsJsonPath = path.join(process.cwd(), 'public/api/products.json');
  const productsData = JSON.parse(fs.readFileSync(productsJsonPath, 'utf-8'));

  console.log('🗑️  Clearing old products...');
  // Delete all existing products (cascade will delete related colors, storage, emi plans)
  await prisma.product.deleteMany({});
  console.log('✓ Old products cleared');

  console.log('🌱 Seeding database with new products...');

  for (const product of productsData.products) {

    await prisma.product.create({
      data: {
        id: product.id,
        name: product.name,
        brand: product.brand,
        tag: product.tag,
        description: product.description,
        price: product.price,
        originalPrice: product.originalPrice,
        savings: product.savings,
        image: product.image,
        colors: {
          create: product.colors.map((color: any) => ({
            id: `${product.id}-${color.id}`,
            name: color.name,
            hexCode: color.hexCode,
          })),
        },
        storageOptions: {
          create: product.storageOptions.map((storage: any) => ({
            id: `${product.id}-${storage.id}`,
            size: storage.size,
            priceAdjustment: storage.priceAdjustment,
          })),
        },
        emiPlans: {
          create: product.emiPlans.map((emi: any) => ({
            durationMonths: emi.durationMonths,
            monthlyAmount: emi.monthlyAmount,
            cashback: emi.cashback,
            interestRate: emi.interestRate,
          })),
        },
      },
    });
    console.log(`✓ Created product: ${product.name}`);
  }

  console.log('✅ Seeding completed!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
