import { useState } from "react";
import type { Product } from "../data/products";
import { WHATSAPP_NUMBER } from "../config/site";
import { getCartSummary } from "../utils/cart";

type CartItem = { product: Product; qty: number };

type CheckoutPageProps = {
  items: CartItem[];
  onNavigate: (page: string) => void;
};

const steps = ["Delivery", "Review"];

function formatMoney(value: number) {
  return `₦${value.toLocaleString()}`;
}

export default function CheckoutPage({ items, onNavigate }: CheckoutPageProps) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({ name: "", phone: "", address: "", city: "", state: "", notes: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [whatsappError, setWhatsappError] = useState("");

  const { subtotal, delivery, total } = getCartSummary(items);

  function update(key: keyof typeof form, val: string) {
    setForm((f) => ({ ...f, [key]: val }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
    if (whatsappError) setWhatsappError("");
  }

  function validateForm() {
    const nextErrors: Record<string, string> = {};
    const requiredFields: Array<keyof typeof form> = ["name", "phone", "address", "city", "state"];

    requiredFields.forEach((field) => {
      if (!form[field].trim()) {
        nextErrors[field] = "This field is required";
      }
    });

    if (items.length === 0) {
      setWhatsappError("Your cart is empty. Add products before checking out.");
      return false;
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function buildWhatsAppMessage() {
    const lines = [
      "Hello, I would like to place an order.",
      "",
      "Order details:",
      ...items.map(({ product, qty }) => {
        const itemTotal = product.price * qty;
        return `- ${product.name} x${qty} (${formatMoney(product.price)} each) = ${formatMoney(itemTotal)}`;
      }),
      "",
      "Order summary:",
      `Subtotal: ${formatMoney(subtotal)}`,
      `Delivery fee: ${delivery === 0 ? "FREE" : formatMoney(delivery)}`,
      `Estimated total: ${formatMoney(total)}`,
      "",
      "Customer details:",
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      "",
      "Delivery details:",
      `Address: ${form.address}`,
      `City: ${form.city}`,
      `State: ${form.state}`,
      `Delivery instructions: ${form.notes ? form.notes : "None"}`,
      "",
      "Please confirm my order, availability, delivery details, and payment instructions.",
    ];

    return lines.join("\n");
  }

  function handleWhatsAppOrder() {
    if (!validateForm()) {
      return;
    }

    const message = encodeURIComponent(buildWhatsAppMessage());
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;

    try {
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
      setWhatsappError("");
      onNavigate("order-confirm");
    } catch {
      setWhatsappError("We couldn't open WhatsApp automatically. Please try again or contact us directly.");
    }
  }

  function handleNext() {
    if (step === 0) {
      if (validateForm()) {
        setStep(1);
      }
      return;
    }

    handleWhatsAppOrder();
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 px-4" style={{ background: "#F9F9F9", minHeight: "60vh" }}>
        <div className="text-6xl mb-4">🛒</div>
        <h2 className="font-bold text-xl mb-2" style={{ fontFamily: "Montserrat, sans-serif", color: "#333" }}>Your cart is empty</h2>
        <p className="text-sm mb-6" style={{ color: "#888", fontFamily: "Open Sans, sans-serif" }}>Add some products before starting checkout.</p>
        <button
          onClick={() => onNavigate("products")}
          className="px-8 py-3 rounded-full font-bold text-sm text-white"
          style={{ background: "#005691", fontFamily: "Montserrat, sans-serif" }}
        >
          Continue Shopping
        </button>
      </div>
    );
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
                          style={{ border: `1.5px solid ${errors[key] ? "#ef4444" : "#e5e7eb"}`, fontFamily: "Open Sans, sans-serif" }}
                          onFocus={(e) => (e.target.style.borderColor = errors[key] ? "#ef4444" : "#005691")}
                          onBlur={(e) => (e.target.style.borderColor = errors[key] ? "#ef4444" : "#e5e7eb")}
                        />
                        {errors[key] && <div className="text-xs mt-1" style={{ color: "#dc2626" }}>{errors[key]}</div>}
                      </div>
                    ))}
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold mb-1.5" style={{ fontFamily: "Montserrat, sans-serif", color: "#333" }}>Delivery Address</label>
                      <input
                        type="text"
                        placeholder="15 Allen Avenue, Ikeja"
                        value={form.address}
                        onChange={(e) => update("address", e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                        style={{ border: `1.5px solid ${errors.address ? "#ef4444" : "#e5e7eb"}`, fontFamily: "Open Sans, sans-serif" }}
                        onFocus={(e) => (e.target.style.borderColor = errors.address ? "#ef4444" : "#005691")}
                        onBlur={(e) => (e.target.style.borderColor = errors.address ? "#ef4444" : "#e5e7eb")}
                      />
                      {errors.address && <div className="text-xs mt-1" style={{ color: "#dc2626" }}>{errors.address}</div>}
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
                          style={{ border: `1.5px solid ${errors[key] ? "#ef4444" : "#e5e7eb"}`, fontFamily: "Open Sans, sans-serif" }}
                          onFocus={(e) => (e.target.style.borderColor = errors[key] ? "#ef4444" : "#005691")}
                          onBlur={(e) => (e.target.style.borderColor = errors[key] ? "#ef4444" : "#e5e7eb")}
                        />
                        {errors[key] && <div className="text-xs mt-1" style={{ color: "#dc2626" }}>{errors[key]}</div>}
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

              {/* Step 2: Review */}
              {step === 1 && (
                <div>
                  <h2 className="font-bold text-lg mb-5" style={{ fontFamily: "Montserrat, sans-serif", color: "#333" }}>Review Your Order</h2>
                  <div className="space-y-4 mb-5">
                    {items.map(({ product, qty }) => {
                      const itemTotal = product.price * qty;
                      return (
                        <div key={product.id} className="flex items-center gap-3 rounded-xl p-2" style={{ background: "#F9F9F9" }}>
                          <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-50 flex-shrink-0">
                            <img src={product.image} alt={product.name} className="w-full h-full object-cover"/>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold truncate" style={{ fontFamily: "Montserrat, sans-serif", color: "#333" }}>{product.name}</p>
                            <p className="text-xs" style={{ color: "#888" }}>Qty: {qty} · {formatMoney(product.price)} each</p>
                          </div>
                          <p className="font-bold text-sm" style={{ color: "#005691", fontFamily: "Montserrat, sans-serif" }}>
                            {formatMoney(itemTotal)}
                          </p>
                        </div>
                      );
                    })}
                  </div>

                  <div className="space-y-3 p-4 rounded-xl text-sm" style={{ background: "#f0f7ff" }}>
                    <p style={{ fontFamily: "Open Sans, sans-serif", color: "#333" }}>
                      <strong>Name:</strong> {form.name || "—"}
                    </p>
                    <p style={{ fontFamily: "Open Sans, sans-serif", color: "#333" }}>
                      <strong>Phone:</strong> {form.phone || "—"}
                    </p>
                    <p style={{ fontFamily: "Open Sans, sans-serif", color: "#333" }}>
                      <strong>Address:</strong> {form.address || "—"}
                    </p>
                    <p style={{ fontFamily: "Open Sans, sans-serif", color: "#333" }}>
                      <strong>City:</strong> {form.city || "—"}
                    </p>
                    <p style={{ fontFamily: "Open Sans, sans-serif", color: "#333" }}>
                      <strong>State:</strong> {form.state || "—"}
                    </p>
                    {form.notes && (
                      <p style={{ fontFamily: "Open Sans, sans-serif", color: "#333" }}>
                        <strong>Delivery instructions:</strong> {form.notes}
                      </p>
                    )}
                  </div>

                  <p className="mt-4 text-sm" style={{ color: "#4F4F4F", fontFamily: "Open Sans, sans-serif" }}>
                    Payment will be confirmed with our team after you send your order via WhatsApp.
                  </p>
                </div>
              )}

              {whatsappError && (
                <div className="mt-4 rounded-xl border px-3 py-2 text-sm" style={{ borderColor: "#fbcfe8", background: "#fff1f2", color: "#991b1b" }}>
                  {whatsappError}
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
                  className="flex-1 py-3 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2"
                  style={{ background: "#005691", fontFamily: "Montserrat, sans-serif" }}
                >
                  {step === 1 ? (
                    <>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.52 3.48A11.86 11.86 0 0 0 12.06 0C5.47 0 .12 5.35.12 11.94c0 2.1.55 4.15 1.6 5.96L0 24l6.3-1.65a11.9 11.9 0 0 0 5.77 1.75h.01c6.59 0 11.94-5.35 11.94-11.94 0-3.2-1.24-6.2-3.5-8.68Zm-8.46 18.4h-.01a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.74.98 1-3.64-.24-.38a9.88 9.88 0 0 1-1.53-5.25c0-5.48 4.46-9.94 9.96-9.94 2.66 0 5.16 1.03 7.03 2.9a9.86 9.86 0 0 1 2.91 7.04c0 5.48-4.46 9.94-9.94 9.94Zm5.45-7.44c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.66.15-.19.3-.74.97-.9 1.17-.17.2-.33.22-.62.07-.3-.15-1.27-.47-2.42-1.49-.9-.8-1.5-1.78-1.68-2.08-.17-.3-.02-.46.13-.61.14-.14.3-.34.45-.51.15-.17.2-.29.3-.48.1-.2.05-.37-.02-.52-.08-.15-.66-1.6-.91-2.19-.24-.57-.48-.5-.66-.5h-.57c-.19 0-.5.07-.77.37-.27.3-1.04 1.02-1.04 2.5s1.06 2.9 1.21 3.1c.15.2 2.09 3.19 5.05 4.47.7.3 1.25.48 1.68.62.71.22 1.36.19 1.87.12.57-.08 1.76-.72 2.01-1.42.25-.7.25-1.3.17-1.42-.08-.12-.27-.2-.56-.35Z"/></svg>
                      Complete Order via WhatsApp
                    </>
                  ) : "Continue →"}
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
                <span className="font-bold" style={{ color: "#005691", fontFamily: "Montserrat, sans-serif" }}>{formatMoney(total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
