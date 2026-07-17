import { Star } from 'lucide-react';

export default function Testimonials() {
  const reviews = [
    {
      text: '“A peça chegou muito bem embalada e o acabamento é ainda mais bonito pessoalmente. Dá para perceber o cuidado no polimento da prata.”',
      author: 'Beatriz Santos',
      rating: 5
    },
    {
      text: '“Comprei o colar minimalista e uso todo dia, não tiro nem para dormir. A prata continua impecável e com um brilho lindo.”',
      author: 'Mariana Costa',
      rating: 5
    },
    {
      text: '“Atendimento excelente pelo WhatsApp. Tirei minhas dúvidas, fiz o Pix e optei por retirar em São Paulo. Tudo muito rápido e seguro!”',
      author: 'Camila Oliveira',
      rating: 5
    }
  ];

  return (
    <section id="depoimentos" className="py-20 border-b border-brand-soft-rose/20 bg-brand-main">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Quote title */}
        <div className="text-center max-w-xl mx-auto mb-14">
          <span className="text-[10px] uppercase tracking-[0.3em] text-brand-dark-rose font-bold mb-3 block">
            Feedbacks Reais
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-brand-text font-normal italic leading-tight">
            O que dizem sobre nós
          </h2>
          <p className="text-xs text-brand-text/50 uppercase tracking-widest mt-2">
            Carinho de quem escolhe a TL Atelier para fazer parte de seus momentos.
          </p>
          <div className="h-[1px] w-12 bg-brand-dark-rose/40 mx-auto mt-4"></div>
        </div>

        {/* 3 testimonial cards in grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {reviews.map((rev, idx) => (
            <div 
              key={idx} 
              className="flex flex-col justify-between p-6 sm:p-8 bg-white border border-brand-soft-rose/15 rounded-xs"
              id={`testimonial-${idx}`}
            >
              {/* Star Rating discrete */}
              <div className="flex gap-1 mb-4 text-brand-dark-rose/80">
                {Array.from({ length: rev.rating }).map((_, i) => (
                  <Star key={i} size={11} className="fill-brand-dark-rose/60 stroke-[1.5]" />
                ))}
              </div>

              <p className="font-serif italic text-xs sm:text-sm text-brand-text/80 leading-relaxed mb-6 flex-grow">
                {rev.text}
              </p>
              
              <div className="text-[9px] uppercase tracking-[0.2em] text-brand-dark-rose font-bold">
                — {rev.author}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
