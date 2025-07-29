export interface ProcurementRecord {
  poHeaderId: number;
  orderNumber: string;
  creationDate: string; // ISO string
  statusCode: string;
  supplier: string;
  softwareName: string;
  quantity: number;
  currencyCode: string;
  total: number;
  departmentId: number;
  vendor: string;
  purchaseDate: string;
}
