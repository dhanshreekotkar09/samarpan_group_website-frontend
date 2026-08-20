import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { setPageTitle, titleForPath } from "../utils/pageTitle";

/** Updates document.title when the route changes. */
export default function PageTitle() {
  const { pathname } = useLocation();

  useEffect(() => {
    const page = titleForPath(pathname);
    if (page !== null) setPageTitle(page);
  }, [pathname]);

  return null;
}
