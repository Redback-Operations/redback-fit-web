import { useUserSettings } from "../../context/UserSettingsContext.tsx";
export default function UnitSettingsPanel() {
  const { settings, updateSettings } = useUserSettings();

  return (
    <div style={{
      background: "#f0f4f8",
      padding: "1rem",
      borderRadius: "10px",
      marginBottom: "1rem",
      maxWidth: "400px"
    }}>
      <h3 style={{ marginBottom: "10px" }}>Unit Preferences</h3>

      <div style={{ marginBottom: "1rem" }}>
        <label style={{ marginRight: "10px" }}>Distance Unit:</label>
        <select
          value={settings.distanceUnit}
          onChange={(e) =>
            updateSettings({ distanceUnit: e.target.value as "km" | "mi" })
          }
        >
          <option value="km">Kilometers</option>
          <option value="mi">Miles</option>
        </select>
      </div>

      <div>
        <label style={{ marginRight: "10px" }}>Time Format:</label>
        <select
          value={settings.timeUnit}
          onChange={(e) =>
            updateSettings({ timeUnit: e.target.value as "min" | "hr:min" })
          }
        >
          <option value="min">Minutes</option>
          <option value="hr:min">Hours:Minutes</option>
        </select>
      </div>
    </div>
  );
}
