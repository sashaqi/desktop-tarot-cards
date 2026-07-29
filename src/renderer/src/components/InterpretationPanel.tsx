import { DrawnCard } from '../types/reading'

interface InterpretationPanelProps {
  draws: DrawnCard[]
  summary: string
}

export function InterpretationPanel({ draws, summary }: InterpretationPanelProps): JSX.Element {
  return (
    <div className="interpretation-panel">
      {draws.map((draw) => (
        <div key={draw.card.id} className="interpretation-row speech-bubble">
          <div className="interpretation-row__head">
            <strong>{draw.position.labelLocalized}</strong>
            <span className="interpretation-row__card-name">
              {draw.card.nameLocalized}（{draw.orientation === 'upright' ? '正位' : '逆位'}）
            </span>
          </div>
          <p className="interpretation-row__position-desc">{draw.position.description}</p>
          <p className="interpretation-row__meaning">{draw.card.meaning[draw.orientation]}</p>
          <div className="interpretation-row__keywords">
            {draw.card.keywords[draw.orientation].map((kw) => (
              <span key={kw} className="keyword-chip">
                {kw}
              </span>
            ))}
          </div>
        </div>
      ))}
      <div className="overall-summary speech-bubble speech-bubble--accent">
        <strong>综合解读</strong>
        <p>{summary}</p>
      </div>
    </div>
  )
}
