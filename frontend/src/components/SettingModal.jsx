import styles from './SettingModal.module.css'
import { useSettings } from '../context/SettingContext'

const SettingModal = ({ showModal, onModalClose }) => {
    const { settings, updateSettings } = useSettings()

    const handleThemeChange = (e) => {
        updateSettings({ ...settings, theme: e.target.value })
    }

    return (
        <>
            {showModal &&
                <div className={styles['backdrop']}>
                    <div className={styles['modal']}>
                        <div className={styles['theme-setting']}>
                            <label>
                                <input type="radio" value="light" checked={settings.theme === "light"} onChange={handleThemeChange} />
                                Light
                            </label>
                            <label>
                                <input type="radio" value="dark" checked={settings.theme === "dark"} onChange={handleThemeChange} />
                                Dark
                            </label>
                            <label>
                                <input type="radio" value="system" checked={settings.theme === "system"} onChange={handleThemeChange} />
                                System
                            </label>
                        </div>
                        <button onClick={() => onModalClose()}>Close</button>
                    </div>
                </div>}
        </>
    )
}

export default SettingModal