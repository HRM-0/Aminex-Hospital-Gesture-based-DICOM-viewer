export default function MobileGate() {
  return (
    <div className="mobile-gate" aria-hidden="true">
      <div className="mob-card">
        <div className="mob-icon-wrap">
          <svg
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#ff4444"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="5" y="2" width="14" height="20" rx="2" />
            <line x1="12" y1="18" x2="12.01" y2="18" strokeWidth="2.5" />
          </svg>
        </div>
        <div className="mob-title">Desktop Required</div>
        <div className="mob-body">
          The <strong>Aminex Medical Image Viewer</strong> is designed for
          desktop and laptop environments. Gesture controls, image rendering,
          and clinical diagnostics require a larger display and precise input.
        </div>
        <div className="mob-chips">
          <div className="mob-chip">
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="3" width="20" height="14" rx="2" />
              <line x1="8" y1="21" x2="16" y2="21" />
              <line x1="12" y1="17" x2="12" y2="21" />
            </svg>{" "}
            Desktop
          </div>
          <div className="mob-chip">
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="M8 20h8M12 16v4" />
            </svg>{" "}
            Laptop
          </div>
        </div>
      </div>
    </div>
  );
}
