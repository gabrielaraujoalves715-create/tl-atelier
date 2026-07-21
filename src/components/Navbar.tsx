import { useState } from 'react';
import { Instagram, Menu, Search, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import CustomCartIcon from './CustomCartIcon';
import type { ProductCategory } from '../types/product';

const INSTAGRAM_URL = 'https://www.instagram.com/ateliertl__/';

interface NavbarProps {
  onSelectCategory?: (
    category: ProductCategory | null,
  ) => void;

  searchQuery: string;
  onSearchChange: (query: string) => void;
}

type NavLink = {
  label: string;
  href: string;
  category: ProductCategory | null;
};

export default function Navbar({
  onSelectCategory,
  searchQuery,
  onSearchChange,
}: NavbarProps) {
  const { setIsOpen, itemCount } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navLinks: NavLink[] = [
    {
      label: 'Início',
      href: '#inicio',
      category: null,
    },
    {
      label: 'Colares',
      href: '#colecao',
      category: 'colares',
    },
    {
      label: 'Pulseiras',
      href: '#colecao',
      category: 'pulseiras',
    },
    {
      label: 'Brincos',
      href: '#colecao',
      category: 'brincos',
    },
    {
      label: 'Conjuntos',
      href: '#colecao',
      category: 'conjuntos',
    },
    {
      label: 'Anéis',
      href: '#colecao',
      category: 'aneis',
    },
    {
      label: 'Sobre',
      href: '#prata-925',
      category: null,
    },
  ];

  const handleLinkClick = (link: NavLink) => {
    setIsMobileMenuOpen(false);
    onSelectCategory?.(link.category);
  };

  const scrollToCollection = () => {
    const collection = document.getElementById('colecao');

    collection?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  return (
    <div className="fixed left-0 top-0 z-50 flex w-full flex-col shadow-xs">
      {/* Barra promocional */}
      <div className="flex h-8 w-full select-none items-center justify-center border-b border-brand-dark-rose/25 bg-brand-dark-rose px-4 text-center text-[10px] font-semibold tracking-[0.18em] text-[#FFFDFC] sm:text-xs">
        Parcele em até 10x
      </div>

      <header
        id="navbar"
        className="relative w-full border-b border-brand-soft-rose/20 bg-[#FFFDFC]/95 backdrop-blur-md"
      >
        {/* Linha principal */}
        <div className="mx-auto flex h-[88px] w-full max-w-[1920px] items-center justify-between px-4 sm:px-6 md:h-[132px] lg:px-8">
          {/* Menu mobile */}
          <div className="flex w-1/4 md:hidden">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((isOpen) => !isOpen)}
              className="p-1 text-brand-text transition-colors duration-200 hover:text-brand-dark-rose focus:outline-hidden"
              aria-label={isMobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation"
              id="mobile-menu-btn"
            >
              {isMobileMenuOpen ? (
                <X size={23} className="stroke-[1.4]" />
              ) : (
                <Menu size={23} className="stroke-[1.4]" />
              )}
            </button>
          </div>

          {/* Busca desktop */}
          <div className="hidden w-1/3 items-center md:flex">
            <div className="group flex w-full max-w-sm items-center gap-3">
              <Search
                size={22}
                className="shrink-0 stroke-[1.3] text-brand-text transition-colors group-focus-within:text-brand-dark-rose"
              />

              <input
                type="search"
                placeholder="Olá, qual joia você procura?"
                value={searchQuery}
                onChange={(event) => {
                  onSearchChange(event.target.value);
                  scrollToCollection();
                }}
                className="w-full border-none bg-transparent text-sm text-brand-text outline-hidden placeholder:text-brand-text/55 focus:outline-hidden focus:ring-0 lg:text-base"
              />
            </div>
          </div>

          {/* Logo oficial */}
          <div className="flex w-2/4 items-center justify-center md:w-1/3">
            <a
              href="/"
              aria-label="Voltar ao início"
              className="flex items-center justify-center"
            >
              <img
                src="/logo-tl-atelier.png"
                alt="TL Atelier Pratas"
                className="block h-auto w-[130px] object-contain sm:w-[160px] md:w-[190px]"
              />
            </a>
          </div>

          {/* Ícones da direita */}
          <div className="flex w-1/4 items-center justify-end gap-5 sm:gap-7 md:w-1/3">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden text-brand-text transition-colors duration-200 hover:text-brand-dark-rose md:inline-flex"
              aria-label="Acessar Instagram da TL Atelier"
              id="instagram-link"
            >
              <Instagram size={21} className="stroke-[1.3]" />
            </a>

            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="group relative flex cursor-pointer items-center justify-center text-brand-text transition-colors hover:text-brand-dark-rose focus:outline-hidden"
              aria-label={`Abrir sacola com ${itemCount} ${
                itemCount === 1 ? 'item' : 'itens'
              }`}
              id="cart-btn"
            >
              <CustomCartIcon itemCount={itemCount} size={27} />
            </button>
          </div>
        </div>

        {/* Navegação desktop */}
       <nav className="hidden h-11 items-center justify-center text-[11px] font-bold uppercase tracking-[0.25em] text-brand-text/75 md:flex">
          <div className="flex items-center gap-10 lg:gap-12">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => handleLinkClick(link)}
                className="group relative py-1 transition-colors duration-200 hover:text-brand-dark-rose"
              >
                {link.label}

                <span className="absolute bottom-0 left-0 h-[1.5px] w-0 bg-brand-dark-rose transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>
        </nav>

        {/* Menu mobile */}
        <div
          id="mobile-navigation"
          className={`absolute left-0 top-full w-full border-b border-brand-soft-rose/25 bg-[#FFFDFC]/95 backdrop-blur-md transition-all duration-300 ease-in-out md:hidden ${
            isMobileMenuOpen
              ? 'pointer-events-auto translate-y-0 opacity-100 shadow-md'
              : 'pointer-events-none -translate-y-4 opacity-0'
          }`}
        >
          <div className="flex flex-col items-center space-y-4 px-5 pb-6 pt-4">
            {/* Busca mobile */}
            <div className="mb-2 flex w-full items-center gap-2.5 rounded-xs border border-brand-soft-rose/25 bg-brand-light-pink/20 px-3.5 py-2.5">
              <Search
                size={16}
                className="stroke-[1.5] text-brand-text/60"
              />

              <input
                type="search"
                placeholder="Qual joia você procura?"
                value={searchQuery}
                onChange={(event) => {
                  onSearchChange(event.target.value);
                  scrollToCollection();
                }}
                className="w-full border-none bg-transparent text-[11px] text-brand-text outline-hidden placeholder:text-brand-text/45 focus:outline-hidden focus:ring-0"
              />

              {searchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    onSearchChange('');
                    setIsMobileMenuOpen(false);
                    scrollToCollection();
                  }}
                  className="text-[9px] font-bold uppercase tracking-wider text-brand-dark-rose"
                >
                  Limpar
                </button>
              )}
            </div>

            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => handleLinkClick(link)}
                className="py-1 text-xs font-semibold uppercase tracking-widest text-brand-text transition-colors duration-200 hover:text-brand-dark-rose"
              >
                {link.label}
              </a>
            ))}

            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Acessar Instagram da TL Atelier"
              className="flex w-full items-center justify-center gap-2 border-t border-brand-soft-rose/20 pt-3 text-xs font-semibold uppercase tracking-widest text-brand-text transition-colors duration-200 hover:text-brand-dark-rose"
            >
              <Instagram size={15} className="stroke-[1.5]" />
              <span>Instagram</span>
            </a>
          </div>
        </div>
      </header>
    </div>
  );
}