export interface AssignLicenseData {
  licenseInventoryId: number;
  assignedToUserId: number;
  assignedByUserId: number;
  assignedQuantity: number;
  expiresAt: string; // ISO date string
}