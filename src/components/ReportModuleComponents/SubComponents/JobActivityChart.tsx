/** @format */
"use client";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { WeeklyJobActivity } from "@/redux/features/adminFeatures/reportmoduleAPI";

interface JobActivityChartProps {
  data?: WeeklyJobActivity[];
}

const JobActivityChart: React.FC<JobActivityChartProps> = ({ data }) => {
  // Transform API data to chart format
  const chartData =
    data?.map((item) => ({
      day: new Date(item.date).toLocaleDateString("en-US", {
        weekday: "short",
      }),
      installation: item.installation,
      maintenance: item.maintenance,
      repair: item.repair,
    })) || [];

  return (
    <div className="bg-transparent">
      <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-[#535F72] mb-3 sm:mb-4">
        Weekly Jobs Activity
      </h2>
      <div className="bg-white rounded-2xl py-4 sm:py-6 shadow-sm px-2 sm:px-0">
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={chartData} barCategoryGap="20%" barGap={3}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#e5e7eb"
              vertical={false}
            />
            <XAxis
              dataKey="day"
              tick={{ fill: "#9CA3AF", fontSize: 13 }}
              axisLine={false}
              tickLine={false}
              tickMargin={10}
            />
            <YAxis
              tick={{ fill: "#9CA3AF", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              domain={[0, 50]}
              ticks={[0, 10, 20, 30, 40, 50]}
              tickMargin={10}
            />
            <Legend
              verticalAlign="top"
              height={45}
              iconType="circle"
              iconSize={10}
              wrapperStyle={{
                paddingBottom: "15px",
                fontSize: "18px",
                color: "#6B7280",
              }}
              align="right"
            />
            <Bar
              dataKey="installation"
              fill="#B91C1C"
              radius={[8, 8, 8, 8]}
              barSize={14}
              name="Installation"
            />
            <Bar
              dataKey="maintenance"
              fill="#7C3434"
              radius={[8, 8, 8, 8]}
              barSize={14}
              name="Maintenance"
            />

            <Bar
              dataKey="repair"
              fill="#E9C8C8"
              radius={[8, 8, 8, 8]}
              barSize={14}
              name="Repair"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default JobActivityChart;
