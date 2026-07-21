import { ImagePlaceholder } from './ImagePlaceholder';

export default function EditorialSection() {
  const handleExplore = (category: string) => {
    // Scroll to products and filter
    const element = document.getElementById('colecao');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="editorial" className="py-10 sm:py-20 bg-white border-b border-brand-soft-rose/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* 2x2 grid representing the beautiful layout of Screenshot 4 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 lg:gap-14">
          
          {/* Block 1: Para Toda Ocasião */}
<div
  className="flex cursor-pointer flex-col group md:mt-12"
  onClick={() => handleExplore('colares')}
>
  <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xs bg-neutral-100">
    <img
      src="/colar-lilas-modelo-close.webp"
      alt="Modelo usando colar lilás em Prata 925"
      loading="lazy"
      decoding="async"
      className="
        h-full
        w-full
        object-cover
        object-center
        transition-transform
        duration-700
        group-hover:scale-105
      "
    />
  </div>

  <div className="mt-5 flex flex-col items-start">
    <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-900 sm:text-sm">
      Para Toda Ocasião.
    </h3>

    <span className="mt-2 border-b-2 border-neutral-800 pb-0.5 text-[10px] font-bold uppercase tracking-[0.25em] text-neutral-500 transition-colors duration-200 group-hover:border-[#BE185D] group-hover:text-[#BE185D]">
      EXPLORAR
    </span>
  </div>
</div>

          {/* Block 2: Feitas Para Sua Rotina */}
<div
  className="flex cursor-pointer flex-col group md:mt-12"
  onClick={() => handleExplore('colares')}
>
  <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xs bg-neutral-100">
    <img
      src="/colar-cristal.webp"
      alt="Colar em Prata 925 com ponto de luz"
      loading="lazy"
      decoding="async"
      className="
        h-full
        w-full
        object-cover
        object-[center_62%]
        transition-transform
        duration-700
        group-hover:scale-105
      "
    />
  </div>

  <div className="mt-5 flex flex-col items-start">

    <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-900 sm:text-sm">
      FEITAS PARA SUA ROTINA.
    </h3>

    <span className="mt-2 border-b-2 border-neutral-800 pb-0.5 text-[10px] font-bold uppercase tracking-[0.25em] text-neutral-500 transition-colors duration-200 group-hover:border-[#BE185D] group-hover:text-[#BE185D]">
      EXPLORAR
    </span>
  </div>
</div>

          {/* Block 3: Compromisso com o Brilho */}
<div
  className="group flex cursor-pointer flex-col"
  onClick={() => handleExplore('pulseiras')}
>
  <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xs bg-neutral-100">
    <img
      src="/editorial-pulseira-gota-pov.webp"
      alt="Pulseira Gota de Luz em Prata 925"
      loading="lazy"
      decoding="async"
      className="
        h-full
        w-full
        object-cover
        object-center
        transition-transform
        duration-700
        group-hover:scale-105
      "
    />
  </div>

  <div className="mt-5 flex flex-col items-start">
    <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-900 sm:text-sm">
      COMPROMISSO COM O BRILHO
    </h3>

    <span className="mt-2 border-b-2 border-neutral-800 pb-0.5 text-[10px] font-bold uppercase tracking-[0.25em] text-neutral-500 transition-colors duration-200 group-hover:border-[#BE185D] group-hover:text-[#BE185D]">
      EXPLORAR
    </span>
  </div>
</div>

          {/* Block 4: Elegância em Cada Detalhe */}
<div
  className="group flex cursor-pointer flex-col md:mt-12"
  onClick={() => handleExplore('aneis')}
>
  <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xs bg-neutral-100">
    <img
      src="/editorial-aneis-modelo-realista.webp"
      alt="Mão de modelo usando anéis em Prata 925"
      loading="lazy"
      decoding="async"
      className="
        h-full
        w-full
        object-cover
        object-center
        transition-transform
        duration-700
        group-hover:scale-105
      "
    />
  </div>

  <div className="mt-5 flex flex-col items-start">
    <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-900 sm:text-sm">
      ELEGÂNCIA EM CADA DETALHE
    </h3>

    <span className="mt-2 border-b-2 border-neutral-800 pb-0.5 text-[10px] font-bold uppercase tracking-[0.25em] text-neutral-500 transition-colors duration-200 group-hover:border-[#BE185D] group-hover:text-[#BE185D]">
      EXPLORAR
    </span>
  </div>
</div>

        </div>

      </div>
    </section>
  );
}
