"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface Settings {
  eurRate: number;
  storePhone: string;
  storeEmail: string;
  hidePrices: boolean;
}

interface SettingsContextType {
  settings: Settings;
  loading: boolean;
  refreshSettings: () => Promise<void>;
}

const defaultSettings: Settings = {
  eurRate: 1.9558,
  storePhone: "+359 888 123 456",
  storeEmail: "info@gardenexotic.bg",
  hidePrices: false,
};

const SettingsContext = createContext<SettingsContextType>({
  settings: defaultSettings,
  loading: true,
  refreshSettings: async () => {},
});

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [loading, setLoading] = useState(true);

  const fetchSettings = async () => {
    try {
      const response = await fetch("/api/settings");
      if (response.ok) {
        const data = await response.json();
        setSettings({
          eurRate: data.eurRate ?? defaultSettings.eurRate,
          storePhone: data.storePhone ?? defaultSettings.storePhone,
          storeEmail: data.storeEmail ?? defaultSettings.storeEmail,
          hidePrices: data.hidePrices ?? defaultSettings.hidePrices,
        });
      }
    } catch (error) {
      console.error("Error fetching settings:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  return (
    <SettingsContext.Provider
      value={{
        settings,
        loading,
        refreshSettings: fetchSettings,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
}
