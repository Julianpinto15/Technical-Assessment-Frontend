import axios from "axios";
import { useEffect, useState } from "react";

// Interface para las notificaciones
interface Notification {
  id: string;
  message: string;
  sku?: string;
  timestamp: string;
  type: string;
}

// Hook para obtener notificaciones
export const useDashboardNotifications = () => {
  const [data, setData] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [hasUnread, setHasUnread] = useState(true); // Para controlar el punto naranja

  useEffect(() => {
    const fetchNotifications = async () => {
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
        setData(res.data);
        // Si solo hay una notificación de bienvenida, no mostrar el punto naranja
        setHasUnread(res.data.length > 1 || res.data[0].id !== "welcome");
      } catch {
        setError("No se pudo cargar las tendencias.");
      } finally {
        setLoading(false);
      }
    };
    fetchNotifications();
  }, []);

  return { data, loading, error, hasUnread, setHasUnread };
};
