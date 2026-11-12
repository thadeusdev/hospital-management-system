import React from "react";
import Chart from "../../components/chart/Chart";
import WidgetLarge from "../../components/widgetLarge/WidgetLarge";
import WidgetSmall from "../../components/widgetSmall/WidgetSmall";
import FeaturedInfo from "../featuredInfo/FeaturedInfo";

const Dashboard = () => {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 lg:py-8 space-y-6 lg:space-y-8">
      {/* Page header */}
      <header className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-gray-900">
            Dashboard
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Live overview of your hospital operations
          </p>
        </div>
      </header>

      {/* KPI cards */}
      <section aria-labelledby="kpi-heading">
        <h2 id="kpi-heading" className="sr-only">
          Key metrics
        </h2>
        <FeaturedInfo />
      </section>

      {/* Chart */}
      <section aria-labelledby="chart-heading">
        <h2 id="chart-heading" className="sr-only">
          Activity chart
        </h2>
        <Chart />
      </section>

      {/* Two-panel widgets: stack on mobile, side-by-side on lg+ */}
      <section
        aria-labelledby="widgets-heading"
        className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6"
      >
        <h2 id="widgets-heading" className="sr-only">
          Recent activity
        </h2>
        <WidgetSmall />
        <WidgetLarge />
      </section>
    </div>
  );
};

export default Dashboard;
