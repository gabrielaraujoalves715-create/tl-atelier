import { useState } from 'react';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import Footer from '../components/Footer';
import CartDrawer from '../components/CartDrawer';
import { products } from '../data/products';

const normalizeText = (text: string) =>
  text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();

export default function BestSellers() {
  const [searchQuery, setSearchQuery] = useState('');

  const normalizedSearch = normalizeText(searchQuery);

  const bestSellerProducts = products.filter((product) => {
    if (!product.isBestSeller) {
      return false;
    }

    if (!normalizedSearch) {
      return true;
    }

    const searchableContent = normalizeText(
      [
        product.name,
        product.description ?? '',
        product.shortDescription ?? '',
      ].join(' '),
    );

    return searchableContent.includes(normalizedSearch);
  });

  return (
    <>
      <Navbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <main className="min-h-screen bg-brand-main pb-28 pt-[145px] md:pb-20 md:pt-[235px]">
        <section
          id="mais-vendidos"
          className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8"
        >
          <div className="mb-10 border-b border-brand-soft-rose/20 pb-7">


            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h1 className="font-serif text-4xl font-medium text-brand-text sm:text-5xl">
                  Mais vendidos
                </h1>

                <p className="mt-3 max-w-xl text-sm leading-relaxed text-brand-text/60">
                  Conheça as joias mais escolhidas pelas nossas clientes.
                </p>
              </div>

            </div>
          </div>

          {bestSellerProducts.length > 0 ? (
            <div className="flex w-full flex-wrap justify-center gap-5 sm:gap-6 lg:gap-8">
              {bestSellerProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333333%-1.334rem)]"
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-sm border border-dashed border-brand-soft-rose/30 py-20 text-center">
              <p className="font-serif text-lg italic text-brand-text/50">
                Nenhuma joia encontrada em mais vendidos.
              </p>
            </div>
          )}
        </section>
      </main>

      <Footer />
      <CartDrawer />
    </>
  );
}