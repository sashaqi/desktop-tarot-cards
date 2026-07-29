import { useReading } from '../context/ReadingContext'
import { useLanguage } from '../context/LanguageContext'

export function CategoryPicker(): JSX.Element {
  const { categories, selectCategory } = useReading()
  const { language, t } = useLanguage()

  return (
    <div className="screen screen--center category-screen">
      <h1 className="comic-title">{t('appTitle')}</h1>
      <p className="screen-subtitle">{t('categorySubtitle')}</p>
      <div className="category-grid">
        {categories.map((category) => (
          <button
            key={category.id}
            className={`category-card ${category.id === 'custom' ? 'category-card--wide' : ''}`}
            onClick={() => selectCategory(category.id)}
          >
            <span className="category-card__name">{language === 'zh' ? category.nameLocalized : category.name}</span>
            <span className="category-card__tagline">{category.tagline[language]}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
