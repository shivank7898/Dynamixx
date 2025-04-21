import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { DynamicState } from "./types";

const store = (set: any, get: any): DynamicState => ({
  addState: (key: string, value: any) =>
    set((state: DynamicState) => ({ ...state, [key]: value })),

  updateState: (key: string, value: any) => {
    const currentValue = get()[key];
    if (Array.isArray(currentValue) && Array.isArray(value)) {
      set((state: DynamicState) => ({
        ...state,
        [key]: [...currentValue, ...value],
      }));
    } else if (
      typeof currentValue === "object" &&
      typeof value === "object" &&
      currentValue !== null
    ) {
      set((state: DynamicState) => ({
        ...state,
        [key]: { ...currentValue, ...value },
      }));
    } else {
      set((state: DynamicState) => ({ ...state, [key]: value }));
    }
  },

  getState: (key: string) => get()[key],

  removeState: (key: string) =>
    set((state: DynamicState) => {
      const newState = { ...state };
      delete newState[key];
      return newState;
    }),

  resetState: () => {
    const currentState = get() as DynamicState;
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

export const useDynamicStore = create<DynamicState>()(
  persist(store, {
    name: "dynamixx-store",
    storage: createJSONStorage(() => localStorage),
  })
);