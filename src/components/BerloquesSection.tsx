import { products } from '../data/products';
import ProductCard from './ProductCard';

export default function BerloquesSection() {
  // Filter for charms specifically
  const berloquesDesejados = products.filter((p) => p.isBerloqueDesejado);

  return (
    <section id="berloques-destaque" className="py-20 border-b border-brand-soft-rose/10 bg-neutral-50 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header styled exactly like Screenshot 6 */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="font-sans text-2xl sm:text-3xl font-light text-neutral-900 leading-tight tracking-wide">
            Os Berloques Mais Desejados
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500 font-light mt-3 tracking-wide">
            Compatível com todas pulseiras do mercado! 🎠
          </p>
          <div className="h-[1px] w-12 bg-[#F472B6]/40 mx-auto mt-5"></div>
        </div>

        {/* 2-column on mobile, 4-column on desktop for Shopify-look */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 justify-center">
          {berloquesDesejados.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
      </div>
    </section>
  );
}
