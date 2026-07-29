import { DrawnCard } from '../types/reading'
import { useLanguage } from '../context/LanguageContext'

interface InterpretationPanelProps {
  draws: DrawnCard[]
  summary: string
}

export function InterpretationPanel({ draws, summary }: InterpretationPanelProps): JSX.Element {
  const { language, t } = useLanguage()

  return (
    <div className="interpretation-panel">
      {draws.map((draw) => {
        const posLabel = language === 'zh' ? draw.position.labelLocalized : draw.position.label
        const cardName = language === 'zh' ? draw.card.nameLocalized : draw.card.name
        const orientationLabel = t(draw.orientation)

        return (
          <div key={draw.card.id} className="interpretation-row speech-bubble">
            <div className="interpretation-row__head">
              <strong>{posLabel}</strong>
              <span className="interpretation-row__card-name">
                {cardName} ({orientationLabel})
              </span>
            </div>
            <p className="interpretation-row__position-desc">{draw.position.description[language]}</p>
            <p className="interpretation-row__meaning">{draw.card.meaning[draw.orientation][language]}</p>
            <div className="interpretation-row__keywords">
              {draw.card.keywords[draw.orientation][language].map((kw) => (
                <span key={kw} className="keyword-chip">
                  {kw}
                </span>
              ))}
            </div>
          </div>
        )
      })}
      <div className="overall-summary speech-bubble speech-bubble--accent">
        <strong>{t('overallReading')}</strong>
        <p>{summary}</p>
      </div>
    </div>
  )
}
