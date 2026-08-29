import { useState } from "react";
import Logo from "./Logo";

type Page = "home" | "products" | "product-detail" | "cart" | "checkout" | "search" | "deals" | "order-confirm";

type HeaderProps = {
  cartCount: number;
  onNavigate: (page: Page) => void;
  currentPage: Page;
  onSearch?: (query: string) => void;
};

export default function Header({ cartCount, onNavigate, currentPage, onSearch }: HeaderProps) {
  const [searchValue, setSearchValue] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (searchValue.trim()) {
      onSearch?.(searchValue);
      onNavigate("search");
    }
  }

  const navLinks: { label: string; page: Page }[] = [
    { label: "Home", page: "home" },
    { label: "Categories", page: "products" },
    { label: "Deals", page: "deals" },
    { label: "About", page: "home" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white" style={{ boxShadow: "0 2px 16px rgba(0,86,145,0.08)" }}>
      {/* Top bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 py-3">
          {/* Logo */}
          <button onClick={() => onNavigate("home")} className="flex-shrink-0">
            <Logo size="sm" />
          </button>

          {/* Delivery selector */}
          <button className="hidden md:flex items-center gap-1.5 text-xs px-3 py-2 rounded-xl border border-gray-100 bg-gray-50 hover:border-blue-200 transition-colors">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#005691" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
            </svg>
            <span style={{ color: "#333", fontFamily: "Montserrat, sans-serif", fontWeight: 600 }}>Deliver to</span>
            <span style={{ color: "#005691", fontFamily: "Open Sans, sans-serif" }}>Lagos</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2.5">
              <polyline points="6,9 12,15 18,9"/>
            </svg>
          </button>

          {/* Search */}
          <form onSubmit={handleSearch} className="flex-1 max-w-xl">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for products, brands..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="w-full pl-4 pr-12 py-2.5 rounded-xl text-sm outline-none border"
                style={{
                  border: "1.5px solid #e5e7eb",
                  fontFamily: "Open Sans, sans-serif",
                  transition: "border-color 0.2s",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#005691")}
                onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: "#005691" }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                  <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
              </button>
            </div>
          </form>

          {/* Right icons */}
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => onNavigate("cart")}
              className="flex flex-col items-center gap-0.5 px-2 py-1 rounded-lg hover:bg-gray-50 transition-colors relative"
            >
              <div className="relative">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#005691" strokeWidth="2">
                  <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                </svg>
                {cartCount > 0 && (
                  <span
                    className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full text-xs flex items-center justify-center font-bold text-white"
                    style={{ background: "#6AB04C", fontSize: 10, fontFamily: "Montserrat, sans-serif" }}
                  >
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="text-xs" style={{ color: "#333", fontFamily: "Open Sans, sans-serif" }}>Cart</span>
            </button>

            {/* Mobile menu */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-50"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2">
                {mobileMenuOpen
                  ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
                  : <><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></>
                }
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation bar */}
      <nav className="border-t border-gray-100 hidden md:block" style={{ background: "#f9fafb" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => onNavigate(link.page)}
                className="px-4 py-2.5 text-sm font-medium rounded-lg transition-colors"
                style={{
                  fontFamily: "Montserrat, sans-serif",
                  color: currentPage === link.page ? "#005691" : "#4F4F4F",
                  background: currentPage === link.page ? "#e8f2fa" : "transparent",
                  fontWeight: currentPage === link.page ? 700 : 500,
                }}
                onMouseEnter={(e) => {
                  if (currentPage !== link.page) {
                    (e.currentTarget as HTMLButtonElement).style.color = "#005691";
                    (e.currentTarget as HTMLButtonElement).style.background = "#f0f7ff";
                  }
                }}
                onMouseLeave={(e) => {
                  if (currentPage !== link.page) {
                    (e.currentTarget as HTMLButtonElement).style.color = "#4F4F4F";
                    (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                  }
                }}
              >
                {link.label}
              </button>
            ))}
            <div className="ml-auto flex items-center gap-2">
              <span className="text-xs px-3 py-1.5 rounded-full font-semibold" style={{ background: "#edf7e8", color: "#4e8a35", fontFamily: "Montserrat, sans-serif" }}>
                🚚 Free delivery over ₦50,000
              </span>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-2">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => { onNavigate(link.page); setMobileMenuOpen(false); }}
              className="w-full text-left px-3 py-2.5 text-sm font-medium rounded-lg"
              style={{ fontFamily: "Montserrat, sans-serif", color: "#333" }}
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
