export interface LicenseInventoryDTO {
  id?: number;
  softwareName: string;
  licenseKey: string;
  totalQuantity: number;
  availableQuantity?: number; // optional in request
  purchaseDate: string; // ISO format (e.g., 2025-07-28)
  expiryDate: string;
  departmentId: number;
  procurementRecordId: number;
}
