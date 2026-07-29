export type CategoryId = 'love' | 'career' | 'general'

export interface SpreadPosition {
  id: string
  index: 0 | 1 | 2
  label: string
  labelLocalized: string
  description: string
}

export interface CategoryDefinition {
  id: CategoryId
  name: string
  nameLocalized: string
  tagline: string
  positions: [SpreadPosition, SpreadPosition, SpreadPosition]
}
