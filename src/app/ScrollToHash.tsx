import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToHash = () => {
  // `key` is a fresh, unique id React Router assigns to every navigation
  // entry — including a click to the exact same hash you're already on.
  // Depending only on `pathname`/`hash` (plain strings) means a repeat
  // click to an unchanged hash doesn't change either value, so the effect
  // silently skips re-running and the second click appears to do nothing.
  const { pathname, hash, key } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.replace("#", ""));
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash, key]);

  return null;
};

export default ScrollToHash;
