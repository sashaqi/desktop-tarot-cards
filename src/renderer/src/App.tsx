import { ReadingProvider, useReading } from './context/ReadingContext'
import { LanguageProvider } from './context/LanguageContext'
import { LanguageToggle } from './components/LanguageToggle'
import { CategoryPicker } from './components/CategoryPicker'
import { DeckScreen } from './components/DeckScreen'
import { RevealScreen } from './components/RevealScreen'

function Screens(): JSX.Element {
  const { phase } = useReading()

  if (phase === 'category-select') return <CategoryPicker />
  if (phase === 'card-picking') return <DeckScreen />
  return <RevealScreen />
}

function App(): JSX.Element {
  return (
    <LanguageProvider>
      <ReadingProvider>
        <div className="app-shell">
          <LanguageToggle />
          <Screens />
        </div>
      </ReadingProvider>
    </LanguageProvider>
  )
}

export default App
