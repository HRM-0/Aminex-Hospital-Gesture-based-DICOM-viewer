import React, { useState, useContext } from "react";
import { LoadingContext } from "./LoadingContext.jsx";
import "./HelpPanel.css";

const GESTURE_ACTIONS = {
  Right: {
    Thumb_Up: { type: "discrete", action: "NEXT_IMAGE", dwellMs: 1000 },
    Thumb_Down: { type: "discrete", action: "PREV_IMAGE", dwellMs: 1000 },
    Pointing_Up: {
      type: "continuous",
      action: "SCROLL_STACK",
      intervalMs: 400,
    },
    Victory: { type: "discrete", action: "RESET", dwellMs: 2000 },
    Closed_Fist: { type: "continuous", action: "ZOOM_IN", intervalMs: 80 },
    Open_Palm: { type: "continuous", action: "ZOOM_OUT", intervalMs: 80 },
    ILoveYou: { type: "discrete", action: "INVERT", dwellMs: 2000 },
  },
  Left: {
    Thumb_Up: { type: "discrete", action: "ROTATE_CW", dwellMs: 1500 },
    Thumb_Down: { type: "discrete", action: "ROTATE_CCW", dwellMs: 1500 },
    Victory: { type: "discrete", action: "COLORMAP", dwellMs: 2000 },
    Closed_Fist: { type: "discrete", action: "FLIP_H", dwellMs: 2000 },
    Open_Palm: { type: "discrete", action: "FLIP_V", dwellMs: 2000 },
  },
};

const GESTURE_EMOJIS = {
  Thumb_Up: "👍",
  Thumb_Down: "👎",
  Pointing_Up: "☝️",
  Victory: "✌️",
  Closed_Fist: "✊",
  Open_Palm: "🖐️",
  ILoveYou: "🤟",
};

export default function HelpPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoading } = useContext(LoadingContext);

  // Show modal if user opened it OR if we're loading
  const shouldShowModal = isOpen || isLoading;

  const toggleHelp = () => setIsOpen(!isOpen);
  const closeHelp = () => {
    // Only close if not loading
    if (!isLoading) {
      setIsOpen(false);
    }
  };

  return (
    <>
      <button
        onClick={toggleHelp}
        title="Show gesture controls"
        className="tool-btn"
      >
        <svg
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
        Help
      </button>

      {/* Help Modal Overlay */}
      {shouldShowModal && (
        <div className="help-gate" onClick={closeHelp}>
          <div className="help-modal" onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className="help-header">
              <h2 className="help-title">Gesture Controls</h2>
              <button
                className="help-close-icon"
                onClick={closeHelp}
                aria-label="Close help"
                disabled={isLoading}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="help-content">
              {/* Loading Indicator Banner (only during loading) */}
              {isLoading && (
                <div className="loading-banner">
                  <div className="spinner-small"></div>
                  <p className="loading-banner-message">
                    While we are getting things ready:
                  </p>
                </div>
              )}

              {/* Gesture Controls Table */}
              <section className="help-table-section">
                <table className="gesture-table">
                  <thead>
                    <tr>
                      <th>
                        <div className="column-header">
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M6 11V6a2 2 0 012-2 2 2 0 012 2v0M10 10V4a2 2 0 012-2 2 2 0 012 2v0M14 10.5V6a2 2 0 012-2 2 2 0 012 2v8l1-1a2 2 0 012.73.73l.22.38a2 2 0 00-.55 2.59L17 21H8a2 2 0 00-1.73-1l-1-1.73A2 2 0 005 17v-6a2 2 0 001-1.73z" />
                          </svg>
                          Left Hand
                        </div>
                      </th>
                      <th>
                        <div className="column-header">
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M18 11V6a2 2 0 00-2-2 2 2 0 00-2 2v0M14 10V4a2 2 0 00-2-2 2 2 0 00-2 2v0M10 10.5V6a2 2 0 00-2-2 2 2 0 00-2 2v8l-1-1a2 2 0 00-2.73.73l-.22.38a2 2 0 00.55 2.59L7 21h9a2 2 0 001.73-1l1-1.73A2 2 0 0019 17v-6a2 2 0 00-1-1.73z" />
                          </svg>
                          Right Hand
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.from({
                      length: Math.max(
                        Object.keys(GESTURE_ACTIONS.Left).length,
                        Object.keys(GESTURE_ACTIONS.Right).length,
                      ),
                    }).map((_, i) => {
                      const leftEntries = Object.entries(GESTURE_ACTIONS.Left);
                      const rightEntries = Object.entries(
                        GESTURE_ACTIONS.Right,
                      );
                      const leftGesture = leftEntries[i];
                      const rightGesture = rightEntries[i];

                      return (
                        <tr key={i}>
                          {/* Left Hand Column */}
                          <td>
                            {leftGesture ? (
                              <div className="gesture-row">
                                <div className="gesture-emoji">
                                  {GESTURE_EMOJIS[leftGesture[0]]}
                                </div>
                                <div className="gesture-cell-info">
                                  <div className="gesture-action">
                                    {leftGesture[1].action}
                                  </div>
                                  <div className="gesture-meta">
                                    {leftGesture[1].type === "discrete"
                                      ? `${leftGesture[1].dwellMs}ms`
                                      : "Continuous"}
                                  </div>
                                </div>
                              </div>
                            ) : null}
                          </td>

                          {/* Right Hand Column */}
                          <td>
                            {rightGesture ? (
                              <div className="gesture-row">
                                <div className="gesture-emoji">
                                  {GESTURE_EMOJIS[rightGesture[0]]}
                                </div>
                                <div className="gesture-cell-info">
                                  <div className="gesture-action">
                                    {rightGesture[1].action}
                                  </div>
                                  <div className="gesture-meta">
                                    {rightGesture[1].type === "discrete"
                                      ? `${rightGesture[1].dwellMs}ms`
                                      : "Continuous"}
                                  </div>
                                </div>
                              </div>
                            ) : null}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </section>

              {/* Quick Tips */}
              <section className="help-tips-section">
                <div className="tips-title">💡 Pro Tips</div>
                <ul className="tips-list">
                  <li>Good lighting improves detection accuracy</li>
                  <li>Keep hands 30-60cm from camera for best results</li>
                  <li>Discrete gestures require steady hand position</li>
                  <li>Use toolbar for one-click precise actions</li>
                </ul>
              </section>
            </div>

            {/* Footer */}
            <div className="help-divider"></div>
            <div className="help-footer">
              <button
                className="help-close-btn"
                onClick={closeHelp}
                disabled={isLoading}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
