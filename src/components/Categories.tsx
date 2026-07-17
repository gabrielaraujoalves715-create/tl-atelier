interface CategoriesProps {
  selectedCategory: 'colares' | 'pulseiras' | 'brincos' | null;
  onSelectCategory: (
    category: 'colares' | 'pulseiras' | 'brincos' | null
  ) => void;
}

type Category = {
  key: 'colares' | 'pulseiras' | 'brincos';
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
  ];

  const handleSelectCategory = (
    category: 'colares' | 'pulseiras' | 'brincos'
  ) => {
    onSelectCategory(category);

    const element = document.getElementById('colecao');

    element?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  return (
    <section
      id="categorias"
      className="
        select-none
        border-b border-brand-soft-rose/10
        bg-[#FFFDFC]
        py-8
      "
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className="
            mx-auto
            grid
            w-full
            max-w-sm
            grid-cols-3
            items-start
            justify-items-center
            gap-3
            sm:max-w-md
            sm:gap-8
          "
        >
          {categoriesList.map((category) => {
            const isSelected = selectedCategory === category.key;

            return (
              <button
                key={category.key}
                type="button"
                onClick={() => handleSelectCategory(category.key)}
                aria-pressed={isSelected}
                aria-label={`Filtrar produtos por ${category.label}`}
                className="
                  group
                  flex
                  min-w-0
                  flex-col
                  items-center
                  justify-center
                  gap-2.5
                  text-center
                  focus-visible:outline
                  focus-visible:outline-2
                  focus-visible:outline-offset-4
                  focus-visible:outline-[#F472B6]
                "
              >
                <div
                  className={`
                    flex
                    h-16 w-16
                    items-center justify-center
                    rounded-full
                    p-[2px]
                    transition-all
                    duration-300
                    sm:h-20 sm:w-20
                    ${
                      isSelected
                        ? 'scale-105 bg-[#F472B6] shadow-md'
                        : 'border border-neutral-200/60 bg-neutral-100 group-hover:scale-105 group-hover:border-neutral-400'
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
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.12em]
                    transition-colors
                    duration-200
                    sm:text-[11px]
                    sm:tracking-widest
                    ${
                      isSelected
                        ? 'font-bold text-[#BE185D]'
                        : 'text-neutral-600 group-hover:text-black'
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