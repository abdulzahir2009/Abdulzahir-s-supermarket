import { useState } from "react";

type AccountSection = "orders" | "profile" | "addresses" | "wishlist" | "payment";

export default function AccountPage() {
  const [section, setSection] = useState<AccountSection>("orders");

  const navItems: { id: AccountSection; label: string; icon: string }[] = [
    { id: "orders", label: "My Orders", icon: "📦" },
    { id: "profile", label: "Profile", icon: "👤" },
    { id: "addresses", label: "Addresses", icon: "📍" },
    { id: "wishlist", label: "Wishlist", icon: "❤️" },
    { id: "payment", label: "Payment Methods", icon: "💳" },
  ];

  const orders = [
    { id: "AES-2024-1821", date: "20 Aug 2026", status: "Delivered", total: 24500, items: 5 },
    { id: "AES-2024-1756", date: "14 Aug 2026", status: "In Transit", total: 18200, items: 3 },
    { id: "AES-2024-1690", date: "8 Aug 2026", status: "Delivered", total: 52000, items: 8 },
  ];

  return (
    <div style={{ background: "#F9F9F9", minHeight: "100vh" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile banner */}
        <div
          className="rounded-2xl p-6 mb-6 flex items-center gap-5"
          style={{ background: "linear-gradient(135deg, #005691 0%, #0070b8 100%)", color: "white" }}
        >
          <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-white/30 flex-shrink-0">
            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=128&h=128&fit=crop&auto=format" alt="User" className="w-full h-full object-cover"/>
          </div>
          <div>
            <h1 className="font-bold text-xl" style={{ fontFamily: "Montserrat, sans-serif" }}>Emeka Okafor</h1>
            <p className="text-sm mt-0.5" style={{ color: "rgba(255,255,255,0.75)", fontFamily: "Open Sans, sans-serif" }}>emeka.okafor@gmail.com · Lagos, Nigeria</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <aside>
            <div className="bg-white rounded-2xl p-2" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.07)" }}>
              {navItems.map(({ id, label, icon }) => (
                <button
                  key={id}
                  onClick={() => setSection(id)}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors"
                  style={{
                    fontFamily: "Open Sans, sans-serif",
                    background: section === id ? "#e8f2fa" : "transparent",
                    color: section === id ? "#005691" : "#333",
                    fontWeight: section === id ? 600 : 400,
                  }}
                >
                  <span>{icon}</span>
                  {label}
                </button>
              ))}
              <div className="mt-2 pt-2" style={{ borderTop: "1px solid #eee" }}>
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium" style={{ color: "#ef4444" }}>
                  <span>🚪</span> Sign Out
                </button>
              </div>
            </div>
          </aside>

          {/* Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl p-6" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.07)" }}>
              {section === "orders" && (
                <>
                  <h2 className="font-bold text-lg mb-5" style={{ fontFamily: "Montserrat, sans-serif", color: "#333" }}>Recent Orders</h2>
                  <div className="space-y-3">
                    {orders.map((o) => (
                      <div key={o.id} className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl" style={{ background: "#F9F9F9" }}>
                        <div>
                          <p className="font-semibold text-sm" style={{ fontFamily: "Montserrat, sans-serif", color: "#333" }}>{o.id}</p>
                          <p className="text-xs mt-0.5" style={{ color: "#888", fontFamily: "Open Sans, sans-serif" }}>{o.date} · {o.items} items</p>
                        </div>
                        <span
                          className="text-xs font-bold px-3 py-1 rounded-full"
                          style={{
                            fontFamily: "Montserrat, sans-serif",
                            background: o.status === "Delivered" ? "#edf7e8" : "#fff7ed",
                            color: o.status === "Delivered" ? "#4e8a35" : "#c2410c",
                          }}
                        >
                          {o.status}
                        </span>
                        <div className="text-right">
                          <p className="font-bold text-sm" style={{ color: "#005691", fontFamily: "Montserrat, sans-serif" }}>₦{o.total.toLocaleString()}</p>
                          <button className="text-xs mt-0.5" style={{ color: "#005691" }}>Track Order →</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {section === "profile" && (
                <>
                  <h2 className="font-bold text-lg mb-5" style={{ fontFamily: "Montserrat, sans-serif", color: "#333" }}>Profile Information</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { label: "First Name", value: "Emeka" },
                      { label: "Last Name", value: "Okafor" },
                      { label: "Email", value: "emeka.okafor@gmail.com" },
                      { label: "Phone", value: "+234 800 123 4567" },
                    ].map(({ label, value }) => (
                      <div key={label}>
                        <label className="block text-xs font-semibold mb-1.5" style={{ fontFamily: "Montserrat, sans-serif", color: "#333" }}>{label}</label>
                        <input
                          defaultValue={value}
                          className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                          style={{ border: "1.5px solid #e5e7eb", fontFamily: "Open Sans, sans-serif" }}
                          onFocus={(e) => (e.target.style.borderColor = "#005691")}
                          onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
                        />
                      </div>
                    ))}
                  </div>
                  <button className="mt-5 px-7 py-2.5 rounded-xl font-bold text-sm text-white"
                    style={{ background: "#005691", fontFamily: "Montserrat, sans-serif" }}>
                    Save Changes
                  </button>
                </>
              )}

              {section === "addresses" && (
                <>
                  <h2 className="font-bold text-lg mb-5" style={{ fontFamily: "Montserrat, sans-serif", color: "#333" }}>Saved Addresses</h2>
                  <div className="space-y-3">
                    {[
                      { label: "Home", address: "15 Allen Avenue, Ikeja, Lagos State", default: true },
                      { label: "Office", address: "22 Broad Street, Lagos Island, Lagos State", default: false },
                    ].map(({ label, address, default: isDefault }) => (
                      <div key={label} className="p-4 rounded-xl flex items-center justify-between gap-4"
                        style={{ border: `1.5px solid ${isDefault ? "#005691" : "#e5e7eb"}`, background: isDefault ? "#e8f2fa" : "white" }}>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-semibold text-sm" style={{ fontFamily: "Montserrat, sans-serif", color: "#333" }}>{label}</p>
                            {isDefault && <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: "#005691", color: "white", fontFamily: "Montserrat, sans-serif" }}>Default</span>}
                          </div>
                          <p className="text-sm mt-1" style={{ color: "#4F4F4F", fontFamily: "Open Sans, sans-serif" }}>{address}</p>
                        </div>
                        <button className="text-xs font-semibold" style={{ color: "#005691" }}>Edit</button>
                      </div>
                    ))}
                    <button className="flex items-center gap-2 text-sm font-semibold mt-2"
                      style={{ color: "#6AB04C", fontFamily: "Montserrat, sans-serif" }}>
                      + Add New Address
                    </button>
                  </div>
                </>
              )}

              {(section === "wishlist" || section === "payment") && (
                <div className="text-center py-12">
                  <div className="text-4xl mb-3">{section === "wishlist" ? "❤️" : "💳"}</div>
                  <p className="font-semibold" style={{ fontFamily: "Montserrat, sans-serif", color: "#333" }}>
                    {section === "wishlist" ? "Your wishlist is empty" : "No payment methods saved"}
                  </p>
                  <p className="text-sm mt-1" style={{ color: "#888" }}>
                    {section === "wishlist" ? "Save items you love for later." : "Add a card or bank account."}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
