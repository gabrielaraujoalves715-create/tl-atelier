import { products } from '../data/products';
import ProductCard from './ProductCard';

export default function FeaturedProducts() {
  const featured = products.filter((p) => p.isFeatured);

  return (
    <section id="destaques" className="py-10 sm:py-20 border-b border-brand-soft-rose/10 bg-[#FFFDFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header styled exactly like Screenshot 3 */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="font-sans text-2xl sm:text-3xl font-light text-neutral-900 leading-tight tracking-wide">
            Peças em Destaque
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500 font-light mt-3 tracking-wide">
            Nossa coleção de joias em Prata 925 legítima.
          </p>
          <div className="h-[1px] w-12 bg-[#F472B6]/40 mx-auto mt-5"></div>
        </div>

        {/* Products Grid (2 columns on mobile, 4 on desktop for Shopify-look) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
      </div>
    </section>
  );
}
