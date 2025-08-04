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
        const res = await axios.get("/api/dashboard/trends", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
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
