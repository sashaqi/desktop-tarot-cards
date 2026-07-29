import { useReading } from '../context/ReadingContext'
import { SpreadLayout } from './SpreadLayout'
import { InterpretationPanel } from './InterpretationPanel'
import { RestartButton } from './RestartButton'

export function RevealScreen(): JSX.Element {
  const { category, draws, summary } = useReading()

  return (
    <div className="screen reveal-screen">
      <h2 className="comic-title comic-title--small">{category?.nameLocalized} · 你的牌阵</h2>
      <SpreadLayout draws={draws} />
      <InterpretationPanel draws={draws} summary={summary} />
      <RestartButton />
    </div>
  )
}
