import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const store = (set: any, get: any) => ({
  addState: (key: string, value: any) =>
    set((state: any) => ({ ...state, [key]: value })),

  updateState: (key: string, value: any) => {
    const currentValue = get()[key];
    if (Array.isArray(currentValue) && Array.isArray(value)) {
      set((state: any) => ({
        ...state,
        [key]: [...currentValue, ...value],
      }));
    } else if (
      typeof currentValue === "object" &&
      typeof value === "object" &&
      currentValue !== null
    ) {
      set((state: any) => ({
        ...state,
        [key]: { ...currentValue, ...value },
      }));
    } else {
      set((state: any) => ({ ...state, [key]: value }));
    }
  },

  getState: (key: string) => get()[key],

  removeState: (key: string) =>
    set((state: any) => {
      const newState = { ...state };
      delete newState[key];
      return newState;
    }),

  resetState: () => {
    const currentState = get();
    const methods = {
      addState: currentState.addState,
      updateState: currentState.updateState,
      getState: currentState.getState,
      removeState: currentState.removeState,
      resetState: currentState.resetState,
    };
    set(methods);
  },
});

// Create and export the store hook with fixed configuration
export const useDynamicStore = create()(
  persist(store as any, {
    name: "dynamixx-store",
    storage: createJSONStorage(() => localStorage),
  })
);
