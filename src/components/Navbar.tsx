import { useState } from 'react';
import { Instagram, Menu, Search, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import CustomCartIcon from './CustomCartIcon';

const INSTAGRAM_URL = 'https://www.instagram.com/ateliertl__/';

interface NavbarProps {
  onSelectCategory?: (
    category: 'colares' | 'pulseiras' | 'brincos' | null,
  ) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

type NavLink = {
  label: string;
  href: string;
  category: 'colares' | 'pulseiras' | 'brincos' | null;
};

export default function Navbar({
  onSelectCategory,
  searchQuery,
  onSearchChange,
}: NavbarProps) {
  const { setIsOpen, itemCount } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks: NavLink[] = [
    { label: 'Início', href: '#inicio', category: null },
    { label: 'Colares', href: '#colecao', category: 'colares' },
    { label: 'Pulseiras', href: '#colecao', category: 'pulseiras' },
    { label: 'Brincos', href: '#colecao', category: 'brincos' },
    { label: 'Sobre', href: '#prata-925', category: null },
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
      <div className="w-full select-none border-b border-brand-dark-rose/25 bg-brand-dark-rose px-4 py-2 text-center text-[10px] font-medium tracking-[0.15em] text-[#FFFDFC] sm:text-xs">
        Parcele em até 10x
      </div>

      <header
        id="navbar"
        className="w-full border-b border-brand-soft-rose/15 bg-white/95 backdrop-blur-md transition-all duration-300"
      >
        {/* Linha principal */}
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 sm:py-3 md:py-4 lg:px-8">
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
                <X size={22} className="stroke-[1.5]" />
              ) : (
                <Menu size={22} className="stroke-[1.5]" />
              )}
            </button>
          </div>

          {/* Busca desktop */}
          <div className="hidden w-1/3 select-none items-center text-brand-text/75 md:flex">
            <div className="group flex w-full max-w-xs items-center space-x-3 border-b border-transparent pb-1 transition-all duration-300 hover:border-brand-soft-rose/30">
              <Search
                size={18}
                className="stroke-[1.5] text-brand-text/60 transition-colors group-hover:text-brand-dark-rose"
              />

              <input
                type="search"
                placeholder="Olá, qual joia você procura?"
                value={searchQuery}
                onChange={(event) => {
                  onSearchChange(event.target.value);
                  scrollToCollection();
                }}
                className="w-full border-none bg-transparent text-xs text-brand-text outline-hidden placeholder:text-brand-text/40 focus:outline-hidden focus:ring-0 sm:text-[13px]"
              />
            </div>
          </div>

          {/* Logo central */}
          <div className="flex w-2/4 items-center justify-center md:w-1/3">
            <a
              href="#inicio"
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
          <div className="flex w-1/4 items-center justify-end space-x-4 sm:space-x-6 md:w-1/3 md:space-x-7">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden text-brand-text/75 transition-colors duration-200 hover:text-brand-dark-rose lg:inline-block"
              aria-label="Acessar Instagram da TL Atelier"
              id="instagram-link"
            >
              <Instagram size={18} className="stroke-[1.5]" />
            </a>

            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="group relative flex cursor-pointer items-center justify-center focus:outline-hidden"
              aria-label={`Abrir sacola com ${itemCount} ${
                itemCount === 1 ? 'item' : 'itens'
              }`}
              id="cart-btn"
            >
              <CustomCartIcon itemCount={itemCount} size={25} />
            </button>
          </div>
        </div>

        {/* Navegação desktop */}
        <nav className="hidden items-center justify-center border-t border-brand-soft-rose/10 bg-brand-light-pink/5 py-3 text-[10px] font-bold uppercase tracking-[0.25em] text-brand-text/75 md:flex sm:text-[11px]">
          <div className="flex space-x-10">
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
          className={`absolute left-0 top-full w-full border-b border-brand-soft-rose/25 bg-white/95 backdrop-blur-md transition-all duration-300 ease-in-out md:hidden ${
            isMobileMenuOpen
              ? 'pointer-events-auto translate-y-0 opacity-100 shadow-md'
              : 'pointer-events-none -translate-y-4 opacity-0'
          }`}
        >
          <div className="flex flex-col items-center space-y-4 px-5 pb-6 pt-4">
            {/* Busca mobile */}
            <div className="mb-2 flex w-full items-center space-x-2.5 rounded-xs border border-brand-soft-rose/20 bg-brand-light-pink/20 px-3.5 py-2">
              <Search
                size={15}
                className="stroke-[2] text-brand-text/50"
              />

              <input
                type="search"
                placeholder="Qual joia você procura?"
                value={searchQuery}
                onChange={(event) => onSearchChange(event.target.value)}
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

            {/* Instagram mobile */}
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Acessar Instagram da TL Atelier"
              className="flex w-full items-center justify-center space-x-2 border-t border-brand-soft-rose/15 pt-3 text-xs font-semibold uppercase tracking-widest text-brand-text transition-colors duration-200 hover:text-brand-dark-rose"
            >
              <Instagram size={14} className="stroke-[1.5]" />
              <span>Instagram</span>
            </a>
          </div>
        </div>
      </header>
    </div>
  );
}