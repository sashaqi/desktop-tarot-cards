import { useReading } from '../context/ReadingContext'

export function CategoryPicker(): JSX.Element {
  const { categories, selectCategory } = useReading()

  return (
    <div className="screen category-screen">
      <h1 className="comic-title">漫画塔罗</h1>
      <p className="screen-subtitle">今天想为哪件事求一个指引？</p>
      <div className="category-grid">
        {categories.map((category) => (
          <button key={category.id} className="category-card" onClick={() => selectCategory(category.id)}>
            <span className="category-card__name">{category.nameLocalized}</span>
            <span className="category-card__tagline">{category.tagline}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
