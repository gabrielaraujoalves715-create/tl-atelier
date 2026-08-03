import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section
      id="inicio"
      className="
        relative mt-[120px] aspect-[4/5] min-h-0 w-full
        overflow-hidden bg-[#F6F3F1]
        md:mt-[208px] md:h-[600px] md:aspect-auto
      "
    >
      {/* Título principal acessível e otimizado para SEO */}
      <h1 className="sr-only">
        TL Atelier — Joias em Prata 925 para marcar cada momento
      </h1>

      {/* Banners responsivos */}
      <picture className="absolute inset-0 block h-full w-full">
        <source
          media="(min-width: 768px)"
          srcSet="/banner-tl-desktop.webp"
        />

        <img
          src="/banner-tl-mobile.webp"
          alt="TL Atelier — joias em Prata 925"
          width={1080}
          height={1350}
          className="h-full w-full object-cover object-center"
          loading="eager"
          fetchPriority="high"
        />
      </picture>

      {/* Botão da Hero */}
      <div
  className="
    absolute left-0 top-[48%] z-10
    flex w-full justify-start pl-1
    md:inset-0 md:mx-auto md:h-full
    md:max-w-7xl md:items-end
    md:px-8 md:pb-12
    lg:px-20 lg:pb-16
  "
>
  <Link
    to="/mais-vendidos"
    id="hero-view-collection"
    className="
      flex h-[44px] w-[185px]
      cursor-pointer items-center justify-center
      border border-neutral-900
      bg-transparent px-6
      text-[14px] font-normal
      text-neutral-900
      transition-colors duration-300
      hover:bg-neutral-900 hover:text-white
      focus-visible:outline focus-visible:outline-2
      focus-visible:outline-offset-2
      focus-visible:outline-neutral-900
      md:h-12 md:w-auto md:px-10
      md:text-xs md:font-bold md:uppercase
      md:tracking-[0.25em]
    "
  >
    Ver coleção
  </Link>
</div>

      {/* Instagram no banner mobile */}
      <a
        href="https://www.instagram.com/ateliertl__/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Visitar o Instagram da TL Atelier"
        className="
          absolute bottom-4 left-1 z-20
          inline-flex min-h-11 items-center
          px-2
          font-sans text-[14px] font-semibold uppercase
          text-[#D18475]
          transition-opacity duration-300
          hover:opacity-70
          focus-visible:outline focus-visible:outline-2
          focus-visible:outline-offset-2
          focus-visible:outline-[#D18475]
          md:hidden
        "
      >
        @ateliertl__
      </a>

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