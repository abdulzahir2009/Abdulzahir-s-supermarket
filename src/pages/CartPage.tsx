import type { Product } from "../data/products";

type CartItem = { product: Product; qty: number };

type CartPageProps = {
  items: CartItem[];
  onUpdateQty: (id: number, qty: number) => void;
  onRemove: (id: number) => void;
  onNavigate: (page: string) => void;
};

export default function CartPage({ items, onUpdateQty, onRemove, onNavigate }: CartPageProps) {
  const subtotal = items.reduce((s, i) => s + i.product.price * i.qty, 0);
  const delivery = subtotal >= 50000 ? 0 : 2000;
  const discount = items.reduce((s, i) => {
    const saved = i.product.originalPrice ? (i.product.originalPrice - i.product.price) * i.qty : 0;
    return s + saved;
  }, 0);
  const total = subtotal + delivery;

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 px-4" style={{ background: "#F9F9F9", minHeight: "60vh" }}>
        <div className="text-6xl mb-4">🛒</div>
        <h2 className="font-bold text-xl mb-2" style={{ fontFamily: "Montserrat, sans-serif", color: "#333" }}>Your cart is empty</h2>
        <p className="text-sm mb-6" style={{ color: "#888", fontFamily: "Open Sans, sans-serif" }}>Add some fresh products to get started.</p>
        <button
          onClick={() => onNavigate("products")}
          className="px-8 py-3 rounded-full font-bold text-sm text-white"
          style={{ background: "#005691", fontFamily: "Montserrat, sans-serif" }}
        >
          Start Shopping
        </button>
      </div>
    );
  }

  return (
    <div style={{ background: "#F9F9F9", minHeight: "100vh" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="font-bold mb-8" style={{ fontFamily: "Montserrat, sans-serif", color: "#005691", fontSize: 28 }}>
          Shopping Cart
          <span className="text-base font-normal ml-2" style={{ color: "#888" }}>({items.length} item{items.length > 1 ? "s" : ""})</span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Items */}
          <div className="lg:col-span-2 space-y-3">
            {items.map(({ product, qty }) => (
              <div key={product.id} className="bg-white rounded-2xl p-4 flex gap-4 items-center" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-50 flex-shrink-0">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover"/>
                </div>

                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm truncate" style={{ fontFamily: "Montserrat, sans-serif", color: "#333" }}>{product.name}</p>
                  <p className="text-xs mt-0.5" style={{ color: "#6AB04C", fontFamily: "Open Sans, sans-serif" }}>{product.category}</p>
                  <p className="text-xs mt-0.5" style={{ color: "#888" }}>{product.unit}</p>
                </div>

                {/* Qty */}
                <div className="flex items-center rounded-xl overflow-hidden flex-shrink-0" style={{ border: "1.5px solid #e5e7eb" }}>
                  <button onClick={() => onUpdateQty(product.id, qty - 1)} className="w-8 h-8 flex items-center justify-center font-bold" style={{ color: "#005691" }}>−</button>
                  <span className="w-8 text-center text-sm font-semibold" style={{ fontFamily: "Montserrat, sans-serif" }}>{qty}</span>
                  <button onClick={() => onUpdateQty(product.id, qty + 1)} className="w-8 h-8 flex items-center justify-center font-bold" style={{ color: "#005691" }}>+</button>
                </div>

                <div className="text-right flex-shrink-0">
                  <p className="font-bold text-sm" style={{ fontFamily: "Montserrat, sans-serif", color: "#005691" }}>
                    ₦{(product.price * qty).toLocaleString()}
                  </p>
                  {product.originalPrice && (
                    <p className="text-xs line-through" style={{ color: "#bbb" }}>₦{(product.originalPrice * qty).toLocaleString()}</p>
                  )}
                </div>

                <button onClick={() => onRemove(product.id)} className="text-gray-300 hover:text-red-400 transition-colors ml-1 flex-shrink-0">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="3,6 5,6 21,6"/><path d="M19,6v14a2,2,0,0,1-2,2H7a2,2,0,0,1-2-2V6m3,0V4a2,2,0,0,1,2-2h4a2,2,0,0,1,2,2v2"/>
                  </svg>
                </button>
              </div>
            ))}

            <button
              onClick={() => onNavigate("products")}
              className="flex items-center gap-1 text-sm font-semibold mt-2"
              style={{ color: "#005691", fontFamily: "Montserrat, sans-serif" }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#005691" strokeWidth="2.5">
                <polyline points="15,18 9,12 15,6"/>
              </svg>
              Continue Shopping
            </button>
          </div>

          {/* Summary */}
          <div>
            <div className="bg-white rounded-2xl p-6" style={{ boxShadow: "0 2px 16px rgba(0,0,0,0.08)" }}>
              <h3 className="font-bold mb-5" style={{ fontFamily: "Montserrat, sans-serif", color: "#333", fontSize: 18 }}>Order Summary</h3>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm" style={{ fontFamily: "Open Sans, sans-serif" }}>
                  <span style={{ color: "#888" }}>Subtotal</span>
                  <span style={{ color: "#333", fontWeight: 600 }}>₦{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm" style={{ fontFamily: "Open Sans, sans-serif" }}>
                  <span style={{ color: "#888" }}>Delivery</span>
                  <span style={{ color: delivery === 0 ? "#6AB04C" : "#333", fontWeight: 600 }}>
                    {delivery === 0 ? "FREE" : `₦${delivery.toLocaleString()}`}
                  </span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-sm" style={{ fontFamily: "Open Sans, sans-serif" }}>
                    <span style={{ color: "#888" }}>You save</span>
                    <span style={{ color: "#6AB04C", fontWeight: 600 }}>−₦{discount.toLocaleString()}</span>
                  </div>
                )}
              </div>

              <div className="pt-4 mb-5" style={{ borderTop: "1px solid #eee" }}>
                <div className="flex justify-between items-center">
                  <span className="font-bold" style={{ fontFamily: "Montserrat, sans-serif", color: "#333" }}>Total</span>
                  <span className="font-bold text-xl" style={{ fontFamily: "Montserrat, sans-serif", color: "#005691" }}>₦{total.toLocaleString()}</span>
                </div>
              </div>

              <button
                onClick={() => onNavigate("checkout")}
                className="w-full py-3.5 rounded-xl font-bold text-sm text-white"
                style={{ background: "#005691", fontFamily: "Montserrat, sans-serif", transition: "background 0.2s" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "#6AB04C")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "#005691")}
              >
                Proceed to Checkout →
              </button>

              {subtotal < 50000 && (
                <p className="text-xs text-center mt-3" style={{ color: "#888", fontFamily: "Open Sans, sans-serif" }}>
                  Add ₦{(50000 - subtotal).toLocaleString()} more for free delivery
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
