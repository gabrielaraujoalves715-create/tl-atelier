import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ScrollToTop } from './components/ScrollToTop';
import { CartProvider } from './context/CartContext';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import CategoryPage from './pages/CategoryPage';

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
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