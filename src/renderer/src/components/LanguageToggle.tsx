import { useLanguage } from '../context/LanguageContext'

export function LanguageToggle(): JSX.Element {
  const { language, setLanguage } = useLanguage()

  return (
    <div className="language-toggle">
      <button
        className={language === 'zh' ? 'language-toggle__btn language-toggle__btn--active' : 'language-toggle__btn'}
        onClick={() => setLanguage('zh')}
      >
        中文
      </button>
      <button
        className={language === 'en' ? 'language-toggle__btn language-toggle__btn--active' : 'language-toggle__btn'}
        onClick={() => setLanguage('en')}
      >
        EN
      </button>
    </div>
  )
}
