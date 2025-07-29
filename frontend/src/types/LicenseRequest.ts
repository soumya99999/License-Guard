export interface LicenseRequestDTO {
  id?: number;
  softwareName: string;
  systemId: string;
  userId: number;
  requestedAt?: string;
  status?: string;
  reason?: string;
}
