import type { Session, WeatherObservation } from "../types/session";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:5000";

async function jsonFetch<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} fetching ${url}`);
  return res.json();
}

export function getSessions(): Promise<Session[]> {
  return jsonFetch<Session[]>(`${API_URL}/api/sessions/`);
}

export function getSessionWeather(id: number): Promise<WeatherObservation[]> {
  return jsonFetch<WeatherObservation[]>(`${API_URL}/api/sessions/${id}/weather`);
}
