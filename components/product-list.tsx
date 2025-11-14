"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { formatMoney } from "@/lib/currency";
import { cn } from "@/lib/utils";
import type { Product } from "@/types/product";
import { useState } from "react";

type ProductListProps = {
  products: Product[];
  selectedProductId?: string;
  onSelect: (productId: string) => void;
};

export const ProductList = ({
  products,
  selectedProductId,
  onSelect,
}: ProductListProps) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section>
      <div className="grid gap-3 sm:gap-4 md:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => {
          const isSelected = product.id === selectedProductId;
          const isHovered = hoveredId === product.id;

          return (
            <Card
              key={product.id}
              role="button"
              tabIndex={0}
              onClick={() => onSelect(product.id)}
              onMouseEnter={() => setHoveredId(product.id)}
              onMouseLeave={() => setHoveredId(null)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  onSelect(product.id);
                }
              }}
              className={cn(
                "group overflow-hidden border-2 bg-white transition-all duration-300 cursor-pointer",
                "hover:shadow-2xl hover:-translate-y-1 focus-visible:border-primary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/20",
                "active:scale-[0.98]",
                isSelected
                  ? "border-primary shadow-xl shadow-primary/20 -translate-y-1"
                  : "border-gray-200 hover:border-primary/60"
              )}
            >
              <div className="relative overflow-hidden">
                <div className="bg-white aspect-[4/5] w-full overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    className={cn(
                      "h-full w-full object-contain transition-transform duration-500 ease-out",
                      isHovered || isSelected ? "scale-105" : "scale-100"
                    )}
                  />
                </div>
                
                <div
                  className={cn(
                    "absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent transition-opacity duration-300",
                    isHovered || isSelected ? "opacity-100" : "opacity-0"
                  )}
                />
                
                {product.tag ? (
                  <Badge className={cn(
                    "absolute left-3 top-3 shadow-lg backdrop-blur-sm transition-all duration-300",
                    isHovered || isSelected ? "scale-110" : "scale-100"
                  )}>
                    {product.tag}
                  </Badge>
                ) : null}
                
                {isSelected && (
                  <div className="absolute right-3 top-3 bg-primary text-primary-foreground rounded-full p-1.5 shadow-lg animate-in zoom-in duration-300">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                )}
              </div>
              
              <CardContent className="space-y-2.5 px-4 pt-3 pb-4 sm:px-5 sm:pt-4 sm:pb-4">
                <Badge 
                  variant="outline" 
                  className={cn(
                    "text-xs font-medium transition-all duration-300",
                    isHovered && "bg-primary/5 border-primary/30"
                  )}
                >
                  {product.brand}
                </Badge>
                
                <h3 className={cn(
                  "text-lg sm:text-xl font-semibold leading-tight transition-colors duration-300 line-clamp-2",
                  isHovered && "text-primary"
                )}>
                  {product.name}
                </h3>
                
                <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                  {product.description}
                </p>

                <div className="space-y-1.5 pt-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <div className={cn(
                      "text-xl sm:text-2xl font-bold text-primary transition-all duration-300",
                      isHovered && "scale-105"
                    )}>
                      {formatMoney(product.price)}
                    </div>
                    <span className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
                      </svg>
                      Save {formatMoney(product.savings)}
                    </span>
                  </div>
                  
                  <p className="text-xs sm:text-sm text-muted-foreground line-through">
                    {formatMoney(product.originalPrice)}
                  </p>
                  
                  <div className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-emerald-700 bg-emerald-50/50 px-2.5 py-1.5 rounded-md">
                    <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                    <span className="whitespace-nowrap">
                      EMI from {formatMoney(product.emiPlans[2]?.monthlyAmount ?? product.price / 12)}/mo
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
};
