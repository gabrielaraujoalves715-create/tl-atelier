import { useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Categories from '../components/Categories';
import FeaturedProducts from '../components/FeaturedProducts';
import ProductGrid from '../components/ProductGrid';
import EditorialSection from '../components/EditorialSection';
import Benefits from '../components/Benefits';
import Testimonials from '../components/Testimonials';
import FinalCTA from '../components/FinalCTA';
import Footer from '../components/Footer';
import CartDrawer from '../components/CartDrawer';
import MobileBottomNav from '../components/MobileBottomNav';
import type { ProductCategory } from '../types/product';

type CategoryType = ProductCategory | null;

export default function Home() {
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryType>(null);

  const [searchQuery, setSearchQuery] = useState('');

  const scrollToCollection = () => {
    const gridElement = document.getElementById('colecao');

    gridElement?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

       const handleSelectCategory = (category: CategoryType) => {
    setSelectedCategory(category);
    setSearchQuery('');

    if (category) {
      requestAnimationFrame(() => {
        scrollToCollection();
      });
    }
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);

    if (query.trim()) {
      setSelectedCategory(null);
    }
  };

  return (
    <div
      className="relative flex min-h-screen flex-col bg-brand-main pb-16 md:pb-0"
      id="home-view"
    >
      <Navbar
        onSelectCategory={handleSelectCategory}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
      />

      <main className="flex-grow">
        <Hero />

        <Categories
          selectedCategory={selectedCategory}
          onSelectCategory={handleSelectCategory}
        />

        {!selectedCategory && !searchQuery.trim() && (
  <FeaturedProducts />
)}
        <EditorialSection />
        <Benefits />

        <ProductGrid
          selectedCategory={selectedCategory}
          searchQuery={searchQuery}
        />
        <Testimonials /> 
        <FinalCTA />
      </main>

      <Footer />

      <MobileBottomNav
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
      />

      <CartDrawer />
    </div>
  );
}