import { useCart } from '../context/CartContext';
import { X, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';

export default function CartDrawer() {
  const { isOpen, setIsOpen, items, removeItem } = useCart();

  if (!isOpen) return null;

  const total = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  // Generate WhatsApp link with order list
  const getWhatsAppLink = () => {
    const itemText = items
      .map((item) => `${item.quantity}x ${item.product.name} - ${item.product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`)
      .join('%0A');
    const totalText = total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    const text = `Olá TL Atelier! Gostaria de fazer o seguinte pedido:%0A%0A${itemText}%0A%0ATotal: ${totalText}%0A%0AAguardando confirmação!`;
    return `https://wa.me/5511965428500?text=${text}`;
  };

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden" id="cart-drawer-overlay">
      {/* Background Overlay */}
      <div
        className="absolute inset-0 bg-black/45 backdrop-blur-xs transition-opacity duration-300"
        onClick={() => setIsOpen(false)}
      ></div>

      {/* Drawer Container */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-3 sm:pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl border-l border-brand-soft-rose/30 flex flex-col justify-between animate-slide-in">
          
          {/* Header */}
          <div className="p-6 border-b border-brand-soft-rose/10 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ShoppingBag size={18} className="text-brand-dark-rose" />
              <h2 className="font-serif text-xl font-normal text-brand-text">Seu carrinho</h2>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 text-brand-text/50 hover:text-brand-dark-rose transition-colors cursor-pointer"
              aria-label="Fechar carrinho"
              id="close-cart-btn"
            >
              <X size={20} />
            </button>
          </div>

          {/* Cart Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {items.length === 0 ? (
              /* Empty Cart State */
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-brand-light-pink/50 flex items-center justify-center mb-4">
                  <ShoppingBag size={24} className="text-brand-dark-rose/60" />
                </div>
                <p className="font-serif text-base text-brand-text/80 mb-1">Seu carrinho está vazio</p>
                <p className="text-xs text-brand-text/40 uppercase tracking-widest max-w-[200px]">
                  Explore as nossas coleções e escolha suas peças favoritas.
                </p>
                <button
                  onClick={() => setIsOpen(false)}
                  className="mt-6 text-[10px] uppercase tracking-widest font-bold text-brand-dark-rose hover:text-brand-text border-b border-brand-dark-rose hover:border-brand-text pb-1 transition-all duration-300 cursor-pointer"
                  id="start-shopping-btn"
                >
                  Continuar navegando
                </button>
              </div>
            ) : (
              /* Items List */
              <div className="space-y-6">
                {items.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex items-start justify-between pb-6 border-b border-brand-soft-rose/10"
                  >
                    <div className="flex-1">
                      <h3 className="text-xs uppercase font-bold tracking-widest text-brand-text">
                        {item.product.name}
                      </h3>
                      <p className="text-[10px] uppercase text-brand-dark-rose font-semibold tracking-wider mt-1">
                        {item.product.category}
                      </p>
                      <p className="text-xs text-brand-text/50 mt-1">
                        Qtd: {item.quantity} &times; {item.product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                      </p>
                    </div>

                    <div className="flex flex-col items-end justify-between h-14 pl-4">
                      <span className="font-serif text-xs font-semibold text-brand-text">
                        {(item.product.price * item.quantity).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                      </span>
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="text-brand-text/30 hover:text-brand-dark-rose transition-colors cursor-pointer p-1"
                        aria-label={`Remover ${item.product.name}`}
                        id={`remove-item-${item.product.id}`}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer - Subtotal & WhatsApp CTA */}
          {items.length > 0 && (
            <div className="p-6 bg-brand-light-pink/15 border-t border-brand-soft-rose/20">
              <div className="flex justify-between items-center mb-6">
                <span className="text-xs uppercase tracking-widest text-brand-text/70 font-semibold">
                  Subtotal
                </span>
                <span className="font-serif text-lg font-bold text-brand-text">
                  {total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </span>
              </div>

              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-brand-dark-rose hover:bg-brand-dark-rose/90 text-white py-4 text-[10px] uppercase tracking-[0.2em] font-bold rounded-sm flex items-center justify-center gap-2 transition-all duration-300 text-center shadow-sm cursor-pointer"
                id="whatsapp-checkout-btn"
              >
                Enviar pedido via WhatsApp
                <ArrowRight size={12} className="stroke-[2.5]" />
              </a>

              <p className="text-[9px] text-center text-brand-text/40 uppercase tracking-widest mt-4">
                Você será direcionada para finalizar no WhatsApp da marca.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
