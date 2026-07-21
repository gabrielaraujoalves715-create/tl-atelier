import type { ProductCategory } from '../types/product';

interface CategoriesProps {
  selectedCategory: ProductCategory | null;
  onSelectCategory: (
    category: ProductCategory | null,
  ) => void;
}

type Category = {
  key: ProductCategory;
  label: string;
  image: string;
  imageClassName: string;
};

export default function Categories({
  selectedCategory,
  onSelectCategory,
}: CategoriesProps) {
  const categoriesList: Category[] = [
    {
      key: 'colares',
      label: 'Colares',
      image: '/colecao-colares.jpeg',
      imageClassName: 'scale-100 object-center',
    },
    {
      key: 'pulseiras',
      label: 'Pulseiras',
      image: '/colecao-pulseiras.jpeg',
      imageClassName: 'scale-100 object-center',
    },
    {
      key: 'brincos',
      label: 'Brincos',
      image: '/colecao-brincos.jpeg',
      imageClassName: 'scale-[2.2] object-center',
    },
    {
      key: 'conjuntos',
      label: 'Conjuntos',
      image: '/colecao-conjuntos.png',
      imageClassName: 'scale-100 object-center',
    },
    {
      key: 'aneis',
      label: 'Anéis',
      image: '/colecao-aneis.jpeg',
      imageClassName: 'scale-100 object-center',
    },
  ];

  const handleSelectCategory = (
    category: ProductCategory,
  ) => {
    onSelectCategory(category);
  };

  return (
    <section
      id="categorias"
      className="
        scroll-mt-[120px]
        select-none
        border-b border-brand-soft-rose/10
        bg-[#FFFDFC]
        py-10
        md:scroll-mt-[208px]
        md:py-12
      "
    >
      <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
        <div
          className="
            mx-auto
            flex
            w-full
            snap-x
            snap-mandatory
            items-start
            justify-start
            gap-5
            overflow-x-auto
            overscroll-x-contain
            scroll-smooth
            px-1
            pb-3
            touch-pan-x
            [-ms-overflow-style:none]
            [scrollbar-width:none]
            [&::-webkit-scrollbar]:hidden
            sm:gap-8
            sm:px-0
            md:gap-10
            lg:justify-center
            lg:overflow-visible
          "
        >
          {categoriesList.map((category) => {
            const isSelected =
              selectedCategory === category.key;

            return (
              <button
                key={category.key}
                type="button"
                onClick={() =>
                  handleSelectCategory(category.key)
                }
                aria-pressed={isSelected}
                aria-label={`Abrir categoria ${category.label}`}
                className="
                  group
                  flex
                  w-[112px]
                  min-w-0
                  shrink-0
                  snap-start
                  flex-col
                  items-center
                  justify-center
                  gap-3
                  text-center
                  focus-visible:outline
                  focus-visible:outline-2
                  focus-visible:outline-offset-4
                  focus-visible:outline-brand-dark-rose
                  sm:w-auto
                "
              >
                <div
                  className={`
                    flex
                    h-[100px]
                    w-[100px]
                    items-center
                    justify-center
                    rounded-full
                    p-[3px]
                    transition-all
                    duration-300
                    sm:h-[110px]
                    sm:w-[110px]
                    md:h-[140px]
                    md:w-[140px]
                    lg:h-[160px]
                    lg:w-[160px]
                    ${
                      isSelected
                        ? 'scale-105 bg-brand-dark-rose shadow-md'
                        : 'border border-brand-soft-rose/40 bg-brand-light-pink/20 group-hover:scale-105 group-hover:border-brand-dark-rose/60 group-hover:shadow-sm'
                    }
                  `}
                >
                  <div className="h-full w-full overflow-hidden rounded-full bg-white">
                    <img
                      src={category.image}
                      alt={`Coleção de ${category.label.toLowerCase()}`}
                      loading="lazy"
                      decoding="async"
                      className={`
                        h-full
                        w-full
                        object-cover
                        transition-transform
                        duration-300
                        ${category.imageClassName}
                      `}
                    />
                  </div>
                </div>

                <span
                  className={`
                    max-w-full
                    text-center
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.14em]
                    transition-colors
                    duration-200
                    sm:text-xs
                    sm:tracking-widest
                    ${
                      isSelected
                        ? 'font-bold text-brand-dark-rose'
                        : 'text-brand-text/75 group-hover:text-brand-dark-rose'
                    }
                  `}
                >
                  {category.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}