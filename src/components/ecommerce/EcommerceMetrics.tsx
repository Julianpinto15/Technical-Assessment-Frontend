// src/components/ecommerce/EcommerceMetrics.tsx
import { useEffect, useState } from "react";
import axios from "axios";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  BoxIconLine,
  GroupIcon,
} from "../../icons";
import Badge from "../ui/badge/Badge";

interface DashboardData {
  userCount: number;
  forecastCount: number;
  alertCount: number;
  avgPrecision: number;
}

export default function EcommerceMetrics() {
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) throw new Error("No token found");
        const response = await axios.get(
          "http://localhost:3000/api/dashboard",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching dashboard data", error);
      }
    };

    fetchData();
  }, []);

  if (!data) return <div className="text-center py-8">Cargando...</div>;

  const metrics = [
    {
      title: "Usuarios",
      value: data.userCount,
      icon: GroupIcon,
      iconColor: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-50 dark:bg-blue-500/10",
      badge: { color: "success" as const, icon: ArrowUpIcon, text: "+0%" },
    },
    {
      title: "Pronósticos",
      value: data.forecastCount,
      icon: BoxIconLine,
      iconColor: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-50 dark:bg-green-500/10",
      badge: { color: "error" as const, icon: ArrowDownIcon, text: "-0%" },
    },
    {
      title: "Alertas",
      value: data.alertCount,
      icon: BoxIconLine,
      iconColor: "text-red-600 dark:text-red-400",
      bgColor: "bg-red-50 dark:bg-red-500/10",
      badge: { color: "warning" as const, icon: ArrowUpIcon, text: "+5%" },
    },
    {
      title: "Precisión",
      value: `${(data.avgPrecision * 100).toFixed(2)}%`,
      icon: BoxIconLine,
      iconColor: "text-purple-600 dark:text-purple-400",
      bgColor: "bg-purple-50 dark:bg-purple-500/10",
      badge: { color: "success" as const, icon: ArrowUpIcon, text: "+2%" },
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric, index) => (
        <div
          key={index}
          className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md hover:border-gray-300 dark:border-gray-800 dark:bg-white/[0.03] dark:hover:border-gray-700"
        >
          {/* Icon Container */}
          <div
            className={`flex items-center justify-center w-14 h-14 rounded-xl ${metric.bgColor} transition-transform duration-200 group-hover:scale-105`}
          >
            <metric.icon className={`w-7 h-7 ${metric.iconColor}`} />
          </div>

          {/* Content */}
          <div className="mt-6 text-center">
            <div className="flex flex-col items-center space-y-2">
              {/* Título */}
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {metric.title}
              </p>

              {/* Número */}
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white leading-none">
                {metric.value}
              </h3>

              {/* Badge */}
              <Badge color={metric.badge.color}>
                <metric.badge.icon className="w-3.5 h-3.5" />
                <span className="ml-1 text-xs font-semibold">
                  {metric.badge.text}
                </span>
              </Badge>
            </div>
          </div>

          {/* Subtle gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent to-gray-50/20 opacity-0 transition-opacity duration-200 group-hover:opacity-100 dark:to-white/5 pointer-events-none" />
        </div>
      ))}
    </div>
  );
}
