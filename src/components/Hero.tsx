import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section
      id="inicio"
      className="
        relative mt-[120px] w-full overflow-hidden bg-[#F6F3F1]
        md:mt-[208px]
      "
    >
      <h1 className="sr-only">
        TL Atelier — Joias em Prata 925 para marcar cada momento
      </h1>

      <picture className="block w-full">
        <source
          media="(min-width: 768px)"
          srcSet="/banner-tl-desktop.webp"
        />

        <img
          src="/banner-tl-mobile.webp"
          alt="TL Atelier — joias em Prata 925"
          width={1080}
          height={1350}
          loading="eager"
          fetchPriority="high"
          decoding="sync"
          className="
            block h-auto w-full
            md:h-[600px] md:object-cover md:object-center
          "
        />
      </picture>

      <div className="absolute inset-0 flex items-end justify-start p-6 md:p-12">
        <Link
          to="/#colecao"
          className="
            border border-black bg-white px-5 py-3
            text-xs font-medium uppercase tracking-[0.15em]
            text-black transition hover:bg-black hover:text-white
          "
        >
          Ver coleção
        </Link>
      </div>
    </section>
  );
}