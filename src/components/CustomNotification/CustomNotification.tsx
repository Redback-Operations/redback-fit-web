import  { useState } from 'react';
import './CustomNotification.css';

type NotificationType = 'training' | 'goal' | 'achievement';

type NotificationSetting = {
  type: NotificationType;
  label: string;
  enabled: boolean;
  time: string;
  method: 'email' | 'sms' | 'app';
};

const initialSettings: NotificationSetting[] = [
  { type: 'training', label: 'Upcoming Training Session', enabled: true, time: '08:00', method: 'app' },
  { type: 'goal', label: 'Goal Reminder', enabled: false, time: '10:00', method: 'email' },
  { type: 'achievement', label: 'Personal Achievement', enabled: true, time: '18:30', method: 'sms' },
];

const CustomNotification = () => {
  const [notifications, setNotifications] = useState<NotificationSetting[]>(initialSettings);

  const handleToggle = (index: number) => {
    const updated = [...notifications];
    updated[index].enabled = !updated[index].enabled;
    setNotifications(updated);
  };

  const handleTimeChange = (index: number, value: string) => {
    const updated = [...notifications];
    updated[index].time = value;
    setNotifications(updated);
  };

  const handleMethodChange = (index: number, value: 'email' | 'sms' | 'app') => {
    const updated = [...notifications];
    updated[index].method = value;
    setNotifications(updated);
  };

  const handleSave = () => {
    console.log('Saved notifications:', notifications);
    alert('Notification settings saved!');
  };

  return (
    <div className="container">
      <h2>Customizable Notifications</h2>

      <div className="tableSection">
        <table className="table">
          <thead>
            <tr>
              <th>Type</th>
              <th>Enable</th>
              <th>Time</th>
              <th>Method</th>
            </tr>
          </thead>
          <tbody>
            {notifications.map((notif, index) => (
              <tr key={notif.type}>
                <td>{notif.label}</td>
                <td>
                  <input
                    type="checkbox"
                    checked={notif.enabled}
                    onChange={() => handleToggle(index)}
                  />
                </td>
                <td>
                  <input
                    type="time"
                    value={notif.time}
                    onChange={(e) => handleTimeChange(index, e.target.value)}
                    className="timeInput"
                  />
                </td>
                <td>
                  <select
                    value={notif.method}
                    onChange={(e) => handleMethodChange(index, e.target.value as any)}
                    className="methodSelect"
                  >
                    <option value="email">Email</option>
                    <option value="sms">SMS</option>
                    <option value="app">App</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="actions">
        <button onClick={handleSave} className="saveButton">Save Settings</button>
      </div>
    </div>
  );
};

export default CustomNotification;