import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { Language } from '../types/card'
import { ui } from '../i18n/strings'

const STORAGE_KEY = 'tarot.language'

function loadInitialLanguage(): Language {
  const stored = localStorage.getItem(STORAGE_KEY)
  return stored === 'en' ? 'en' : 'zh'
}

interface LanguageContextValue {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: keyof typeof ui) => string
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }): JSX.Element {
  const [language, setLanguageState] = useState<Language>(loadInitialLanguage)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, language)
  }, [language])

  const setLanguage = (lang: Language): void => setLanguageState(lang)
  const t = (key: keyof typeof ui): string => ui[key][language]

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within a LanguageProvider')
  return ctx
}
