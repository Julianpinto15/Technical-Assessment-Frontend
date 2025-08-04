import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { useDashboardTrends } from "../../../hooks/useDashboardTrends";

export default function MonthlyPerformanceChart() {
  const { data, loading } = useDashboardTrends();

  // Calcular el valor máximo dinámicamente
  const maxSales = data?.sales ? Math.max(...data.sales) : 0;
  const salesMax = Math.ceil(maxSales * 1.2); // 20% de margen

  const options: ApexOptions = {
    colors: ["#465fff"],
    chart: {
      fontFamily: "Outfit, sans-serif",
      type: "bar",
      height: 180,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "39%",
        borderRadius: 5,
        borderRadiusApplication: "end",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 4,
      colors: ["transparent"],
    },
    xaxis: {
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
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    legend: {
      show: true,
      position: "top",
      horizontalAlign: "left",
      fontFamily: "Outfit",
    },
    yaxis: {
      min: 0,
      max: salesMax || 15000, // Escala automática o 15k por defecto
      title: {
        text: undefined,
      },
      labels: {
        style: {
          fontSize: "12px",
          colors: ["#6B7280"],
        },
        formatter: (val: number) => `${val.toLocaleString()}`,
      },
    },
    grid: {
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      x: {
        show: false,
      },
      y: {
        formatter: (val: number) => `${val.toLocaleString()} unidades`,
      },
    },
  };

  const series = [
    {
      name: "Sales",
      data: data?.sales ?? [],
    },
  ];

  if (loading)
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Performance Mensual
        </h3>
        <p className="text-sm text-gray-500">Cargando datos...</p>
      </div>
    );

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      {/* Header ejecutivo */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          📊 Performance de Ventas por Mes
        </h3>
        <p className="text-sm text-gray-600">
          Comparativo mensual de unidades vendidas
        </p>
      </div>

      <div className="max-w-full overflow-x-auto custom-scrollbar">
        <div id="chartOne" className="min-w-[1000px]">
          <Chart options={options} series={series} type="bar" height={180} />
        </div>
      </div>

      {/* Insight ejecutivo */}
      <div className="mt-4 p-3 bg-gray-50 rounded">
        <p className="text-sm text-gray-700">
          💡 <strong>Insight:</strong>{" "}
          {data?.sales && data.sales.length > 1
            ? data.sales[data.sales.length - 1] >
              data.sales[data.sales.length - 2]
              ? "Tendencia ascendente en el último período"
              : "Oportunidad de mejora identificada"
            : "Datos insuficientes para análisis de tendencia"}
        </p>
      </div>
    </div>
  );
}
