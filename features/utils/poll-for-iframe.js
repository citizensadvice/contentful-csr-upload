/**
 * Searches through the frame tree of either a page or a frame object
 * until it finds an iframe with a matching partial url
 *
 * @param {Page | Frame} container
 * @param {string} partialFrameUrlString
 * @returns {Frame | null}
 * @example const frame = await pollForIframe(page, '/my-frame/api');
 */

const pollForIframe = async (container, partialFrameUrlString) => {
  let frame = null;

  const containerType = container.frames
    ? "page"
    : container.childFrames
      ? "frame"
      : null;

  if (!containerType) return null;

  for (let i = 0; i < 20; i++) {
    if (containerType === "page") {
      frame = container
        .frames()
        .find((f) => f.url().includes(partialFrameUrlString));
    } else if (containerType === "frame") {
      frame = container
        .childFrames()
        .find((f) => f.url().includes(partialFrameUrlString));
    }

    if (frame) {
      return frame;
    }

    await container.waitForTimeout(500);
  }

  return null;
};

export default pollForIframe;
