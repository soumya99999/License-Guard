export interface AssignLicenseData {
  id: number;
  licenseInventoryId: number | null | undefined;
  departmentId: number;
  assignedQuantity: number;
  expiresAt: string; // Format should be 'YYYY-MM-DD'
  softwareName: string;
  deptLicenseRequestId?: number;
}
