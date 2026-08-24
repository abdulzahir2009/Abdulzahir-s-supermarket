import { useState } from "react";
import ProductCard from "../components/ProductCard";
import { products, categories, testimonials } from "../data/products";
import type { Product } from "../data/products";

type HomePageProps = {
  onNavigate: (page: string, data?: unknown) => void;
  onAddToCart: (product: Product) => void;
};

const categoryFilters = ["All", "Fruits & Vegetables", "Dairy", "Bakery", "Beverages", "Household"];

export default function HomePage({ onNavigate, onAddToCart }: HomePageProps) {
  const [activeFilter, setActiveFilter] = useState("All");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const filteredProducts =
    activeFilter === "All"
      ? products.slice(0, 8)
      : products.filter((p) => p.category.includes(activeFilter)).slice(0, 8);

  const dealProducts = products.filter((p) => p.discount && p.discount >= 15).slice(0, 4);

  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (email) { setSubscribed(true); setEmail(""); }
  }

  const categoryImages: Record<string, string> = {
    "Fruits & Vegetables": "https://images.unsplash.com/photo-1542838132-92c53300491e?w=200&h=200&fit=crop&auto=format",
    "Meat & Seafood": "https://images.unsplash.com/photo-1604503468506-a8da13d11d36?w=200&h=200&fit=crop&auto=format",
    "Dairy & Eggs": "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=200&h=200&fit=crop&auto=format",
    "Bakery": "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=200&h=200&fit=crop&auto=format",
    "Beverages": "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=200&h=200&fit=crop&auto=format",
    "Snacks": "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=200&h=200&fit=crop&auto=format",
    "Pantry Essentials": "https://images.unsplash.com/photo-1536304993881-ff86e0c9b9b1?w=200&h=200&fit=crop&auto=format",
    "Household": "https://images.unsplash.com/photo-1583947581924-860bda6a26df?w=200&h=200&fit=crop&auto=format",
    "Personal Care": "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=200&h=200&fit=crop&auto=format",
  };

  return (
    <div>
      {/* ── HERO ── */}
      <section
        className="relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #003d6b 0%, #005691 50%, #0070b8 100%)",
          minHeight: 560,
        }}
      >
        {/* Decorative organic background shapes */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <svg viewBox="0 0 1440 560" className="absolute top-0 left-0 w-full h-full" preserveAspectRatio="xMidYMid slice">
            <ellipse cx="1200" cy="100" rx="400" ry="320" fill="rgba(106,176,76,0.07)" transform="rotate(-20 1200 100)"/>
            <ellipse cx="200" cy="480" rx="350" ry="250" fill="rgba(255,255,255,0.04)" transform="rotate(15 200 480)"/>
            <path d="M1100,50 Q1300,200 1400,400 Q1350,500 1200,520 Q1050,480 1080,320 Q1100,200 1100,50Z" fill="rgba(106,176,76,0.06)"/>
            <circle cx="80" cy="120" r="180" fill="rgba(255,255,255,0.03)"/>
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left */}
            <div>
              <span
                className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full mb-5"
                style={{ background: "rgba(106,176,76,0.2)", color: "#a8e890", fontFamily: "Montserrat, sans-serif" }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse inline-block"/>
                Now Delivering Across Nigeria
              </span>

              <h1 className="font-bold text-white leading-tight mb-4" style={{ fontFamily: "Montserrat, sans-serif", fontSize: "clamp(36px, 5vw, 58px)" }}>
                Freshness,{" "}
                <span style={{ color: "#a8e890" }}>Naturally</span>{" "}
                Delivered.
              </h1>

              <p className="text-base leading-relaxed mb-8 max-w-md" style={{ color: "rgba(255,255,255,0.82)", fontFamily: "Open Sans, sans-serif" }}>
                Shop fresh groceries, everyday essentials, and quality products delivered conveniently to your door.
              </p>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => onNavigate("products")}
                  className="px-7 py-3.5 rounded-full font-bold text-sm"
                  style={{
                    background: "#6AB04C",
                    color: "white",
                    fontFamily: "Montserrat, sans-serif",
                    transition: "background 0.2s, transform 0.15s",
                    boxShadow: "0 4px 20px rgba(106,176,76,0.4)",
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "#4e8a35"; (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.03)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "#6AB04C"; (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)"; }}
                >
                  Shop Now
                </button>
                <button
                  onClick={() => onNavigate("products")}
                  className="px-7 py-3.5 rounded-full font-semibold text-sm"
                  style={{
                    background: "rgba(255,255,255,0.12)",
                    color: "white",
                    fontFamily: "Montserrat, sans-serif",
                    border: "1.5px solid rgba(255,255,255,0.3)",
                    transition: "background 0.2s",
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.2)")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.12)")}
                >
                  Explore Categories
                </button>
              </div>

              {/* Stats */}
              <div className="flex gap-8 mt-10">
                {[["500+", "Products"], ["24h", "Delivery"], ["4.9★", "Rated"]].map(([val, label]) => (
                  <div key={label}>
                    <div className="font-bold text-xl text-white" style={{ fontFamily: "Montserrat, sans-serif" }}>{val}</div>
                    <div className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.6)", fontFamily: "Open Sans, sans-serif" }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — circular image composition */}
            <div className="relative hidden lg:flex justify-center items-center" style={{ height: 420 }}>
              {/* Large center circle */}
              <div
                className="absolute rounded-full overflow-hidden"
                style={{
                  width: 340,
                  height: 340,
                  border: "4px solid rgba(255,255,255,0.15)",
                  boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1557844352-761f2565b576?w=680&h=680&fit=crop&auto=format"
                  alt="Fresh vegetables and fruits"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Floating small circle top-right */}
              <div
                className="absolute rounded-full overflow-hidden"
                style={{ width: 110, height: 110, top: 30, right: 20, border: "3px solid rgba(255,255,255,0.2)", boxShadow: "0 8px 24px rgba(0,0,0,0.25)" }}
              >
                <img src="https://images.unsplash.com/photo-1571680322279-a226e6a4cc2a?w=220&h=220&fit=crop&auto=format" alt="Tomatoes" className="w-full h-full object-cover"/>
              </div>
              {/* Floating small circle bottom-left */}
              <div
                className="absolute rounded-full overflow-hidden"
                style={{ width: 90, height: 90, bottom: 40, left: 30, border: "3px solid rgba(255,255,255,0.2)", boxShadow: "0 8px 24px rgba(0,0,0,0.25)" }}
              >
                <img src="https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=180&h=180&fit=crop&auto=format" alt="Bananas" className="w-full h-full object-cover"/>
              </div>
              {/* Green circle accent */}
              <div
                className="absolute rounded-full"
                style={{ width: 60, height: 60, top: 60, left: 60, background: "rgba(106,176,76,0.25)", border: "2px solid rgba(106,176,76,0.4)" }}
              />
              {/* Floating badge */}
              <div
                className="absolute bottom-60 right-0 bg-white rounded-2xl px-4 py-2.5 flex items-center gap-2"
                style={{ boxShadow: "0 8px 24px rgba(0,0,0,0.15)" }}
              >
                <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "#edf7e8" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6AB04C" strokeWidth="2.5">
                    <polyline points="20,6 9,17 4,12"/>
                  </svg>
                </div>
                <div>
                  <div className="text-xs font-bold" style={{ fontFamily: "Montserrat, sans-serif", color: "#333" }}>100% Fresh</div>
                  <div className="text-xs" style={{ color: "#888", fontFamily: "Open Sans, sans-serif" }}>Guaranteed</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave bottom */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden" style={{ lineHeight: 0 }}>
          <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full" style={{ height: 60, display: "block", fill: "white" }}>
            <path d="M0,40 C360,80 1080,0 1440,40 L1440,60 L0,60 Z"/>
          </svg>
        </div>
      </section>

      {/* ── CATEGORIES ── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8" style={{ background: "white" }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-bold mb-2" style={{ fontFamily: "Montserrat, sans-serif", color: "#005691", fontSize: "clamp(24px, 3vw, 36px)" }}>
              Shop by Category
            </h2>
            <p style={{ color: "#4F4F4F", fontFamily: "Open Sans, sans-serif" }}>Everything you need, all in one place.</p>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-9 gap-3">
            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => onNavigate("products")}
                className="group flex flex-col items-center gap-2 p-3 rounded-2xl transition-all"
                style={{ background: cat.color }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-4px)"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 8px 20px rgba(0,86,145,0.12)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "none"; }}
              >
                <div
                  className="w-14 h-14 rounded-full overflow-hidden flex items-center justify-center"
                  style={{ background: "rgba(255,255,255,0.7)" }}
                >
                  {categoryImages[cat.name] ? (
                    <img src={categoryImages[cat.name]} alt={cat.name} className="w-full h-full object-cover rounded-full"/>
                  ) : (
                    <span className="text-2xl">{cat.emoji}</span>
                  )}
                </div>
                <div className="text-center">
                  <div className="text-xs font-bold leading-tight" style={{ fontFamily: "Montserrat, sans-serif", color: "#333", fontSize: 10 }}>
                    {cat.name.split(" ").slice(0, 2).join(" ")}
                  </div>
                  <div className="text-xs mt-0.5" style={{ color: "#888", fontSize: 9 }}>{cat.count} items</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── FRESH DEALS ── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8" style={{ background: "#F9F9F9" }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="font-bold mb-1" style={{ fontFamily: "Montserrat, sans-serif", color: "#005691", fontSize: "clamp(24px, 3vw, 36px)" }}>
                Fresh Deals
              </h2>
              <p style={{ color: "#4F4F4F", fontFamily: "Open Sans, sans-serif" }}>Great products. Better prices.</p>
            </div>
            <button
              onClick={() => onNavigate("deals")}
              className="hidden sm:flex items-center gap-1 text-sm font-semibold"
              style={{ color: "#005691", fontFamily: "Montserrat, sans-serif" }}
            >
              View All Deals
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#005691" strokeWidth="2.5">
                <polyline points="9,18 15,12 9,6"/>
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {dealProducts.map((p) => (
              <ProductCard key={p.id} product={p} onAddToCart={onAddToCart} onClick={() => onNavigate("product-detail", p)} />
            ))}
          </div>
        </div>
      </section>

      {/* ── PROMO BANNER ── */}
      <section className="px-4 sm:px-6 lg:px-8 py-4">
        <div
          className="relative overflow-hidden rounded-3xl max-w-7xl mx-auto"
          style={{ background: "linear-gradient(135deg, #005691 0%, #0070b8 100%)", minHeight: 180 }}
        >
          {/* Organic shapes */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <svg viewBox="0 0 1200 200" className="absolute right-0 top-0 h-full" preserveAspectRatio="xMaxYMid slice">
              <ellipse cx="1100" cy="100" rx="300" ry="220" fill="rgba(106,176,76,0.12)" transform="rotate(-15 1100 100)"/>
              <path d="M900,0 Q1100,80 1200,0 L1200,200 Q1100,160 900,200Z" fill="rgba(255,255,255,0.04)"/>
            </svg>
          </div>
          <div className="relative flex flex-col md:flex-row items-center justify-between gap-6 px-8 py-10">
            <div className="text-center md:text-left">
              <p className="font-semibold mb-1" style={{ color: "#a8e890", fontFamily: "Montserrat, sans-serif", fontSize: 13 }}>
                🚚 LIMITED TIME OFFER
              </p>
              <h3 className="font-bold text-white mb-1" style={{ fontFamily: "Montserrat, sans-serif", fontSize: "clamp(20px, 3vw, 32px)" }}>
                Fresh groceries, delivered to your doorstep.
              </h3>
              <p style={{ color: "rgba(255,255,255,0.75)", fontFamily: "Open Sans, sans-serif" }}>
                Free delivery on orders over <strong style={{ color: "#a8e890" }}>₦50,000</strong>
              </p>
            </div>
            <button
              onClick={() => onNavigate("products")}
              className="flex-shrink-0 px-8 py-3.5 rounded-full font-bold text-sm"
              style={{ background: "#6AB04C", color: "white", fontFamily: "Montserrat, sans-serif", boxShadow: "0 4px 20px rgba(106,176,76,0.4)", transition: "background 0.2s" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "#4e8a35")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "#6AB04C")}
            >
              Start Shopping →
            </button>
          </div>
        </div>
      </section>

      {/* ── POPULAR PICKS ── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8" style={{ background: "white" }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="font-bold mb-2" style={{ fontFamily: "Montserrat, sans-serif", color: "#005691", fontSize: "clamp(24px, 3vw, 36px)" }}>
              Popular Picks
            </h2>
            <p className="mb-6" style={{ color: "#4F4F4F", fontFamily: "Open Sans, sans-serif" }}>Frequently purchased by our customers.</p>

            {/* Filter pills */}
            <div className="flex flex-wrap justify-center gap-2">
              {categoryFilters.map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className="px-4 py-1.5 rounded-full text-sm font-semibold transition-all"
                  style={{
                    fontFamily: "Montserrat, sans-serif",
                    background: activeFilter === f ? "#005691" : "#f3f4f6",
                    color: activeFilter === f ? "white" : "#333",
                    border: "none",
                  }}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredProducts.map((p) => (
              <ProductCard key={p.id} product={p} onAddToCart={onAddToCart} onClick={() => onNavigate("product-detail", p)} />
            ))}
          </div>

          <div className="text-center mt-10">
            <button
              onClick={() => onNavigate("products")}
              className="px-8 py-3 rounded-full font-semibold text-sm"
              style={{
                border: "2px solid #005691",
                color: "#005691",
                fontFamily: "Montserrat, sans-serif",
                transition: "all 0.2s",
                background: "white",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "#005691"; (e.currentTarget as HTMLButtonElement).style.color = "white"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "white"; (e.currentTarget as HTMLButtonElement).style.color = "#005691"; }}
            >
              View All Products
            </button>
          </div>
        </div>
      </section>

      {/* ── WHY SHOP WITH US ── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8" style={{ background: "#F9F9F9" }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-bold" style={{ fontFamily: "Montserrat, sans-serif", color: "#005691", fontSize: "clamp(24px, 3vw, 36px)" }}>
              Why Shop With Us?
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#6AB04C" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                ),
                title: "Fresh & Quality",
                desc: "Carefully selected products for your everyday needs.",
                color: "#edf7e8",
              },
              {
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#005691" strokeWidth="2">
                    <rect x="1" y="3" width="15" height="13"/><polygon points="16,8 20,8 23,11 23,16 16,16 16,8"/>
                    <circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
                  </svg>
                ),
                title: "Fast Delivery",
                desc: "Get your groceries conveniently delivered to your door.",
                color: "#e8f2fa",
              },
              {
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#6AB04C" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                ),
                title: "Secure Shopping",
                desc: "A simple and secure shopping experience.",
                color: "#edf7e8",
              },
              {
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#005691" strokeWidth="2">
                    <polyline points="20,6 9,17 4,12"/>
                  </svg>
                ),
                title: "Quality You Can Trust",
                desc: "Products selected with care for you and your family.",
                color: "#e8f2fa",
              },
            ].map(({ icon, title, desc, color }) => (
              <div
                key={title}
                className="rounded-2xl p-6 flex flex-col items-center text-center"
                style={{ background: color }}
              >
                <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center mb-4"
                  style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}>
                  {icon}
                </div>
                <h4 className="font-bold text-sm mb-2" style={{ fontFamily: "Montserrat, sans-serif", color: "#333" }}>{title}</h4>
                <p className="text-sm" style={{ color: "#4F4F4F", fontFamily: "Open Sans, sans-serif" }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BRAND STORY ── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 overflow-hidden" style={{ background: "white" }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div
                className="absolute -top-8 -left-8 rounded-full"
                style={{ width: 200, height: 200, background: "rgba(106,176,76,0.08)" }}
              />
              <div className="relative rounded-3xl overflow-hidden" style={{ height: 380 }}>
                <img
                  src="https://images.unsplash.com/photo-1607349913338-fca6f7fc42d0?w=700&h=500&fit=crop&auto=format"
                  alt="Fresh produce"
                  className="w-full h-full object-cover"
                />
              </div>
              <div
                className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-4 flex items-center gap-3"
                style={{ boxShadow: "0 8px 32px rgba(0,86,145,0.15)" }}
              >
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "#edf7e8" }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6AB04C" strokeWidth="2.5">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                </div>
                <div>
                  <div className="font-bold text-sm" style={{ fontFamily: "Montserrat, sans-serif", color: "#333" }}>Sustainably Sourced</div>
                  <div className="text-xs" style={{ color: "#888" }}>From local farms</div>
                </div>
              </div>
            </div>

            <div>
              <span className="text-sm font-semibold mb-2 block" style={{ color: "#6AB04C", fontFamily: "Montserrat, sans-serif" }}>OUR STORY</span>
              <h2 className="font-bold mb-4 leading-tight" style={{ fontFamily: "Montserrat, sans-serif", color: "#005691", fontSize: "clamp(28px, 3vw, 40px)" }}>
                Good Food.<br/>Better Living.
              </h2>
              <p className="text-base mb-4 leading-relaxed" style={{ color: "#4F4F4F", fontFamily: "Open Sans, sans-serif" }}>
                At Abdul's Enterprise, we believe that quality groceries should be accessible to every Nigerian household. We partner with local farmers and trusted suppliers to bring you the freshest produce every day.
              </p>
              <p className="text-base mb-8 leading-relaxed" style={{ color: "#4F4F4F", fontFamily: "Open Sans, sans-serif" }}>
                Our commitment is to sustainability, community, and making everyday shopping a delightful experience — because good food means better living.
              </p>

              <div className="flex gap-6 mb-8">
                {[["200+", "Trusted Farmers"], ["50+", "Cities Served"], ["10k+", "Happy Customers"]].map(([val, label]) => (
                  <div key={label} className="text-center">
                    <div className="font-bold text-2xl" style={{ color: "#005691", fontFamily: "Montserrat, sans-serif" }}>{val}</div>
                    <div className="text-xs mt-1" style={{ color: "#888", fontFamily: "Open Sans, sans-serif" }}>{label}</div>
                  </div>
                ))}
              </div>

              <button
                className="px-7 py-3 rounded-full font-semibold text-sm"
                style={{ background: "#005691", color: "white", fontFamily: "Montserrat, sans-serif", transition: "background 0.2s" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "#004070")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "#005691")}
              >
                Learn More About Us
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8" style={{ background: "#F9F9F9" }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-bold" style={{ fontFamily: "Montserrat, sans-serif", color: "#005691", fontSize: "clamp(24px, 3vw, 36px)" }}>
              Loved by Our Customers
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.id} className="bg-white rounded-3xl p-7" style={{ boxShadow: "0 2px 16px rgba(0,86,145,0.07)" }}>
                <div className="flex gap-1 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#f59e0b">
                      <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
                    </svg>
                  ))}
                </div>
                <p className="text-sm leading-relaxed mb-5" style={{ color: "#4F4F4F", fontFamily: "Open Sans, sans-serif" }}>
                  "{t.review}"
                </p>
                <div className="flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover"/>
                  <div>
                    <div className="font-semibold text-sm" style={{ fontFamily: "Montserrat, sans-serif", color: "#333" }}>{t.name}</div>
                    <div className="text-xs" style={{ color: "#888" }}>{t.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER ── */}
      <section
        className="py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #edf7e8 0%, #e8f2fa 100%)" }}
      >
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <svg viewBox="0 0 1440 200" className="absolute w-full h-full" preserveAspectRatio="xMidYMid slice">
            <circle cx="100" cy="100" r="150" fill="rgba(106,176,76,0.06)"/>
            <circle cx="1350" cy="80" r="120" fill="rgba(0,86,145,0.05)"/>
          </svg>
        </div>

        <div className="relative max-w-2xl mx-auto text-center">
          <h2 className="font-bold mb-3" style={{ fontFamily: "Montserrat, sans-serif", color: "#005691", fontSize: "clamp(24px, 3vw, 36px)" }}>
            Stay Fresh. Stay Updated.
          </h2>
          <p className="mb-8" style={{ color: "#4F4F4F", fontFamily: "Open Sans, sans-serif" }}>
            Get the latest deals, new products, and supermarket updates delivered to your inbox.
          </p>

          {subscribed ? (
            <div className="flex items-center justify-center gap-2 py-4">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6AB04C" strokeWidth="2.5">
                  <polyline points="20,6 9,17 4,12"/>
                </svg>
              </div>
              <p className="font-semibold" style={{ color: "#6AB04C", fontFamily: "Montserrat, sans-serif" }}>
                You're subscribed! Welcome to the freshness family.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 px-4 py-3 rounded-xl text-sm outline-none border bg-white"
                style={{ border: "1.5px solid #d1e8d4", fontFamily: "Open Sans, sans-serif" }}
                onFocus={(e) => (e.target.style.borderColor = "#6AB04C")}
                onBlur={(e) => (e.target.style.borderColor = "#d1e8d4")}
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-xl font-semibold text-sm text-white flex-shrink-0"
                style={{ background: "#6AB04C", fontFamily: "Montserrat, sans-serif", transition: "background 0.2s" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "#4e8a35")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "#6AB04C")}
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
