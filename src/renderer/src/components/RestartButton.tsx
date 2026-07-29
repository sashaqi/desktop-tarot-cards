import { useReading } from '../context/ReadingContext'
import { useLanguage } from '../context/LanguageContext'

export function RestartButton(): JSX.Element {
  const { restart } = useReading()
  const { t } = useLanguage()
  return (
    <button className="restart-button" onClick={restart}>
      {t('restart')}
    </button>
  )
}
