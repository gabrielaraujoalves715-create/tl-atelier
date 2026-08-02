import { Link } from 'react-router-dom';
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
            As escolhas mais amadas pelas nossas clientes.
          </h2>

          <p className="mt-3 text-xs font-light tracking-wide text-neutral-500 sm:text-sm">
            Para você brilhar ainda mais com exclusividade.
          </p>

          <div className="mx-auto mt-5 h-px w-12 bg-brand-dark-rose/40" />
        </div>

        <div
          className="
            grid w-full
            grid-cols-2
            gap-x-4 gap-y-8
            sm:gap-x-6
            md:grid-cols-4
            lg:grid-cols-5
          "
        >
          {featured.map((product, index) => (
            <div
              key={product.id}
              className={`
                min-w-0
                ${index === 4 ? 'hidden lg:block' : ''}
              `}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        <div className="mt-10 flex w-full justify-center sm:mt-12">
          <Link
            to="/mais-vendidos"
            className="
              inline-flex min-w-[180px] items-center justify-center
              border border-black bg-transparent
              px-10 py-4
              text-center text-xs font-bold uppercase
              tracking-[0.2em] text-black
              transition-colors duration-300
              hover:bg-black hover:text-white
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-black
              focus-visible:ring-offset-2
            "
          >
            Ver mais
          </Link>
        </div>
      </div>
    </section>
  );
}