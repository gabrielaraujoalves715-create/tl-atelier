import { Instagram, ArrowUpRight } from 'lucide-react';

export default function ContentSection() {
  const contentCards = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=500&q=80',
      title: 'O brilho lapidado da prata sob o sol',
      link: 'https://instagram.com/ateliertl_',
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&w=500&q=80',
      title: 'Nossos colares venezianos em foco',
      link: 'https://instagram.com/ateliertl_',
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=500&q=80',
      title: 'Mix de elos e esferas para o dia a dia',
      link: 'https://instagram.com/ateliertl_',
    },
  ];

  return (
    <section id="conteudo-instagram" className="py-20 border-b border-brand-soft-rose/20 bg-brand-light-pink/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-[10px] uppercase tracking-[0.3em] text-brand-dark-rose font-bold mb-3 block">
            Instagram @ateliertl_
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-brand-text font-normal italic leading-tight">
            Veja os detalhes de perto
          </h2>
          <p className="text-xs text-brand-text/50 uppercase tracking-widest mt-2">
            Acompanhe nossa produção, lançamentos e dicas de cuidado em nossa rede social.
          </p>
          <div className="h-[1px] w-12 bg-brand-dark-rose/40 mx-auto mt-4"></div>
        </div>

        {/* Vertical content cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {contentCards.map((card) => (
            <a 
              key={card.id}
              href={card.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col bg-[#FFFDFC] border border-brand-soft-rose/20 rounded-xs overflow-hidden hover:shadow-xs transition-all duration-300"
              id={`instagram-card-${card.id}`}
            >
              {/* Portrait Aspect Ratio for high close-up visual impact */}
              <div className="aspect-[4/5] w-full bg-brand-light-pink/10 relative overflow-hidden">
                <img 
                  src={card.image} 
                  alt={card.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                
                {/* Floating Micro Badge */}
                <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-brand-dark-rose shadow-xs">
                  <Instagram size={14} className="stroke-[1.5]" />
                </div>

                <div className="absolute inset-0 bg-brand-dark-rose/5 group-hover:bg-transparent pointer-events-none transition-colors duration-300"></div>
              </div>

              {/* Card Footer Text */}
              <div className="p-4 flex items-center justify-between border-t border-brand-soft-rose/10 bg-[#FFFDFC]">
                <p className="text-xs font-serif italic text-brand-text group-hover:text-brand-dark-rose transition-colors leading-relaxed line-clamp-1 pr-4">
                  {card.title}
                </p>
                <div className="flex-shrink-0 text-brand-dark-rose group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300">
                  <ArrowUpRight size={14} className="stroke-[2]" />
                </div>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}
