import { products } from '../data/products';
import ProductCard from './ProductCard';
import type { ProductCategory } from '../types/product';

interface ProductGridProps {
  selectedCategory: ProductCategory | null;
  searchQuery: string;
}

const categoryLabels: Record<ProductCategory, string> = {
  colares: 'Colares',
  pulseiras: 'Pulseiras',
  brincos: 'Brincos',
  conjuntos: 'Conjuntos',
  aneis: 'Anéis',
};

const normalizeText = (text: string) =>
  text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();

export default function ProductGrid({
  selectedCategory,
  searchQuery,
}: ProductGridProps) {
  const normalizedSearch = normalizeText(searchQuery);

    const filteredProducts = products.filter((product) => {
    if (
      selectedCategory &&
      product.category !== selectedCategory
    ) {
      return false;
    }

    if (!normalizedSearch) {
      return true;
    }

    const searchableContent = normalizeText(
      [
        product.name,
        product.description ?? '',
        product.shortDescription ?? '',
        product.category,
        categoryLabels[product.category],
      ].join(' '),
    );

    return searchableContent.includes(normalizedSearch);
  });

  return (
    <section
      id="colecao"
      className="border-b border-brand-soft-rose/20 bg-brand-main py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col justify-between gap-4 border-b border-brand-soft-rose/10 pb-6 sm:flex-row sm:items-end">
          <div>
            <h2 className="font-serif text-4xl font-medium normal-case leading-none tracking-[-0.02em] text-brand-text sm:text-5xl">
              {selectedCategory
                ? `Coleção ${categoryLabels[selectedCategory]}`
                : 'Nossas Joias'}
            </h2>
          </div>

          <span className="rounded-sm border border-brand-soft-rose/20 bg-brand-light-pink/40 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-brand-text/50">
            {filteredProducts.length}{' '}
            {filteredProducts.length === 1
              ? 'modelo encontrado'
              : 'modelos encontrados'}
          </span>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3 lg:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="rounded-sm border border-dashed border-brand-soft-rose/30 py-20 text-center">
            <p className="font-serif text-lg italic text-brand-text/50">
              Nenhuma joia encontrada nesta categoria.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}