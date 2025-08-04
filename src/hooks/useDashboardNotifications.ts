import axios from "axios";
import { useEffect, useState, useCallback } from "react";

// Interface para las notificaciones
interface Notification {
  id: string;
  message: string;
  sku?: string;
  timestamp: string;
  type: "alert" | "info" | "welcome";
}

// Interface para las alertas de la API
interface AlertApiResponse {
  id: string;
  message: string;
  sku: string;
  createdAt: string;
}

// Hook para obtener notificaciones con doble funcionalidad
export const useDashboardNotifications = () => {
  const [data, setData] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [hasUnread, setHasUnread] = useState(true);

  // Función para obtener notificaciones del dashboard (funcionalidad original)
  const fetchDashboardNotifications = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        throw new Error("No token found in localStorage");
      }
      const res = await axios.get(
        "http://localhost:3000/api/dashboard/notifications",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return res.data;
    } catch (error) {
      console.error("Error fetching dashboard notifications:", error);
      return [];
    }
  };

  // Función para obtener alertas (nueva funcionalidad)
  const fetchAlerts = async (): Promise<Notification[]> => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("No token found");

      const response = await axios.get<AlertApiResponse[]>(
        "http://localhost:3000/api/alerts",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const fetchedAlerts = response.data.map((alert: AlertApiResponse) => ({
        id: `alert_${alert.id}`, // Prefijo para evitar conflictos de ID
        message: alert.message,
        sku: alert.sku !== "N/A" ? alert.sku : undefined,
        type: alert.sku !== "N/A" ? ("alert" as const) : ("info" as const),
        timestamp: alert.createdAt,
      }));
      return fetchedAlerts;
    } catch (error) {
      console.error("Error fetching alerts:", error);
      return [];
    }
  };

  // Función principal que combina ambas fuentes
  const fetchAllNotifications = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      // Obtener notificaciones de ambas fuentes
      const [dashboardNotifications, alerts] = await Promise.all([
        fetchDashboardNotifications(),
        fetchAlerts(),
      ]);

      // Combinar y ordenar por timestamp (más recientes primero)
      const allNotifications = [...dashboardNotifications, ...alerts].sort(
        (a, b) =>
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );

      setData(allNotifications);

      // Lógica para hasUnread:
      // - Si hay alertas, siempre mostrar punto naranja
      // - Si solo hay notificaciones del dashboard, aplicar la lógica original
      const hasAlerts = alerts.length > 0;
      const onlyWelcomeFromDashboard =
        dashboardNotifications.length === 1 &&
        dashboardNotifications[0].id === "welcome";

      setHasUnread(
        hasAlerts ||
          dashboardNotifications.length > 1 ||
          !onlyWelcomeFromDashboard
      );
    } catch {
      setError("No se pudo cargar las notificaciones.");
    } finally {
      setLoading(false);
    }
  }, []); // useCallback para evitar recrear la función en cada render

  useEffect(() => {
    fetchAllNotifications();

    // Polling para actualizaciones en tiempo real (cada 30 segundos)
    const interval = setInterval(fetchAllNotifications, 30000);

    return () => clearInterval(interval);
  }, [fetchAllNotifications]);

  // Función para refrescar manualmente las notificaciones
  const refreshNotifications = () => {
    fetchAllNotifications();
  };

  return {
    data,
    loading,
    error,
    hasUnread,
    setHasUnread,
    refreshNotifications, // Nueva función para refrescar manualmente
  };
};
