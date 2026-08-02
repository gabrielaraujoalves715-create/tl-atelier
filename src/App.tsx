import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ScrollToTop } from './components/ScrollToTop';
import { CanonicalUrl } from './components/CanonicalUrl';
import { CartProvider } from './context/CartContext';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import CategoryPage from './pages/CategoryPage';
import BestSellers from './pages/BestSellers.tsx';

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <CanonicalUrl />

        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/mais-vendidos"
            element={<BestSellers />}
          />

          <Route
            path="/categoria/:category"
            element={<CategoryPage />}
          />

          <Route
            path="/produto/:slug"
            element={<ProductDetails />}
          />
        </Routes>

        <ScrollToTop />
      </BrowserRouter>
    </CartProvider>
  );
}