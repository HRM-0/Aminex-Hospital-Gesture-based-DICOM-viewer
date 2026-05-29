import { useEffect, useRef } from "react";

// ─── Gesture → action map (keyed by hand side) ───────────────────────────────
//
//  type "discrete"   → fires ONCE after the gesture is held for dwellMs.
//                      cooldown prevents re-fire until the gesture changes.
//  type "continuous" → fires repeatedly while held, throttled to intervalMs.
//
const GESTURE_ACTIONS = {
    Right: {
        Thumb_Up:    { type: "discrete",   action: "NEXT_IMAGE",   dwellMs:  1000 },
        Thumb_Down:  { type: "discrete",   action: "PREV_IMAGE",   dwellMs:  1000 },
        Pointing_Up: { type: "continuous", action: "SCROLL_STACK", intervalMs: 400 },
        Victory:     { type: "discrete",   action: "RESET",        dwellMs:  2000 },
        Closed_Fist: { type: "continuous", action: "ZOOM_IN",      intervalMs:  80 },
        Open_Palm:   { type: "continuous", action: "ZOOM_OUT",     intervalMs:  80 },
        ILoveYou:    { type: "discrete",   action: "INVERT",       dwellMs:  2000 },
    },
    Left: {
        Thumb_Up:    { type: "discrete",   action: "ROTATE_CW",    dwellMs:  1500 },
        Thumb_Down:  { type: "discrete",   action: "ROTATE_CCW",   dwellMs:  1500 },
        Victory:     { type: "discrete",   action: "COLORMAP",     dwellMs:  2000 },
        Closed_Fist: { type: "discrete",   action: "FLIP_H",       dwellMs:  2000 },
        Open_Palm:   { type: "discrete",   action: "FLIP_V",       dwellMs:  2000 },
    },
};

// ─── Action executor ─────────────────────────────────────────────────────────
function executeAction(action, viewport) {
    if (!viewport) return;

    switch (action) {
        case "NEXT_IMAGE":
        case "SCROLL_STACK": {
            const idx   = viewport.getCurrentImageIdIndex();
            const total = viewport.getImageIds().length;
            if (idx < total - 1) {
                viewport.setImageIdIndex(idx + 1);
                viewport.render();
            }
            break;
        }
        case "PREV_IMAGE": {
            const idx = viewport.getCurrentImageIdIndex();
            if (idx > 0) {
                viewport.setImageIdIndex(idx - 1);
                viewport.render();
            }
            break;
        }
        case "ROTATE_CW": {
            const { rotation = 0 } = viewport.getViewPresentation();
            viewport.setViewPresentation({ rotation: rotation + 90 });
            viewport.render();
            break;
        }
        case "ROTATE_CCW": {
            const { rotation = 0 } = viewport.getViewPresentation();
            viewport.setViewPresentation({ rotation: rotation - 90 });
            viewport.render();
            break;
        }
        case "FLIP_H": {
            const { flipHorizontal } = viewport.getCamera();
            viewport.setCamera({ flipHorizontal: !flipHorizontal });
            viewport.render();
            break;
        }
        case "FLIP_V": {
            const { flipVertical } = viewport.getCamera();
            viewport.setCamera({ flipVertical: !flipVertical });
            viewport.render();
            break;
        }
        case "ZOOM_IN": {
            // In Cornerstone STACK viewports, smaller parallelScale = more zoomed in.
            const { parallelScale } = viewport.getCamera();
            viewport.setCamera({ parallelScale: parallelScale * 0.93 });
            viewport.render();
            break;
        }
        case "ZOOM_OUT": {
            const { parallelScale } = viewport.getCamera();
            viewport.setCamera({ parallelScale: parallelScale * 1.07 });
            viewport.render();
            break;
        }
        case "RESET": {
            viewport.resetCamera();
            viewport.resetProperties();
            viewport.render();
            break;
        }
        case "INVERT": {
            const { invert } = viewport.getProperties();
            viewport.setProperties({ invert: !invert });
            viewport.render();
            break;
        }
        case "COLORMAP": {
            const { colormap } = viewport.getProperties();
            viewport.setProperties({
                colormap: colormap?.name ? undefined : { name: "hotIron" },
            });
            viewport.render();
            break;
        }
        default:
            break;
    }
}

// ─── Per-hand state processor ─────────────────────────────────────────────────
//
//  stateRef.current holds mutable fields that must survive re-renders without
//  triggering them:
//    dwellTimer  – setTimeout ID for discrete gestures
//    lastGesture – name of the gesture seen in the previous frame
//    cooldown    – true after a discrete action fires; cleared on gesture change
//    lastFiredAt – Date.now() of the last continuous fire (throttle)
//
function processHand(side, gesture, stateRef, viewport) {
    const s       = stateRef.current;
    const actions = GESTURE_ACTIONS[side];

    // Hand left the frame — clear everything
    if (!gesture || gesture === "None") {
        clearTimeout(s.dwellTimer);
        s.dwellTimer  = null;
        s.lastGesture = null;
        s.cooldown    = false;
        s.lastFiredAt = 0;
        return;
    }

    const config = actions?.[gesture];
    if (!config) return;

    // Gesture changed — reset and arm
    if (gesture !== s.lastGesture) {
        clearTimeout(s.dwellTimer);
        s.dwellTimer  = null;
        s.cooldown    = false;
        s.lastGesture = gesture;
        s.lastFiredAt = 0;

        if (config.type === "discrete") {
            s.dwellTimer = setTimeout(() => {
                if (!s.cooldown) {
                    executeAction(config.action, viewport);
                    s.cooldown = true; // prevent re-fire while gesture is held
                }
            }, config.dwellMs);
        }
        // continuous gestures start firing on the next frame (handled below)
        return;
    }

    // Same gesture still held — throttle continuous actions
    if (config.type === "continuous") {
        const now = Date.now();
        if (now - s.lastFiredAt >= config.intervalMs) {
            executeAction(config.action, viewport);
            s.lastFiredAt = now;
        }
    }
}

// ─── Hook ────────────────────────────────────────────────────────────────────
export function useGestureMapper({ gestureResult, viewport }) {
    const rightState = useRef({ dwellTimer: null, lastGesture: null, cooldown: false, lastFiredAt: 0 });
    const leftState  = useRef({ dwellTimer: null, lastGesture: null, cooldown: false, lastFiredAt: 0 });

    useEffect(() => {
        let rightGesture = null;
        let leftGesture  = null;

        gestureResult?.handednesses?.forEach((handednessArr, i) => {
            const side    = handednessArr[0]?.categoryName;          // "Left" | "Right"
            const gesture = gestureResult.gestures[i]?.[0]?.categoryName;
            if (side === "Right") rightGesture = gesture;
            else if (side === "Left")  leftGesture  = gesture;
        });

        processHand("Right", rightGesture, rightState, viewport);
        processHand("Left",  leftGesture,  leftState,  viewport);
    }, [gestureResult, viewport]);

    // Cleanup on unmount
    useEffect(() => () => {
        clearTimeout(rightState.current.dwellTimer);
        clearTimeout(leftState.current.dwellTimer);
    }, []);
}