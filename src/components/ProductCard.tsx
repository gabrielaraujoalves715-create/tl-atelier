import { useCart } from '../context/CartContext';
import { Product } from '../types/product';
import { Check } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ImagePlaceholder } from './ImagePlaceholder';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem, setIsOpen } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const productUrl = `/produto/${product.slug}`;

  const handleAddToCart = () => {
    addItem(product);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      setIsOpen(true);
    }, 800);
  };

  return (
    <div className="group flex flex-col bg-white border border-brand-soft-rose/20 rounded-xs overflow-hidden hover:shadow-md transition-all duration-300">

      {/* Imagem — clicável */}
      <Link to={productUrl} aria-label={`Ver detalhes de ${product.name}`} className="block">
        <div className="aspect-[4/5] w-full relative overflow-hidden border-b border-brand-soft-rose/10">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <ImagePlaceholder className="w-full h-full" label="Foto do produto" />
          )}
          {product.discountBadge && (
  <div
    className="
      absolute right-4 top-4 z-10
      flex h-10 w-10 flex-col
      items-center justify-center
      rounded-full bg-[#F472B6]
      px-1 text-center text-[9px]
      font-bold leading-[1.05]
      text-white shadow-sm
      select-none
    "
  >
    {product.discountBadge.split(' ').map((part) => (
      <span key={part} className="block">
        {part}
      </span>
    ))}
  </div>
)}
        </div>
      </Link>

      {/* Informações */}
      <div className="p-3 sm:p-4 flex flex-col flex-grow justify-between">
        <div className="mb-3">
          <Link to={productUrl} className="hover:text-brand-dark-rose transition-colors duration-200">
            <div className="text-xs font-medium tracking-tight text-neutral-800 line-clamp-1">
              {product.name}
            </div>
          </Link>
          {product.description && (
            <p className="text-[11px] text-neutral-500 line-clamp-2 leading-relaxed">
              {product.description}
            </p>
          )}
        </div>

        {product.price > 0 && (
          <div className="pt-2.5 border-t border-brand-soft-rose/10 flex items-baseline space-x-2 mb-3">
            <span className="text-[15px] font-bold text-neutral-900">
              {product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </span>
            {product.originalPrice && (
              <span className="text-[11px] text-neutral-400 line-through">
                {product.originalPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </span>
            )}
          </div>
        )}

        <div className="mt-auto pt-2 flex flex-col gap-2">
          <Link
            to={productUrl}
            className="w-full text-center py-2 text-[10px] uppercase tracking-[0.2em] font-semibold border border-neutral-300 text-neutral-600 hover:border-neutral-800 hover:text-neutral-900 transition-colors duration-200 rounded-xs"
          >
            Ver detalhes
          </Link>
          <button
            onClick={handleAddToCart}
            className={`cursor-pointer w-full text-center py-2.5 text-[10px] uppercase tracking-[0.2em] font-bold transition-all duration-300 rounded-xs flex items-center justify-center gap-1.5 ${
              isAdded
                ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                : 'bg-black text-white hover:bg-neutral-900 active:scale-[0.98]'
            }`}
            aria-label={`Adicionar ${product.name} ao carrinho`}
            id={`add-btn-${product.id}`}
          >
            {isAdded ? (
              <>
                <Check size={11} className="stroke-[3]" />
                Adicionado à sacola
              </>
            ) : (
              <span>COMPRAR</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

