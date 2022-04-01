import * as React from 'react'
import type { UseBoundStore } from 'zustand'

import { context } from './context'
import type { RootState } from './store'

export function Provider<TElement extends Element>({
  store,
  children,
  onCreated,
  rootElement,
}: {
  onCreated?: (state: RootState) => void
  store: UseBoundStore<RootState>
  children: React.ReactNode
  rootElement: TElement
  parent?: React.MutableRefObject<TElement | undefined>
}) {
  React.useLayoutEffect(() => {
    const state = store.getState()
    // Flag the canvas active, rendering will now begin
    state.set((state) => ({ internal: { ...state.internal, active: true } }))
    // Notifiy that init is completed, the scene graph exists, but nothing has yet rendered
    if (onCreated) onCreated(state)
    // Connect events to the targets parent, this is done to ensure events are registered on
    // a shared target, and not on the canvas itself
    if (!store.getState().events.connected) state.events.connect?.(rootElement)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return <context.Provider value={store}>{children}</context.Provider>
}
