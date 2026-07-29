import { useEffect, useState } from 'react'
import { useLanguage } from '../context/LanguageContext'

interface SettingsPanelProps {
  onClose: () => void
  onKeyChanged: (hasKey: boolean) => void
}

export function SettingsPanel({ onClose, onKeyChanged }: SettingsPanelProps): JSX.Element {
  const { t } = useLanguage()
  const [value, setValue] = useState('')
  const [hasKey, setHasKey] = useState(false)
  const [saved, setSaved] = useState(false)
  const [path, setPath] = useState('')

  useEffect(() => {
    if (!window.api) return
    window.api.hasApiKey().then(setHasKey)
    window.api.apiKeyPath().then(setPath)
  }, [])

  const save = async (): Promise<void> => {
    if (!value.trim() || !window.api) return
    await window.api.saveApiKey(value.trim())
    setValue('')
    setHasKey(true)
    setSaved(true)
    onKeyChanged(true)
  }

  const clear = async (): Promise<void> => {
    if (!window.api) return
    await window.api.clearApiKey()
    setHasKey(false)
    setSaved(false)
    onKeyChanged(false)
  }

  return (
    <div className="settings-backdrop" onClick={onClose}>
      <div className="settings-panel speech-bubble" onClick={(e) => e.stopPropagation()}>
        <h3 className="settings-panel__title">{t('settings')}</h3>

        <label className="settings-field">
          <span className="settings-field__label">
            {t('apiKeyLabel')}
            {hasKey && <span className="settings-badge">{t('apiKeySaved')}</span>}
          </span>
          <input
            type="password"
            className="settings-input"
            value={value}
            placeholder={hasKey ? '••••••••••••' : 'sk-ant-…'}
            onChange={(e) => {
              setValue(e.target.value)
              setSaved(false)
            }}
          />
        </label>
        <p className="settings-hint">{t('apiKeyHint')}</p>

        {path && (
          <div className="settings-path">
            <span className="settings-path__label">{t('storedAt')}</span>
            <code className="settings-path__value">{path}</code>
          </div>
        )}

        <div className="settings-actions">
          {hasKey && (
            <button className="ghost-button" onClick={clear}>
              {t('clear')}
            </button>
          )}
          <button className="ghost-button" onClick={onClose}>
            {t('close')}
          </button>
          <button className="restart-button settings-save" onClick={save} disabled={!value.trim()}>
            {saved ? t('apiKeySaved') : t('save')}
          </button>
        </div>
      </div>
    </div>
  )
}
