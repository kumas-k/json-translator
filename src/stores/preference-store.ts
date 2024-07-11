import { create } from 'zustand'

export const ENGINES = ['google', 'deepl'] as const

export type Engine = (typeof ENGINES)[number]

export function isEngine(value: string | undefined): value is Engine {
  return value ? (ENGINES as readonly string[]).includes(value) : false
}

type Store = {
  init: (params: { target?: string; key?: string; engine?: Engine }) => void
  engine: Engine
  setEngine: (engine: Engine) => void
  target: string
  setTarget: (target?: string) => void
  key: string
  setKey: (key?: string) => void
}

const usePreferenceStore = create<Store>((set) => ({
  init: ({ target, key, engine }) =>
    set({
      engine: isEngine(engine) ? engine : 'google',
      target: target ?? 'ko',
      ...(key && { key }),
    }),
  engine: 'google',
  setEngine: (engine) => set({ engine }),
  key: '',
  target: 'ko',
  setTarget: (target) => set({ target }),
  setKey: (key) => set({ key }),
}))

export default usePreferenceStore
