// src/store/deptRequestStore.ts
import { create } from 'zustand';
import type { DepartmentJoinRequest } from '../types/DepartmentJoinRequest';
import {
    fetchJoinRequests,
    acceptRequest,
    rejectRequest,
} from '../services/deptRequestService';

interface DeptRequestStore {
    joinRequests: DepartmentJoinRequest[];
    loading: boolean;
    fetchJoinRequests: () => Promise<void>;
    accept: (id: number) => Promise<void>;
    reject: (id: number) => Promise<void>;
}

export const useDeptRequestStore = create<DeptRequestStore>((set) => ({
    joinRequests: [],
    loading: false,

    fetchJoinRequests: async () => {
        set({ loading: true });
        try {
            const data = await fetchJoinRequests(); // Must return DepartmentJoinRequest[]
            set({ joinRequests: data });
        } catch (err) {
            console.error('Failed to fetch join requests:', err);
        } finally {
            set({ loading: false });
        }
    },

    accept: async (id: number) => {
        try {
            await acceptRequest(id);
            set((state) => ({
                joinRequests: state.joinRequests.filter((req) => req.id !== id),
            }));
        } catch (err) {
            console.error('Failed to accept request:', err);
        }
    },

    reject: async (id: number) => {
        try {
            await rejectRequest(id);
            set((state) => ({
                joinRequests: state.joinRequests.filter((req) => req.id !== id),
            }));
        } catch (err) {
            console.error('Failed to reject request:', err);
        }
    },
}));
