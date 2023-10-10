import { atomWithStorage } from 'jotai/utils'

export const metatraderAccountIdAtom = atomWithStorage<string | undefined>("metatrader-account-id", undefined)