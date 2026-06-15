
export type ApplicationStatus = "applied" | "interview" | "offer" | "rejected" | "withdrawn" | "unknown";

export interface Application {
  id: string;
  title: string;
  company: string | null;
  date: string;
  status: ApplicationStatus;
  confidence?: number;
}

export interface DashboardStats {
  total: number;
  interviews: number;
  offers: number;
  rejections: number;
}

export interface FunnelItem {
  stage: string;
  value: number;
  percent: number;
}

export interface JobRoleItem {
  role: string;
  percent: number;
}

export interface AvgTimeItem {
  stage: string;
  days: number;
}
