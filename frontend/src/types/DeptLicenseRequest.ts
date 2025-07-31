export interface DeptLicenseRequest {
  id: number;
  departmentId: number;
  softwareName: string;
  requestedQuantity: number;
  status: string;
  requestedAt: string; // ISO date string
  requestedByUserId: number;
  requestedByEmail: string;
}
