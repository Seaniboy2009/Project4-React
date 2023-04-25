import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Each time the component mounts it will scroll to top of page when the location changes
const ScrollToTop = () => {
  const { pathname } = useLocation();

  console.log('Call scroll to top')
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default ScrollToTop;