import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { CreateStoreOptions } from "./types";
export function createStore<T extends object>(options: CreateStoreOptions<T>) {
  const {
    name,
    initialState,
    persist: shouldPersist = false,
    storage = typeof window !== "undefined" ? window.localStorage : undefined,
  } = options;

  const store = (set: any, get: any) => ({
    ...initialState,
    setState: (updates: Partial<T>) =>
      set((state: T) => ({ ...state, ...updates })),
    getState: () => get(),
    reset: () => set(initialState),
  });

  if (shouldPersist && storage) {
    return create()(
      persist(store as any, {
        name,
        storage: createJSONStorage(() => storage),
      })
    );
  }

  return create()(store);
}
