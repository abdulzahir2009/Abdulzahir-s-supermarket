import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import ProductListPage from "./pages/ProductListPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import SearchPage from "./pages/SearchPage";
import DealsPage from "./pages/DealsPage";
import OrderConfirmPage from "./pages/OrderConfirmPage";
import type { Product } from "./data/products";

type Page =
  | "home"
  | "products"
  | "product-detail"
  | "cart"
  | "checkout"
  | "search"
  | "deals"
  | "order-confirm";

type CartItem = { product: Product; qty: number };

type Toast = { id: number; message: string };

export default function App() {
  const [page, setPage] = useState<Page>("home");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [toasts, setToasts] = useState<Toast[]>([]);

  function showToast(message: string) {
    const id = Date.now();
    setToasts((t) => [...t, { id, message }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3000);
  }

  function navigate(p: string, data?: unknown) {
    if (p === "product-detail" && data) {
      setSelectedProduct(data as Product);
    }
    setPage(p as Page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function addToCart(product: Product, qty = 1) {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) => i.product.id === product.id ? { ...i, qty: i.qty + qty } : i);
      }
      return [...prev, { product, qty }];
    });
    showToast(`${product.name} added to your cart`);
  }

  function updateQty(id: number, qty: number) {
    if (qty <= 0) {
      setCartItems((prev) => prev.filter((i) => i.product.id !== id));
    } else {
      setCartItems((prev) => prev.map((i) => i.product.id === id ? { ...i, qty } : i));
    }
  }

  function removeFromCart(id: number) {
    setCartItems((prev) => prev.filter((i) => i.product.id !== id));
  }

  const cartCount = cartItems.reduce((s, i) => s + i.qty, 0);

  const showFooter = !["checkout", "order-confirm"].includes(page);

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#fff" }}>
      <Header
        cartCount={cartCount}
        onNavigate={(p) => navigate(p)}
        currentPage={page}
        onSearch={(q) => { setSearchQuery(q); navigate("search"); }}
      />

      <main className="flex-1">
        {page === "home" && <HomePage onNavigate={navigate} onAddToCart={addToCart} />}
        {page === "products" && <ProductListPage onNavigate={navigate} onAddToCart={addToCart} />}
        {page === "product-detail" && selectedProduct && (
          <ProductDetailPage product={selectedProduct} onNavigate={navigate} onAddToCart={addToCart} />
        )}
        {page === "cart" && (
          <CartPage items={cartItems} onUpdateQty={updateQty} onRemove={removeFromCart} onNavigate={(p) => navigate(p)} />
        )}
        {page === "checkout" && (
          <CheckoutPage items={cartItems} onNavigate={(p) => navigate(p)} />
        )}
        {page === "search" && (
          <SearchPage query={searchQuery} onNavigate={navigate} onAddToCart={addToCart} />
        )}
        {page === "deals" && <DealsPage onNavigate={navigate} onAddToCart={addToCart} />}
        {page === "order-confirm" && <OrderConfirmPage items={cartItems} onNavigate={(p) => navigate(p)} />}
      </main>

      {showFooter && <Footer onNavigate={(p) => navigate(p)} />}

      {/* Mobile bottom nav */}
      <nav
        className="fixed bottom-0 left-0 right-0 md:hidden bg-white border-t flex items-center justify-around px-2 py-2 z-40"
        style={{ borderColor: "#e5e7eb", boxShadow: "0 -2px 12px rgba(0,0,0,0.06)" }}
      >
        {[
          { label: "Home", p: "home", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9,22 9,12 15,12 15,22"/></svg> },
          { label: "Categories", p: "products", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg> },
          { label: "Search", p: "search", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg> },
          { label: "Cart", p: "cart", icon: (
            <div className="relative">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
              {cartCount > 0 && <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full text-white flex items-center justify-center" style={{ background: "#6AB04C", fontSize: 8, fontFamily: "Montserrat, sans-serif", fontWeight: 700 }}>{cartCount}</span>}
            </div>
          )},
        ].map(({ label, p, icon }) => (
          <button
            key={p}
            onClick={() => navigate(p)}
            className="flex flex-col items-center gap-1 px-3 py-1 rounded-xl"
            style={{ color: page === p ? "#005691" : "#888", transition: "color 0.15s" }}
          >
            {icon}
            <span className="text-xs" style={{ fontFamily: "Montserrat, sans-serif", fontWeight: page === p ? 700 : 500, fontSize: 9 }}>{label}</span>
          </button>
        ))}
      </nav>

      {/* Toast notifications */}
      <div className="fixed bottom-20 md:bottom-6 right-4 z-50 flex flex-col gap-2 pointer-events-none">
        {toasts.map((t) => (
          <div
            key={t.id}
            className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm text-white"
            style={{
              background: "#005691",
              boxShadow: "0 4px 20px rgba(0,86,145,0.3)",
              fontFamily: "Open Sans, sans-serif",
              animation: "slideUp 0.3s ease",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#a8e890" strokeWidth="2.5">
              <polyline points="20,6 9,17 4,12"/>
            </svg>
            {t.message}
          </div>
        ))}
      </div>

      <style>{`
        @keyframes slideUp {
          from { transform: translateY(16px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
