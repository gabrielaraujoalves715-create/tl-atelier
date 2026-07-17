import { Heart, Sparkles, Droplets, Info } from 'lucide-react';

export default function CareGuide() {
  const steps = [
    {
      icon: <Droplets size={16} className="text-brand-dark-rose/70" />,
      title: 'Evite Contato com Água e Químicos',
      description: 'Retire suas joias antes de entrar no banho, piscina ou mar, e evite contato com perfumes, loções ou produtos de limpeza.'
    },
    {
      icon: <Sparkles size={16} className="text-brand-dark-rose/70" />,
      title: 'Limpeza Periódica com Flanela',
      description: 'Use uma flanela macia e limpa para polir suas joias suavemente. Para uma limpeza mais profunda, utilize produtos específicos para prata.'
    },
    {
      icon: <Heart size={16} className="text-brand-dark-rose/70" />,
      title: 'Guarde de Forma Adequada',
      description: 'Armazene suas peças individualmente em locais secos e escuros, de preferência em saquinhos de veludo ou caixas herméticas.'
    }
  ];

  return (
    <section id="cuidados" className="py-20 border-b border-brand-soft-rose/20 bg-brand-main">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-[10px] uppercase tracking-[0.25em] text-brand-dark-rose font-bold mb-2 inline-flex items-center gap-1.5">
            <Info size={10} />
            Guia de Cuidados
          </span>
          <h2 className="font-serif text-3xl text-brand-text font-normal italic">
            Como Cuidar da Sua Joia
          </h2>
          <p className="text-xs text-brand-text/50 uppercase tracking-widest mt-2">
            Pequenos hábitos diários mantêm o brilho eterno da sua Prata 925.
          </p>
        </div>

        {/* List Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {steps.map((step, idx) => (
            <div key={idx} className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-brand-light-pink/40 border border-brand-soft-rose/20 flex items-center justify-center">
                {step.icon}
              </div>
              <div>
                <h3 className="font-serif text-base italic text-brand-text mb-2">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-brand-text/60 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
