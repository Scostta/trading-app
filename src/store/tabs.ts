import { atomWithStorage } from 'jotai/utils'

export const activeTabIndexAtom = atomWithStorage<number>("active-tab-index", 0)