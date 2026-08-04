import { useState } from 'react';
import {
  HelpCircle,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQ() {
  const [activeIndex, setActiveIndex] =
    useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      question: 'A prata é realmente 925 legítima?',
      answer:
        'Sim, todas as joias da TL Atelier são confeccionadas em Prata 925 legítima. Enviamos junto o certificado de garantia.',
    },
    {
      question: 'Qual o prazo e a cobertura da garantia?',
      answer:
        'Oferecemos garantia por tempo indeterminado sobre o teor da prata. A garantia cobre defeitos de fabricação e autenticidade do metal. Não cobre quebras, perda de pedras ou danos por mau uso.',
    },
    {
      question: 'Quais são as formas de pagamento aceitas?',
      answer:
        'Aceitamos pagamentos via Pix, cartão e dinheiro na retirada de pedidos.',
    },
    {
      question: 'Como faço para encomendar e receber?',
      answer:
        'Adicione as peças desejadas à sacola e finalize o pedido. A lista será enviada para o nosso WhatsApp, onde combinamos o pagamento, a retirada ou o envio.',
    },
  ];

  const toggleIndex = (index: number) => {
    setActiveIndex(
      activeIndex === index ? null : index,
    );
  };

  return (
    <section
      id="faq"
      className="
        border-b border-brand-soft-rose/20
        bg-brand-main
        py-16 sm:py-20
      "
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        {/* Título */}
        <div className="mb-10 text-center sm:mb-14">
          <span
            className="
              mb-3 inline-flex
              items-center gap-1.5
              text-[10px] font-bold
              uppercase tracking-[0.25em]
              text-brand-dark-rose
            "
          >
        
            
          </span>

          <h2
            className="
              font-serif
              text-[30px]
              font-medium
              leading-[1.15]
              tracking-[-0.02em]
              text-brand-text
              sm:text-[38px]
              md:text-[42px]
            "
          >
            Perguntas frequentes
          </h2>

          <p
            className="
              mt-3
              text-xs uppercase tracking-widest
              text-brand-text/50
            "
          >
            Encontre respostas rápidas para suas perguntas
          </p>

          <div
            className="
              mx-auto mt-5
              h-px w-12
              bg-brand-dark-rose/40
            "
          />
        </div>

        {/* Perguntas */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = activeIndex === index;

            return (
              <div
                key={faq.question}
                className="
                  overflow-hidden rounded-sm
                  border border-brand-soft-rose/20
                  bg-white
                  transition-all duration-300
                "
              >
                <button
                  type="button"
                  onClick={() => toggleIndex(index)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                  id={`faq-btn-${index}`}
                  className="
                    flex w-full
                    cursor-pointer
                    items-center justify-between
                    gap-4 px-6 py-4
                    text-left
                    focus:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-brand-dark-rose
                  "
                >
                  <span
                    className="
                      font-serif
                      text-sm font-medium
                      leading-relaxed
                      text-brand-text
                      sm:text-base
                    "
                  >
                    {faq.question}
                  </span>

                  <span className="shrink-0 text-brand-dark-rose">
                    {isOpen ? (
                      <ChevronUp size={16} />
                    ) : (
                      <ChevronDown size={16} />
                    )}
                  </span>
                </button>

                <div
                  id={`faq-answer-${index}`}
                  role="region"
                  aria-labelledby={`faq-btn-${index}`}
                  className={`
                    overflow-hidden
                    transition-all
                    duration-300
                    ease-in-out
                    ${
                      isOpen
                        ? 'max-h-48 border-t border-brand-soft-rose/10 px-6 py-5 opacity-100'
                        : 'pointer-events-none max-h-0 px-6 py-0 opacity-0'
                    }
                  `}
                >
                  <p
                    className="
                      text-xs
                      leading-relaxed
                      text-brand-text/70
                      sm:text-sm
                    "
                  >
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