// src/store/procurementStore.ts
import { create } from 'zustand';
import type { ProcurementRecord } from '../types/ProcurementRecord';

interface ProcurementStore {
  procurementRecords: ProcurementRecord[];
  selectedProcurement: ProcurementRecord | null;
  setProcurementRecords: (records: ProcurementRecord[]) => void;
  selectProcurement: (record: ProcurementRecord) => void;
  clearSelectedProcurement: () => void;
}

export const useProcurementStore = create<ProcurementStore>((set) => ({
  procurementRecords: [],
  selectedProcurement: null,
  setProcurementRecords: (records) => set({ procurementRecords: records }),
  selectProcurement: (record) => set({ selectedProcurement: record }),
  clearSelectedProcurement: () => set({ selectedProcurement: null }),
}));
