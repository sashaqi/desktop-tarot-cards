import { useState } from 'react'
import { useReading } from '../context/ReadingContext'
import { useLanguage } from '../context/LanguageContext'

const MAX_LEN = 120

export function QuestionInput(): JSX.Element {
  const { submitQuestion, restart } = useReading()
  const { t } = useLanguage()
  const [value, setValue] = useState('')

  const canSubmit = value.trim().length > 0

  return (
    <div className="screen screen--center question-screen">
      <h2 className="comic-title comic-title--small">{t('questionTitle')}</h2>
      <p className="screen-subtitle">{t('questionHint')}</p>

      <form
        className="question-form"
        onSubmit={(e) => {
          e.preventDefault()
          if (canSubmit) submitQuestion(value)
        }}
      >
        <textarea
          className="question-input"
          value={value}
          maxLength={MAX_LEN}
          rows={3}
          autoFocus
          placeholder={t('questionPlaceholder')}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              if (canSubmit) submitQuestion(value)
            }
          }}
        />
        <div className="question-form__footer">
          <span className="question-counter">
            {value.length}/{MAX_LEN}
          </span>
          <div className="question-form__actions">
            <button type="button" className="ghost-button" onClick={restart}>
              {t('back')}
            </button>
            <button type="submit" className="restart-button question-submit" disabled={!canSubmit}>
              {t('startDraw')}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
