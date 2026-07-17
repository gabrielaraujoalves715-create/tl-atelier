import { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      question: 'A prata é realmente 925 legítima?',
      answer: 'Sim, todas as joias da TL Atelier são confeccionadas em prata 925 legítima de altíssima pureza. Enviamos junto o certificado de garantia do teor do metal.'
    },
    {
      question: 'Qual o prazo e a cobertura da garantia?',
      answer: 'Oferecemos garantia de 2 anos sobre o teor da prata. A garantia cobre defeitos de fabricação e autenticidade do metal. Não cobre quebras, perda de pedras ou danos por mau uso.'
    },
    {
      question: 'Quais são as formas de pagamento aceitas?',
      answer: 'Aceitamos pagamentos simplificados via Pix, cartões de crédito e dinheiro físico na retirada de pedidos.'
    },
    {
      question: 'Como faço para encomendar e receber?',
      answer: 'Como nosso site funciona como catálogo virtual, você pode adicionar as peças desejadas ao carrinho e clicar no botão de fechamento. Isso enviará a lista completa para o nosso WhatsApp, onde finalizamos o envio ou retirada.'
    }
  ];

  const toggleIndex = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 border-b border-brand-soft-rose/20 bg-brand-main">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-[10px] uppercase tracking-[0.25em] text-brand-dark-rose font-bold mb-2 inline-flex items-center gap-1.5">
            <HelpCircle size={10} />
            Dúvidas Frequentes
          </span>
          <h2 className="font-serif text-3xl text-brand-text font-normal italic">
            Perguntas Comuns
          </h2>
          <p className="text-[10px] uppercase tracking-widest text-brand-text/40 mt-1">
            Encontre respostas rápidas para as suas perguntas
          </p>
        </div>

        {/* Accordions */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = activeIndex === idx;
            return (
              <div
                key={idx}
                className="border border-brand-soft-rose/20 rounded-sm bg-white overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => toggleIndex(idx)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left focus:outline-hidden cursor-pointer"
                  id={`faq-btn-${idx}`}
                >
                  <span className="font-serif italic text-sm sm:text-base text-brand-text">
                    {faq.question}
                  </span>
                  <span className="text-brand-dark-rose">
                    {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </span>
                </button>
                
                <div
                  className={`transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-40 border-t border-brand-soft-rose/10 opacity-100 p-6' : 'max-h-0 opacity-0 pointer-events-none'
                  }`}
                >
                  <p className="text-xs sm:text-sm text-brand-text/70 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
