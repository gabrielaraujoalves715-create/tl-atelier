import { Link } from 'react-router-dom';
import { products } from '../data/products';
import ProductCard from './ProductCard';

export default function NewReleases() {
  const releases = products
    .filter(
      (product) =>
        product.isLancamento && !product.isFeatured,
    )
    .slice(0, 4);

  if (releases.length === 0) {
    return null;
  }

  return (
    <section
      id="lancamentos"
      className="border-b border-brand-soft-rose/10 bg-brand-main py-12 sm:py-20"
    >
      <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-2xl text-center sm:mb-14">
          <h2 className="font-sans text-2xl font-light leading-tight tracking-wide text-neutral-900 sm:text-3xl">
            ♡ É lançamento que fala, né?
          </h2>

          <p className="mt-3 text-xs font-light tracking-wide text-neutral-500 sm:text-sm">
            As joias favoritas de quem conhece a verdadeira Prata 925.
          </p>

          <div className="mx-auto mt-5 h-px w-12 bg-brand-dark-rose/40" />
        </div>

        <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
          {releases.map((product) => (
            <div
              key={product.id}
              className="
                flex w-[calc(50%-0.5rem)]
                md:w-[calc(33.333333%-1rem)]
                lg:w-[calc(25%-1.125rem)]
              "
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center sm:mt-12">
          <Link
            to="/lancamentos"
            className="
              inline-flex
              min-h-12 min-w-[180px]
              items-center justify-center
              border border-brand-text
              px-8 py-3
              text-xs font-semibold
              uppercase tracking-[0.2em]
              text-brand-text
              transition-colors duration-300
              hover:bg-brand-text
              hover:text-white
              focus:outline-none
              focus-visible:ring-2
              focus-visible:ring-brand-dark-rose
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