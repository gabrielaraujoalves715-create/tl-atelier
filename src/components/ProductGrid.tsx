import { products } from '../data/products';
import ProductCard from './ProductCard';
import { Sparkles } from 'lucide-react';

interface ProductGridProps {
  selectedCategory: string | null;
  searchQuery: string;
}

export default function ProductGrid({ selectedCategory, searchQuery }: ProductGridProps) {
  // Filter products based on selected category and/or search query
  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
    const matchesSearch = searchQuery 
      ? product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        (product.description?.toLowerCase() ?? '').includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="colecao" className="py-20 border-b border-brand-soft-rose/20 bg-brand-main">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title and stats */}
        <div className="border-b border-brand-soft-rose/10 pb-6 mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h2 className="font-serif text-4xl font-medium normal-case leading-none tracking-[-0.02em] text-brand-text sm:text-5xl">
  {selectedCategory
    ? `Coleção ${selectedCategory}`
    : 'Nossas Joias'}
</h2>
          </div>
          
          <span className="text-[10px] uppercase tracking-widest text-brand-text/50 font-semibold bg-brand-light-pink/40 px-3 py-1.5 rounded-sm border border-brand-soft-rose/20">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'modelo encontrado' : 'modelos encontrados'}
          </span>
        </div>

        {/* Grid layout */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 border border-dashed border-brand-soft-rose/30 rounded-sm">
            <p className="font-serif italic text-lg text-brand-text/50">Nenhuma joia encontrada nesta categoria.</p>
          </div>
        )}
      </div>
    </section>
  );
}
