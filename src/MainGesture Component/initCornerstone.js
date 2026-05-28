import { init as coreInit } from '@cornerstonejs/core';
import cornerstoneDICOMImageLoader from '@cornerstonejs/dicom-image-loader';
import { init as toolsInit } from '@cornerstonejs/tools';
import dicomParser from 'dicom-parser';

let initialized = false;

export async function initCornerstone() {
    if (initialized) return;
    initialized = true;

    await coreInit();

    cornerstoneDICOMImageLoader.external.dicomParser = dicomParser;
    cornerstoneDICOMImageLoader.configure({ maxWebWorkers: 1 });

    toolsInit();
}