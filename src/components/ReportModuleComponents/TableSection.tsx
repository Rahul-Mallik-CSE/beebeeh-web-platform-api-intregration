/** @format */

import React from "react";
import CustomReportTable from "./SubComponents/CustomReportTable";
import { ReportModuleData } from "@/redux/features/adminFeatures/reportmoduleAPI";

interface TableSectionProps {
  data?: ReportModuleData;
}

const TableSection: React.FC<TableSectionProps> = ({ data }) => {
  const technicianColumns = [
    { key: "technician", label: "Technicians", width: "40%" },
    { key: "complete", label: "Complete", width: "30%" },
    { key: "avg_time", label: "Avg Time", width: "30%" },
  ];

  const partsUsageColumns = [
    { key: "parts_name", label: "Parts Name", width: "40%" },
    { key: "used_qty", label: "Used Qty", width: "30%" },
    { key: "jobs", label: "Jobs", width: "30%" },
  ];

  const productStockColumns = [
    { key: "product_name", label: "Product Name", width: "25%" },
    { key: "product_id", label: "Product ID", width: "15%" },
    { key: "available_units", label: "Available Units", width: "18%" },
    { key: "status", label: "Status", width: "20%" },
    { key: "last_stock", label: "Last Stock", width: "22%" },
  ];

  const partsStockColumns = [
    { key: "part_name", label: "Part Name", width: "25%" },
    { key: "part_id", label: "Part ID", width: "15%" },
    { key: "available_units", label: "Available Units", width: "18%" },
    { key: "status", label: "Status", width: "20%" },
    { key: "last_stock", label: "Last Stock", width: "22%" },
  ];

  const consumablesUsageColumns = [
    { key: "technician", label: "Technician", width: "30%" },
    { key: "consumable_category", label: "Consumable Category", width: "30%" },
    { key: "total_qty", label: "Total Qty", width: "20%" },
    { key: "total_value", label: "Total Value", width: "20%" },
  ];

  const dailyPartsUsageColumns = [
    { key: "date", label: "Date", width: "20%" },
    { key: "part_name", label: "Part Name", width: "20%" },
    { key: "used_qty", label: "Used Qty", width: "15%" },
    { key: "part_id", label: "Part ID", width: "20%" },
  ];

  // Format date to show only date part (YYYY-MM-DD)
  const formatDate = (dateString: string | null) => {
    if (!dateString) return "N/A";
    return dateString.split("T")[0];
  };

  // Custom cell renderer for formatting dates
  const renderCell = (key: string, value: any) => {
    if (key === "date" || key === "last_stock") {
      return formatDate(value);
    }
    return value;
  };

  return (
    <div className="w-full space-y-4 sm:space-y-6">
      {/* First Row - Technician Performance and Parts Usage */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <CustomReportTable
          title="Technician Performance Table"
          columns={technicianColumns}
          data={data?.technician_performance_table || []}
          renderCell={renderCell}
        />
        <CustomReportTable
          title="Parts Usage Table"
          columns={partsUsageColumns}
          data={data?.parts_usage_table || []}
          renderCell={renderCell}
        />
      </div>

      {/* Second Row - Product Stock and Parts Stock */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <CustomReportTable
          title="Product Stock Levels Table"
          columns={productStockColumns}
          data={data?.product_stock_levels_table || []}
          renderCell={renderCell}
        />
        <CustomReportTable
          title="Parts Stock Levels Table"
          columns={partsStockColumns}
          data={data?.parts_stock_levels_table || []}
          renderCell={renderCell}
        />
      </div>

      {/* Third Row - Consumables Usage and Daily Parts Usage */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <CustomReportTable
          title="Consumables Usage Report"
          columns={consumablesUsageColumns}
          data={data?.consumables_usage_report || []}
          renderCell={renderCell}
        />
        <CustomReportTable
          title="Daily Parts Usage Report"
          columns={dailyPartsUsageColumns}
          data={data?.daily_parts_usage_report || []}
          renderCell={renderCell}
        />
      </div>
    </div>
  );
};

export default TableSection;
