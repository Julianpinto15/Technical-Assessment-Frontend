import { useEffect, useState } from "react";
import axios from "axios";

type TrendsData = {
  sales: number[];
  revenue: number[];
};

export const useDashboardTrends = () => {
  const [data, setData] = useState<TrendsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTrends = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const res = await axios.get(
          "http://localhost:3000/api/dashboard/trends?startDate=2024-01-01&endDate=2024-12-31",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setData(res.data);
      } catch {
        setError("No se pudo cargar las tendencias.");
      } finally {
        setLoading(false);
      }
    };

    fetchTrends();
  }, []);

  return { data, loading, error };
};
