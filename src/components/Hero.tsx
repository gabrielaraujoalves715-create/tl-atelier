export default function Hero() {
  const handleScrollToCollection = () => {
    const collection = document.getElementById('colecao');

    collection?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  return (
    <section
      id="inicio"
      className="
        relative mt-[120px] aspect-[4/5] min-h-0 w-full
        overflow-hidden bg-[#F6F3F1]
        md:mt-[208px] md:h-[600px] md:aspect-auto
      "
    >
      {/* Banners responsivos */}
      <picture className="absolute inset-0 block h-full w-full">
        <source
          media="(min-width: 768px)"
          srcSet="/banner-tl-desktop.png"
        />

        <img
          src="/banner-tl-mobile.png"
          alt="TL Atelier — joias em Prata 925"
          className="h-full w-full object-cover object-center"
          fetchPriority="high"
        />
      </picture>

      {/* Botão da Hero */}
      <div
        className="
          absolute left-0 top-[43%] z-10
          flex w-full justify-start px-3
          md:inset-0 md:mx-auto md:h-full
          md:max-w-7xl md:items-end
          md:px-8 md:pb-12
          lg:px-20 lg:pb-16
        "
      >
        <button
          type="button"
          onClick={handleScrollToCollection}
          id="hero-view-collection"
          className="
            flex h-[38px] w-[175px]
            cursor-pointer items-center justify-center
            border border-[#8A625A]
            bg-transparent px-5
            text-[13px] font-normal normal-case
            tracking-normal text-[#8A625A]
            transition-colors duration-300
            hover:bg-[#8A625A] hover:text-white
            focus-visible:outline focus-visible:outline-2
            focus-visible:outline-offset-2
            focus-visible:outline-[#8A625A]
            md:h-12 md:w-auto md:max-w-none
            md:border-neutral-900 md:px-10
            md:text-xs md:font-bold md:uppercase
            md:tracking-[0.25em] md:text-neutral-900
            md:hover:bg-neutral-900
          "
        >
          Ver coleção
        </button>
      </div>

      {/* Identificação lateral no desktop */}
      <div className="absolute bottom-10 right-6 hidden flex-col items-center space-y-4 text-neutral-400 lg:flex">
        <span className="mb-8 origin-right rotate-90 whitespace-nowrap text-[8px] uppercase tracking-[0.3em] text-neutral-500">
          TL ATELIER • SÃO PAULO
        </span>

        <div className="h-12 w-px bg-neutral-300" />
      </div>
    </section>
  );
}