import { Shield, Sparkles } from 'lucide-react';

export default function SilverInfo() {
  return (
    <section id="prata-925" className="py-20 border-b border-brand-soft-rose/20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Column 1: Editorial Block */}
          <div className="space-y-6">
            <span className="text-[10px] uppercase tracking-[0.25em] text-brand-dark-rose font-bold mb-2 flex items-center gap-1.5">
              <Shield size={10} />
              Prata 925 Legítima
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-brand-text font-normal italic leading-tight">
              A Nobreza e o Brilho que<br />Acompanham sua História
            </h2>
            <p className="text-sm text-brand-text/70 leading-relaxed max-w-lg">
              Cada joia da TL Atelier é desenvolvida em Prata 925 legítima, uma liga composta por 92,5% de prata pura e 7,5% de outros metais nobres para garantir a rigidez necessária e a alta durabilidade da peça.
            </p>
            <p className="text-sm text-brand-text/70 leading-relaxed max-w-lg">
              Diferente de semijoias comuns, a prata legítima é um metal precioso eterno que mantém seu valor e beleza através das gerações, com a manutenção e o carinho adequados.
            </p>
          </div>

          {/* Column 2: Elegant Layout Board */}
          <div className="bg-brand-light-pink/15 border border-brand-soft-rose/30 rounded-sm p-8 sm:p-10 space-y-6 relative">
            <div className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/3 opacity-10">
              <span className="font-serif font-bold text-9xl text-brand-dark-rose">925</span>
            </div>

            <h3 className="font-serif text-lg text-brand-text italic mb-4">
              Por que escolher nossas peças?
            </h3>

            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-brand-soft-rose/30 flex items-center justify-center text-brand-dark-rose">
                  <Sparkles size={10} />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-widest font-bold text-brand-text">Metal Nobre Eterno</h4>
                  <p className="text-xs text-brand-text/65 mt-1">Sua joia dura para sempre e pode ser limpa e polida sempre que necessário.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-brand-soft-rose/30 flex items-center justify-center text-brand-dark-rose">
                  <Sparkles size={10} />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-widest font-bold text-brand-text">Hipoalergênico</h4>
                  <p className="text-xs text-brand-text/65 mt-1">A prata de lei reduz significativamente o risco de reações alérgicas ou irritações cutâneas.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-brand-soft-rose/30 flex items-center justify-center text-brand-dark-rose">
                  <Sparkles size={10} />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-widest font-bold text-brand-text">Design Atemporal</h4>
                  <p className="text-xs text-brand-text/65 mt-1">Modelos elegantes e minimalistas criados para harmonizar com qualquer estilo e ocasião.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
