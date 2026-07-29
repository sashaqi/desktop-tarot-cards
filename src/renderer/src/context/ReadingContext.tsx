import { createContext, useContext, useMemo, useReducer, ReactNode } from 'react'
import { deck } from '../data/cards'
import spreadsData from '../data/spreads.json'
import { CardMeaning } from '../types/card'
import { CategoryDefinition, CategoryId } from '../types/spread'
import { DrawnCard } from '../types/reading'
import { shuffle } from '../utils/shuffle'
import { assignDraw } from '../utils/draw'

const cards: CardMeaning[] = deck
const categories = spreadsData as CategoryDefinition[]

export type Phase = 'category-select' | 'question-input' | 'card-picking' | 'result'

interface ReadingState {
  phase: Phase
  category: CategoryDefinition | null
  question: string
  shuffledDeck: CardMeaning[]
  draws: DrawnCard[]
}

type Action =
  | { type: 'SELECT_CATEGORY'; categoryId: CategoryId }
  | { type: 'SUBMIT_QUESTION'; question: string }
  | { type: 'PICK_CARD'; cardId: string }
  | { type: 'RESTART' }

const initialState: ReadingState = {
  phase: 'category-select',
  category: null,
  question: '',
  shuffledDeck: [],
  draws: []
}

function reducer(state: ReadingState, action: Action): ReadingState {
  switch (action.type) {
    case 'SELECT_CATEGORY': {
      const category = categories.find((c) => c.id === action.categoryId) ?? null
      // The custom reading needs the question before the deck comes out.
      if (category?.id === 'custom') {
        return { ...initialState, phase: 'question-input', category }
      }
      return {
        ...initialState,
        phase: 'card-picking',
        category,
        shuffledDeck: shuffle(cards)
      }
    }
    case 'SUBMIT_QUESTION': {
      const question = action.question.trim()
      if (state.phase !== 'question-input' || !question) return state
      return {
        ...state,
        question,
        phase: 'card-picking',
        shuffledDeck: shuffle(cards)
      }
    }
    case 'PICK_CARD': {
      if (state.phase !== 'card-picking' || !state.category || state.draws.length >= 3) return state
      if (state.draws.some((d) => d.card.id === action.cardId)) return state

      const card = cards.find((c) => c.id === action.cardId)
      if (!card) return state

      const draws = [...state.draws, assignDraw(card, state.draws.length, state.category)]

      return {
        ...state,
        draws,
        phase: draws.length === 3 ? 'result' : 'card-picking'
      }
    }
    case 'RESTART':
      return initialState
    default:
      return state
  }
}

interface ReadingContextValue extends ReadingState {
  selectCategory: (categoryId: CategoryId) => void
  submitQuestion: (question: string) => void
  pickCard: (cardId: string) => void
  restart: () => void
  categories: CategoryDefinition[]
}

const ReadingContext = createContext<ReadingContextValue | null>(null)

export function ReadingProvider({ children }: { children: ReactNode }): JSX.Element {
  const [state, dispatch] = useReducer(reducer, initialState)

  const value = useMemo<ReadingContextValue>(
    () => ({
      ...state,
      categories,
      selectCategory: (categoryId) => dispatch({ type: 'SELECT_CATEGORY', categoryId }),
      submitQuestion: (question) => dispatch({ type: 'SUBMIT_QUESTION', question }),
      pickCard: (cardId) => dispatch({ type: 'PICK_CARD', cardId }),
      restart: () => dispatch({ type: 'RESTART' })
    }),
    [state]
  )

  return <ReadingContext.Provider value={value}>{children}</ReadingContext.Provider>
}

export function useReading(): ReadingContextValue {
  const ctx = useContext(ReadingContext)
  if (!ctx) throw new Error('useReading must be used within a ReadingProvider')
  return ctx
}
