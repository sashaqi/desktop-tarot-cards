import { useReading } from '../context/ReadingContext'

export function RestartButton(): JSX.Element {
  const { restart } = useReading()
  return (
    <button className="restart-button" onClick={restart}>
      重新占卜
    </button>
  )
}
