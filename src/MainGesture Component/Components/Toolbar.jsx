import React from "react";
import { getRenderingEngine } from "@cornerstonejs/core";
// 1. IMPORT the correct shared IDs from Xray
import { RENDERING_ENGINE_ID, VIEWPORT_ID } from "./Xray";

export default function Toolbar() {
  // Helper to safely fetch the viewport instance from the global cache
  const getViewport = () => {
    const renderingEngine = getRenderingEngine(RENDERING_ENGINE_ID);
    return renderingEngine?.getViewport(VIEWPORT_ID);
  };

  // 2. PAGINATION: Move to Next Image/Slice
  const handleNext = () => {
    const viewport = getViewport();
    if (!viewport) return;

    const currentIndex = viewport.getCurrentImageIdIndex();
    const imageIds = viewport.getImageIds();

    if (currentIndex < imageIds.length - 1) {
      viewport.setImageIdIndex(currentIndex + 1);
      viewport.render();
      console.log(`Moved to image index: ${currentIndex + 1}`);
    } else {
      console.log("Already at the last image");
    }
  };

  // 3. PAGINATION: Move to Previous Image/Slice
  const handlePrevious = () => {
    const viewport = getViewport();
    if (!viewport) return;

    const currentIndex = viewport.getCurrentImageIdIndex();

    if (currentIndex > 0) {
      viewport.setImageIdIndex(currentIndex - 1);
      viewport.render();
      console.log(`Moved to image index: ${currentIndex - 1}`);
    } else {
      console.log("Already at the first image");
    }
  };

  // 4. SPATIAL: Rotate 90 degrees via CAMERA API
  const handleRotate = () => {
    const viewport = getViewport();
    if (!viewport) return;

    // Pull properties safely (default to 0 if undefined)
    const rotation = viewport.getViewPresentation().rotation || 0;

    viewport.setViewPresentation({
      rotation: rotation + 90,
    });

    viewport.render();
  };

  // 5. SPATIAL: Flip Horizontally via CAMERA API
  const handleFlipH = () => {
    const viewport = getViewport();
    if (!viewport) return;

    const { flipHorizontal } = viewport.getCamera();

    viewport.setCamera({ flipHorizontal: !flipHorizontal });
    viewport.render();
    console.log("Flipped horizontally");
  };

  // 6. SPATIAL: Flip Vertically via CAMERA API
  const handleFlipV = () => {
    const viewport = getViewport();
    if (!viewport) return;

    const { flipVertical } = viewport.getCamera();

    viewport.setCamera({ flipVertical: !flipVertical });
    viewport.render();
    console.log("Flipped vertically");
  };

  // 7. COLOR: Toggle Colormap (False-color vs Grayscale)
const handleCmap = () => {
  const viewport = getViewport();
  if (!viewport) return;

  const properties = viewport.getProperties();

  // Check current colormap
  const currentColormap = properties.colormap?.name;

  if (currentColormap) {
    // Remove colormap (back to grayscale)
    viewport.setProperties({
      colormap: undefined,
    });

    console.log("Colormap removed");
  } else {
    // Apply colormap
    viewport.setProperties({
      colormap: {
        name: "hotIron",
      },
    });

    console.log("hotIron colormap applied");
  }

  viewport.render();
};

  // 8. COLOR: Invert Grayscale
  const handleInvert = () => {
    const viewport = getViewport();
    if (!viewport) return;

    const { invert } = viewport.getProperties();
    viewport.setProperties({ invert: !invert });
    viewport.render();
  };

  // 9. SYSTEM: Reset Camera and Properties
  const handleReset = () => {
    const viewport = getViewport();
    if (!viewport) return;

    viewport.resetCamera(); // Restores pan, zoom, rotations, and flips
    viewport.resetProperties(); // Restores original window/level, invert, colormaps
    viewport.render();
    console.log("Viewport reset completed");
  };

  return (
    <div className="toolbar">
      <button className="tool-btn" onClick={handleNext}>
        <svg
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 8 16 12 12 16" />
          <line x1="8" y1="12" x2="16" y2="12" />
        </svg>
        Next
      </button>

      <button className="tool-btn" onClick={handlePrevious}>
        <svg
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 8 8 12 12 16" />
          <line x1="16" y1="12" x2="8" y2="12" />
        </svg>
        Previous
      </button>

      <button className="tool-btn" onClick={handleRotate}>
        <svg
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <polyline points="1 4 1 10 7 10" />
          <path d="M3.51 15a9 9 0 102.13-9.36L1 10" />
        </svg>
        Rotate
      </button>

      <button className="tool-btn" onClick={handleFlipV}>
        <svg
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <polyline points="17 1 17 23" />
          <path d="M21 5l-4-4-4 4" />
          <path d="M21 19l-4 4-4-4" />
        </svg>
        Flip V
      </button>

      <button className="tool-btn" onClick={handleFlipH}>
        <svg
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <polyline points="1 7 23 7" />
          <path d="M5 3l-4 4 4 4" />
          <path d="M19 3l4 4-4 4" />
        </svg>
        Flip H
      </button>

      <button className="tool-btn" onClick={handleCmap}>
        <svg
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M3 9h18M9 21V9" />
        </svg>
        C map
      </button>

      <button className="tool-btn" onClick={handleReset}>
        <svg
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <polyline points="1 4 1 10 7 10" />
          <polyline points="23 20 23 14 17 14" />
          <path d="M20.49 9A9 9 0 005.64 5.64L1 10M23 14l-4.64 4.36A9 9 0 013.51 15" />
        </svg>
        Reset
      </button>

      <button className="tool-btn" onClick={handleInvert}>
        <svg
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="3" />
        </svg>
        Invert
      </button>

      <button className="tool-btn lock-btn">
        <svg
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0110 0v4" />
        </svg>
        Lock
      </button>

      <button className="tool-btn">
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
    </div>
  );
}
