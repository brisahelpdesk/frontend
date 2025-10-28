export interface SLA {
  id: number;
  name: string;
  description: string;
  responseTime: number;
  resolutionTime: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateSLAData {
  name: string;
  description: string;
  responseTime: number;
  resolutionTime: number;
  isActive: boolean;
}