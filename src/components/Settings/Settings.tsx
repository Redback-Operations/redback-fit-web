import React, { useState, useContext } from 'react';
import './Settings.css';
import { ThemeContext } from '../../context/ThemeContext';

interface Settings {
  password: string;
  twoFactorAuth: boolean;
  notifications: {
    email: boolean;
    sms: boolean;
    app: boolean;
  };
}

const SettingsPage: React.FC = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  const [settings, setSettings] = useState<Settings>({
    password: '',
    twoFactorAuth: false,
    notifications: {
      email: true,
      sms: false,
      app: true,
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSettings({ ...settings, [name]: value });
  };

  const handleToggle = (name: string) => {
    setSettings({ ...settings, [name]: !settings[name as keyof Settings] });
  };

  const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTheme(e.target.value as 'light' | 'dark');
  };

  const handleNotificationToggle = (type: string) => {
    setSettings({
      ...settings,
      notifications: {
        ...settings.notifications,
        [type]: !settings.notifications[type as keyof Settings['notifications']],
      },
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Settings saved:', settings);
    alert('Settings saved!');
  };

  return (
    <div className="settings-container">
      <h1 className="settings-title">Settings</h1>
      <form onSubmit={handleSubmit} className="settings-form">
        <div className="settings-section">
          <h2>Preferences</h2>
          <div className="form-group">
            <label htmlFor="theme">Theme:</label>
            <select
              id="theme"
              name="theme"
              value={theme}
              onChange={handleThemeChange}
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>
        </div>

        <div className="settings-section">
          <h2>Security</h2>
          <div className="form-group">
            <label htmlFor="password">Change Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter new password"
              value={settings.password}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group toggle-group">
            <label htmlFor="twoFactorAuth">Enable Two-Factor Authentication</label>
            <input
              type="checkbox"
              id="twoFactorAuth"
              checked={settings.twoFactorAuth}
              onChange={() => handleToggle('twoFactorAuth')}
            />
          </div>
        </div>

        <div className="settings-section">
          <h2>Notifications</h2>
          <div className="form-group">
            <label>
              <input
                type="checkbox"
                checked={settings.notifications.email}
                onChange={() => handleNotificationToggle('email')}
              />
              Email
            </label>
          </div>
          <div className="form-group">
            <label>
              <input
                type="checkbox"
                checked={settings.notifications.sms}
                onChange={() => handleNotificationToggle('sms')}
              />
              SMS
            </label>
          </div>
          <div className="form-group">
            <label>
              <input
                type="checkbox"
                checked={settings.notifications.app}
                onChange={() => handleNotificationToggle('app')}
              />
              App Notifications
            </label>
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="save-button">Save Settings</button>
        </div>
      </form>
    </div>
  );
};

export default SettingsPage;
