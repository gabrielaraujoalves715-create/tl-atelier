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
          
          {/* Block 1: Colecione Memórias (Charms) */}
          <div className="flex flex-col group cursor-pointer" onClick={() => handleExplore('colares')}>
            <div className="aspect-[4/5] w-full overflow-hidden bg-neutral-100 rounded-xs relative">
              <ImagePlaceholder className="w-full h-full" label="Adicionar imagem" />
            </div>
            <div className="mt-5 flex flex-col items-start">
              <h3 className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-neutral-900">
                PARA TODA OCASIÃO
              </h3>
              <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-neutral-500 mt-2 border-b-2 border-neutral-800 pb-0.5 group-hover:text-[#BE185D] group-hover:border-[#BE185D] transition-colors duration-200">
                EXPLORAR
              </span>
            </div>
          </div>

          {/* Block 2: Feitas Para Sua Rotina (Necklaces) */}
          <div className="flex flex-col group cursor-pointer md:mt-12" onClick={() => handleExplore('colares')}>
            <div className="aspect-[4/5] w-full overflow-hidden bg-neutral-100 rounded-xs relative">
              <ImagePlaceholder className="w-full h-full" label="Adicionar imagem" />
            </div>
            <div className="mt-5 flex flex-col items-start">
              <h3 className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-neutral-900">
                FEITAS PARA SUA ROTINA.
              </h3>
              <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-neutral-500 mt-2 border-b-2 border-neutral-800 pb-0.5 group-hover:text-[#BE185D] group-hover:border-[#BE185D] transition-colors duration-200">
                EXPLORAR
              </span>
            </div>
          </div>

          {/* Block 3: Model with items / happy smiles */}
          <div className="flex flex-col group cursor-pointer" onClick={() => handleExplore('pulseiras')}>
            <div className="aspect-[4/5] w-full overflow-hidden bg-neutral-100 rounded-xs relative">
              <ImagePlaceholder className="w-full h-full" label="Adicionar imagem" />
            </div>
            <div className="mt-5 flex flex-col items-start">
              <h3 className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-neutral-900">
                COMPROMISSO COM O BRILHO
              </h3>
              <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-neutral-500 mt-2 border-b-2 border-neutral-800 pb-0.5 group-hover:text-[#BE185D] group-hover:border-[#BE185D] transition-colors duration-200">
                EXPLORAR
              </span>
            </div>
          </div>

          {/* Block 4: Rings Close Up */}
          <div className="flex flex-col group cursor-pointer md:mt-12" onClick={() => handleExplore('brincos')}>
            <div className="aspect-[4/5] w-full overflow-hidden bg-neutral-100 rounded-xs relative">
              <ImagePlaceholder className="w-full h-full" label="Adicionar imagem" />
            </div>
            <div className="mt-5 flex flex-col items-start">
              <h3 className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-neutral-900">
                ELEGÂNCIA EM CADA DETALHE
              </h3>
              <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-neutral-500 mt-2 border-b-2 border-neutral-800 pb-0.5 group-hover:text-[#BE185D] group-hover:border-[#BE185D] transition-colors duration-200">
                EXPLORAR
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
