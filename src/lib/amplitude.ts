import * as amplitude from "@amplitude/analytics-browser";

const API_KEY = process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY ?? "";

let initialized = false;

export function initAmplitude() {
  if (initialized || !API_KEY || typeof window === "undefined") return;
  amplitude.init(API_KEY, { defaultTracking: false });
  initialized = true;
}

export function track(eventName: string, properties?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  amplitude.track(eventName, properties);
}

export function setUserProperty(properties: Record<string, string | number | boolean>) {
  if (typeof window === "undefined") return;
  const identify = new amplitude.Identify();
  Object.entries(properties).forEach(([key, value]) => {
    identify.set(key, value);
  });
  amplitude.identify(identify);
}
