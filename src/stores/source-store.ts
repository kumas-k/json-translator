import { create } from 'zustand'

type Store = {
  source: string[]
  initSource: (source: string[]) => void
  replaceSourceValue: (newValue: string) => void
  currentIndex: number
  setCurrentIndex: (source: number) => void
  page: number
  setPage: (page: number) => void
}

const useSourceStore = create<Store>((set) => ({
  source: [],
  initSource: (source) => set({ source, currentIndex: 0 }),
  replaceSourceValue: (newValue) =>
    set((state) => ({
      source: state.source.map((value, index) =>
        index === state.currentIndex ? newValue : value,
      ),
    })),
  currentIndex: 0,
  setCurrentIndex: (currentIndex) => set({ currentIndex }),
  page: 0,
  setPage: (page) => set({ page }),
}))

export default useSourceStore
