import { DrawnCard } from '../types/reading'
import { CategoryId } from '../types/spread'

const openers: Record<CategoryId, string> = {
  love: '关于这段感情，三张牌是这样说的：',
  career: '关于这份事业，三张牌是这样说的：',
  general: '关于近期的整体运势，三张牌是这样说的：'
}

const closers: Record<CategoryId, { mostlyUpright: string; mixed: string; mostlyReversed: string }> = {
  love: {
    mostlyUpright: '整体而言，这段关系正朝着顺畅、坦诚的方向发展，保持这份用心。',
    mixed: '整体而言，感情里有明有暗，值得多花心思去沟通和磨合。',
    mostlyReversed: '整体而言，这段关系正经历一些阻碍，先别急着下结论，给彼此多一点耐心。'
  },
  career: {
    mostlyUpright: '整体而言，事业上的努力正在开花结果，可以更主动地把握机会。',
    mixed: '整体而言，工作中机会与挑战并存，稳扎稳打会比冒进更可靠。',
    mostlyReversed: '整体而言，眼下阻力较多，先梳理清楚问题所在，再决定下一步。'
  },
  general: {
    mostlyUpright: '整体而言，近期的能量偏向顺利与成长，适合主动推进计划。',
    mixed: '整体而言，运势起伏交织，顺其自然、随机应变会更省力。',
    mostlyReversed: '整体而言，近期需要多一些耐心和自我照顾，避免强求。'
  }
}

export function buildSummary(categoryId: CategoryId, draws: DrawnCard[]): string {
  const lines = draws.map((d) => {
    const kw = d.card.keywords[d.orientation][0]
    const orientationLabel = d.orientation === 'upright' ? '正位' : '逆位'
    return `「${d.position.labelLocalized}」是${orientationLabel}的${d.card.nameLocalized}，指向${kw}。`
  })

  const reversedCount = draws.filter((d) => d.orientation === 'reversed').length
  const tone = reversedCount >= 2 ? 'mostlyReversed' : reversedCount === 0 ? 'mostlyUpright' : 'mixed'

  return [openers[categoryId], ...lines, closers[categoryId][tone]].join(' ')
}
