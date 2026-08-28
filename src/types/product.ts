export type ProductCategory =
  | 'colares'
  | 'pulseiras'
  | 'brincos'
  | 'infantil'
  | 'conjuntos'
  | 'aneis';

export type ChildType = 'menino' | 'menina';

export interface ProductVariant {
  id: string;
  label: string;
  childrenCount?: number;
  initialsCount?: number;
  price: number;
  originalPrice?: number;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: ProductCategory;
  description?: string;
  shortDescription?: string;
  material?: string;
  warranty?: string;

  isFeatured?: boolean;
  isBestSeller?: boolean;
  isLancamento?: boolean;
  isBerloqueDesejado?: boolean;

  image?: string;
  images?: string[];
  discountBadge?: string;

  variants?: ProductVariant[];
  allowsChildSelection?: boolean;
  allowsInitialSelection?: boolean;
  ringSizes?: number[];
}