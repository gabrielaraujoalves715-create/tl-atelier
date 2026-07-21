import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Categories from '../components/Categories';
import FeaturedProducts from '../components/FeaturedProducts';
import ProductGrid from '../components/ProductGrid';
import EditorialSection from '../components/EditorialSection';
import Benefits from '../components/Benefits';
import NewReleases from '../components/NewReleases';
import Testimonials from '../components/Testimonials';
import FinalCTA from '../components/FinalCTA';
import Footer from '../components/Footer';
import CartDrawer from '../components/CartDrawer';
import MobileBottomNav from '../components/MobileBottomNav';
import type { ProductCategory } from '../types/product';


export default function Home() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSelectCategory = (
    category: ProductCategory | null,
  ) => {
    setSearchQuery('');

    if (category) {
      navigate(`/categoria/${category}`);
      return;
    }

    navigate('/');
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const isSearching = searchQuery.trim().length > 0;

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
          selectedCategory={null}
          onSelectCategory={handleSelectCategory}
        />

        {isSearching ? (
          <ProductGrid
            selectedCategory={null}
            searchQuery={searchQuery}
          />
        ) : (
          <>
            <FeaturedProducts />
          </>
        )}

        <EditorialSection />
        <Benefits />
        <NewReleases />
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