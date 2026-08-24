import Logo from "./Logo";

type FooterProps = {
  onNavigate: (page: string) => void;
};

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer style={{ background: "#005691" }}>
      {/* Wave top */}
      <div className="relative h-12 overflow-hidden" style={{ background: "#F9F9F9" }}>
        <svg viewBox="0 0 1440 48" preserveAspectRatio="none" className="absolute bottom-0 w-full" style={{ fill: "#005691" }}>
          <path d="M0,48 C360,0 1080,48 1440,16 L1440,48 Z"/>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Logo size="md" white />
            <p className="mt-4 text-sm leading-relaxed" style={{ color: "#a8d8f0", fontFamily: "Open Sans, sans-serif" }}>
              Fresh groceries, everyday essentials, and quality products delivered conveniently to your door. Your trusted supermarket, now online.
            </p>
            <div className="flex gap-3 mt-5">
              {["facebook", "twitter", "instagram", "whatsapp"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-colors"
                  style={{ background: "rgba(255,255,255,0.1)" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.background = "#6AB04C")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.1)")}
                  aria-label={social}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                    {social === "facebook" && <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>}
                    {social === "twitter" && <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>}
                    {social === "instagram" && <><rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="white" strokeWidth="2"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" fill="none" stroke="white" strokeWidth="2"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="white" strokeWidth="2"/></>}
                    {social === "whatsapp" && <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>}
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-bold text-sm mb-4 text-white" style={{ fontFamily: "Montserrat, sans-serif", letterSpacing: "0.05em" }}>SHOP</h4>
            <ul className="space-y-2.5">
              {["All Products", "Categories", "Fresh Produce", "Deals", "New Arrivals"].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => onNavigate("products")}
                    className="text-sm transition-colors text-left"
                    style={{ color: "#a8d8f0", fontFamily: "Open Sans, sans-serif" }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#6AB04C")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#a8d8f0")}
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold text-sm mb-4 text-white" style={{ fontFamily: "Montserrat, sans-serif", letterSpacing: "0.05em" }}>COMPANY</h4>
            <ul className="space-y-2.5">
              {["About Us", "Our Story", "Contact", "Careers", "FAQs", "Delivery Info", "Returns"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm transition-colors"
                    style={{ color: "#a8d8f0", fontFamily: "Open Sans, sans-serif" }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#6AB04C")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#a8d8f0")}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-sm mb-4 text-white" style={{ fontFamily: "Montserrat, sans-serif", letterSpacing: "0.05em" }}>CONTACT</h4>
            <div className="space-y-3">
              {[
                { icon: "phone", text: "+234 800 123 4567" },
                { icon: "mail", text: "hello@abdulsmarket.ng" },
                { icon: "map", text: "Lagos, Abuja & Kano" },
              ].map(({ icon, text }) => (
                <div key={icon} className="flex items-start gap-2">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6AB04C" strokeWidth="2" className="mt-0.5 flex-shrink-0">
                    {icon === "phone" && <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 12 19.79 19.79 0 0 1 1.08 3.38 2 2 0 0 1 3.05 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 21 16z"/>}
                    {icon === "mail" && <><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></>}
                    {icon === "map" && <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></>}
                  </svg>
                  <span className="text-sm" style={{ color: "#a8d8f0", fontFamily: "Open Sans, sans-serif" }}>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4" style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
          <p className="text-xs" style={{ color: "#a8d8f0", fontFamily: "Open Sans, sans-serif" }}>
            © 2026 Abdul&apos;s Enterprise Supermarket. All rights reserved.
          </p>
          <div className="flex gap-4">
            {["Privacy Policy", "Terms & Conditions", "Cookie Policy"].map((item) => (
              <a key={item} href="#" className="text-xs transition-colors"
                style={{ color: "#a8d8f0", fontFamily: "Open Sans, sans-serif" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "white")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#a8d8f0")}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
