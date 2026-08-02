import { Link } from 'react-router-dom';
import type { Product } from '../types/product';
import { ImagePlaceholder } from './ImagePlaceholder';

interface ProductCardProps {
  product: Product;
}

const createCardImageUrl = (
  image: string,
  width: 360 | 640,
) =>
  image.replace(
    /\.[^/.]+$/,
    `-card-${width}.webp`,
  );

export default function ProductCard({
  product,
}: ProductCardProps) {
  const productUrl = `/produto/${product.slug}`;

  // Garante que o valor seja sempre uma string
  const originalImage = product.image ?? '';

  const cardImage360 = originalImage
    ? createCardImageUrl(originalImage, 360)
    : '';

  const cardImage640 = originalImage
    ? createCardImageUrl(originalImage, 640)
    : '';

  return (
    <div className="group flex h-full min-w-0 w-full flex-col overflow-hidden rounded-xs border border-brand-soft-rose/20 bg-white transition-all duration-300 hover:shadow-md">
      {/* Imagem clicável */}
      <Link
        to={productUrl}
        aria-label={`Ver ${product.name}`}
        className="block"
      >
        <div className="relative aspect-[4/5] w-full overflow-hidden border-b border-brand-soft-rose/10">
          {originalImage ? (
            <img
              src={cardImage360}
              srcSet={`${cardImage360} 360w, ${cardImage640} 640w`}
              sizes="
                (max-width: 639px) calc(100vw - 32px),
                (max-width: 1023px) calc(50vw - 24px),
                320px
              "
              alt={product.name}
              width={640}
              height={800}
              loading="lazy"
              decoding="async"
              onError={(event) => {
                const imageElement = event.currentTarget;

                imageElement.onerror = null;
                imageElement.removeAttribute('srcset');
                imageElement.src = originalImage;
              }}
              className="block h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <ImagePlaceholder
              className="h-full w-full"
              label="Foto do produto"
            />
          )}

          {product.discountBadge && (
            <div
              className="
                absolute right-4 top-4 z-10
                flex h-10 w-10 flex-col
                items-center justify-center
                rounded-full bg-brand-dark-rose
                px-1 text-center text-[9px]
                font-bold leading-[1.05]
                text-white shadow-sm
                select-none
              "
            >
              {product.discountBadge
                .split(' ')
                .map((part) => (
                  <span key={part} className="block">
                    {part}
                  </span>
                ))}
            </div>
          )}
        </div>
      </Link>

      {/* Informações */}
      <div className="flex flex-grow flex-col justify-between p-3 sm:p-4">
        <div className="mb-3">
          <Link
            to={productUrl}
            className="transition-colors duration-200 hover:text-brand-dark-rose"
          >
            <div className="line-clamp-1 text-xs font-medium tracking-tight text-neutral-800">
              {product.name}
            </div>
          </Link>

          {product.description && (
            <p className="line-clamp-2 text-[11px] leading-relaxed text-neutral-500">
              {product.description}
            </p>
          )}
        </div>

        {product.price > 0 && (
          <div className="mb-3 border-t border-brand-soft-rose/10 pt-2.5">
            {product.variants &&
              product.variants.length > 0 && (
                <span className="mb-1 block text-[9px] font-semibold uppercase tracking-[0.15em] text-brand-dark-rose">
                  A partir de
                </span>
              )}

            <div className="flex items-baseline gap-2">
              <span className="text-[15px] font-bold text-neutral-900">
                {product.price.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </span>

              {product.originalPrice && (
                <span className="text-[11px] text-neutral-400 line-through">
                  {product.originalPrice.toLocaleString(
                    'pt-BR',
                    {
                      style: 'currency',
                      currency: 'BRL',
                    },
                  )}
                </span>
              )}
            </div>
          </div>
        )}

        <div className="mt-auto pt-2">
          <Link
            to={productUrl}
            aria-label={`Ver e comprar ${product.name}`}
            id={`buy-btn-${product.id}`}
            className="flex w-full items-center justify-center rounded-xs bg-black px-4 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-white transition-all duration-300 hover:bg-neutral-800 active:scale-[0.98]"
          >
            Comprar
          </Link>
        </div>
      </div>
    </div>
  );
}