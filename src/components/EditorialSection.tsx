import { Link } from 'react-router-dom';

const editorialCards = [
  {
    title: 'Brincos',
    category: 'brincos',
    image: '/brinco-trio.webp',
    alt: 'Modelo usando joias em Prata 925',
    imagePosition: 'object-center',
  },
  {
    title: 'Colares',
    category: 'colares',
    image: '/colar-letra.webp',
    alt: 'Colar em Prata 925 com ponto de luz',
    imagePosition: 'object-[center_62%]',
  },
  {
    title: 'Pulseiras',
    category: 'pulseiras',
    image: '/editorial-pulseira-gota-pov.webp',
    alt: 'Pulseira Gota de Luz em Prata 925',
    imagePosition: 'object-center',
  },
  {
    title: 'Conjuntos',
    category: 'conjuntos',
    image: '/colar.webp',
    alt: 'Mão de modelo usando anéis em Prata 925',
    imagePosition: 'object-center',
  },
];

const createEditorialImageUrl = (
  image: string,
  width: 480 | 800,
) =>
  image.replace(
    /\.[^/.]+$/,
    `-editorial-${width}.webp`,
  );

export default function EditorialSection() {
  return (
    <section
      id="editorial"
      className="border-b border-brand-soft-rose/10 bg-white py-8 sm:py-14"
    >
      <div className="mx-auto max-w-5xl px-3 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:gap-8">
          {editorialCards.map((card) => {
            const image480 =
              createEditorialImageUrl(
                card.image,
                480,
              );

            const image800 =
              createEditorialImageUrl(
                card.image,
                800,
              );

            return (
              <Link
                key={card.category}
                to={`/categoria/${card.category}`}
                aria-label={`Explorar categoria de ${card.category}`}
                className="
                  group relative block
                  h-[290px] overflow-hidden
                  rounded-xs bg-neutral-100
                  sm:h-[380px]
                  lg:h-[430px]
                  focus-visible:outline
                  focus-visible:outline-2
                  focus-visible:outline-offset-4
                  focus-visible:outline-[#BE185D]
                "
              >
                <img
                  src={image480}
                  srcSet={`${image480} 480w, ${image800} 800w`}
                  sizes="
                    (max-width: 639px) calc(100vw - 24px),
                    (max-width: 1023px) calc(50vw - 36px),
                    480px
                  "
                  alt={card.alt}
                  width={800}
                  height={1000}
                  loading="lazy"
                  decoding="async"
                  onError={(event) => {
                    const imageElement =
                      event.currentTarget;

                    imageElement.onerror = null;
                    imageElement.removeAttribute(
                      'srcset',
                    );
                    imageElement.src = card.image;
                  }}
                  className={`
                    h-full w-full object-cover
                    transition-transform duration-700
                    group-hover:scale-105
                    ${card.imagePosition}
                  `}
                />

                <div
                  aria-hidden="true"
                  className="
                    absolute inset-0
                    bg-gradient-to-t
                    from-black/75
                    via-black/10
                    to-transparent
                  "
                />

                <div className="absolute inset-x-0 bottom-0 z-10 p-4 sm:p-6">
                  <h3
                    className="
                      text-xs font-bold uppercase
                      tracking-[0.18em] text-white
                      drop-shadow-sm
                      sm:text-sm sm:tracking-[0.2em]
                    "
                  >
                    {card.title}
                  </h3>

                  <span
                    className="
                      mt-2 inline-block
                      border-b border-white/90 pb-1
                      text-[10px] font-bold uppercase
                      tracking-[0.22em] text-white
                      transition-colors duration-200
                      group-hover:border-[#F3B6C2]
                      group-hover:text-[#F3B6C2]
                    "
                  >
                    EXPLORAR
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}