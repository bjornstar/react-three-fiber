import { createContext } from 'react'
import type { UseBoundStore } from 'zustand'
import type { RootState } from './store'

export const context = createContext<UseBoundStore<RootState> | null>(null)
