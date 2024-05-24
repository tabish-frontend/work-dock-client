// ** React Imports
import { createContext, useState, ReactNode, useEffect } from 'react'

// ** MUI Imports
import { PaletteMode } from '@mui/material'

// ** ThemeConfig Import
import themeConfig from 'src/configs/themeConfig'

// ** Types Import
import { ThemeColor, ContentWidth } from 'src/layouts/dashboard/types'

export type Settings = {
  mode: PaletteMode
  themeColor: ThemeColor
  contentWidth: ContentWidth
}

export type SettingsContextValue = {
  settings: Settings
  saveSettings: (updatedSettings: Settings) => void
}

const initialSettings: Settings = {
  themeColor: 'primary',
  mode: themeConfig.mode,
  contentWidth: themeConfig.contentWidth
}

// ** Create Context
export const SettingsContext = createContext<SettingsContextValue>({
  saveSettings: () => null,
  settings: initialSettings
})

const STORAGE_KEY = 'app.settings'

const restoreSettings = (): Settings | null => {
  let value = null

  try {
    const restored: string | null = window.localStorage.getItem(STORAGE_KEY)

    if (restored) {
      value = JSON.parse(restored)
    }
  } catch (err) {
    // If stored data is not a strigified JSON this will fail,
    // that's why we catch the error
  }

  return value
}

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  // ** State
  const [settings, setSettings] = useState<Settings>({ ...initialSettings })

  const saveSettings = (updatedSettings: Settings) => {
    setSettings(updatedSettings)
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedSettings))
  }

  useEffect(() => {
    const restored = restoreSettings()

    if (restored) {
      setSettings(restored)
    }
  }, [])

  return <SettingsContext.Provider value={{ settings, saveSettings }}>{children}</SettingsContext.Provider>
}

export const SettingsConsumer = SettingsContext.Consumer
