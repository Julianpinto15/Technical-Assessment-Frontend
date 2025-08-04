import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { useDashboardTrends } from "../../../hooks/useDashboardTrends";

export default function SalesTrendsChart() {
  const { data, loading } = useDashboardTrends();

  // Calcular los valores máximos dinámicamente
  const maxSales = data?.sales ? Math.max(...data.sales) : 0;
  const maxRevenue = data?.revenue ? Math.max(...data.revenue) : 0;

  // Configurar escalas con margen del 20%
  const salesMax = Math.ceil(maxSales * 1.2);
  const revenueMax = Math.ceil(maxRevenue * 1.2);

  const options: ApexOptions = {
    legend: {
      show: false,
      position: "top",
      horizontalAlign: "left",
    },
    colors: ["#465FFF", "#9CB9FF"],
    chart: {
      fontFamily: "Outfit, sans-serif",
      height: 310,
      type: "line",
      toolbar: {
        show: false,
      },
    },
    stroke: {
      curve: "straight",
      width: [2, 2],
    },
    fill: {
      type: "gradient",
      gradient: {
        opacityFrom: 0.55,
        opacityTo: 0,
      },
    },
    markers: {
      size: 0,
      strokeColors: "#fff",
      strokeWidth: 2,
      hover: {
        size: 6,
      },
    },
    grid: {
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      enabled: true,
      x: {
        format: "dd MMM yyyy",
      },
    },
    xaxis: {
      type: "category",
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      axisBorder: { show: false },
      axisTicks: { show: false },
      tooltip: { enabled: false },
    },
    yaxis: [
      {
        // Eje Y izquierdo para Sales
        seriesName: "Sales",
        min: 0,
        max: salesMax || 15000, // Máximo dinámico o 15k por defecto
        title: {
          text: "",
          style: {
            fontSize: "0px",
          },
        },
        labels: {
          style: {
            fontSize: "12px",
            colors: ["#6B7280"],
          },
          formatter: (val: number) => `${val.toLocaleString()}`,
        },
      },
      {
        // Eje Y derecho para Revenue
        opposite: true,
        seriesName: "Revenue",
        min: 0,
        max: revenueMax || 300000, // Máximo dinámico o 300k por defecto
        title: {
          text: "",
          style: {
            fontSize: "0px",
          },
        },
        labels: {
          style: {
            fontSize: "12px",
            colors: ["#6B7280"],
          },
          formatter: (val: number) => `$${val.toLocaleString()}`,
        },
      },
    ],
  };

  const series = [
    {
      name: "Sales",
      data: data?.sales ?? [],
    },
    {
      name: "Revenue",
      data: data?.revenue ?? [],
    },
  ];

  if (loading)
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Tendencias de Ventas e Ingresos
        </h3>
        <p className="text-sm text-gray-500">Cargando datos...</p>
      </div>
    );

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      {/* Header ejecutivo */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          📈 Análisis de Tendencias de Ventas e Ingresos
        </h3>
        <p className="text-sm text-gray-600">
          Evolución mensual de unidades vendidas vs ingresos generados
        </p>
      </div>

      <div className="max-w-full overflow-x-auto custom-scrollbar">
        <div id="chartEight" className="min-w-[1000px]">
          <Chart options={options} series={series} type="area" height={310} />
        </div>
      </div>

      {/* KPIs adicionales */}
      <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
        <div className="text-center p-3 bg-blue-50 rounded">
          <span className="block font-medium text-blue-900">
            Pico de Ventas
          </span>
          <span className="text-blue-700">
            {data?.sales ? Math.max(...data.sales).toLocaleString() : 0}{" "}
            unidades
          </span>
        </div>
        <div className="text-center p-3 bg-green-50 rounded">
          <span className="block font-medium text-green-900">
            Ingresos Máximos
          </span>
          <span className="text-green-700">
            ${data?.revenue ? Math.max(...data.revenue).toLocaleString() : 0}
          </span>
        </div>
      </div>
    </div>
  );
}
