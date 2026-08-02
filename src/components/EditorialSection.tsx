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
    title: 'pulseiras',
    category: 'pulseiras',
    image: '/editorial-pulseira-gota-pov.webp',
    alt: 'Pulseira Gota de Luz em Prata 925',
    imagePosition: 'object-center',
  },
  {
    title: 'conjuntos',
    category: 'conjuntos',
    image: '/colar.webp',
    alt: 'Mão de modelo usando anéis em Prata 925',
    imagePosition: 'object-center',
  },
];

export default function EditorialSection() {
  return (
    <section
      id="editorial"
      className="border-b border-brand-soft-rose/10 bg-white py-8 sm:py-14"
    >
      <div className="mx-auto max-w-5xl px-3 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:gap-8">
          {editorialCards.map((card) => (
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
                src={card.image}
                alt={card.alt}
                width={1080}
                height={1350}
                loading="lazy"
                decoding="async"
                className={`
                  h-full w-full object-cover
                  transition-transform duration-700
                  group-hover:scale-105
                  ${card.imagePosition}
                `}
              />

              {/* Degradê para manter os textos legíveis */}
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

              {/* Nome e CTA dentro da imagem */}
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
          ))}
        </div>
      </div>
    </section>
  );
}