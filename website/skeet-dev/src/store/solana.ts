'use client'

import { atom } from 'jotai'

type SolanaBalanceState = {
  sol: number
  elsol: number
  updated: number
  isUpdating: boolean
  isDisabled: boolean
  timeoutId: number | null
  messageTimeoutId: number | null
}

export const solanaBalanceAtom = atom<SolanaBalanceState>({
  sol: 0,
  elsol: 0,
  updated: 0,
  isUpdating: false,
  isDisabled: false,
  timeoutId: null,
  messageTimeoutId: null
})
