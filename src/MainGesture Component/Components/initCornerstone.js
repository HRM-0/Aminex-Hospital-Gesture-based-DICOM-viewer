import { init as coreInit, setUseCPURendering } from '@cornerstonejs/core';
import * as cornerstoneDICOMImageLoader from '@cornerstonejs/dicom-image-loader';
import { init as toolsInit } from '@cornerstonejs/tools';

let initialized = false;

export async function initCornerstone() {
    if (initialized) return;
    initialized = true;

    // Force CPU rendering to avoid WebGL context conflict with MediaPipe
    setUseCPURendering(true);

    await coreInit();
    await cornerstoneDICOMImageLoader.init({ maxWebWorkers: 1 });
    toolsInit();
}