/** @format */

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { TechnicianDashboardData } from "@/redux/features/adminFeatures/technicianAPI";

interface TechnicianChartSectionProps {
  data: TechnicianDashboardData;
}

const TechnicianChartSection: React.FC<TechnicianChartSectionProps> = ({ data }) => {
  const { performance_analytics, stats } = data;

  // Transform weekly bars to recharts format
  const weeklyData = performance_analytics.bars.map((bar) => ({
    day: bar.day,
    value: bar.installations + bar.repairs + bar.maintenances,
    // Store original values for potential use in tooltip
    installations: bar.installations,
    repairs: bar.repairs,
    maintenances: bar.maintenances,
  }));

  // Job type distribution data for Pie Chart
  const jobTypeData = [
    { name: "Installations", value: stats.job_type_distribution_this_week.installations },
    { name: "Repairs", value: stats.job_type_distribution_this_week.repairs },
    { name: "Maintenances", value: stats.job_type_distribution_this_week.maintenances },
  ].filter(item => item.value > 0);

  const COLORS = ["#b91c1c", "#6b4423", "#4a90c9"];

  return (
    <div className="bg-white flex flex-col lg:flex-row gap-6 lg:gap-8 items-stretch pt-4">
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
              />

              <Bar
                dataKey="value"
                fill="#d1d5db"
                radius={[6, 6, 6, 6]}
                isAnimationActive={true}
                maxBarSize={20}
              >
                {weeklyData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.value > 0 ? "#b91c1c" : "#d1d5db"}
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
                  data={jobTypeData.length > 0 ? jobTypeData : [{ name: "None", value: 1 }]}
                  innerRadius={55}
                  outerRadius={85}
                  startAngle={90}
                  endAngle={-270}
                  dataKey="value"
                  strokeWidth={0}
                >
                  {jobTypeData.length > 0 ? (
                    jobTypeData.map((entry, index) => (
                      <Cell
                        key={`slice-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))
                  ) : (
                    <Cell fill="#f3f4f6" />
                  )}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Center Value */}
          <div className="absolute text-center pointer-events-none">
            <div className="text-3xl sm:text-4xl font-bold text-slate-800">
              {stats.job_type_distribution_this_week.total}
            </div>
            <div className="text-[10px] text-gray-400 uppercase">Total</div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-x-4 gap-y-2 justify-center">
          {jobTypeData.map((d, i) => (
            <div key={d.name} className="flex items-center gap-2">
              <span
                style={{ backgroundColor: COLORS[i % COLORS.length] }}
                className="w-2.5 h-2.5 rounded-full shrink-0"
              />
              <span className="text-xs text-slate-600">
                {d.name}: {d.value}
              </span>
            </div>
          ))}
          {jobTypeData.length === 0 && (
            <span className="text-xs text-slate-400 italic">No jobs this week</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default TechnicianChartSection;
