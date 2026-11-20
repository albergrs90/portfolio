import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useConsent } from "../hooks/useConsent";
import {
  clearAnalyticsCookies,
  initGA,
  trackPageView,
} from "../utils/analytics";

export function AnalyticsTracker() {
  const location = useLocation();
  const consent = useConsent();

  // GA4 solo se inicializa con consentimiento explícito. Sin él se desactiva
  // el envío y se borran las cookies que Google hubiera dejado.
  useEffect(() => {
    if (consent === "granted") {
      initGA();
    } else {
      clearAnalyticsCookies();
    }
  }, [consent]);

  useEffect(() => {
    if (consent !== "granted") return;
    initGA();
    trackPageView(location.pathname + location.search);
  }, [consent, location]);

  return null;
}
