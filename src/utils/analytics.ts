import ReactGA from "react-ga4";
import { getStoredConsent } from "./consent";

const MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

let initialized = false;

/**
 * Solo se envía analítica en producción y con consentimiento del usuario. Así
 * las visitas de desarrollo no ensucian el panel y no se instalan cookies sin
 * permiso.
 */
const canTrack = () =>
  import.meta.env.PROD &&
  Boolean(MEASUREMENT_ID) &&
  getStoredConsent() === "granted";

/** Opt-out oficial de gtag.js: detiene los envíos aunque el script siga cargado. */
const setOptOut = (optOut: boolean) => {
  if (!MEASUREMENT_ID) return;
  (window as unknown as Record<string, boolean>)[
    `ga-disable-${MEASUREMENT_ID}`
  ] = optOut;
};

export const initGA = () => {
  if (!canTrack() || !MEASUREMENT_ID) return;
  setOptOut(false);
  if (initialized) return;
  ReactGA.initialize(MEASUREMENT_ID);
  initialized = true;
};

export const trackPageView = (path: string) => {
  if (!canTrack()) return;
  ReactGA.send({ hitType: "pageview", page: path });
};

export const trackEvent = (
  eventName: string,
  params?: Record<string, string | number | boolean>,
) => {
  if (!canTrack()) return;
  ReactGA.event(eventName, params);
};

/** Desactiva GA y borra sus cookies cuando no hay consentimiento. */
export const clearAnalyticsCookies = () => {
  setOptOut(true);

  for (const cookie of document.cookie.split(";")) {
    const name = cookie.split("=")[0]?.trim();
    if (!name) continue;
    if (name === "_ga" || name.startsWith("_ga_") || name === "_gid") {
      document.cookie = `${name}=; Max-Age=0; path=/`;
      document.cookie = `${name}=; Max-Age=0; path=/; domain=.${window.location.hostname}`;
    }
  }
};
