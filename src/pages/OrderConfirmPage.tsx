type OrderConfirmPageProps = {
  onNavigate: (page: string) => void;
};

export default function OrderConfirmPage({ onNavigate }: OrderConfirmPageProps) {
  const orderNumber = "AES-2026-" + Math.floor(1000 + Math.random() * 9000);
  const deliveryDate = new Date(Date.now() + 24 * 60 * 60 * 1000).toLocaleDateString("en-NG", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div style={{ background: "#F9F9F9", minHeight: "100vh" }} className="flex items-center justify-center px-4 py-16">
      <div className="max-w-lg w-full text-center">
        {/* Success animation */}
        <div
          className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6"
          style={{ background: "linear-gradient(135deg, #edf7e8 0%, #d4f0c6 100%)", border: "4px solid #6AB04C" }}
        >
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#6AB04C" strokeWidth="2.5" strokeLinecap="round">
            <polyline points="20,6 9,17 4,12"/>
          </svg>
        </div>

        <h1 className="font-bold mb-3" style={{ fontFamily: "Montserrat, sans-serif", color: "#333", fontSize: 32 }}>
          Order Confirmed! 🎉
        </h1>
        <p className="mb-8 leading-relaxed" style={{ color: "#4F4F4F", fontFamily: "Open Sans, sans-serif" }}>
          Thank you for shopping with Abdul's Enterprise. Your order is being prepared with care.
        </p>

        {/* Details card */}
        <div className="bg-white rounded-2xl p-6 mb-6 text-left" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Order Number", value: orderNumber, highlight: true },
              { label: "Status", value: "Confirmed", highlight: false, green: true },
              { label: "Estimated Delivery", value: deliveryDate, highlight: false },
              { label: "Delivery Address", value: "15 Allen Avenue, Ikeja, Lagos", highlight: false },
            ].map(({ label, value, highlight, green }) => (
              <div key={label}>
                <p className="text-xs mb-1" style={{ color: "#888", fontFamily: "Montserrat, sans-serif", fontWeight: 600 }}>{label.toUpperCase()}</p>
                <p
                  className="font-semibold text-sm"
                  style={{
                    fontFamily: "Montserrat, sans-serif",
                    color: highlight ? "#005691" : green ? "#6AB04C" : "#333",
                  }}
                >
                  {value}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Delivery progress */}
        <div className="bg-white rounded-2xl p-5 mb-8" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.07)" }}>
          <div className="flex items-center justify-between">
            {[
              { label: "Order Placed", done: true, icon: "✓" },
              { label: "Preparing", done: true, icon: "✓" },
              { label: "In Transit", done: false, icon: "🚚" },
              { label: "Delivered", done: false, icon: "🏠" },
            ].map(({ label, done, icon }, i, arr) => (
              <div key={label} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{
                      background: done ? "#6AB04C" : "#e5e7eb",
                      color: done ? "white" : "#aaa",
                    }}
                  >
                    {icon}
                  </div>
                  <span className="text-xs mt-1.5 text-center" style={{ color: done ? "#333" : "#aaa", fontFamily: "Open Sans, sans-serif", fontSize: 10 }}>
                    {label}
                  </span>
                </div>
                {i < arr.length - 1 && (
                  <div className="h-px w-8 sm:w-12 mx-1 -mt-4" style={{ background: done ? "#6AB04C" : "#e5e7eb" }}/>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          <button
            className="flex-1 py-3.5 rounded-xl font-bold text-sm text-white"
            style={{ background: "#6AB04C", fontFamily: "Montserrat, sans-serif" }}
          >
            Track My Order
          </button>
          <button
            onClick={() => onNavigate("home")}
            className="flex-1 py-3.5 rounded-xl font-bold text-sm"
            style={{ border: "2px solid #005691", color: "#005691", fontFamily: "Montserrat, sans-serif" }}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}
