import { useMemo } from 'react'
import { useReading } from '../context/ReadingContext'
import { useLanguage } from '../context/LanguageContext'
import { buildSummary } from '../utils/interpretation'
import { SpreadLayout } from './SpreadLayout'
import { InterpretationPanel } from './InterpretationPanel'
import { RestartButton } from './RestartButton'

export function RevealScreen(): JSX.Element {
  const { category, draws } = useReading()
  const { language, t } = useLanguage()

  const summary = useMemo(
    () => (category ? buildSummary(category.id, draws, language) : ''),
    [category, draws, language]
  )

  const categoryName = category ? (language === 'zh' ? category.nameLocalized : category.name) : ''

  return (
    <div className="screen reveal-screen">
      <h2 className="comic-title comic-title--small">
        {categoryName} · {t('yourSpread')}
      </h2>
      <SpreadLayout draws={draws} />
      <InterpretationPanel draws={draws} summary={summary} />
      <RestartButton />
    </div>
  )
}
