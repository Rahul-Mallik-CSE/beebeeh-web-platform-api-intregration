/** @format */
"use client";
import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { JobDistribution } from "@/redux/features/adminFeatures/reportmoduleAPI";

interface JobDistributionChartProps {
  data?: JobDistribution;
}

const JobDistributionChart: React.FC<JobDistributionChartProps> = ({
  data,
}) => {
  // Transform API data to chart format
  const chartData = data
    ? [
        {
          name: "Installation",
          value: data.installation,
          percentage: data.installation,
          color: "#B91C1C",
        },
        {
          name: "Repair",
          value: data.repair,
          percentage: data.repair,
          color: "#E9C8C8",
        },
        {
          name: "Maintenance",
          value: data.maintenance,
          percentage: data.maintenance,
          color: "#7C3434",
        },
      ]
    : [];

  const renderCustomLabel = (entry: any) => {
    const RADIAN = Math.PI / 180;
    const radius = entry.outerRadius * 0.65;
    const x = entry.cx + radius * Math.cos(-entry.midAngle * RADIAN);
    const y = entry.cy + radius * Math.sin(-entry.midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
        className="font-semibold"
      >
        <tspan x={x} dy="-8" fontSize="16" fontWeight="bold">
          {entry.percentage}%
        </tspan>
        <tspan x={x} dy="18" fontSize="13" fontWeight="500">
          {entry.name}
        </tspan>
      </text>
    );
  };

  return (
    <div className="bg-transparent">
      <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-[#535F72] mb-3 sm:mb-4">
        Job Distribution by Category
      </h2>
      <div className="bg-white rounded-2xl py-3 sm:py-4">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomLabel}
              outerRadius={100}
              innerRadius={0}
              fill="#8884d8"
              dataKey="value"
              startAngle={90}
              endAngle={450}
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.color}
                  stroke="white"
                  strokeWidth={3}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default JobDistributionChart;
