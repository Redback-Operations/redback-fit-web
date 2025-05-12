import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type UnitSettings = {
  distanceUnit: "m" | "km" | "mi";
  timeUnit: "min" | "hr:min";
};

type ContextType = {
  settings: UnitSettings;
  updateSettings: (updates: Partial<UnitSettings>) => void;
};

const defaultSettings: UnitSettings = {
  distanceUnit: "km",
  timeUnit: "min",
};

const UserSettingsContext = createContext<ContextType>({
  settings: defaultSettings,
  updateSettings: () => {},
});

export const useUserSettings = () => useContext(UserSettingsContext);

export const UserSettingsProvider = ({ children }: { children: ReactNode }) => {
  const [settings, setSettings] = useState<UnitSettings>(() => {
    const stored = localStorage.getItem("userSettings");
    return stored ? JSON.parse(stored) : defaultSettings;
  });

  useEffect(() => {
    localStorage.setItem("userSettings", JSON.stringify(settings));
  }, [settings]);

  const updateSettings = (updates: Partial<UnitSettings>) => {
    setSettings((prev) => ({ ...prev, ...updates }));
  };

  return (
    <UserSettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </UserSettingsContext.Provider>
  );
};
