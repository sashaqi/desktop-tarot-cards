import { useReading } from '../context/ReadingContext'
import { useLanguage } from '../context/LanguageContext'
import { CardFan } from './CardFan'

export function DeckScreen(): JSX.Element {
  const { category, shuffledDeck, draws, pickCard } = useReading()
  const { language, t } = useLanguage()

  const categoryName = category ? (language === 'zh' ? category.nameLocalized : category.name) : ''

  return (
    <div className="screen screen--center deck-screen">
      <div className="deck-header">
        <h2 className="comic-title comic-title--small">
          {categoryName} · {t('pickInstruction')}
        </h2>
        <div className="pick-progress">
          {[0, 1, 2].map((i) => (
            <span key={i} className={`pick-dot ${i < draws.length ? 'pick-dot--filled' : ''}`} />
          ))}
        </div>
      </div>
      <CardFan deck={shuffledDeck} draws={draws} onPick={pickCard} />
    </div>
  )
}
