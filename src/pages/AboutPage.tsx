import { WHATSAPP_NUMBER } from "../config/site";

type AboutPageProps = {
  onNavigate: (page: string, data?: unknown) => void;
};

export default function AboutPage({ onNavigate }: AboutPageProps) {
  function openWhatsApp() {
    const url = `https://wa.me/${WHATSAPP_NUMBER}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <div style={{ background: "#F9F9F9" }}>
      <section className="relative overflow-hidden" style={{ background: "linear-gradient(135deg, #edf7e8 0%, #e8f2fa 100%)" }}>
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -left-10 top-16 h-56 w-56 rounded-full" style={{ background: "rgba(106,176,76,0.12)" }} />
          <div className="absolute right-0 bottom-0 h-72 w-72 rounded-full" style={{ background: "rgba(0,86,145,0.08)" }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span
                className="inline-flex items-center rounded-full px-3 py-1.5 text-xs font-semibold"
                style={{ background: "rgba(0,86,145,0.08)", color: "#005691", fontFamily: "Montserrat, sans-serif", letterSpacing: "0.12em" }}
              >
                ABOUT US
              </span>

              <h1 className="mt-5 font-bold leading-tight" style={{ fontFamily: "Montserrat, sans-serif", color: "#005691", fontSize: "clamp(34px, 5vw, 58px)" }}>
                Freshness You Can Trust.
              </h1>

              <p className="mt-5 max-w-xl text-base leading-relaxed" style={{ color: "#4F4F4F", fontFamily: "Open Sans, sans-serif" }}>
                We make everyday grocery shopping feel easier, fresher, and more dependable. From everyday essentials to fresh favourites,
                we bring thoughtfully selected products together in one simple, convenient place.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  onClick={() => onNavigate("products")}
                  className="px-7 py-3.5 rounded-full font-bold text-sm text-white"
                  style={{ background: "#005691", fontFamily: "Montserrat, sans-serif" }}
                >
                  Shop Our Products
                </button>
                <button
                  onClick={openWhatsApp}
                  className="px-7 py-3.5 rounded-full font-semibold text-sm"
                  style={{ border: "2px solid #005691", color: "#005691", fontFamily: "Montserrat, sans-serif", background: "rgba(255,255,255,0.75)" }}
                >
                  Contact Us
                </button>
              </div>
            </div>

            <div className="relative flex justify-center lg:justify-end">
              <div className="relative w-full max-w-xl">
                <div className="absolute -top-8 -right-6 h-24 w-24 rounded-full" style={{ background: "rgba(106,176,76,0.18)" }} />
                <div className="absolute -bottom-6 -left-4 h-28 w-28 rounded-full" style={{ background: "rgba(0,86,145,0.12)" }} />
                <div className="relative overflow-hidden rounded-[2rem] shadow-[0_20px_60px_rgba(0,86,145,0.12)]">
                  <img
                    src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=1000&h=900&fit=crop&auto=format"
                    alt="Fresh groceries and vegetables in a supermarket"
                    className="w-full h-[480px] object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="mb-6 text-center lg:text-left">
          <p className="text-sm font-semibold" style={{ color: "#6AB04C", fontFamily: "Montserrat, sans-serif", letterSpacing: "0.12em" }}>
            OUR STORY
          </p>
          <h2 className="mt-3 font-bold" style={{ fontFamily: "Montserrat, sans-serif", color: "#005691", fontSize: "clamp(28px, 3vw, 40px)" }}>
            Built Around What Matters Most: Freshness, Quality and You.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-base leading-relaxed" style={{ color: "#4F4F4F", fontFamily: "Open Sans, sans-serif" }}>
              Our supermarket experience is shaped by the everyday moments that matter most: finding the products you need, enjoying reliable quality,
              and shopping with confidence. We believe a better grocery experience should feel convenient, reassuring, and genuinely enjoyable.
            </p>
            <p className="mt-5 text-base leading-relaxed" style={{ color: "#4F4F4F", fontFamily: "Open Sans, sans-serif" }}>
              That means putting freshness first, simplifying the shopping journey, and making each order feel personal and easy to manage. We are focused on
              creating a grocery experience that supports busy households while keeping quality and customer care at the centre of everything we do.
            </p>
          </div>

          <div className="relative">
            <div className="absolute -left-8 -top-8 h-28 w-28 rounded-full" style={{ background: "rgba(106,176,76,0.12)" }} />
            <div className="relative overflow-hidden rounded-[2rem] shadow-[0_18px_50px_rgba(0,86,145,0.10)]">
              <img
                src="https://images.unsplash.com/photo-1607349913338-fca6f7fc42d0?w=900&h=700&fit=crop&auto=format"
                alt="Fresh fruits and vegetables on display"
                className="w-full h-[400px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 py-16" style={{ background: "white" }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-bold" style={{ fontFamily: "Montserrat, sans-serif", color: "#005691", fontSize: "clamp(28px, 3vw, 40px)" }}>
              What We Stand For
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
            {[
              {
                title: "Freshness",
                text: "We believe quality starts with fresh, carefully selected products that feel vibrant and dependable.",
                color: "#edf7e8",
                icon: "🌿",
              },
              {
                title: "Quality",
                text: "We focus on products that meet the standards our customers expect for everyday living.",
                color: "#e8f2fa",
                icon: "✅",
              },
              {
                title: "Convenience",
                text: "We make grocery shopping simple, accessible, and stress-free from browse to delivery.",
                color: "#edf7e8",
                icon: "🛒",
              },
              {
                title: "Customer First",
                text: "Every part of the experience should make shopping easier and more reassuring for our customers.",
                color: "#e8f2fa",
                icon: "🤝",
              },
            ].map(({ title, text, color, icon }) => (
              <div key={title} className="rounded-[1.75rem] p-6 transition-transform hover:-translate-y-1" style={{ background: color }}>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white text-2xl" style={{ boxShadow: "0 8px 20px rgba(0,86,145,0.08)" }}>
                  {icon}
                </div>
                <h3 className="font-bold text-lg" style={{ fontFamily: "Montserrat, sans-serif", color: "#333" }}>{title}</h3>
                <p className="mt-3 text-sm leading-relaxed" style={{ color: "#4F4F4F", fontFamily: "Open Sans, sans-serif" }}>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="relative">
            <div className="absolute -left-8 top-8 h-32 w-32 rounded-full" style={{ background: "rgba(106,176,76,0.12)" }} />
            <div className="relative overflow-hidden rounded-[2rem] shadow-[0_20px_60px_rgba(0,86,145,0.10)]">
              <img
                src="https://images.accentuate.io/?image=https%3A%2F%2Fcdn.accentuate.io%2F492866896049%2F1631669259750%2Ffresh-produce-1-690-x-517-5%402x.jpg%3Fv%3D0&c_options=w_740"
                alt="Fresh produce and daily essentials on display"
                className="h-[420px] w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-5 right-6 rounded-2xl bg-white px-4 py-3 shadow-[0_15px_30px_rgba(0,86,145,0.10)]">
              <p className="text-xs font-semibold uppercase" style={{ color: "#6AB04C", fontFamily: "Montserrat, sans-serif" }}>Fresh choices</p>
              <p className="text-sm font-semibold" style={{ color: "#333", fontFamily: "Montserrat, sans-serif" }}>Everyday convenience</p>
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase" style={{ color: "#6AB04C", fontFamily: "Montserrat, sans-serif", letterSpacing: "0.12em" }}>
              FRESHNESS / QUALITY
            </p>
            <h2 className="mt-3 font-bold" style={{ fontFamily: "Montserrat, sans-serif", color: "#005691", fontSize: "clamp(28px, 3vw, 40px)" }}>
              From Everyday Essentials to Fresh Favourites
            </h2>
            <p className="mt-5 text-base leading-relaxed" style={{ color: "#4F4F4F", fontFamily: "Open Sans, sans-serif" }}>
              Our goal is to make grocery shopping feel simple while still bringing the quality and freshness that make meals better and routines easier. We bring together staples,
              fresh food, and household essentials in one place so customers can shop with confidence and convenience.
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 py-16" style={{ background: "#F9F9F9" }}>
        <div className="max-w-7xl mx-auto">
          <div className="mb-10 text-center">
            <h2 className="font-bold" style={{ fontFamily: "Montserrat, sans-serif", color: "#005691", fontSize: "clamp(28px, 3vw, 40px)" }}>
              Why Customers Choose Us
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
            {[
              {
                title: "Quality Products",
                text: "Carefully selected groceries for everyday needs.",
              },
              {
                title: "Easy Shopping",
                text: "Browse products, add them to your cart, and review your order with ease.",
              },
              {
                title: "Convenient Ordering",
                text: "Customers can complete their order through WhatsApp for a simple and personal ordering experience.",
              },
              {
                title: "Customer Support",
                text: "Our team can help confirm orders, delivery details, and payment information.",
              },
            ].map(({ title, text }) => (
              <div key={title} className="rounded-[1.75rem] bg-white p-6 shadow-[0_12px_30px_rgba(0,86,145,0.05)]">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full" style={{ background: "rgba(106,176,76,0.12)", color: "#6AB04C" }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20,6 9,17 4,12" />
                  </svg>
                </div>
                <h3 className="font-bold text-lg" style={{ fontFamily: "Montserrat, sans-serif", color: "#333" }}>{title}</h3>
                <p className="mt-3 text-sm leading-relaxed" style={{ color: "#4F4F4F", fontFamily: "Open Sans, sans-serif" }}>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="rounded-[2.5rem] overflow-hidden" style={{ background: "linear-gradient(135deg, rgba(106,176,76,0.08), rgba(0,86,145,0.06))" }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center p-8 sm:p-10 lg:p-12">
            <div>
              <p className="text-sm font-semibold uppercase" style={{ color: "#6AB04C", fontFamily: "Montserrat, sans-serif", letterSpacing: "0.12em" }}>
                GROWING RESPONSIBLY
              </p>
              <h2 className="mt-3 font-bold" style={{ fontFamily: "Montserrat, sans-serif", color: "#005691", fontSize: "clamp(28px, 3vw, 40px)" }}>
                Growing Responsibly
              </h2>
              <p className="mt-5 text-base leading-relaxed" style={{ color: "#4F4F4F", fontFamily: "Open Sans, sans-serif" }}>
                We believe better shopping experiences should also be thoughtful about the world around us. We continue to look for ways to make responsible choices across the products,
                packaging, and experiences we provide, with fresh, practical decisions that support a more thoughtful everyday routine.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              {[
                { title: "Thoughtful", text: "Products selected with care" },
                { title: "Fresh", text: "Quality first in every order" },
                { title: "Better", text: "A cleaner, simpler shopping flow" },
              ].map(({ title, text }) => (
                <div key={title} className="rounded-[1.5rem] bg-white p-5 shadow-[0_12px_30px_rgba(0,86,145,0.06)]">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full" style={{ background: "rgba(0,86,145,0.09)", color: "#005691" }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M12 2v20M2 12h20" />
                    </svg>
                  </div>
                  <p className="font-bold text-base" style={{ fontFamily: "Montserrat, sans-serif", color: "#333" }}>{title}</p>
                  <p className="mt-2 text-xs leading-relaxed" style={{ color: "#4F4F4F", fontFamily: "Open Sans, sans-serif" }}>{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="relative overflow-hidden rounded-[2.5rem] px-6 py-10 sm:px-10 lg:px-14 lg:py-14" style={{ background: "linear-gradient(135deg, #005691 0%, #0070b8 100%)" }}>
            <div className="absolute -left-10 top-0 h-48 w-48 rounded-full opacity-30" style={{ background: "#6AB04C" }} />
            <div className="absolute -right-8 bottom-0 h-52 w-52 rounded-full opacity-20" style={{ background: "#6AB04C" }} />

            <div className="relative text-center">
              <p className="text-sm font-semibold uppercase" style={{ color: "#a8e890", fontFamily: "Montserrat, sans-serif", letterSpacing: "0.12em" }}>
                OUR PROMISE
              </p>
              <h2 className="mt-3 font-bold text-white" style={{ fontFamily: "Montserrat, sans-serif", fontSize: "clamp(30px, 4vw, 52px)" }}>
                To make everyday grocery shopping feel simpler, fresher and more dependable.
              </h2>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 pt-8">
        <div className="text-center">
          <h2 className="font-bold" style={{ fontFamily: "Montserrat, sans-serif", color: "#005691", fontSize: "clamp(28px, 3vw, 40px)" }}>
            Ready to Shop Fresh?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed" style={{ color: "#4F4F4F", fontFamily: "Open Sans, sans-serif" }}>
            Explore our products and find everything you need for your next grocery run.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
            <button
              onClick={() => onNavigate("products")}
              className="px-8 py-3.5 rounded-full font-bold text-sm text-white"
              style={{ background: "#6AB04C", fontFamily: "Montserrat, sans-serif" }}
            >
              Shop Now
            </button>
            <button
              onClick={openWhatsApp}
              className="px-8 py-3.5 rounded-full font-bold text-sm"
              style={{ border: "2px solid #005691", color: "#005691", fontFamily: "Montserrat, sans-serif", background: "white" }}
            >
              Order via WhatsApp
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
