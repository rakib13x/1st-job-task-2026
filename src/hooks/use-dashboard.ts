import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export interface DashboardOverview {
  totalUsers: number;
  activeUsers: number;
  revenue: number;
  growth: number;
}

export interface DashboardUser {
  id: number;
  name: string;
  email: string;
  status: "active" | "inactive";
  joinDate: string;
}

export interface DashboardAnalytic {
  date: string;
  views: number;
  clicks: number;
  conversions: number;
}

export interface DashboardProduct {
  id: number;
  name: string;
  price: number;
  sales: number;
  category: "subscription" | "addon";
}

export interface DashboardResponse {
  overview: DashboardOverview;
  users: DashboardUser[];
  analytics: DashboardAnalytic[];
  products: DashboardProduct[];
}

const API_BASE =
  import.meta.env.VITE_API_BASE ?? "https://task-api-eight-flax.vercel.app";

const fetchDashboard = async (): Promise<DashboardResponse> => {
  const { data } = await axios.get<DashboardResponse>(
    `${API_BASE}/api/dashboard`,
  );
  return data;
};

export const useDashboard = () => {
  return useQuery<DashboardResponse>({
    queryKey: ["dashboard"],
    queryFn: fetchDashboard,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};

export const useDashboardOverview = () => {
  return useQuery<DashboardResponse, Error, DashboardOverview>({
    queryKey: ["dashboard"],
    queryFn: fetchDashboard,
    select: (data) => data.overview,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};

export const useDashboardUsers = () => {
  return useQuery<DashboardResponse, Error, DashboardUser[]>({
    queryKey: ["dashboard"],
    queryFn: fetchDashboard,
    select: (data) => data.users,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};

export const useDashboardAnalytics = () => {
  return useQuery<DashboardResponse, Error, DashboardAnalytic[]>({
    queryKey: ["dashboard"],
    queryFn: fetchDashboard,
    select: (data) => data.analytics,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};

export const useDashboardProducts = () => {
  return useQuery<DashboardResponse, Error, DashboardProduct[]>({
    queryKey: ["dashboard"],
    queryFn: fetchDashboard,
    select: (data) => data.products,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};
