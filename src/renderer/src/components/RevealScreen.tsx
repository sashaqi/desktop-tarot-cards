import { useMemo } from 'react'
import { useReading } from '../context/ReadingContext'
import { useLanguage } from '../context/LanguageContext'
import { buildSummary } from '../utils/interpretation'
import { SpreadLayout } from './SpreadLayout'
import { InterpretationPanel } from './InterpretationPanel'
import { AiReadingPanel } from './AiReadingPanel'
import { RestartButton } from './RestartButton'

export function RevealScreen({ onNeedsKey }: { onNeedsKey: () => void }): JSX.Element {
  const { category, draws, question } = useReading()
  const { language, t } = useLanguage()

  const summary = useMemo(
    () => (category ? buildSummary(category.id, draws, language, question) : ''),
    [category, draws, language, question]
  )

  const categoryName = category ? (language === 'zh' ? category.nameLocalized : category.name) : ''

  return (
    <div className="screen reveal-screen">
      <h2 className="comic-title comic-title--small">
        {categoryName} · {t('yourSpread')}
      </h2>
      {question && (
        <div className="asked-question">
          <span className="asked-question__label">{t('yourQuestion')}</span>
          <span className="asked-question__text">{question}</span>
        </div>
      )}
      <SpreadLayout draws={draws} />
      <InterpretationPanel draws={draws} summary={summary} />
      {category && (
        <AiReadingPanel
          category={category}
          question={question}
          draws={draws}
          onNeedsKey={onNeedsKey}
        />
      )}
      <RestartButton />
    </div>
  )
}
