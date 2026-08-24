import { useState } from "react";
import type { Product } from "../data/products";

type CartItem = { product: Product; qty: number };

type CheckoutPageProps = {
  items: CartItem[];
  onNavigate: (page: string) => void;
  onOrderComplete: () => void;
};

const steps = ["Delivery", "Payment", "Review"];

export default function CheckoutPage({ items, onNavigate, onOrderComplete }: CheckoutPageProps) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({ name: "", phone: "", address: "", city: "", state: "", notes: "" });
  const [payMethod, setPayMethod] = useState("card");

  const subtotal = items.reduce((s, i) => s + i.product.price * i.qty, 0);
  const delivery = subtotal >= 50000 ? 0 : 2000;
  const total = subtotal + delivery;

  function update(key: keyof typeof form, val: string) {
    setForm((f) => ({ ...f, [key]: val }));
  }

  function handleNext() {
    if (step < 2) setStep(step + 1);
    else { onOrderComplete(); onNavigate("order-confirm"); }
  }

  return (
    <div style={{ background: "#F9F9F9", minHeight: "100vh" }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="font-bold mb-8" style={{ fontFamily: "Montserrat, sans-serif", color: "#005691", fontSize: 28 }}>Checkout</h1>

        {/* Step indicator */}
        <div className="flex items-center mb-10">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center">
              <div className="flex items-center gap-2">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm"
                  style={{
                    fontFamily: "Montserrat, sans-serif",
                    background: i <= step ? "#005691" : "#e5e7eb",
                    color: i <= step ? "white" : "#aaa",
                  }}
                >
                  {i < step ? (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                      <polyline points="20,6 9,17 4,12"/>
                    </svg>
                  ) : i + 1}
                </div>
                <span className="text-sm font-semibold" style={{ fontFamily: "Montserrat, sans-serif", color: i <= step ? "#005691" : "#aaa" }}>{s}</span>
              </div>
              {i < steps.length - 1 && (
                <div className="h-px flex-1 mx-3" style={{ background: i < step ? "#005691" : "#e5e7eb", minWidth: 32 }}/>
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-6" style={{ boxShadow: "0 2px 16px rgba(0,0,0,0.08)" }}>
              {/* Step 1: Delivery */}
              {step === 0 && (
                <div>
                  <h2 className="font-bold text-lg mb-5" style={{ fontFamily: "Montserrat, sans-serif", color: "#333" }}>Delivery Information</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { key: "name", label: "Full Name", placeholder: "Emeka Okafor", type: "text" },
                      { key: "phone", label: "Phone Number", placeholder: "+234 800 123 4567", type: "tel" },
                    ].map(({ key, label, placeholder, type }) => (
                      <div key={key}>
                        <label className="block text-xs font-semibold mb-1.5" style={{ fontFamily: "Montserrat, sans-serif", color: "#333" }}>{label}</label>
                        <input
                          type={type}
                          placeholder={placeholder}
                          value={form[key as keyof typeof form]}
                          onChange={(e) => update(key as keyof typeof form, e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                          style={{ border: "1.5px solid #e5e7eb", fontFamily: "Open Sans, sans-serif" }}
                          onFocus={(e) => (e.target.style.borderColor = "#005691")}
                          onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
                        />
                      </div>
                    ))}
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold mb-1.5" style={{ fontFamily: "Montserrat, sans-serif", color: "#333" }}>Address</label>
                      <input
                        type="text"
                        placeholder="15 Allen Avenue, Ikeja"
                        value={form.address}
                        onChange={(e) => update("address", e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                        style={{ border: "1.5px solid #e5e7eb", fontFamily: "Open Sans, sans-serif" }}
                        onFocus={(e) => (e.target.style.borderColor = "#005691")}
                        onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
                      />
                    </div>
                    {[
                      { key: "city", label: "City", placeholder: "Lagos" },
                      { key: "state", label: "State", placeholder: "Lagos State" },
                    ].map(({ key, label, placeholder }) => (
                      <div key={key}>
                        <label className="block text-xs font-semibold mb-1.5" style={{ fontFamily: "Montserrat, sans-serif", color: "#333" }}>{label}</label>
                        <input
                          type="text"
                          placeholder={placeholder}
                          value={form[key as keyof typeof form]}
                          onChange={(e) => update(key as keyof typeof form, e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                          style={{ border: "1.5px solid #e5e7eb", fontFamily: "Open Sans, sans-serif" }}
                          onFocus={(e) => (e.target.style.borderColor = "#005691")}
                          onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
                        />
                      </div>
                    ))}
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold mb-1.5" style={{ fontFamily: "Montserrat, sans-serif", color: "#333" }}>Delivery Instructions (optional)</label>
                      <textarea
                        placeholder="e.g. Call before delivery, leave at gate..."
                        value={form.notes}
                        onChange={(e) => update("notes", e.target.value)}
                        rows={2}
                        className="w-full px-4 py-2.5 rounded-xl text-sm outline-none resize-none"
                        style={{ border: "1.5px solid #e5e7eb", fontFamily: "Open Sans, sans-serif" }}
                        onFocus={(e) => (e.target.style.borderColor = "#005691")}
                        onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Payment */}
              {step === 1 && (
                <div>
                  <h2 className="font-bold text-lg mb-5" style={{ fontFamily: "Montserrat, sans-serif", color: "#333" }}>Payment Method</h2>
                  <div className="space-y-3">
                    {[
                      { id: "card", label: "Debit/Credit Card", icon: "💳", desc: "Visa, Mastercard, Verve" },
                      { id: "transfer", label: "Bank Transfer", icon: "🏦", desc: "Direct bank transfer" },
                      { id: "ussd", label: "USSD", icon: "📱", desc: "*737#, *901# and others" },
                    ].map(({ id, label, icon, desc }) => (
                      <label
                        key={id}
                        className="flex items-center gap-4 p-4 rounded-xl cursor-pointer"
                        style={{
                          border: `2px solid ${payMethod === id ? "#005691" : "#e5e7eb"}`,
                          background: payMethod === id ? "#e8f2fa" : "white",
                        }}
                      >
                        <input type="radio" name="pay" value={id} checked={payMethod === id} onChange={() => setPayMethod(id)} className="hidden"/>
                        <span className="text-2xl">{icon}</span>
                        <div>
                          <div className="font-semibold text-sm" style={{ fontFamily: "Montserrat, sans-serif", color: "#333" }}>{label}</div>
                          <div className="text-xs mt-0.5" style={{ color: "#888", fontFamily: "Open Sans, sans-serif" }}>{desc}</div>
                        </div>
                        {payMethod === id && (
                          <div className="ml-auto w-5 h-5 rounded-full flex items-center justify-center" style={{ background: "#005691" }}>
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                              <polyline points="20,6 9,17 4,12"/>
                            </svg>
                          </div>
                        )}
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3: Review */}
              {step === 2 && (
                <div>
                  <h2 className="font-bold text-lg mb-5" style={{ fontFamily: "Montserrat, sans-serif", color: "#333" }}>Review Your Order</h2>
                  <div className="space-y-3 mb-5">
                    {items.map(({ product, qty }) => (
                      <div key={product.id} className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-50 flex-shrink-0">
                          <img src={product.image} alt={product.name} className="w-full h-full object-cover"/>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-semibold" style={{ fontFamily: "Montserrat, sans-serif", color: "#333" }}>{product.name}</p>
                          <p className="text-xs" style={{ color: "#888" }}>×{qty}</p>
                        </div>
                        <p className="font-bold text-sm" style={{ color: "#005691", fontFamily: "Montserrat, sans-serif" }}>
                          ₦{(product.price * qty).toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 rounded-xl text-sm" style={{ background: "#f0f7ff" }}>
                    <p style={{ fontFamily: "Open Sans, sans-serif", color: "#333" }}>
                      <strong>Deliver to:</strong> {form.name || "—"}, {form.address || "—"}, {form.city || "—"}, {form.state || "—"}
                    </p>
                    <p className="mt-1" style={{ fontFamily: "Open Sans, sans-serif", color: "#333" }}>
                      <strong>Payment:</strong> {payMethod === "card" ? "Debit/Credit Card" : payMethod === "transfer" ? "Bank Transfer" : "USSD"}
                    </p>
                  </div>
                </div>
              )}

              <div className="flex gap-3 mt-6">
                {step > 0 && (
                  <button
                    onClick={() => setStep(step - 1)}
                    className="px-6 py-3 rounded-xl font-semibold text-sm"
                    style={{ border: "1.5px solid #e5e7eb", color: "#333", fontFamily: "Montserrat, sans-serif" }}
                  >
                    Back
                  </button>
                )}
                <button
                  onClick={handleNext}
                  className="flex-1 py-3 rounded-xl font-bold text-sm text-white"
                  style={{ background: "#005691", fontFamily: "Montserrat, sans-serif" }}
                >
                  {step === 2 ? "Place Order →" : "Continue →"}
                </button>
              </div>
            </div>
          </div>

          {/* Summary */}
          <div>
            <div className="bg-white rounded-2xl p-5" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.07)" }}>
              <h3 className="font-bold mb-4 text-sm" style={{ fontFamily: "Montserrat, sans-serif", color: "#333" }}>Order Summary</h3>
              <div className="space-y-2 text-sm mb-4">
                <div className="flex justify-between" style={{ fontFamily: "Open Sans, sans-serif" }}>
                  <span style={{ color: "#888" }}>Subtotal</span>
                  <span style={{ color: "#333", fontWeight: 600 }}>₦{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between" style={{ fontFamily: "Open Sans, sans-serif" }}>
                  <span style={{ color: "#888" }}>Delivery</span>
                  <span style={{ color: delivery === 0 ? "#6AB04C" : "#333", fontWeight: 600 }}>
                    {delivery === 0 ? "FREE" : `₦${delivery.toLocaleString()}`}
                  </span>
                </div>
              </div>
              <div className="pt-3 flex justify-between" style={{ borderTop: "1px solid #eee" }}>
                <span className="font-bold text-sm" style={{ fontFamily: "Montserrat, sans-serif" }}>Total</span>
                <span className="font-bold" style={{ color: "#005691", fontFamily: "Montserrat, sans-serif" }}>₦{total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
