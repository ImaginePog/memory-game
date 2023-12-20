// React imports
import { useEffect, useState } from "react";

// Utils

// Styles
import "../styles/Loader.css";

// Gifs to use
const loaderGIFS = [
  { src: "https://i.giphy.com/mbSaWNqVtxgcM.webp", name: "pikachu" },
  { src: "https://i.giphy.com/2cehgMhmxSp0LFKAws.webp", name: "morty" },
  { src: "https://i.giphy.com/kTHH8wDg1Cmcw.webp", name: "doggo" },
];

export default function Loader({ children, fontSize = 80 }) {
  const [gif, setGIF] = useState({ src: "", name: "" });
  useEffect(() => {
    let ignore;
    if (!ignore) {
      setGIF(loaderGIFS[Math.floor(Math.random() * loaderGIFS.length)]);
    }
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <div className={`loader-container ${gif.name}-loader-container`}>
      <div className="load-text" style={{ fontSize: `${fontSize}px` }}>
        {children}
      </div>
      <img
        className="loader"
        width={fontSize}
        height={fontSize}
        src={gif.src}
      />
    </div>
  );
}
