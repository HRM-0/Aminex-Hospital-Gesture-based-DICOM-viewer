import { useEffect, useRef, useState } from "react";
import { init as coreInit, RenderingEngine, Enums } from "@cornerstonejs/core";
import { init as dicomImageLoaderInit } from "@cornerstonejs/dicom-image-loader";
import { getDicomInfo } from "./dicomParser.util";
import { dicomPublicLocation } from "./dicomPublicLocation";
import { useGestureMapper } from "./useGestureMapper";  

const imageId = `wadouri:/${dicomPublicLocation}`;

export const RENDERING_ENGINE_ID = "my-engine";
export const VIEWPORT_ID = "my-viewport";

let initPromise = null;
const initCornerstone = () => {
  if (!initPromise) {
    initPromise = Promise.all([
      coreInit(),
      dicomImageLoaderInit({
        maxWebWorkers: navigator.hardwareConcurrency || 1,
        startWebWorkersOnDemand: true,
        taskConfiguration: {
          decodeTask: { initializeCodecsOnStartup: true },
        },
      }),
    ]);
  }
  return initPromise;
};

export default function Xray({ gestures }) { 
  const elementRef = useRef(null);
  const engineRef = useRef(null);
  
  // 1. CHANGE: Use state instead of a ref so changes trigger a re-render
  const [viewport, setViewport] = useState(null); 
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    initCornerstone()
      .then(() => setIsInitialized(true))
      .catch((err) =>
        console.error("Cornerstone core initialization failed:", err),
      );
  }, []);

  useEffect(() => {
    if (!isInitialized || !elementRef.current) return;

    const element = elementRef.current;
    let isCancelled = false;

    const setup = async () => {
      try {
        if (engineRef.current) return;

        const renderingEngine = new RenderingEngine(RENDERING_ENGINE_ID);
        engineRef.current = renderingEngine;

        renderingEngine.enableElement({
          viewportId: VIEWPORT_ID,
          type: Enums.ViewportType.STACK,
          element,
          defaultOptions: { background: [0, 0, 0] },
        });

        const activeViewport = renderingEngine.getViewport(VIEWPORT_ID);
        
        if (isCancelled) return;
        
        // 2. CHANGE: Set state here. This informs React (and your hook) that it's ready.
        setViewport(activeViewport); 

        console.log("Viewport ready. Loading stack for image ID:", imageId);

        const response = await fetch(dicomPublicLocation);
        if (isCancelled) return;

        if (!response.ok) {
          throw new Error(`Failed to fetch DICOM file: ${response.statusText}`);
        }

        const dicomInfo = await getDicomInfo(dicomPublicLocation);
        console.log(dicomInfo.totalFrames.value);

        const multiFrameImageIds = Array.from(
          { length: dicomInfo.totalFrames.value },
          (_, index) => `${imageId}?frame=${index}`,
        );

        await activeViewport.setStack(multiFrameImageIds, 2);
        if (isCancelled) return;

        activeViewport.render();
        console.log("Render completed successfully!");
      } catch (err) {
        if (!isCancelled) {
          console.error("CORNERSTONE SETUP FAILED:", err);
        }
      }
    };

    setup();

    return () => {
      isCancelled = true;
      
      // 3. CHANGE: Clear the viewport state on cleanup
      setViewport(null); 
      
      if (engineRef.current) {
        try {
          engineRef.current.disableElement(VIEWPORT_ID);
          engineRef.current.destroy();
        } catch (e) {
          console.error("Error during engine destruction:", e);
        }
        engineRef.current = null;
      }
    };
  }, [isInitialized]);

  // 4. CHANGE: Pass the reactive state value directly to the hook
  useGestureMapper({
    gestureResult: gestures,
    viewport: viewport,
  });

  return (
    <div
      ref={elementRef}
      style={{ width: "512px", height: "512px", background: "#000" }}
    />
  );
}