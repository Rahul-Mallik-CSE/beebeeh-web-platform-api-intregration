/** @format */

import React from "react";
import CustomReportTable from "./SubComponents/CustomReportTable";
import {
  technicianPerformanceData,
  partsUsageData,
  productStockData,
  partsStockData,
  consumablesUsageData,
  dailyPartsUsageData,
} from "@/data/ReportModuleData";

const TableSection = () => {
  const technicianColumns = [
    { key: "technician", label: "Technicians", width: "35%" },
    { key: "complete", label: "Complete", width: "20%" },
    { key: "avgTime", label: "Avg Time", width: "25%" },
    { key: "rating", label: "Rating", width: "20%" },
  ];

  const partsUsageColumns = [
    { key: "partsName", label: "Parts Name", width: "40%" },
    { key: "usedQty", label: "Used Qty", width: "30%" },
    { key: "jobs", label: "Jobs", width: "30%" },
  ];

  const productStockColumns = [
    { key: "productName", label: "Product Name", width: "25%" },
    { key: "productId", label: "Product ID", width: "15%" },
    { key: "availableUnits", label: "Available Units", width: "18%" },
    { key: "status", label: "Status", width: "20%" },
    { key: "lastStock", label: "Last Stock", width: "22%" },
  ];

  const partsStockColumns = [
    { key: "partName", label: "Part Name", width: "25%" },
    { key: "partId", label: "Part ID", width: "15%" },
    { key: "availableUnits", label: "Available Units", width: "18%" },
    { key: "status", label: "Status", width: "20%" },
    { key: "lastStock", label: "Last Stock", width: "22%" },
  ];

  const consumablesUsageColumns = [
    { key: "technician", label: "Technician", width: "30%" },
    { key: "consumableCategory", label: "Consumable Category", width: "30%" },
    { key: "totalQty", label: "Total Qty", width: "20%" },
    { key: "totalValue", label: "Total Value", width: "20%" },
  ];

  const dailyPartsUsageColumns = [
    { key: "technician", label: "Technician", width: "20%" },
    { key: "partName", label: "Part Name", width: "20%" },
    { key: "usedQty", label: "Used Qty", width: "15%" },
    { key: "date", label: "Date", width: "20%" },
    { key: "jobId", label: "Job ID", width: "25%" },
  ];

  return (
    <div className="w-full space-y-4 sm:space-y-6">
      {/* First Row - Technician Performance and Parts Usage */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <CustomReportTable
          title="Technician Performance Table"
          columns={technicianColumns}
          data={technicianPerformanceData}
        />
        <CustomReportTable
          title="Parts Usage Table"
          columns={partsUsageColumns}
          data={partsUsageData}
        />
      </div>

      {/* Second Row - Product Stock and Parts Stock */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <CustomReportTable
          title="Product Stock Levels Table"
          columns={productStockColumns}
          data={productStockData}
        />
        <CustomReportTable
          title="Parts Stock Levels Table"
          columns={partsStockColumns}
          data={partsStockData}
        />
      </div>

      {/* Third Row - Consumables Usage and Daily Parts Usage */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <CustomReportTable
          title="Consumables Usage Report"
          columns={consumablesUsageColumns}
          data={consumablesUsageData}
        />
        <CustomReportTable
          title="Daily Parts Usage Report"
          columns={dailyPartsUsageColumns}
          data={dailyPartsUsageData}
        />
      </div>
    </div>
  );
};

export default TableSection;
