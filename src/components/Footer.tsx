import React, { useState } from 'react';
import {
  Instagram,
  ChevronDown,
  ChevronUp,
  CheckCircle,
} from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
const [subscribed, setSubscribed] = useState(false);
const [isSubmitting, setIsSubmitting] = useState(false);
const [subscribeError, setSubscribeError] = useState('');
const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    if (openSection === section) {
      setOpenSection(null);
    } else {
      setOpenSection(section);
    }
  };

  const handleSubscribe = async (
  event: React.FormEvent<HTMLFormElement>,
) => {
  event.preventDefault();

  const normalizedEmail = email.trim().toLowerCase();

  if (!normalizedEmail || isSubmitting) {
    return;
  }

  setIsSubmitting(true);
  setSubscribeError('');

  try {
    const response = await fetch('/api/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: normalizedEmail,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || 'Não foi possível realizar a inscrição.',
      );
    }

    setSubscribed(true);
    setEmail('');
  } catch (error) {
    setSubscribeError(
      error instanceof Error
        ? error.message
        : 'Não foi possível realizar a inscrição. Tente novamente.',
    );
  } finally {
    setIsSubmitting(false);
  }
};

  // Accordion lists
  const sections = {
    sobre: {
      title: 'SOBRE A TL ATELIER',
      content: 'A TL Atelier é uma marca paulistana dedicada à curadoria de joias exclusivas em Prata 925 legítima. Unimos sofisticação, design minimalista e afeto para criar peças que acompanham você em todos os momentos da sua rotina, trazendo brilho e confiança ao seu estilo de vida.'
    },
    ajuda: {
      title: 'AJUDA',
      content: 'Oferecemos total suporte aos nossos clientes. Garantia legítima de 2 anos contra defeitos de fabricação. Opções flexíveis de entrega rápida via motoboy ou retirada agendada em pontos parceiros na Grande São Paulo.'
    },
    sac: {
      title: 'SAC',
      content: 'Precisa de suporte? Entre em contato pelo WhatsApp (11) 96542-8500 ou pelo e-mail sac@ateliertl.com.br. Nosso horário de atendimento é de segunda a sexta-feira, das 09:00 às 18:00.'
    }
  };

  return (
    <footer className="bg-black text-white py-16 px-4 select-none border-t border-neutral-800">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        
        {/* 1. NEWSLETTER */}
        <div className="mb-12 w-full px-2 text-center sm:px-0">
          <h3 className="mb-5 text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Cadastre-se
          </h3>

          <div className="mx-auto mb-7 flex w-fit flex-col items-start gap-4 text-sm sm:flex-row sm:items-center sm:gap-8">
            <div className="flex w-full items-center gap-3 sm:w-auto">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#F472B6] text-xs font-bold text-white">
                ✓
              </span>
              <span className="text-left text-neutral-200">
                Ganhe 10% de desconto
              </span>
            </div>

            <div className="flex w-full items-center gap-3 sm:w-auto">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#F472B6] text-xs font-bold text-white">
                ✓
              </span>
              <span className="text-left text-neutral-200">
                Melhores ofertas
              </span>
            </div>
          </div>

          {subscribed ? (
  <div
    role="status"
    className="mx-auto flex max-w-lg items-center justify-center gap-2 rounded-md border border-emerald-500/30 bg-emerald-600/20 px-4 py-4 text-xs text-emerald-300 sm:px-6"
  >
    <CheckCircle size={16} className="shrink-0" />

    <span>
      Inscrição realizada com sucesso! Aproveite os 10% de desconto.
    </span>
  </div>
) : (
  <div className="mx-auto w-full max-w-lg">
    <form
      onSubmit={handleSubscribe}
      className="flex w-full flex-col gap-3 sm:flex-row sm:gap-0"
    >
      <input
        type="email"
        placeholder="Digite seu melhor e-mail"
        value={email}
        onChange={(event) => {
          setEmail(event.target.value);
          setSubscribeError('');
        }}
        required
        disabled={isSubmitting}
        autoComplete="email"
        aria-label="Digite seu e-mail"
        aria-describedby={
          subscribeError ? 'newsletter-error' : undefined
        }
        className="h-12 w-full rounded-full border border-neutral-200 bg-white px-5 text-center text-sm text-neutral-800 outline-none placeholder:text-center placeholder:text-neutral-400 focus:border-[#F472B6] disabled:cursor-not-allowed disabled:opacity-70 sm:rounded-r-none"
      />

      <button
        type="submit"
        disabled={isSubmitting}
        className="flex h-12 w-full shrink-0 cursor-pointer items-center justify-center gap-2 rounded-full bg-[#F472B6] px-6 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-[#EC4899] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F472B6] disabled:cursor-not-allowed disabled:opacity-65 sm:w-auto sm:min-w-[170px] sm:rounded-l-none"
      >
        {isSubmitting ? (
          <span>Enviando...</span>
        ) : (
          <>
            <span>Quero receber</span>
            <span aria-hidden="true">💌</span>
          </>
        )}
      </button>
    </form>

    {subscribeError && (
      <p
        id="newsletter-error"
        role="alert"
        className="mt-3 text-center text-xs text-red-300"
      >
        {subscribeError}
      </p>
    )}

    <p className="mt-3 text-center text-[10px] leading-relaxed text-neutral-500">
      Ao se cadastrar, você concorda em receber novidades e ofertas da
      TL Atelier. Você poderá cancelar a inscrição quando desejar.
    </p>
  </div>
)}

        {/* 2. LOGO BRAND CENTRED (Screenshot 1) */}
        <div className="flex flex-col items-center text-center mt-6 mb-8">
          <span className="font-serif text-[24px] sm:text-[32px] tracking-[0.25em] text-white uppercase font-light leading-none">
            TL Atelier
          </span>
          <span className="text-[9px] sm:text-[11px] tracking-[0.55em] text-[#F472B6] uppercase font-sans font-medium mt-1.5">
            P R A T A S
          </span>
        </div>

        {/* 3. REDES SOCIAIS */}
        <div className="mb-12 flex items-center justify-center gap-8 text-neutral-400">
          <a
  href="https://www.instagram.com/ateliertl__/"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="Acessar Instagram da TL Atelier"
>
            <Instagram size={22} strokeWidth={1.5} />
          </a>

          <a
            href="https://wa.me/5511965428500"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp da TL Atelier"
            className="transition-colors hover:text-white focus-visible:text-white focus-visible:outline-none"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-[22px] w-[22px] fill-current"
            >
              <path d="M12.04 2a9.84 9.84 0 0 0-8.39 14.98L2 22l5.17-1.61A9.99 9.99 0 1 0 12.04 2Zm0 17.98a8.02 8.02 0 0 1-4.1-1.12l-.29-.17-3.07.96.99-2.99-.19-.31a7.82 7.82 0 0 1-1.2-4.18 7.86 7.86 0 1 1 7.86 7.81Zm4.31-5.89c-.24-.12-1.4-.69-1.62-.77-.22-.08-.38-.12-.54.12-.16.24-.62.77-.76.93-.14.16-.28.18-.52.06-.24-.12-1-.37-1.91-1.18-.71-.63-1.18-1.41-1.32-1.65-.14-.24-.01-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.19-.47-.39-.41-.54-.42h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.69 2.58 4.1 3.62.57.25 1.02.39 1.37.5.58.18 1.1.16 1.51.1.46-.07 1.4-.57 1.6-1.13.2-.55.2-1.03.14-1.13-.06-.1-.22-.16-.46-.28Z" />
            </svg>
          </a>
        </div>

        {/* 4. ACCORDIONS / MENU COLLAPSE (Screenshot 1) */}
        <div className="w-full border-t border-neutral-800 divide-y divide-neutral-800 text-xs sm:text-sm font-semibold tracking-wider uppercase mb-12">
          
          {/* Section 1: SOBRE A TL ATELIER */}
          <div className="py-4">
            <button 
              onClick={() => toggleSection('sobre')}
              className="w-full flex items-center justify-between text-left focus:outline-hidden text-neutral-200 hover:text-white"
            >
              <span>{sections.sobre.title}</span>
              {openSection === 'sobre' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
            {openSection === 'sobre' && (
              <p className="mt-3 text-neutral-400 font-normal lowercase tracking-normal normal-case leading-relaxed select-text">
                {sections.sobre.content}
              </p>
            )}
          </div>

          {/* Section 2: AJUDA */}
          <div className="py-4">
            <button 
              onClick={() => toggleSection('ajuda')}
              className="w-full flex items-center justify-between text-left focus:outline-hidden text-neutral-200 hover:text-white"
            >
              <span>{sections.ajuda.title}</span>
              {openSection === 'ajuda' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
            {openSection === 'ajuda' && (
              <p className="mt-3 text-neutral-400 font-normal lowercase tracking-normal normal-case leading-relaxed select-text">
                {sections.ajuda.content}
              </p>
            )}
          </div>

          {/* Section 3: SAC */}
          <div className="py-4">
            <button 
              onClick={() => toggleSection('sac')}
              className="w-full flex items-center justify-between text-left focus:outline-hidden text-neutral-200 hover:text-white"
            >
              <span>{sections.sac.title}</span>
              {openSection === 'sac' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
            {openSection === 'sac' && (
              <p className="mt-3 text-neutral-400 font-normal lowercase tracking-normal normal-case leading-relaxed select-text">
                {sections.sac.content}
              </p>
            )}
          </div>

        </div>

        {/* 5. FORMAS DE PAGAMENTO E SEGURANÇA */}
        <div className="mb-8 w-full border-b border-neutral-900 pb-12">
          <img
            src="/formas-pagamento.png"
            alt="Formas de pagamento aceitas e selos de segurança"
            loading="lazy"
            className="mx-auto block h-auto w-full max-w-[423px] object-contain"
          />
        </div>

        {/* 7. COPYRIGHT BAR (Screenshot 1) */}
        <div className="w-full text-center text-[9px] sm:text-[10px] text-neutral-500 tracking-wider">
          <p>© {new Date().getFullYear()} TL ATELIER PRATAS</p>
          <p className="mt-1 lowercase first-letter:uppercase">• Todos os direitos reservados.</p>
        </div>

              </div>
      </div>
    </footer>
  );
}