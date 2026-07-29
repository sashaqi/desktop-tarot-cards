import { Localized } from './card'

export type CategoryId = 'love' | 'career' | 'wealth' | 'general' | 'custom'

export interface SpreadPosition {
  id: string
  index: 0 | 1 | 2
  label: string
  labelLocalized: string
  description: Localized<string>
}

export interface CategoryDefinition {
  id: CategoryId
  name: string
  nameLocalized: string
  tagline: Localized<string>
  positions: [SpreadPosition, SpreadPosition, SpreadPosition]
}
