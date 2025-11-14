"use client";

import { useMemo, useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ProductDetails } from "@/components/product-details";
import { useProduct } from "@/hooks/use-products";
import { useParams, useRouter } from "next/navigation";

export default function ProductDetailPage() {
  const router = useRouter();
  const params = useParams();
  const productId = params.id as string;
  const { data: product, isLoading, error } = useProduct(productId);
  const [selectedColorId, setSelectedColorId] = useState<string>();
  const [selectedStorageId, setSelectedStorageId] = useState<string>();
  const [selectedEmiPlanMonths, setSelectedEmiPlanMonths] = useState<number>();

  useEffect(() => {
    if (product) {
      setSelectedColorId(product.colors[0]?.id);
      setSelectedStorageId(product.storageOptions[0]?.id);
      setSelectedEmiPlanMonths(product.emiPlans[0]?.durationMonths);
    }
  }, [product]);

  const selectedEmiPlan = useMemo(
    () =>
      product?.emiPlans.find(
        (plan) => plan.durationMonths === selectedEmiPlanMonths
      ),
    [product, selectedEmiPlanMonths]
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20 text-muted-foreground">
        Loading product...
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
              : "Unable to load product right now. Please try again."}
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  if (!product) {
    return (
      <div className="space-y-6">
        <Button
          variant="ghost"
          onClick={() => router.push("/")}
          className="gap-2 text-sm"
        >
          <ArrowLeft className="size-4" /> Back to products
        </Button>
        <Card>
          <CardHeader>
            <CardTitle>Product not found</CardTitle>
            <CardDescription>
              The product you are looking for may have been removed or is
              unavailable.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12 sm:space-y-8 lg:pb-16">
      <Button
        variant="ghost"
        size="lg"
        className="group -ml-2 gap-2 text-sm font-medium sm:text-base"
        onClick={() => router.push("/")}
      >
        <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1 sm:size-5" />
        Back to products
      </Button>

      <ProductDetails
        product={product}
        selectedColorId={selectedColorId}
        selectedStorageId={selectedStorageId}
        selectedEmiPlan={selectedEmiPlan}
        onColorChange={setSelectedColorId}
        onStorageChange={setSelectedStorageId}
        onEmiPlanChange={setSelectedEmiPlanMonths}
      />
    </div>
  );
}
