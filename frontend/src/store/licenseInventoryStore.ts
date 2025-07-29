import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { LicenseInventoryDTO } from '../types/LicenseInventoryDTO';

interface LicenseInventoryState {
  licenses: LicenseInventoryDTO[];
  createdStatus: boolean[]; // true if license created for index
  viewMode: 'list' | 'form';
  currentFormIndex: number | null;
  setLicenses: (licenses: LicenseInventoryDTO[]) => void;
  markCreated: (index: number) => void;
  setViewMode: (mode: 'list' | 'form', index?: number | null) => void;
  updateLicenseForm: (index: number, data: Partial<LicenseInventoryDTO>) => void;
  reset: () => void;
}

export const useLicenseInventoryStore = create<LicenseInventoryState>()(
  persist(
    (set) => ({
      licenses: [],
      createdStatus: [],
      viewMode: 'list',
      currentFormIndex: null,
      setLicenses: (licenses) =>
        set({
          licenses,
          createdStatus: new Array(licenses.length).fill(false),
          viewMode: 'list',
          currentFormIndex: null,
        }),
      markCreated: (index) =>
        set((state) => {
          const newStatus = [...state.createdStatus];
          newStatus[index] = true;
          return { createdStatus: newStatus };
        }),
      setViewMode: (mode, index = null) =>
        set({ viewMode: mode, currentFormIndex: index }),
      updateLicenseForm: (index, data) =>
        set((state) => {
          const newLicenses = [...state.licenses];
          newLicenses[index] = { ...newLicenses[index], ...data };
          return { licenses: newLicenses };
        }),
      reset: () =>
        set({
          licenses: [],
          createdStatus: [],
          viewMode: 'list',
          currentFormIndex: null,
        }),
    }),
    {
      name: 'license-inventory-storage', // name of the item in localStorage
      partialize: (state) => ({
        licenses: state.licenses,
        createdStatus: state.createdStatus,
        viewMode: state.viewMode,
        currentFormIndex: state.currentFormIndex,
      }),
    }
  )
);
