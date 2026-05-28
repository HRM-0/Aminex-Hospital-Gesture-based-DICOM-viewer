import { useEffect, useRef } from "react";

// Map MediaPipe gesture names to actions
const GESTURE_ACTIONS = {
    Thumb_Up: { type: "discrete", action: "NEXT_IMAGE", dwellMs: 1000 },
    Thumb_Down: { type: "discrete", action: "PREV_IMAGE", dwellMs: 1000 },
    Victory: { type: "discrete", action: "RESET_VIEWPORT", dwellMs: 2000 },
    Closed_Fist: { type: "discrete", action: "ACTIVATE_ZOOM", dwellMs: 2000 },
    Open_Palm: { type: "discrete", action: "ACTIVATE_PAN", dwellMs: 2000 },
    Pointing_Up: { type: "continuous", action: "SCROLL_STACK", dwellMs: 0 },
};

export function useGestureMapper({ gestureResult, viewport }) {
    const dwellTimerRef = useRef(null);
    const lastGestureRef = useRef(null);
    const cooldownRef = useRef(false); // prevents re-firing while gesture is held

    useEffect(() => {
        // Pull the dominant hand's gesture (first hand detected)
        const currentGesture = gestureResult?.gestures?.[0]?.[0]?.categoryName;

        if (!currentGesture || currentGesture === "None") {
            clearTimeout(dwellTimerRef.current);
            lastGestureRef.current = null;
            cooldownRef.current = false;
            return;
        }

        const config = GESTURE_ACTIONS[currentGesture];
        if (!config) return;

        // Gesture changed — reset everything
        if (currentGesture !== lastGestureRef.current) {
            clearTimeout(dwellTimerRef.current);
            cooldownRef.current = false;
            lastGestureRef.current = currentGesture;

            if (config.type === "continuous") {
                // Continuous gestures fire immediately and keep firing
                executeAction(config.action, viewport);
                return;
            }

            // Start dwell timer for discrete gestures
            dwellTimerRef.current = setTimeout(() => {
                if (!cooldownRef.current) {
                    executeAction(config.action, viewport);
                    cooldownRef.current = true; // lock until gesture changes
                }
            }, config.dwellMs);
        }

        // Gesture unchanged + continuous = keep firing on every frame
        if (config.type === "continuous" && !cooldownRef.current) {
            executeAction(config.action, viewport);
        }
    }, [gestureResult, viewport]);

    // Cleanup on unmount
    useEffect(() => () => clearTimeout(dwellTimerRef.current), []);
}

function executeAction(action, viewport) {
    if (!viewport) return;

    switch (action) {
        case "NEXT_IMAGE":
            {
                const current = viewport.getCurrentImageIdIndex();
                const total = viewport.getImageIds().length;
                if (current < total - 1) viewport.setImageIdIndex(current + 1);
                break;
            }
        case "PREV_IMAGE":
            {
                const current = viewport.getCurrentImageIdIndex();
                if (current > 0) viewport.setImageIdIndex(current - 1);
                break;
            }
        case "RESET_VIEWPORT":
            {
                viewport.resetCamera();
                viewport.render();
                break;
            }
        case "ACTIVATE_ZOOM":
            {
                // Toggle Cornerstone zoom tool here
                console.log("Zoom mode activated");
                break;
            }
        case "ACTIVATE_PAN":
            {
                // Toggle Cornerstone pan tool here
                console.log("Pan mode activated");
                break;
            }
        case "SCROLL_STACK":
            {
                const current = viewport.getCurrentImageIdIndex();
                const total = viewport.getImageIds().length;
                if (current < total - 1) viewport.setImageIdIndex(current + 1);
                break;
            }
        default:
            break;
    }
}