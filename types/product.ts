export type ProductColor = {
  id: string;
  name: string;
  hexCode?: string;
};

export type ProductStorage = {
  id: string;
  size: string;
  priceAdjustment: number;
};

export type ProductEmiPlan = {
  durationMonths: number;
  monthlyAmount: number;
  cashback: number;
  interestRate: number;
};

export type Product = {
  id: string;
  name: string;
  brand: string;
  tag?: string;
  description: string;
  price: number;
  originalPrice: number;
  savings: number;
  image: string;
  colors: ProductColor[];
  storageOptions: ProductStorage[];
  emiPlans: ProductEmiPlan[];
};
