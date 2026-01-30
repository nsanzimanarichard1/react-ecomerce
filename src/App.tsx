import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { ProductProvider } from './context/ProductContext';
import { AppLayout } from './layouts/AppLayout';
import { HomePage } from './pages/Home';
import { ShopPage } from './pages/Shop';
import { ProductsPage } from './pages/Products';
import { AboutPage } from './pages/About';
import { ContactPage } from './pages/Contact';
import { ProductPage } from './pages/Product';
import { ProductDetailPage } from './pages/ProductDetail';
import { CategoryPage } from './pages/Category';
import { SignInPage } from './pages/SignIn';
import { SignUpPage } from './pages/SignUp';
import { ForgotPasswordPage } from './pages/ForgotPassword';
import { ResetPasswordPage } from './pages/ResetPassword';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ProductProvider>
          <CartProvider>
            <Router>
              <Routes>
                {/* Auth routes without layout */}
                <Route path="/signin" element={<SignInPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
                
                {/* Main app routes with layout */}
                <Route path="/*" element={
                  <AppLayout>
                    <Routes>
                      <Route path="/" element={<HomePage />} />
                      <Route path="/shop" element={<ShopPage />} />
                      <Route path="/products" element={<ProductsPage />} />
                      <Route path="/category/:categoryId" element={<CategoryPage />} />
                      <Route path="/product/:id" element={<ProductPage />} />
                      <Route path="/product/:productId" element={<ProductDetailPage />} />
                      <Route path="/about" element={<AboutPage />} />
                      <Route path="/contact" element={<ContactPage />} />
                      <Route path="/cart" element={<Cart />} />
                      <Route path="/checkout" element={<Checkout />} />
                    </Routes>
                  </AppLayout>
                } />
              </Routes>
            </Router>
          </CartProvider>
        </ProductProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
