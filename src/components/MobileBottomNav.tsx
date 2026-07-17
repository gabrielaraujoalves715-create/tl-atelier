import { useEffect, useRef, useState } from 'react';
import { Grid, Home, Instagram, Search, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import CustomCartIcon from './CustomCartIcon';

interface MobileBottomNavProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function MobileBottomNav({
  searchQuery,
  onSearchChange,
}: MobileBottomNavProps) {
  const { setIsOpen, itemCount } = useCart();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleSearchClick = () => {
    setIsSearchOpen(true);
  };

  const handleSearchChange = (query: string) => {
    onSearchChange(query);

    if (query.trim()) {
      window.setTimeout(() => handleScrollTo('colecao'), 100);
    }
  };

  const handleClearSearch = () => {
    onSearchChange('');
    searchInputRef.current?.focus();
  };

  const handleCloseSearch = () => {
    setIsSearchOpen(false);
  };

  useEffect(() => {
    if (!isSearchOpen) return;

    window.setTimeout(() => searchInputRef.current?.focus(), 100);
  }, [isSearchOpen]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsSearchOpen(false);
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  return (
    <>
      {isSearchOpen && (
        <>
          <button
            type="button"
            aria-label="Fechar pesquisa"
            onClick={handleCloseSearch}
            className="fixed inset-0 z-[55] bg-black/35 md:hidden"
          />

          <div
            role="search"
            className="fixed inset-x-3 bottom-[88px] z-[60] rounded-xl border border-neutral-200 bg-white p-4 shadow-2xl md:hidden"
          >
            <div className="mb-3 flex items-center justify-between gap-4">
              <div>
                <h2 className="mt-1 text-base font-semibold text-brand-text">
                  Qual joia você procura?
                </h2>
              </div>

              <button
                type="button"
                onClick={handleCloseSearch}
                aria-label="Fechar pesquisa"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-brand-text transition-colors hover:bg-neutral-100"
              >
                <X size={20} className="stroke-[1.5]" />
              </button>
            </div>

            <div className="flex h-12 items-center gap-3 rounded-lg border border-brand-soft-rose/35 bg-brand-light-pink/10 px-4 focus-within:border-brand-dark-rose">
              <Search
                size={19}
                className="shrink-0 stroke-[1.5] text-brand-text/55"
              />

              <input
                ref={searchInputRef}
                type="search"
                value={searchQuery}
                onChange={(event) => handleSearchChange(event.target.value)}
                placeholder="Ex.: colar, pulseira ou brinco"
                aria-label="Pesquisar produtos"
                className="h-full min-w-0 flex-1 border-none bg-transparent text-sm text-brand-text outline-none placeholder:text-brand-text/40 focus:ring-0"
              />

              {searchQuery && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="shrink-0 text-[10px] font-bold uppercase tracking-wider text-brand-dark-rose"
                >
                  Limpar
                </button>
              )}
            </div>
          </div>
        </>
      )}

      <nav
        aria-label="Navegação mobile"
        className="fixed bottom-0 left-0 right-0 z-50 flex items-end justify-between border-t border-neutral-900 bg-black px-2 py-2.5 shadow-[0_-4px_16px_rgba(0,0,0,0.3)] md:hidden"
      >
        {/* Início */}
        <button
          type="button"
          onClick={() => handleScrollTo('inicio')}
          className="flex w-1/5 cursor-pointer flex-col items-center justify-center gap-1.5 py-1 text-white/90 transition-colors hover:text-[#F472B6]"
        >
          <Home size={20} className="stroke-[1.5]" />
          <span className="font-sans text-[9px] font-medium uppercase tracking-[0.1em]">
            Início
          </span>
        </button>

        {/* Categorias */}
        <button
          type="button"
          onClick={() => handleScrollTo('categorias')}
          className="flex w-1/5 cursor-pointer flex-col items-center justify-center gap-1.5 py-1 text-white/90 transition-colors hover:text-[#F472B6]"
        >
          <Grid size={20} className="stroke-[1.5]" />
          <span className="font-sans text-[9px] font-medium uppercase tracking-[0.1em]">
            Categorias
          </span>
        </button>

        {/* Sacola */}
        <div className="relative -top-3 flex w-1/5 flex-col items-center justify-center">
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="flex h-14 w-14 cursor-pointer items-center justify-center rounded-full border-2 border-black bg-white text-black shadow-lg transition-transform duration-300 hover:scale-105 active:scale-95 focus:outline-hidden"
            aria-label={`Abrir sacola com ${itemCount} ${itemCount === 1 ? 'item' : 'itens'}`}
          >
            <CustomCartIcon itemCount={itemCount} size={28} />
          </button>
          <span className="mt-1 text-[9px] font-bold uppercase tracking-[0.1em] text-white">
            Sacola
          </span>
        </div>

        {/* Instagram */}
<a
  href="https://www.instagram.com/ateliertl__/"
  aria-label="Acessar Instagram da TL Atelier"
  className="
    flex w-1/5 cursor-pointer flex-col
    items-center justify-center gap-1.5
    py-1 text-white/90
    transition-colors hover:text-[#F472B6]
  "
>
  <Instagram size={20} className="stroke-[1.5]" />

  <span className="font-sans text-[9px] font-medium uppercase tracking-[0.1em]">
    Instagram
  </span>
</a>

        {/* Pesquisa */}
        <button
          type="button"
          onClick={handleSearchClick}
          aria-expanded={isSearchOpen}
          className={`flex w-1/5 cursor-pointer flex-col items-center justify-center gap-1.5 py-1 transition-colors ${
            isSearchOpen || searchQuery
              ? 'text-[#F472B6]'
              : 'text-white/90 hover:text-[#F472B6]'
          }`}
        >
          <Search size={20} className="stroke-[1.5]" />
          <span className="font-sans text-[9px] font-medium uppercase tracking-[0.1em]">
            Pesquisa
          </span>
        </button>
      </nav>
    </>
  );
}