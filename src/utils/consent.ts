export type ConsentValue = "granted" | "denied";

const STORAGE_KEY = "portfolio-analytics-consent";
const CHANGE_EVENT = "portfolio:consent-change";

export const getStoredConsent = (): ConsentValue | null => {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === "granted" || value === "denied" ? value : null;
  } catch {
    return null;
  }
};

export const setStoredConsent = (value: ConsentValue | null) => {
  try {
    if (value) {
      localStorage.setItem(STORAGE_KEY, value);
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  } catch {
    // Si el almacenamiento no está disponible, la elección dura la sesión.
  }

  window.dispatchEvent(new Event(CHANGE_EVENT));
};

export const subscribeToConsent = (callback: () => void) => {
  window.addEventListener(CHANGE_EVENT, callback);
  return () => window.removeEventListener(CHANGE_EVENT, callback);
};
