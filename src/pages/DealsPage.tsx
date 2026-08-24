import ProductCard from "../components/ProductCard";
import { products } from "../data/products";
import type { Product } from "../data/products";

type DealsPageProps = {
  onNavigate: (page: string, data?: unknown) => void;
  onAddToCart: (product: Product) => void;
};

export default function DealsPage({ onNavigate, onAddToCart }: DealsPageProps) {
  const dealProducts = products.filter((p) => p.discount);
  const topDeal = dealProducts[0];

  return (
    <div style={{ background: "#F9F9F9", minHeight: "100vh" }}>
      {/* Hero */}
      <div
        className="relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #005691 0%, #0070b8 100%)", paddingBottom: 60 }}
      >
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <svg viewBox="0 0 1440 300" className="absolute w-full h-full" preserveAspectRatio="xMidYMid slice">
            <circle cx="1200" cy="50" r="250" fill="rgba(106,176,76,0.08)"/>
            <circle cx="100" cy="280" r="200" fill="rgba(255,255,255,0.04)"/>
          </svg>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 text-center text-white">
          <span className="inline-block text-xs font-bold px-3 py-1.5 rounded-full mb-4"
            style={{ background: "rgba(106,176,76,0.25)", color: "#a8e890", fontFamily: "Montserrat, sans-serif" }}>
            🔥 LIMITED TIME OFFERS
          </span>
          <h1 className="font-bold mb-3" style={{ fontFamily: "Montserrat, sans-serif", fontSize: "clamp(28px, 4vw, 48px)" }}>
            Today&apos;s Best Deals
          </h1>
          <p style={{ color: "rgba(255,255,255,0.8)", fontFamily: "Open Sans, sans-serif" }}>
            Premium products at unbeatable prices — while stocks last.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 w-full overflow-hidden" style={{ lineHeight: 0 }}>
          <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full" style={{ height: 60, display: "block", fill: "#F9F9F9" }}>
            <path d="M0,40 C360,80 1080,0 1440,40 L1440,60 L0,60 Z"/>
          </svg>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Featured deal */}
        {topDeal && (
          <div
            className="rounded-3xl overflow-hidden mb-10 grid grid-cols-1 md:grid-cols-2"
            style={{ background: "white", boxShadow: "0 4px 24px rgba(0,86,145,0.1)" }}
          >
            <div className="relative overflow-hidden" style={{ minHeight: 280 }}>
              <img src={topDeal.image} alt={topDeal.name} className="w-full h-full object-cover"/>
              <div className="absolute top-4 left-4 text-white font-bold text-2xl px-4 py-2 rounded-2xl"
                style={{ background: "#6AB04C", fontFamily: "Montserrat, sans-serif" }}>
                {topDeal.discount}% OFF
              </div>
            </div>
            <div className="p-8 flex flex-col justify-center">
              <span className="text-xs font-semibold mb-2 block" style={{ color: "#6AB04C", fontFamily: "Montserrat, sans-serif" }}>FEATURED DEAL</span>
              <h2 className="font-bold mb-3" style={{ fontFamily: "Montserrat, sans-serif", color: "#333", fontSize: 28 }}>{topDeal.name}</h2>
              <p className="text-sm mb-4 leading-relaxed" style={{ color: "#4F4F4F", fontFamily: "Open Sans, sans-serif" }}>{topDeal.description}</p>
              <div className="flex items-center gap-3 mb-6">
                <span className="font-bold text-3xl" style={{ color: "#005691", fontFamily: "Montserrat, sans-serif" }}>₦{topDeal.price.toLocaleString()}</span>
                {topDeal.originalPrice && (
                  <span className="text-lg line-through" style={{ color: "#ccc" }}>₦{topDeal.originalPrice.toLocaleString()}</span>
                )}
              </div>
              <button
                onClick={() => onNavigate("product-detail", topDeal)}
                className="px-7 py-3 rounded-full font-bold text-sm text-white w-fit"
                style={{ background: "#005691", fontFamily: "Montserrat, sans-serif" }}
              >
                Shop Now →
              </button>
            </div>
          </div>
        )}

        {/* Promo cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {[
            { icon: "⚡", title: "Flash Deals", desc: "Up to 30% off — today only!", bg: "#fff7ed", border: "#fed7aa", color: "#c2410c" },
            { icon: "📦", title: "Bundle Offers", desc: "Buy 3, save an extra 10%", bg: "#f0fdf4", border: "#bbf7d0", color: "#15803d" },
            { icon: "🆕", title: "New Arrivals", desc: "First-time discount on new products", bg: "#eff6ff", border: "#bfdbfe", color: "#1d4ed8" },
          ].map(({ icon, title, desc, bg, border, color }) => (
            <div key={title} className="rounded-2xl p-5 flex items-center gap-4 cursor-pointer"
              style={{ background: bg, border: `1.5px solid ${border}` }}>
              <div className="text-3xl">{icon}</div>
              <div>
                <div className="font-bold text-sm" style={{ fontFamily: "Montserrat, sans-serif", color }}>{title}</div>
                <div className="text-xs mt-0.5" style={{ color: "#4F4F4F", fontFamily: "Open Sans, sans-serif" }}>{desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* All deals grid */}
        <h2 className="font-bold mb-6" style={{ fontFamily: "Montserrat, sans-serif", color: "#005691", fontSize: 22 }}>
          All Deals
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
          {dealProducts.map((p) => (
            <ProductCard key={p.id} product={p} onAddToCart={onAddToCart} onClick={() => onNavigate("product-detail", p)} />
          ))}
        </div>
      </div>
    </div>
  );
}
