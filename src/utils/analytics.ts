import ReactGA from "react-ga4";

const MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

export const initGA = () => {
  if (!MEASUREMENT_ID) return;
  ReactGA.initialize(MEASUREMENT_ID);
};

export const trackPageView = (path: string) => {
  if (!MEASUREMENT_ID) return;
  ReactGA.send({ hitType: "pageview", page: path });
};

export const trackEvent = (
  eventName: string,
  params?: Record<string, string | number | boolean>
) => {
  if (!MEASUREMENT_ID) return;
  ReactGA.event(eventName, params);
};