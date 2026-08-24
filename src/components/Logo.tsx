type LogoProps = {
  size?: "sm" | "md" | "lg";
  white?: boolean;
};

export default function Logo({ size = "md", white = false }: LogoProps) {
  const textSize = size === "sm" ? "text-sm" : size === "lg" ? "text-xl" : "text-base";
  const iconSize = size === "sm" ? 32 : size === "lg" ? 52 : 40;
  const blue = white ? "#ffffff" : "#005691";
  const green = white ? "#a8e890" : "#6AB04C";

  return (
    <div className="flex items-center gap-2">
      <svg width={iconSize} height={iconSize} viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Cart body - blue swirl */}
        <path d="M8 10 C6 10 5 11.5 5.5 13.5 L10 32 C10.5 34 12 35 14 35 L38 35 C40 35 41.5 33.5 42 31.5 L46 15 C46.5 13 45.5 11 43.5 11 L13 11 Z" fill={blue} opacity="0.15"/>
        {/* Cart base arc */}
        <path d="M6 8 Q4 18 8 28 Q12 38 22 40 Q34 42 42 34 Q50 26 46 14" stroke={blue} strokeWidth="3" strokeLinecap="round" fill="none"/>
        {/* Green leaf swirl */}
        <path d="M18 36 Q14 28 20 20 Q26 12 36 14 Q44 16 42 26 Q40 34 32 36" stroke={green} strokeWidth="3" strokeLinecap="round" fill="none"/>
        {/* Leaf */}
        <path d="M30 10 C30 10 26 8 24 12 C22 16 26 18 30 16 C34 14 34 10 30 10Z" fill={green}/>
        {/* Small leaf 2 */}
        <path d="M36 8 C36 8 33 7 32 10 C31 13 33 14 36 12 C38 10 38 8 36 8Z" fill={green} opacity="0.7"/>
        {/* Cart wheels */}
        <circle cx="17" cy="42" r="3" fill={blue}/>
        <circle cx="33" cy="42" r="3" fill={blue}/>
        {/* Shopping bag in cart */}
        <rect x="22" y="18" width="10" height="12" rx="2" fill={blue} opacity="0.6"/>
        <path d="M25 18 C25 16 27 15 27 15 C27 15 29 16 29 18" stroke={blue} strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      </svg>

      <div className="leading-tight">
        <div
          className={`font-bold ${textSize} leading-none`}
          style={{ fontFamily: "Montserrat, sans-serif", color: blue, letterSpacing: "-0.02em" }}
        >
          ABDUL&apos;S
        </div>
        <div
          className="text-xs font-semibold leading-none mt-0.5"
          style={{ fontFamily: "Montserrat, sans-serif", color: blue, letterSpacing: "0.05em" }}
        >
          ENTERPRISE
        </div>
        <div
          className="text-xs font-bold leading-none mt-0.5"
          style={{ fontFamily: "Montserrat, sans-serif", color: green, letterSpacing: "0.1em" }}
        >
          SUPERMARKET
        </div>
      </div>
    </div>
  );
}
