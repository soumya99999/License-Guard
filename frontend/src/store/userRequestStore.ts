// src/store/deptRequestStore.ts
import { create } from 'zustand';

interface userRequestStore {
  sentRequests: number[];
  addSentRequest: (deptId: number) => void;
  hasSentRequest: (deptId: number) => boolean;
  setInitialRequests: (ids: number[]) => void;
}

export const useRequestStore = create<userRequestStore>((set, get) => ({
  sentRequests: [],
  addSentRequest: (deptId: number) =>
    set((state) => ({
      sentRequests: [...state.sentRequests, deptId],
    })),
  hasSentRequest: (deptId: number) =>
    get().sentRequests.includes(deptId),
  setInitialRequests: (ids: number[]) =>
    set(() => ({
      sentRequests: ids,
    })),
}));
