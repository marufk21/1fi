"use client";

import Link from "next/link";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Smartphone } from "lucide-react";
import { ProductList } from "@/components/product-list";
import { useProducts } from "@/hooks/use-products";

export default function HomePage() {
  const { data: products = [], isLoading, error } = useProducts();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20 text-muted-foreground">
        Loading products...
      </div>
    );
  }

  if (error) {
    return (
      <Card className="border-destructive/40 bg-destructive/5 text-destructive">
        <CardHeader>
          <CardTitle>Something went wrong</CardTitle>
          <CardDescription className="text-destructive/70">
            {error instanceof Error
              ? error.message
              : "Unable to load products right now. Please try again."}
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <div className="space-y-10">
      <header className="flex items-center gap-4">
        <div className="bg-primary/10 text-primary grid size-10 place-items-center rounded-lg">
          <Smartphone className="size-5" />
        </div>
        <div>
          <p className="text-sm font-medium text-muted-foreground">
            Explore the latest devices
          </p>
          <h1 className="text-2xl font-semibold md:text-3xl">
            Featured Smartphones
          </h1>
        </div>
      </header>

      <ProductList
        products={products}
        onSelect={(productId) => {
          window.location.href = `/products/${productId}`;
        }}
      />
    </div>
  );
}
