import { useEffect, useState } from 'react'
import { DrawnCard } from '../types/reading'
import { CategoryDefinition } from '../types/spread'
import { useLanguage } from '../context/LanguageContext'
import { analyseSpread } from '../utils/spreadAnalysis'
import { Localized } from '../types/card'
import positionLens from '../data/positionLens.json'

const lenses = positionLens as Record<string, Localized<string>>

interface AiReadingPanelProps {
  category: CategoryDefinition
  question: string
  draws: DrawnCard[]
  onNeedsKey: () => void
}

type State =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'done'; text: string }
  | { status: 'error'; message: string }

export function AiReadingPanel({
  category,
  question,
  draws,
  onNeedsKey
}: AiReadingPanelProps): JSX.Element | null {
  const { language, t } = useLanguage()
  const [hasKey, setHasKey] = useState<boolean | null>(null)
  const [state, setState] = useState<State>({ status: 'idle' })

  useEffect(() => {
    // No preload bridge (e.g. opened outside Electron) — hide the panel rather than crash.
    if (!window.api) return
    window.api.hasApiKey().then(setHasKey)
  }, [])

  // A new spread invalidates any reading generated for the previous one.
  useEffect(() => {
    setState({ status: 'idle' })
  }, [draws, language])

  const generate = async (): Promise<void> => {
    if (!window.api) return
    setState({ status: 'loading' })
    const result = await window.api.generateReading({
      language,
      question: question || (language === 'zh' ? category.nameLocalized : category.name),
      categoryName: language === 'zh' ? category.nameLocalized : category.name,
      signals: analyseSpread(draws),
      cards: draws.map((d) => ({
        position: language === 'zh' ? d.position.labelLocalized : d.position.label,
        positionDescription: d.position.description[language],
        positionLens: lenses[d.position.id]?.[language] ?? '',
        name: d.card.name,
        arcana: d.card.arcana,
        suit: d.card.suit,
        element: d.card.element,
        number: d.card.number,
        orientation: d.orientation,
        keywords: d.card.keywords[d.orientation][language],
        localMeaning: d.card.meaning[d.orientation][language],
        symbolism: d.card.symbolism[language],
        watchFor: d.card.watchFor[d.orientation][language]
      }))
    })

    if (result.ok) {
      setState({ status: 'done', text: result.text })
    } else if (result.error === 'NO_API_KEY') {
      setHasKey(false)
      setState({ status: 'idle' })
      onNeedsKey()
    } else {
      setState({ status: 'error', message: result.error })
    }
  }

  if (hasKey === null) return null

  return (
    <div className="ai-panel speech-bubble">
      <div className="ai-panel__head">
        <strong>{t('aiReading')}</strong>
        {state.status !== 'loading' && (
          <button className="ghost-button ghost-button--small" onClick={hasKey ? generate : onNeedsKey}>
            {state.status === 'done' || state.status === 'error' ? t('aiRetry') : t('aiGenerate')}
          </button>
        )}
      </div>

      {!hasKey && <p className="ai-panel__hint">{t('aiNeedsKey')}</p>}
      {state.status === 'loading' && <p className="ai-panel__hint">{t('aiThinking')}</p>}
      {state.status === 'done' && <p className="ai-panel__text">{state.text}</p>}
      {state.status === 'error' && (
        <p className="ai-panel__error">
          {t('aiFailed')}: {state.message}
        </p>
      )}
    </div>
  )
}
