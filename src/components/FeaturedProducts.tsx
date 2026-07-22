import { products } from '../data/products';
import ProductCard from './ProductCard';

export default function FeaturedProducts() {
  const featured = products
    .filter((product) => product.isFeatured)
    .slice(0, 5);

  if (featured.length === 0) {
    return null;
  }

  return (
    <section
      id="destaques"
      className="border-b border-brand-soft-rose/10 bg-[#FFFDFC] py-12 sm:py-20"
    >
      <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-2xl text-center sm:mb-14">
          <h2 className="font-sans text-2xl font-light leading-tight tracking-wide text-neutral-900 sm:text-3xl">
            As escolhas mais amandas pela nossas clientes.
          </h2>

          <p className="mt-3 text-xs font-light tracking-wide text-neutral-500 sm:text-sm">
            Para você brilhar ainda mais com exclusividade.
          </p>

          <div className="mx-auto mt-5 h-px w-12 bg-brand-dark-rose/40" />
        </div>

        <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
          {featured.map((product) => (
            <div
              key={product.id}
              className="
                flex w-[calc(50%-0.5rem)]
                md:w-[calc(33.333333%-1rem)]
                lg:w-[calc(25%-1.125rem)]
                xl:w-[calc(20%-1.2rem)]
              "
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}