import { useEffect, useState } from "react";
import { getStoredConsent, subscribeToConsent } from "../utils/consent";
import type { ConsentValue } from "../utils/consent";

/** Lee la elección de cookies y se mantiene al día si cambia desde el pie. */
export const useConsent = () => {
  const [consent, setConsent] = useState<ConsentValue | null>(() =>
    getStoredConsent(),
  );

  useEffect(
    () => subscribeToConsent(() => setConsent(getStoredConsent())),
    [],
  );

  return consent;
};
