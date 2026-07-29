import { ReadingProvider, useReading } from './context/ReadingContext'
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
    <ReadingProvider>
      <div className="app-shell">
        <Screens />
      </div>
    </ReadingProvider>
  )
}

export default App
