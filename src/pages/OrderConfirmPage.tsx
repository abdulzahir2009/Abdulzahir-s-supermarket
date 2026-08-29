import type { Product } from "../data/products";
import { getCartSummary } from "../utils/cart";

type CartItem = { product: Product; qty: number };

type OrderConfirmPageProps = {
  items: CartItem[];
  onNavigate: (page: string) => void;
};

export default function OrderConfirmPage({ items, onNavigate }: OrderConfirmPageProps) {
  const { subtotal, delivery, total } = getCartSummary(items);

  return (
    <div style={{ background: "#F9F9F9", minHeight: "100vh" }} className="flex items-center justify-center px-4 py-16">
      <div className="max-w-lg w-full text-center">
        <div
          className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6"
          style={{ background: "linear-gradient(135deg, #edf7e8 0%, #d4f0c6 100%)", border: "4px solid #6AB04C" }}
        >
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#6AB04C" strokeWidth="2.5" strokeLinecap="round">
            <polyline points="20,6 9,17 4,12"/>
          </svg>
        </div>

        <h1 className="font-bold mb-3" style={{ fontFamily: "Montserrat, sans-serif", color: "#333", fontSize: 32 }}>
          Your Order Is Ready!
        </h1>
        <p className="mb-8 leading-relaxed" style={{ color: "#4F4F4F", fontFamily: "Open Sans, sans-serif" }}>
          We&apos;ve prepared your order details in WhatsApp. Send the message to our team so we can confirm your order, delivery, and payment details.
        </p>

        <div className="bg-white rounded-2xl p-6 mb-6 text-left" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}>
          <div className="space-y-3 mb-4">
            {items.map(({ product, qty }) => (
              <div key={product.id} className="flex items-center justify-between gap-3 text-sm" style={{ fontFamily: "Open Sans, sans-serif", color: "#333" }}>
                <span>{product.name} × {qty}</span>
                <span style={{ color: "#005691", fontWeight: 700 }}>₦{(product.price * qty).toLocaleString()}</span>
              </div>
            ))}
          </div>
          <div className="pt-4 border-t" style={{ borderColor: "#eee" }}>
            <div className="flex justify-between text-sm mb-2" style={{ fontFamily: "Open Sans, sans-serif", color: "#555" }}>
              <span>Subtotal</span>
              <span>₦{subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm mb-2" style={{ fontFamily: "Open Sans, sans-serif", color: "#555" }}>
              <span>Delivery</span>
              <span>{delivery === 0 ? "FREE" : `₦${delivery.toLocaleString()}`}</span>
            </div>
            <div className="flex justify-between font-bold text-base" style={{ fontFamily: "Montserrat, sans-serif", color: "#005691" }}>
              <span>Total</span>
              <span>₦{total.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => onNavigate("products")}
            className="flex-1 py-3.5 rounded-xl font-bold text-sm text-white"
            style={{ background: "#005691", fontFamily: "Montserrat, sans-serif" }}
          >
            Continue Shopping
          </button>
          <button
            onClick={() => onNavigate("cart")}
            className="flex-1 py-3.5 rounded-xl font-bold text-sm"
            style={{ border: "2px solid #005691", color: "#005691", fontFamily: "Montserrat, sans-serif" }}
          >
            Back to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
