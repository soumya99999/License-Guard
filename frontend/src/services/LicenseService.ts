import type { LicenseInventoryDTO } from './../types/LicenseInventoryDTO';
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const createLicense = async (dto: LicenseInventoryDTO) => {
    try{
        const response = await axios.post(`${API_BASE_URL}/licenses`, dto);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error creating license:', error);
        throw error;
    }
}

export const getLicensesByProcurementId = async (procurementId: number) => {
    try {
        const response = await axios.get<LicenseInventoryDTO[]>(
            `${API_BASE_URL}/licenses/procurement/${procurementId}`
        );
        return response.data;
    } catch (error) {
        console.error(`Error fetching licenses for procurement ID ${procurementId}:`, error);
        throw error;
    }
};

export const getAllLicenses = async () => {
    try {
        const response = await axios.get<LicenseInventoryDTO[]>(
            `${API_BASE_URL}/licenses`
        );
        return response.data;
    } catch (error) {
        console.error('Error fetching licenses:', error);
        throw error;
    }
}

