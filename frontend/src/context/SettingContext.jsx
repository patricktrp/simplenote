import { createContext, useContext, useEffect, useState } from "react"

const INITIAL_SETTINGS = {
    theme: 'dark'
}

const SettingContext = createContext()

export const useSettings = () => {
    return useContext(SettingContext)
}

export const SettingProvider = ({ children }) => {
    const [settings, setSettings] = useState({})

    useEffect(() => {
        let userSettings = JSON.parse(localStorage.getItem('userSettings'))
        if (userSettings === null) {
            userSettings = INITIAL_SETTINGS
            localStorage.setItem("userSettings", JSON.stringify(userSettings))
        }
        setSettings(userSettings)
    }, [])

    useEffect(() => {
        switch (settings.theme) {
            case 'light':
                document.body.setAttribute('data-theme', '')
                break
            case 'dark':
                document.body.setAttribute('data-theme', 'dark')
                break
            case 'system': {
                const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark').matches
                if (prefersDarkMode) {
                    document.body.setAttribute('data-theme', 'dark')
                } else {
                    document.body.setAttribute('data-theme', '')
                }
            }
                break
            default:
                break
        }
    }, [settings.theme])

    const updateSettings = (newSettings) => {
        setSettings({ ...newSettings })
        localStorage.setItem("userSettings", JSON.stringify(newSettings))
    }

    return (
        <SettingContext.Provider value={{ settings, updateSettings }}>
            {children}
        </SettingContext.Provider>
    )
}