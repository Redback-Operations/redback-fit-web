import { useEffect, useMemo, useState } from "react";
import { getSessions, getSessionWeather } from "../../services/api.ts";
import type { Session, WeatherObservation } from "../../types/session.ts";

function formatLocal(dtISO: string) {
  const d = new Date(dtISO);
  return d.toLocaleString();
}

function pickClosest(observations: WeatherObservation[], isoTime: string) {
  if (!observations?.length) return undefined;
  const target = new Date(isoTime).getTime();
  let best = observations[0];
  let bestDiff = Math.abs(new Date(best.timestamp).getTime() - target);
  for (const o of observations) {
    const diff = Math.abs(new Date(o.timestamp).getTime() - target);
    if (diff < bestDiff) { best = o; bestDiff = diff; }
  }
  return best;
}

function computeStats(observations: WeatherObservation[]) {
  if (!observations?.length) return null;
  const n = observations.length;
  const sum = (arr: (number | undefined)[]) => arr.reduce((a, b) => a + (b ?? 0), 0);
  const avg = (arr: (number | undefined)[]) => (n ? sum(arr) / n : 0);
  const temps = observations.map(o => o.temperature_c);
  const hums  = observations.map(o => o.humidity_pct);
  const wind  = observations.map(o => o.wind_speed_ms);
  const rain  = observations.map(o => o.precipitation_mm);
  return {
    avgTemp: avg(temps),
    avgHumidity: avg(hums),
    maxWind: Math.max(...wind.map(v => v ?? 0)),
    totalRain: sum(rain),
  };
}

export default function SessionsPage() {
  const [rows, setRows] = useState<Session[]>([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<Session | null>(null);
  const [weather, setWeather] = useState<WeatherObservation[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    getSessions()
      .then(setRows)
      .catch((e) => setError(String(e)))
      .finally(() => setLoading(false));
  }, []);

  async function onSelect(s: Session) {
    setSelected(s);
    setWeather(null);
    try {
      const wx = await getSessionWeather(s.id);
      setWeather(wx);
    } catch (e) {
      setError(String(e));
    }
  }

  const badge = useMemo(() => {
    if (!selected || !weather) return null;
    const close = pickClosest(weather, selected.start_time);
    if (!close) return null;
    const temp = (close.temperature_c ?? 0).toFixed(1);
    const rain = (close.precipitation_mm ?? 0).toFixed(1);
    return `${temp}°C, ${rain}mm @ ${new Date(close.timestamp).toLocaleTimeString()}`;
  }, [selected, weather]);

  const stats = useMemo(() => (weather ? computeStats(weather) : null), [weather]);

  return (
    <div style={{ padding: 16, display: "grid", gridTemplateColumns: "1fr 380px", gap: 16 }}>
      <div>
        <h2>Sessions</h2>
        {loading && <div>Loading…</div>}
        {error && <div style={{ color: "crimson" }}>{error}</div>}
        <table
          style={{ width: "100%", borderCollapse: "collapse", border: "1px solid #ddd" }}
        >
          <thead>
            <tr>
              <th style={{ textAlign: "left", padding: 8, borderBottom: "1px solid #eee" }}>ID</th>
              <th style={{ textAlign: "left", padding: 8, borderBottom: "1px solid #eee" }}>Start</th>
              <th style={{ textAlign: "left", padding: 8, borderBottom: "1px solid #eee" }}>End</th>
              <th style={{ textAlign: "left", padding: 8, borderBottom: "1px solid #eee" }}>Sport</th>
              <th style={{ textAlign: "left", padding: 8, borderBottom: "1px solid #eee" }}>Distance (km)</th>
              <th style={{ textAlign: "left", padding: 8, borderBottom: "1px solid #eee" }}>Weather</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr
                key={r.id}
                onClick={() => onSelect(r)}
                style={{ cursor: "pointer", background: selected?.id === r.id ? "#f6f9ff" : "transparent" }}
              >
                <td style={{ padding: 8, borderBottom: "1px solid #f1f1f1" }}>{r.id}</td>
                <td style={{ padding: 8, borderBottom: "1px solid #f1f1f1" }}>{formatLocal(r.start_time)}</td>
                <td style={{ padding: 8, borderBottom: "1px solid #f1f1f1" }}>{formatLocal(r.end_time)}</td>
                <td style={{ padding: 8, borderBottom: "1px solid #f1f1f1" }}>{r.sport ?? "—"}</td>
                <td style={{ padding: 8, borderBottom: "1px solid #f1f1f1" }}>{r.distance_km ?? "—"}</td>
                <td style={{ padding: 8, borderBottom: "1px solid #f1f1f1" }}>
                  {selected?.id === r.id && weather
                    ? badge ?? "—"
                    : <span style={{ opacity: 0.7 }}>Click row…</span>}
                </td>
              </tr>
            ))}
            {!rows.length && !loading && (
              <tr><td colSpan={6} style={{ padding: 12, opacity: 0.7 }}>
                No sessions yet. POST one to the backend, then refresh.
              </td></tr>
            )}
          </tbody>
        </table>
      </div>

      <aside style={{ border: "1px solid #e6e6e6", borderRadius: 8, padding: 12, height: "fit-content" }}>
        <h3>Details</h3>
        {!selected && <div>Select a session…</div>}
        {selected && (
          <>
            <div style={{ marginBottom: 8 }}><strong>Session #{selected.id}</strong></div>
            <div>Start: {formatLocal(selected.start_time)}</div>
            <div>End: {formatLocal(selected.end_time)}</div>
            <div>Coords: {selected.lat}, {selected.lon}</div>
            <div style={{ margin: "12px 0" }}>
              <strong>Weather near start:</strong><br />
              {badge ?? "Loading…"}
            </div>
            {stats && (
              <div style={{ background: "#fafafa", padding: 8, borderRadius: 6 }}>
                <div><strong>Session weather stats</strong></div>
                <div>Avg temp: {stats.avgTemp.toFixed(1)}°C</div>
                <div>Avg humidity: {stats.avgHumidity.toFixed(0)}%</div>
                <div>Max wind: {stats.maxWind.toFixed(1)} m/s</div>
                <div>Total rain: {stats.totalRain.toFixed(1)} mm</div>
              </div>
            )}
          </>
        )}
      </aside>
    </div>
  );
}
