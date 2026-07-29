import { useState } from 'react'
import { ReadingProvider, useReading } from './context/ReadingContext'
import { LanguageProvider, useLanguage } from './context/LanguageContext'
import { LanguageToggle } from './components/LanguageToggle'
import { SettingsPanel } from './components/SettingsPanel'
import { CategoryPicker } from './components/CategoryPicker'
import { QuestionInput } from './components/QuestionInput'
import { DeckScreen } from './components/DeckScreen'
import { RevealScreen } from './components/RevealScreen'

function Screens({ onNeedsKey }: { onNeedsKey: () => void }): JSX.Element {
  const { phase } = useReading()

  if (phase === 'category-select') return <CategoryPicker />
  if (phase === 'question-input') return <QuestionInput />
  if (phase === 'card-picking') return <DeckScreen />
  return <RevealScreen onNeedsKey={onNeedsKey} />
}

function Shell(): JSX.Element {
  const [settingsOpen, setSettingsOpen] = useState(false)
  const { t } = useLanguage()

  return (
    <div className="app-shell">
      <div className="top-bar">
        <button
          className="settings-button"
          title={t('settings')}
          onClick={() => setSettingsOpen(true)}
        >
          ⚙
        </button>
        <LanguageToggle />
      </div>
      <Screens onNeedsKey={() => setSettingsOpen(true)} />
      {settingsOpen && (
        <SettingsPanel onClose={() => setSettingsOpen(false)} onKeyChanged={() => undefined} />
      )}
    </div>
  )
}

function App(): JSX.Element {
  return (
    <LanguageProvider>
      <ReadingProvider>
        <Shell />
      </ReadingProvider>
    </LanguageProvider>
  )
}

export default App
