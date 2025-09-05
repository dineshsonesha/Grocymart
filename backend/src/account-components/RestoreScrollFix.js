import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function RestoreScrollFix() {
  const { pathname } = useLocation();

  useEffect(() => {
    document.body.style.overflow = "auto";
    window.scrollTo({ top: 0, behavior: "auto" });
    const restoreScroll = () => {
      document.body.style.overflow = "auto";
    };
    window.addEventListener("popstate", restoreScroll);
    window.addEventListener("click", restoreScroll);
    return () => {
      window.removeEventListener("popstate", restoreScroll);
      window.removeEventListener("click", restoreScroll);
    };
  }, [pathname]);

  return null;
}
