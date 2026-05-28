import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const HospitalIcon = ({ size = 20, color = "#22c55e" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 448 512"
    fill={color}
  >
    <path d="M448 492v20H0v-20c0-6.627 5.373-12 12-12h20V120c0-13.255 10.745-24 24-24h88V24C144 10.745 154.745 0 168 0h112c13.255 0 24 10.745 24 24v72h88c13.255 0 24 10.745 24 24v360h20c6.627 0 12 5.373 12 12zM308 192h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12v-40c0-6.627-5.373-12-12-12zm-168 64h40c6.627 0 12-5.373 12-12v-40c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12zm104 128h-40c-6.627 0-12 5.373-12 12v84h64v-84c0-6.627-5.373-12-12-12zm64-96h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12v-40c0-6.627-5.373-12-12-12zm-116 12c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12v-40zM182 96h26v26a6 6 0 0 0 6 6h20a6 6 0 0 0 6-6V96h26a6 6 0 0 0 6-6V70a6 6 0 0 0-6-6h-26V38a6 6 0 0 0-6-6h-20a6 6 0 0 0-6 6v26h-26a6 6 0 0 0-6 6v20a6 6 0 0 0 6 6z" />
  </svg>
);

/* ECG path: normal beat → flatline */
const ECG_PATH =
  "M0,30 L30,30 L38,30 L42,8 L48,52 L54,12 L58,30 L70,30 L78,30 L82,30 L86,30 L160,30 L300,30";

export default function AminexNotFound() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 60);
    return () => clearTimeout(t);
  }, []);

  const fadeIn = (delay = 0) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(16px)",
    transition: `opacity 0.55s ease ${delay}s, transform 0.55s ease ${delay}s`,
  });

  return (
    <div
      style={{
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
        WebkitFontSmoothing: "antialiased",
        minHeight: "100vh",
        background: "#0a0e12",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap');

        .back-btn {
          transition: background 0.2s, transform 0.15s, opacity 0.2s;
        }
        .back-btn:hover {
          background: #1aab4e !important;
        }
        .back-btn:active {
          transform: scale(0.97);
        }

        .ghost-btn {
          transition: background 0.2s, border-color 0.2s;
        }
        .ghost-btn:hover {
          background: rgba(34,197,94,0.06) !important;
          border-color: rgba(34,197,94,0.35) !important;
        }
      `}</style>

      {/* ── Main content ── */}
      <main
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "3rem 1.5rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            maxWidth: 540,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: "clamp(6rem, 20vw, 9rem)",
              fontWeight: 600,
              color: "#fff",
              lineHeight: 1,
              letterSpacing: "-0.04em",
              marginBottom: "2rem",
              fontVariantNumeric: "tabular-nums",
              ...fadeIn(0.2),
            }}
          >
            <span style={{ color: "#22c55e" }}>4</span>
            <span>0</span>
            <span style={{ color: "#22c55e" }}>4</span>
          </div>
          <h1
            style={{
              fontSize: "1.3rem",
              fontWeight: 600,
              color: "#fff",
              letterSpacing: "-0.02em",
              marginBottom: "1rem",
              ...fadeIn(0.45),
            }}
          >
            Page Not Found
          </h1>

          {/* ── Action buttons ── */}
          <div
            style={{
              display: "flex",
              gap: 12,
              flexWrap: "wrap",
              justifyContent: "center",
              ...fadeIn(0.65),
            }}
          > <Link to={"/"}>
            <button
              className="back-btn"
              style={{
                height: 42,
                padding: "0 24px",
                background: "#22c55e",
                border: "none",
                borderRadius: 7,
                color: "#0a1a0f",
                fontFamily: "inherit",
                fontSize: "0.85rem",
                fontWeight: 600,
                letterSpacing: "0.03em",
                cursor: "pointer",
              }}
            >
               Home
            </button> </Link>
            <button
              className="ghost-btn"
              onClick={() => window.history.back()}
              style={{
                height: 42,
                padding: "0 24px",
                background: "transparent",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 7,
                color: "rgba(255,255,255,0.55)",
                fontFamily: "inherit",
                fontSize: "0.85rem",
                fontWeight: 500,
                cursor: "pointer",
              }}
            >
              ← Go Back
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
