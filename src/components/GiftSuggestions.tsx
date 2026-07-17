interface GiftSuggestionsProps {
  onSelectCategory?: (category: 'colares' | 'pulseiras' | 'brincos' | 'aneis' | 'berloques' | 'aliancas' | null) => void;
}

export default function GiftSuggestions({ onSelectCategory }: GiftSuggestionsProps) {
  const handleCategoryClick = (category: 'colares' | 'pulseiras' | 'brincos' | 'aneis' | 'berloques' | 'aliancas') => {
    if (onSelectCategory) {
      onSelectCategory(category);
    }
    const element = document.getElementById('colecao');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="presentes" className="py-20 bg-white border-b border-brand-soft-rose/10 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title from Screenshot 5 */}
        <div className="mb-14 text-left">
          <h2 className="font-sans text-[24px] sm:text-[32px] md:text-[38px] font-black tracking-wider leading-tight text-neutral-900 uppercase">
            PENSADAS PARA DURAR.<br />
            <span className="text-neutral-950">FEITAS PARA ENCANTAR.</span>
          </h2>
          <div className="h-[2px] w-16 bg-[#F472B6] mt-4"></div>
        </div>

        {/* Beautiful Asymmetric Collage Grid (matching Screenshot 5 exactly) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:h-[600px]">
          
          {/* Left Column: Tall image - COLARES */}
          <div 
            onClick={() => handleCategoryClick('colares')}
            className="md:col-span-4 h-[350px] md:h-full relative group cursor-pointer overflow-hidden bg-neutral-100 rounded-xs"
          >
            <img 
              src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80" 
              alt="Colares de Prata" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors"></div>
            
            {/* White Rectangle Overlay Button (styled exactly like Screenshot 5 labels) */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-xs px-8 py-3 text-neutral-900 text-[11px] font-bold uppercase tracking-[0.2em] shadow-md border border-neutral-100 group-hover:bg-neutral-950 group-hover:text-white transition-all duration-300">
              COLARES
            </div>
          </div>

          {/* Right Area: Spanning 8 columns */}
          <div className="md:col-span-8 flex flex-col gap-5 h-full">
            
            {/* Top row: BRINCOS */}
            <div 
              onClick={() => handleCategoryClick('brincos')}
              className="h-[220px] md:h-[48%] relative group cursor-pointer overflow-hidden bg-neutral-100 rounded-xs"
            >
              <img 
                src="https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=1200&q=80" 
                alt="Brincos de Prata" 
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors"></div>
              
              <div className="absolute bottom-1/2 translate-y-1/2 right-10 bg-white/95 backdrop-blur-xs px-8 py-3 text-neutral-900 text-[11px] font-bold uppercase tracking-[0.2em] shadow-md border border-neutral-100 group-hover:bg-neutral-950 group-hover:text-white transition-all duration-300">
                BRINCOS
              </div>
            </div>

            {/* Bottom row: split into 2 blocks (ANÉIS & BERLOQUES) */}
            <div className="grid grid-cols-2 gap-5 h-[220px] md:h-[48%]">
              
              {/* ANÉIS */}
              <div 
                onClick={() => handleCategoryClick('aneis')}
                className="relative group cursor-pointer overflow-hidden bg-neutral-100 rounded-xs h-full"
              >
                <img 
                  src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=600&q=80" 
                  alt="Anéis de Prata" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors"></div>
                
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-xs px-6 py-2.5 text-neutral-900 text-[10px] font-bold uppercase tracking-[0.2em] shadow-md border border-neutral-100 group-hover:bg-neutral-950 group-hover:text-white transition-all duration-300 w-[85%] text-center">
                  ANÉIS
                </div>
              </div>

              {/* BERLOQUES */}
              <div 
                onClick={() => handleCategoryClick('berloques')}
                className="relative group cursor-pointer overflow-hidden bg-neutral-100 rounded-xs h-full"
              >
                <img 
                  src="https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=600&q=80" 
                  alt="Berloques Coleção" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors"></div>
                
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-xs px-6 py-2.5 text-neutral-900 text-[10px] font-bold uppercase tracking-[0.2em] shadow-md border border-neutral-100 group-hover:bg-neutral-950 group-hover:text-white transition-all duration-300 w-[85%] text-center">
                  BERLOQUES
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
