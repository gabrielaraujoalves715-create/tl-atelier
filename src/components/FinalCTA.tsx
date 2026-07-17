import { ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function FinalCTA() {
  const { setIsOpen } = useCart();

  return (
    <section className="py-12 sm:py-24 bg-brand-light-pink/10 border-b border-brand-soft-rose/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        
        <h2 className="mx-auto mb-6 max-w-2xl font-serif text-3xl font-medium normal-case leading-tight tracking-[-0.02em] text-brand-text sm:text-4xl">
  Encontrou a peça ideal?
</h2>
        
        <p className="text-xs sm:text-sm text-brand-text/70 font-light max-w-md mx-auto mb-10 leading-relaxed">
          Adicione seus produtos à sacola e envie o pedido diretamente pelo WhatsApp.
        </p>
        
        <div className="flex justify-center">
          <button
            onClick={() => setIsOpen(true)}
            className="cursor-pointer inline-flex items-center gap-2.5 bg-brand-dark-rose text-white px-10 py-4 text-[10px] uppercase tracking-[0.2em] font-bold rounded-sm hover:opacity-90 transition-all duration-300 shadow-sm"
            id="final-cta-checkout-btn"
          >
            <ShoppingBag size={14} className="stroke-[2]" />
            Finalizar pedido
          </button>
        </div>
      </div>
    </section>
  );
}
