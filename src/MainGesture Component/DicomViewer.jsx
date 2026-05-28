import * as cornerstone from "@cornerstonejs/core";
import dicomImageLoader from "@cornerstonejs/dicom-image-loader";

// ✅ IMPORTANT: initialize cornerstone
await cornerstone.init();

// ✅ Initialize dicom loader properly
await dicomImageLoader.init();

// Now use normally
const { RenderingEngine, Enums } = cornerstone;

export async function loadAndDisplayDicom() {
  const element = document.getElementById("xray-placeholder");

  if (!element) {
    console.error("Element not found");
    return;
  }

  const renderingEngine = new RenderingEngine("engine1");

  const viewportId = "viewport1";

  renderingEngine.enableElement({
    viewportId,
    element,
    type: Enums.ViewportType.STACK,
  });

  const viewport = renderingEngine.getViewport(viewportId);

  // 👇 This still stays the same
  const imageId = "wadouri:/CT_small.dcm";

  await viewport.setStack([imageId]);
  viewport.render();
}