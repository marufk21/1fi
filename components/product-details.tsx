"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import type { Product, ProductEmiPlan } from "@/types/product";
import { formatMoney } from "@/lib/currency";

type ProductDetailsProps = {
  product: Product;
  selectedColorId?: string;
  selectedStorageId?: string;
  selectedEmiPlan?: ProductEmiPlan;
  onColorChange: (colorId: string) => void;
  onStorageChange: (storageId: string) => void;
  onEmiPlanChange: (durationMonths: number) => void;
};

export const ProductDetails = ({
  product,
  selectedColorId,
  selectedStorageId,
  selectedEmiPlan,
  onColorChange,
  onStorageChange,
  onEmiPlanChange,
}: ProductDetailsProps) => {
  const [hoveredColorId, setHoveredColorId] = useState<string | null>(null);
  const [hoveredStorageId, setHoveredStorageId] = useState<string | null>(null);
  const [hoveredEmiPlan, setHoveredEmiPlan] = useState<number | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  const selectedStorage = product.storageOptions.find(
    (s) => s.id === selectedStorageId
  );
  const calculatedPrice =
    product.price + (selectedStorage?.priceAdjustment ?? 0);

  return (
    <section className="grid gap-6 lg:grid-cols-2 lg:gap-8 xl:gap-12">
      <div className="space-y-4 lg:space-y-6">
        <Card className="group overflow-hidden border-none bg-white shadow-lg transition-all duration-500 hover:shadow-2xl hover:-translate-y-1">
          <div className="relative aspect-square w-full overflow-hidden bg-white">
            {!imageLoaded && (
              <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800" />
            )}

            <img
              src={product.image}
              alt={product.name}
              onLoad={() => setImageLoaded(true)}
              className={cn(
                "h-full w-full object-contain transition-all duration-700 ease-out",
                imageLoaded ? "scale-100 opacity-100" : "scale-110 opacity-0",
                "group-hover:scale-105"
              )}
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            {product.tag ? (
              <Badge className="absolute left-4 top-4 shadow-lg backdrop-blur-sm transition-all group-hover:scale-110 lg:left-6 lg:top-6 animate-in slide-in-from-top-2 fade-in duration-700">
                {product.tag}
              </Badge>
            ) : null}
          </div>
        </Card>

        <Card className="bg-white shadow-md transition-all duration-300 hover:shadow-xl">
          <CardContent className="space-y-5 p-5 lg:p-6">
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                <svg
                  className="h-4 w-4 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                  />
                </svg>
                Select Color
              </label>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => {
                  const isSelected = selectedColorId === color.id;
                  const isHovered = hoveredColorId === color.id;

                  return (
                    <button
                      key={color.id}
                      onClick={() => onColorChange(color.id)}
                      onMouseEnter={() => setHoveredColorId(color.id)}
                      onMouseLeave={() => setHoveredColorId(null)}
                      className={cn(
                        "group relative flex items-center gap-2 rounded-lg border-2 px-4 py-2.5 transition-all duration-300",
                        "hover:-translate-y-0.5 active:scale-95",
                        isSelected
                          ? "border-primary bg-primary/10 shadow-md shadow-primary/20 scale-105"
                          : "border-slate-200 hover:border-primary/40 hover:shadow-md",
                        isHovered && !isSelected && "bg-slate-50"
                      )}
                    >
                      {color.hexCode && (
                        <span
                          className={cn(
                            "h-5 w-5 rounded-full border-2 border-white shadow-sm ring-1 ring-slate-200 transition-transform duration-300",
                            isSelected || isHovered
                              ? "scale-110 ring-2 ring-primary/30"
                              : "scale-100"
                          )}
                          style={{ backgroundColor: color.hexCode }}
                        />
                      )}
                      <span
                        className={cn(
                          "text-sm font-medium transition-colors duration-200",
                          isSelected ? "text-primary" : "text-slate-700"
                        )}
                      >
                        {color.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-3">
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                <svg
                  className="h-4 w-4 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
                  />
                </svg>
                Select Storage
              </label>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
                {product.storageOptions.map((storage) => {
                  const isSelected = selectedStorageId === storage.id;
                  const isHovered = hoveredStorageId === storage.id;

                  return (
                    <button
                      key={storage.id}
                      onClick={() => onStorageChange(storage.id)}
                      onMouseEnter={() => setHoveredStorageId(storage.id)}
                      onMouseLeave={() => setHoveredStorageId(null)}
                      className={cn(
                        "group relative flex flex-col items-center justify-center rounded-lg border-2 px-3 py-3 transition-all duration-300",
                        "hover:-translate-y-0.5 active:scale-95",
                        isSelected
                          ? "border-primary bg-primary/10 shadow-md shadow-primary/20 scale-105"
                          : "border-slate-200 hover:border-primary/40 hover:shadow-md",
                        isHovered && !isSelected && "bg-slate-50"
                      )}
                    >
                      <span
                        className={cn(
                          "text-base font-semibold transition-colors duration-200",
                          isSelected ? "text-primary" : "text-slate-900"
                        )}
                      >
                        {storage.size}
                      </span>
                      {storage.priceAdjustment > 0 && (
                        <span
                          className={cn(
                            "mt-0.5 text-xs font-medium transition-all duration-300",
                            isSelected || isHovered
                              ? "text-emerald-600 scale-110"
                              : "text-emerald-600"
                          )}
                        >
                          +{formatMoney(storage.priceAdjustment)}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6 lg:space-y-8">
        <div className="space-y-4">
          <Badge
            variant="outline"
            className="animate-in fade-in slide-in-from-left-2 text-xs font-semibold uppercase tracking-wide duration-500"
          >
            {product.brand}
          </Badge>
          <div className="space-y-2 animate-in fade-in slide-in-from-left-2 duration-700">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
              {product.name}
            </h1>
            <p className="text-sm leading-relaxed text-slate-600 sm:text-base lg:text-lg">
              {product.description}
            </p>
          </div>

          <div className="group rounded-xl bg-gradient-to-br from-primary/5 to-primary/10 p-4 py-0 transition-all hover:shadow-lg hover:from-primary/10 hover:to-primary/15 lg:p-6 animate-in fade-in slide-in-from-left-2 duration-1000">
            <div className="flex flex-wrap items-baseline gap-3 lg:gap-4">
              <span className="text-3xl font-bold text-primary transition-all duration-300 group-hover:scale-105 sm:text-4xl lg:text-5xl">
                {formatMoney(calculatedPrice)}
              </span>
              <span className="text-lg text-slate-400 line-through transition-colors duration-300 group-hover:text-slate-500 sm:text-xl">
                {formatMoney(
                  product.originalPrice +
                    (selectedStorage?.priceAdjustment ?? 0)
                )}
              </span>
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <Badge
                variant="secondary"
                className="group/badge bg-emerald-100 text-sm font-semibold text-emerald-700 transition-all duration-300 hover:scale-105 hover:bg-emerald-200"
              >
                <svg
                  className="mr-1 inline-block h-3.5 w-3.5 transition-transform duration-300 group-hover/badge:rotate-12"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z"
                    clipRule="evenodd"
                  />
                </svg>
                Save {formatMoney(product.savings)}
              </Badge>
              <span className="flex items-center gap-1 text-xs text-slate-600 sm:text-sm">
                <svg
                  className="h-3.5 w-3.5 text-emerald-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Inclusive of all taxes
              </span>
            </div>
          </div>
        </div>

        <Card className="bg-white shadow-lg transition-all  hover:shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <CardHeader className="space-y-2 p-5 lg:px-4 lg:py-2">
            <CardTitle className="flex items-center gap-2 text-lg font-bold text-slate-900 sm:text-xl">
              <svg
                className="h-5 w-5 text-primary animate-pulse"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                />
              </svg>
              <p className="text-sm text-slate-600">
                EMI Plans - Backed by Mutual Funds
              </p>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-5 pt-2 lg:p-6 lg:pt-0">
            <div className="relative">
              <div className="pointer-events-none absolute left-0 right-0 top-0 z-10 h-4 bg-gradient-to-b from-white to-transparent " />

              <ScrollArea className="h-[320px] sm:h-[360px] lg:h-[400px]">
                <div className="space-y-2.5 pr-3 pt-2 pb-2">
                  {product.emiPlans.map((plan) => {
                    const isSelected =
                      selectedEmiPlan?.durationMonths === plan.durationMonths;
                    const isHovered = hoveredEmiPlan === plan.durationMonths;

                    return (
                      <button
                        key={plan.durationMonths}
                        onClick={() => onEmiPlanChange(plan.durationMonths)}
                        onMouseEnter={() =>
                          setHoveredEmiPlan(plan.durationMonths)
                        }
                        onMouseLeave={() => setHoveredEmiPlan(null)}
                        className={cn(
                          "group flex w-full items-center justify-between gap-3 rounded-xl border-2 p-3.5 sm:p-4 shadow-sm transition-all duration-300",
                          "hover:-translate-y-0.5 hover:shadow-lg active:scale-[0.98]",
                          isSelected
                            ? "border-primary bg-primary/10 shadow-lg shadow-primary/20 scale-[1.02]"
                            : "border-slate-200 bg-white hover:border-primary/50",
                          isHovered && !isSelected && "bg-slate-50/50"
                        )}
                      >
                        <div className="flex-1 space-y-1 text-left min-w-0">
                          <div className="flex flex-wrap items-baseline gap-1.5">
                            <span
                              className={cn(
                                "text-lg font-bold transition-all duration-300 sm:text-xl lg:text-2xl",
                                isSelected
                                  ? "text-primary scale-105"
                                  : "text-slate-900",
                                isHovered && !isSelected && "text-primary/70"
                              )}
                            >
                              {formatMoney(plan.monthlyAmount)}
                            </span>
                            <span className="text-xs font-medium text-slate-500 sm:text-sm">
                              /month
                            </span>
                          </div>
                          <p className="text-xs text-slate-600 leading-relaxed">
                            <span className="font-medium">
                              {plan.durationMonths} months
                            </span>{" "}
                            •{" "}
                            <span
                              className={cn(
                                "transition-colors duration-300",
                                plan.interestRate === 0
                                  ? "font-semibold text-emerald-600"
                                  : "text-slate-600"
                              )}
                            >
                              {plan.interestRate}% interest
                            </span>{" "}
                            •{" "}
                            <span
                              className={cn(
                                "inline-flex items-center gap-0.5 transition-all duration-300",
                                isSelected && "text-primary font-medium"
                              )}
                            >
                              {isSelected && (
                                <svg
                                  className="h-3 w-3"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M13 10V3L4 14h7v7l9-11h-7z"
                                  />
                                </svg>
                              )}
                              Instant approval
                            </span>
                          </p>
                        </div>
                        <Badge
                          variant="outline"
                          className={cn(
                            "shrink-0 text-xs font-semibold transition-all duration-300 whitespace-nowrap",
                            isSelected
                              ? "border-emerald-300 bg-emerald-100 text-emerald-800 scale-110 shadow-md"
                              : "border-emerald-200 bg-emerald-50 text-emerald-700",
                            isHovered && !isSelected && "scale-105"
                          )}
                        >
                          <svg
                            className="mr-0.5 inline-block h-3 w-3"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          ₹{(plan.cashback / 1000).toFixed(0)}K
                        </Badge>
                      </button>
                    );
                  })}
                </div>
              </ScrollArea>

              <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 h-4 bg-gradient-to-t from-white to-transparent" />
            </div>
          </CardContent>
          <CardFooter className="flex-col items-stretch gap-3 p-5 pt-3 lg:p-6 lg:pt-4">
            {selectedEmiPlan && (
              <div className="group rounded-lg bg-gradient-to-r from-primary/10 to-primary/5 px-3.5 py-2.5 sm:px-4 sm:py-3 text-sm shadow-sm transition-all hover:shadow-md animate-in slide-in-from-bottom-2 fade-in duration-500">
                <p className="flex flex-wrap items-center gap-1.5 sm:gap-2 font-medium text-slate-900">
                  <svg
                    className="h-4 w-4 text-primary flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>Selected Plan:</span>
                  <span className="font-bold text-primary transition-all duration-300 group-hover:scale-105">
                    {formatMoney(selectedEmiPlan.monthlyAmount)}/month
                  </span>
                  <span>for {selectedEmiPlan.durationMonths} months</span>
                </p>
                <p className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-600">
                  <span className="inline-flex items-center gap-1">
                    <svg
                      className="h-3 w-3 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                      />
                    </svg>
                    <span>
                      Interest:{" "}
                      <span
                        className={cn(
                          "font-semibold",
                          selectedEmiPlan.interestRate === 0
                            ? "text-emerald-600"
                            : "text-slate-900"
                        )}
                      >
                        {selectedEmiPlan.interestRate}%
                      </span>
                    </span>
                  </span>
                  <span className="text-slate-400">•</span>
                  <span className="inline-flex items-center gap-1">
                    <svg
                      className="h-3 w-3 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    <span>
                      Total:{" "}
                      <span className="font-medium">
                        {formatMoney(
                          selectedEmiPlan.monthlyAmount *
                            selectedEmiPlan.durationMonths
                        )}
                      </span>
                    </span>
                  </span>
                  <span className="text-slate-400">•</span>
                  <span className="inline-flex items-center gap-1 text-emerald-600">
                    <svg
                      className="h-3 w-3 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>
                      Cashback:{" "}
                      <span className="font-semibold">
                        {formatMoney(selectedEmiPlan.cashback)}
                      </span>
                    </span>
                  </span>
                </p>
              </div>
            )}
            <Button
              size="lg"
              disabled={!selectedEmiPlan}
              className={cn(
                "group relative w-full overflow-hidden text-base font-semibold shadow-lg transition-all duration-300 sm:text-lg",
                "hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]",
                "disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed"
              )}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {selectedEmiPlan ? (
                  <>
                    <svg
                      className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                    Proceed with {selectedEmiPlan.durationMonths}-Month Plan
                  </>
                ) : (
                  <>
                    <svg
                      className="h-5 w-5 animate-pulse"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                    Select a Plan to Continue
                  </>
                )}
              </span>
              {selectedEmiPlan && (
                <div className="absolute inset-0 -z-0 bg-gradient-to-r from-primary/0 via-white/20 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
};
