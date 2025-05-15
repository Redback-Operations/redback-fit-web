import { useUserSettings } from "../../context/UserSettingsContext.tsx";
import './UnitSettingsPanel.css';
export default function UnitSettingsPanel() {
  const { settings, updateSettings } = useUserSettings();

  return (
    <div className="unit-panel-wrapper">
      <div className="unit-panel">

        <h2>Unit Preferences</h2>

        <div className="unit-setting">
          <label style={{ marginRight: "10px" }}>Distance Unit:</label>
          <select
            id="distanceUnit"
            value={settings.distanceUnit}
            onChange={(e) =>
              updateSettings({ distanceUnit: e.target.value as "km" | "mi" })
            }
          >
            <option value="m">Meters</option>
            <option value="km">Kilometers</option>
            <option value="mi">Miles</option>
          </select>
        </div>

        <div className="unit-setting">
          <label htmlFor="timeUnit">Time Unit:</label>
          <select
            id="timeUnit"
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
    </div>
  );
}
