import { GestureRecognizer, FilesetResolver } from "@mediapipe/tasks-vision";

let gestureRecognizer = null;

export async function initGestureRecognizer() {
    if (gestureRecognizer) return gestureRecognizer; // singleton — don't re-init

    const vision = await FilesetResolver.forVisionTasks("/tasks-vision/wasm");

    gestureRecognizer = await GestureRecognizer.createFromOptions(vision, {
        baseOptions: {
            modelAssetPath: "/gesture_recognizer.task",
        },
        numHands: 2,
    });

    await gestureRecognizer.setOptions({ runningMode: "video", numHands: 2 });

    return gestureRecognizer;
}