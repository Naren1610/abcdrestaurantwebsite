import { useSyncExternalStore } from 'react'

const emptySubscribe = () => () => {}

export const useStore = <T, F>(
  store: (callback: (state: T) => unknown) => unknown,
  callback: (state: T) => F
) => {
  const result = store(callback) as F
  const isClient = useSyncExternalStore(emptySubscribe, () => true, () => false)

  return isClient ? result : undefined as unknown as F
}
