export interface DynamicState {
  [key: string]: any;
  addState: (key: string, value: any) => void;
  updateState: (key: string, value: any) => void;
  removeState: (key: string) => void;
  getState: (key: string) => any;
  resetState: () => void;
}

export type CreateStoreOptions<T> = {
  name: string;
  persist?: boolean;
  storage?: Storage;
  initialState: T;
};