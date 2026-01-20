/** @format */

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const TechnicianChartSection: React.FC = () => {
  // Weekly performance data (example). Replace with real data as needed.
  const weeklyData = [
    { day: "Mon", value: 120 },
    { day: "Tue", value: 95 },
    { day: "Wed", value: 130 },
    { day: "Thu", value: 80 },
    { day: "Fri", value: 105 },
    { day: "Sat", value: 125 },
    { day: "Sun", value: 100 },
  ];

  // Job type distribution data - matches the 560 total shown in image
  const jobTypeData = [
    { name: "Installations", value: 280 },
    { name: "Repair", value: 180 },
    { name: "Retention", value: 100 },
  ];

  const COLORS = ["#b91c1c", "#6b4423", "#4a90c9"];

  // Use technician details for summary data

  return (
    <div className="bg-white flex flex-col lg:flex-row gap-6 lg:gap-8 items-stretch">
      {/* Left Section: Performance Analytics */}
      <div className="flex-1 min-w-0 border border-gray-200 rounded-lg p-4 sm:p-6">
        <h3 className="text-sm sm:text-base font-semibold text-slate-700 mb-4 sm:mb-6">
          Performance Analytics
        </h3>
        <div className="w-full h-[200px] sm:h-60">
          <ResponsiveContainer>
            <BarChart
              data={weeklyData}
              margin={{ top: 20, right: 10, left: -20, bottom: 5 }}
              barSize={20}
            >
              <CartesianGrid
                stroke="#e5e7eb"
                vertical={false}
                strokeDasharray="0"
              />

              <XAxis
                dataKey="day"
                tick={{ fontSize: 11, fill: "#6b7280" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "#6b7280" }}
                axisLine={false}
                tickLine={false}
                domain={[0, 170]}
              />

              <Bar
                dataKey="value"
                fill="#d1d5db"
                radius={[6, 6, 6, 6]}
                isAnimationActive={false}
                maxBarSize={20}
              >
                {weeklyData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={index === 2 ? "#b91c1c" : "#d1d5db"}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Right Section: Job Type Distribution */}
      <div className="w-full lg:w-[350px] xl:w-[400px] shrink-0 border border-gray-200 rounded-lg p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h3 className="text-sm sm:text-base font-semibold text-slate-700">
            Job Type Distribution
          </h3>
          <span className="text-xs text-slate-400">This Week</span>
        </div>

        {/* Donut Chart */}
        <div className="relative flex items-center justify-center mb-4 sm:mb-6">
          <div className="w-[180px] h-[180px] sm:w-[200px] sm:h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={jobTypeData}
                  innerRadius={55}
                  outerRadius={85}
                  startAngle={90}
                  endAngle={-270}
                  dataKey="value"
                  strokeWidth={0}
                >
                  {jobTypeData.map((entry, index) => (
                    <Cell
                      key={`slice-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Center Value */}
          <div className="absolute text-center pointer-events-none">
            <div className="text-3xl sm:text-4xl font-bold text-slate-800">
              560
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex  gap-2 sm:gap-3">
          {jobTypeData.map((d, i) => (
            <div key={d.name} className="flex items-center gap-3">
              <span
                style={{ backgroundColor: COLORS[i] }}
                className="w-2.5 h-2.5 rounded-full shrink-0"
              />
              <span className="text-xs sm:text-sm text-slate-600">
                {d.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TechnicianChartSection;
