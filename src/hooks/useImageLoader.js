import { useEffect } from "react";

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = function () {
      resolve(img);
    };
    image.onerror = image.onabort = function () {
      reject(src);
    };
    image.src = src;
  });
}

export function useImageLoader(images) {
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      if (cancelled) {
        return;
      }

      const imagePromises = [];
      for (const image of images) {
        imagePromises.push(loadImage(image));
      }

      await Promise.all(imagePromises);

      if (cancelled) {
        return;
      }

      setImagesLoaded(true);
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [images]);

  return imagesLoaded;
}
