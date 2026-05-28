import React, { useCallback, useEffect, useState } from "react";
import { initGestureRecognizer } from "./gestureSetup";

const defaultHandCategory = { score: 0, index: 0, categoryName: "", displayName: "" };
const defaultHand = [
    [defaultHandCategory],
    [defaultHandCategory]
];

const defaultGestureResult = {
    gestures: { gestures: defaultHand, handedness: defaultHand, handednesses: defaultHand },
};

export function useGestureRecognizer() {
    const [gestureResultObject, setGestureResultObject] = useState(defaultGestureResult);
    const lastVideoTimeRef = React.useRef(-1);
    const recognizerRef = React.useRef(null);

    useEffect(() => {
        initGestureRecognizer().then((r) => (recognizerRef.current = r));
    }, []);

    const renderLoop = useCallback(() => {
        const video = document.getElementById("video");

        if (video && video.currentTime !== lastVideoTimeRef.current && recognizerRef.current) {
            const now = performance.now();
            const result = recognizerRef.current.recognizeForVideo(video, now);
            setGestureResultObject(result);
            lastVideoTimeRef.current = video.currentTime;
        }

        requestAnimationFrame(renderLoop);
    }, []);

    useEffect(() => {
        const video = document.getElementById("video");
        if (!video) return;

        const waitForVideo = () => {
            if (video.readyState >= 2) {
                renderLoop();
            } else {
                requestAnimationFrame(waitForVideo);
            }
        };

        waitForVideo();
    }, [renderLoop]);

    return gestureResultObject;
}