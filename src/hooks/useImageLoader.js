import { useState, useEffect } from "react";

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = function () {
      resolve(image);
    };
    image.onerror = image.onabort = function () {
      reject(src);
    };
    image.src = src;
  });
}

export function useImageLoader(characters) {
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const images = characters.map((char) => char.imageSrc);

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
  }, [characters]);

  return imagesLoaded;
}
