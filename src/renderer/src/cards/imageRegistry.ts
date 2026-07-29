// Vite eagerly resolves every card photo to its built asset URL, keyed by filename
// (e.g. "m00.jpg"), so CardArt can look up any of the 78 images by the `image`
// field stored on each card in data/cards/.
const modules = import.meta.glob('../assets/cards/*.jpg', { eager: true, import: 'default' }) as Record<
  string,
  string
>

const registry: Record<string, string> = {}
for (const path in modules) {
  const filename = path.split('/').pop() as string
  registry[filename] = modules[path]
}

export function getCardImageUrl(filename: string): string {
  const url = registry[filename]
  if (!url) throw new Error(`Unknown card image: ${filename}`)
  return url
}
