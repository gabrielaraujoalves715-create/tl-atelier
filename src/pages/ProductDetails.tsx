import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ArrowLeft, ShoppingBag, Check, MessageCircle, Shield, Clock } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CartDrawer from '../components/CartDrawer';
import ProductCard from '../components/ProductCard';
import { ImagePlaceholder } from '../components/ImagePlaceholder';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';

const formatter = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

export default function ProductDetails() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { addItemWithQuantity, setIsOpen } = useCart();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const product = products.find((p) => p.slug === slug);

  const related = product
    ? products
        .filter((p) => p.category === product.category && p.id !== product.id)
        .slice(0, 4)
    : [];

  const galleryImages =
    product && product.images && product.images.length > 0
      ? product.images
      : product?.image
      ? [product.image]
      : [];

  const handleSelectCategory = () => {
    navigate('/');
  };

  const handleAddToCart = () => {
    if (!product) return;
    addItemWithQuantity(product, quantity);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      setIsOpen(true);
    }, 800);
  };

  const buildWhatsAppUrl = () => {
    if (!product) return 'https://wa.me/5511965428500';
    const unitPrice = formatter.format(product.price);
    const total = formatter.format(product.price * quantity);
    const url = window.location.href;
    const message = [
      'Olá! Vim pelo site da TL Atelier e tenho interesse neste produto:',
      '',
      `Produto: ${product.name}`,
      `Quantidade: ${quantity}`,
      `Valor unitário: ${unitPrice}`,
      `Total: ${total}`,
      `Link: ${url}`,
      '',
      'Gostaria de verificar a disponibilidade.',
    ].join('\n');
    return `https://wa.me/5511965428500?text=${encodeURIComponent(message)}`;
  };

  /* ── Produto não encontrado ─────────────────────────────────── */
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col bg-brand-main">
        <Navbar
          onSelectCategory={handleSelectCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
        <main className="flex-grow flex items-center justify-center mt-[100px] md:mt-[116px]">
          <div className="text-center px-6 py-24">
            <h1 className="font-serif text-2xl text-brand-text mb-4 italic">
              Produto não encontrado
            </h1>
            <p className="text-sm text-brand-text/60 mb-10 max-w-xs mx-auto">
              O produto que você está procurando não existe ou foi removido.
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-black text-white px-8 py-3 text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-neutral-800 transition-colors"
            >
              <ArrowLeft size={13} />
              Voltar ao catálogo
            </Link>
          </div>
        </main>
        <Footer />
        <CartDrawer />
      </div>
    );
  }

  /* ── Página do produto ──────────────────────────────────────── */
  return (
    <div className="min-h-screen flex flex-col bg-brand-main">
      <Navbar
        onSelectCategory={handleSelectCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <main className="flex-grow mt-[100px] md:mt-[116px]">

        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 border-b border-brand-soft-rose/15">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] text-brand-text/50 hover:text-brand-dark-rose transition-colors font-semibold"
          >
            <ArrowLeft size={11} />
            Voltar ao catálogo
          </Link>
        </div>

        {/* Seção principal */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20">

            {/* ── Galeria ── */}
            <div className="flex flex-col gap-4">

              {/* Imagem principal */}
              <div className="aspect-square w-full overflow-hidden border border-[#E8E2DF] bg-[#F6F3F1]">
                {galleryImages.length > 0 ? (
                  <img
                    src={galleryImages[selectedImage]}
                    alt={`${product.name} — imagem principal`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <ImagePlaceholder className="w-full h-full" label="Foto do produto" />
                )}
              </div>

              {/* Miniaturas */}
              {galleryImages.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
                  {galleryImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      aria-label={`Ver imagem ${idx + 1} de ${product.name}`}
                      className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 overflow-hidden border-2 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-dark-rose ${
                        selectedImage === idx
                          ? 'border-brand-dark-rose'
                          : 'border-[#E8E2DF] hover:border-neutral-400'
                      }`}
                    >
                      <img
                        src={img}
                        alt={`${product.name} — miniatura ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* ── Informações ── */}
            <div className="flex flex-col">

              {/* Categoria */}
              <span className="text-[10px] uppercase tracking-[0.3em] text-brand-dark-rose font-bold mb-3 capitalize">
                {product.category}
              </span>

              {/* Nome */}
              <h1 className="font-sans text-2xl sm:text-3xl font-bold text-neutral-900 leading-tight tracking-tight mb-5">
                {product.name}
              </h1>

              {/* Preço */}
              {product.price > 0 ? (
                <div className="flex items-baseline gap-3 mb-6 pb-6 border-b border-brand-soft-rose/15">
                  <span className="text-2xl font-bold text-neutral-900">
                    {formatter.format(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-neutral-400 line-through">
                      {formatter.format(product.originalPrice)}
                    </span>
                  )}
                </div>
              ) : (
                <div className="mb-6 pb-6 border-b border-brand-soft-rose/15">
                  <span className="text-xs uppercase tracking-[0.2em] text-neutral-400 font-medium">
                    Preço a confirmar
                  </span>
                </div>
              )}

              {/* Descrição */}
              {product.description && (
                <p className="text-sm text-neutral-600 leading-relaxed mb-6 pb-6 border-b border-brand-soft-rose/15">
                  {product.description}
                </p>
              )}

              {/* Material e Garantia */}
              {(product.material || product.warranty) && (
                <div className="flex flex-col gap-3 mb-6 pb-6 border-b border-brand-soft-rose/15">
                  {product.material && (
                    <div className="flex items-center gap-3">
                      <Shield size={14} className="text-brand-dark-rose flex-shrink-0" aria-hidden="true" />
                      <span className="text-xs text-neutral-700">
                        <span className="font-semibold uppercase tracking-wider">Material:</span>{' '}
                        {product.material}
                      </span>
                    </div>
                  )}
                  {product.warranty && (
                    <div className="flex items-center gap-3">
                      <Clock size={14} className="text-brand-dark-rose flex-shrink-0" aria-hidden="true" />
                      <span className="text-xs text-neutral-700">
                        <span className="font-semibold uppercase tracking-wider">Garantia:</span>{' '}
                        {product.warranty}
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* Formas de pagamento */}
              <div className="mb-6 pb-6 border-b border-brand-soft-rose/15">
                <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-semibold mb-2">
                  Formas de pagamento
                </p>
                <p className="text-xs text-neutral-600">Pix · Cartão de crédito · Dinheiro</p>
              </div>

              {/* Seletor de quantidade */}
              <div className="mb-7">
                <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-semibold mb-3">
                  Quantidade
                </p>
                <div className="inline-flex items-center border border-[#E8E2DF]">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    aria-label="Diminuir quantidade"
                    className="w-10 h-10 flex items-center justify-center text-neutral-700 hover:bg-neutral-50 transition-colors border-r border-[#E8E2DF] text-base leading-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-dark-rose"
                  >
                    −
                  </button>
                  <span
                    aria-live="polite"
                    aria-label={`Quantidade: ${quantity}`}
                    className="w-12 h-10 flex items-center justify-center text-sm font-semibold text-neutral-900 select-none"
                  >
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    aria-label="Aumentar quantidade"
                    className="w-10 h-10 flex items-center justify-center text-neutral-700 hover:bg-neutral-50 transition-colors border-l border-[#E8E2DF] text-base leading-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-dark-rose"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Botões de ação */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleAddToCart}
                  aria-label={`Adicionar ${product.name} à sacola`}
                  className={`flex-1 py-4 text-[10px] uppercase tracking-[0.2em] font-bold transition-all duration-300 flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-black ${
                    isAdded
                      ? 'bg-emerald-600 text-white'
                      : 'bg-black text-white hover:bg-neutral-800 active:scale-[0.99]'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check size={13} className="stroke-[2.5]" />
                      Adicionado à sacola
                    </>
                  ) : (
                    <>
                      <ShoppingBag size={13} className="stroke-[1.5]" />
                      Adicionar à sacola
                    </>
                  )}
                </button>

                <a
                  href={buildWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Comprar ${product.name} pelo WhatsApp`}
                  className="flex-1 py-4 text-[10px] uppercase tracking-[0.2em] font-bold border border-neutral-900 text-neutral-900 hover:bg-neutral-900 hover:text-white transition-all duration-300 flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-neutral-900"
                >
                  <MessageCircle size={13} className="stroke-[1.5]" />
                  Comprar pelo WhatsApp
                </a>
              </div>

            </div>
          </div>
        </section>

        {/* Produtos relacionados */}
        {related.length > 0 && (
          <section className="border-t border-brand-soft-rose/15 bg-[#FFFDFC]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
              <h2 className="text-xs uppercase tracking-[0.3em] font-bold text-neutral-900 mb-10">
                Você também pode gostar
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {related.map((rel) => (
                  <ProductCard key={rel.id} product={rel} />
                ))}
              </div>
            </div>
          </section>
        )}

      </main>

      <Footer />
      <CartDrawer />
    </div>
  );
}
