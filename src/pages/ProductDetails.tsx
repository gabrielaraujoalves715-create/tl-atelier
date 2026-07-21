import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ArrowLeft, ShoppingBag, Check, Shield, Clock } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CartDrawer from '../components/CartDrawer';
import ProductCard from '../components/ProductCard';
import { ImagePlaceholder } from '../components/ImagePlaceholder';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import type { ChildType } from '../types/product';

const formatter = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

export default function ProductDetails() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { addItemWithQuantity, setIsOpen } = useCart();

  const product = products.find((p) => p.slug === slug);
  const initialVariant = product?.variants?.[0];

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [selectedRingSize, setSelectedRingSize] = useState<number | null>(null);
  const [ringSizeError, setRingSizeError] = useState(false);
  const [selectedVariantId, setSelectedVariantId] = useState(
    initialVariant?.id ?? '',
  );
  const [selectedChildren, setSelectedChildren] = useState<ChildType[]>(
    initialVariant
      ? Array<ChildType>(initialVariant.childrenCount).fill('menino')
      : [],
  );

  useEffect(() => {
    const firstVariant = product?.variants?.[0];

    setSelectedVariantId(firstVariant?.id ?? '');
    setSelectedChildren(
      firstVariant
        ? Array<ChildType>(firstVariant.childrenCount).fill('menino')
        : [],
    );
    setSelectedImage(0);
    setQuantity(1);
    setSelectedRingSize(null);
    setRingSizeError(false);
  }, [product]);

  const selectedVariant =
    product?.variants?.find((variant) => variant.id === selectedVariantId) ??
    product?.variants?.[0];

  const currentPrice = selectedVariant?.price ?? product?.price ?? 0;
  const currentOriginalPrice =
    selectedVariant?.originalPrice ?? product?.originalPrice;

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

  const handleVariantChange = (variantId: string) => {
    const variant = product?.variants?.find((item) => item.id === variantId);
    if (!variant) return;

    setSelectedVariantId(variant.id);
    setSelectedChildren(
      Array<ChildType>(variant.childrenCount).fill('menino'),
    );
  };

  const handleChildTypeChange = (index: number, childType: ChildType) => {
    setSelectedChildren((current) =>
      current.map((item, itemIndex) =>
        itemIndex === index ? childType : item,
      ),
    );
  };

  const handleRingSizeChange = (ringSize: number) => {
    setSelectedRingSize(ringSize);
    setRingSizeError(false);
  };

  const getChildrenLabel = () =>
    selectedChildren
      .map((child, index) =>
        `${index + 1}º ${child === 'menino' ? 'Menino' : 'Menina'}`,
      )
      .join(', ');

  const handleAddToCart = () => {
    if (!product) return;

    if (product.ringSizes?.length && selectedRingSize === null) {
      setRingSizeError(true);
      return;
    }

    const childrenLabel = getChildrenLabel();
    const configurationParts = [
      selectedVariant?.id,
      selectedChildren.length ? selectedChildren.join('-') : undefined,
      selectedRingSize !== null ? `aro-${selectedRingSize}` : undefined,
    ].filter(Boolean);
    const configurationLabels = [
      selectedVariant?.label,
      childrenLabel || undefined,
      selectedRingSize !== null ? `Aro ${selectedRingSize}` : undefined,
    ].filter(Boolean);
    const hasConfiguration = configurationParts.length > 0;

    const configuredProduct = hasConfiguration
      ? {
          ...product,
          id: `${product.id}-${configurationParts.join('-')}`,
          name: `${product.name} — ${configurationLabels.join(' — ')}`,
          price: currentPrice,
          originalPrice: currentOriginalPrice,
          variants: undefined,
          allowsChildSelection: false,
          ringSizes: undefined,
        }
      : product;

    addItemWithQuantity(configuredProduct, quantity);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      setIsOpen(true);
    }, 800);
  };

  const buildWhatsAppUrl = () => {
    if (!product) return 'https://wa.me/5511965428500';
    const unitPrice = formatter.format(currentPrice);
    const total = formatter.format(currentPrice * quantity);
    const childrenLabel = getChildrenLabel();
    const url = window.location.href;
    const message = [
      'Olá! Vim pelo site da TL Atelier e tenho interesse neste produto:',
      '',
      `Produto: ${product.name}`,
      ...(selectedVariant ? [`Opção: ${selectedVariant.label}`] : []),
      ...(childrenLabel ? [`Pingentes: ${childrenLabel}`] : []),
      ...(selectedRingSize !== null ? [`Aro: ${selectedRingSize}`] : []),
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
        <main className="flex-grow flex items-center justify-center mt-[120px] md:mt-[208px]">
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
              {currentPrice > 0 ? (
                <div className="flex items-baseline gap-3 mb-6 pb-6 border-b border-brand-soft-rose/15">
                  <span className="text-2xl font-bold text-neutral-900">
                    {formatter.format(currentPrice)}
                  </span>
                  {currentOriginalPrice && (
                    <span className="text-sm text-neutral-400 line-through">
                      {formatter.format(currentOriginalPrice)}
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

              {/* Variações e personalização dos pingentes */}
              {product.variants &&
                product.variants.length > 0 &&
                selectedVariant && (
                  <div className="mb-6 pb-6 border-b border-brand-soft-rose/15">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-semibold mb-3">
                      Quantidade de filhos
                    </p>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
                      {product.variants.map((variant) => {
                        const isSelected = variant.id === selectedVariant.id;

                        return (
                          <button
                            key={variant.id}
                            type="button"
                            onClick={() => handleVariantChange(variant.id)}
                            aria-pressed={isSelected}
                            className={`min-h-12 px-3 py-2 border text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-dark-rose ${
                              isSelected
                                ? 'border-brand-dark-rose bg-brand-dark-rose text-white'
                                : 'border-[#E8E2DF] bg-white text-neutral-700 hover:border-brand-dark-rose'
                            }`}
                          >
                            <span className="block">{variant.label}</span>
                            <span
                              className={`block mt-1 text-[10px] ${
                                isSelected
                                  ? 'text-white/80'
                                  : 'text-neutral-500'
                              }`}
                            >
                              {formatter.format(variant.price)}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    {product.allowsChildSelection && (
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-semibold mb-1">
                          Personalize os pingentes
                        </p>
                        <p className="text-xs text-neutral-500 mb-4">
                          Escolha menino ou menina para cada filho.
                        </p>

                        <div className="flex flex-col gap-3">
                          {selectedChildren.map((childType, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between gap-4"
                            >
                              <span className="text-xs font-semibold text-neutral-700">
                                Filho {index + 1}
                              </span>

                              <div className="grid grid-cols-2 w-full max-w-[240px] border border-[#E8E2DF]">
                                {(['menino', 'menina'] as ChildType[]).map(
                                  (option) => {
                                    const isSelected = childType === option;

                                    return (
                                      <button
                                        key={option}
                                        type="button"
                                        onClick={() =>
                                          handleChildTypeChange(index, option)
                                        }
                                        aria-pressed={isSelected}
                                        className={`min-h-10 px-3 text-xs font-semibold capitalize transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-dark-rose ${
                                          isSelected
                                            ? 'bg-neutral-900 text-white'
                                            : 'bg-white text-neutral-600 hover:bg-neutral-50'
                                        }`}
                                      >
                                        {option}
                                      </button>
                                    );
                                  },
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

              {/* Seleção dos tamanhos disponíveis para anéis */}
              {product.ringSizes && product.ringSizes.length > 0 && (
                <div className="mb-6 pb-6 border-b border-brand-soft-rose/15">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-semibold mb-1">
                    Escolha o tamanho do aro
                  </p>
                  <p className="text-xs text-neutral-500 mb-4">
                    Selecione uma numeração antes de adicionar à sacola.
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {product.ringSizes.map((ringSize) => {
                      const isSelected = selectedRingSize === ringSize;

                      return (
                        <button
                          key={ringSize}
                          type="button"
                          onClick={() => handleRingSizeChange(ringSize)}
                          aria-pressed={isSelected}
                          aria-label={`Selecionar aro ${ringSize}`}
                          className={`h-11 min-w-12 border px-4 text-xs font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-dark-rose ${
                            isSelected
                              ? 'border-brand-dark-rose bg-brand-dark-rose text-white'
                              : 'border-[#E8E2DF] bg-white text-neutral-700 hover:border-brand-dark-rose'
                          }`}
                        >
                          {ringSize}
                        </button>
                      );
                    })}
                  </div>

                  {ringSizeError && (
                    <p
                      role="alert"
                      className="mt-3 text-xs font-semibold text-red-600"
                    >
                      Selecione o tamanho do aro para continuar.
                    </p>
                  )}
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
                  onClick={(event) => {
                    if (
                      product.ringSizes?.length &&
                      selectedRingSize === null
                    ) {
                      event.preventDefault();
                      setRingSizeError(true);
                    }
                  }}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Comprar ${product.name} pelo WhatsApp`}
                  className="flex-1 py-4 text-[10px] uppercase tracking-[0.2em] font-bold border border-neutral-900 text-neutral-900 hover:bg-neutral-900 hover:text-white transition-all duration-300 flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-neutral-900"
                >
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="h-4 w-4 shrink-0 fill-current text-[#25D366]"
                  >
                    <path d="M12.04 2a9.84 9.84 0 0 0-8.39 14.98L2 22l5.17-1.61A9.99 9.99 0 1 0 12.04 2Zm0 17.98a8.02 8.02 0 0 1-4.1-1.12l-.29-.17-3.07.96.99-2.99-.19-.31a7.82 7.82 0 0 1-1.2-4.18 7.86 7.86 0 1 1 7.86 7.81Zm4.31-5.89c-.24-.12-1.4-.69-1.62-.77-.22-.08-.38-.12-.54.12-.16.24-.62.77-.76.93-.14.16-.28.18-.52.06-.24-.12-1-.37-1.91-1.18-.71-.63-1.18-1.41-1.32-1.65-.14-.24-.01-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.19-.47-.39-.41-.54-.42h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.69 2.58 4.1 3.62.57.25 1.02.39 1.37.5.58.18 1.1.16 1.51.1.46-.07 1.4-.57 1.6-1.13.2-.55.2-1.03.14-1.13-.06-.1-.22-.16-.46-.28Z" />
                  </svg>
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