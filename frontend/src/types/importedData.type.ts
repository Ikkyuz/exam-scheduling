export type Status = 'success' | 'pending' | 'error';

export interface ImportedData {
  id: string;
  fileName: string;
  type: string;
  uploadDate: string;
  recordCount: number;
  status: Status;
}