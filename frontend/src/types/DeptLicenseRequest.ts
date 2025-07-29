export interface DeptLicenseRequestDTO {
  id: number;
  departmentId: number;
  softwareName: string;
  requestedQuantity: number;
  status: string;
  reason?: string;
  email: string;
  requestedAt: string;
}
