export type ProductCategory =
  | 'colares'
  | 'pulseiras'
  | 'brincos'
  | 'conjuntos'
  | 'aneis';

export type ChildType = 'menino' | 'menina';

export interface ProductVariant {
  id: string;
  label: string;
  childrenCount: number;
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
  image?: string;
  images?: string[];
  discountBadge?: string;
  isLancamento?: boolean;
  isBerloqueDesejado?: boolean;
  variants?: ProductVariant[];
  allowsChildSelection?: boolean;
  ringSizes?: number[];
}