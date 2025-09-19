import React from "react";
import Heatmap from "@/components/Heatmap/Heatmap";
import YearHeatmap from "@/components/Heatmap2/YearHeatmap";

const page = () => {
  return (
    <>
      <h1>Components for Portfolio</h1>
      <h3>GitHub Heatmap</h3>
      <Heatmap />

      <h3>GitHub Heatmap with Props</h3>
      <Heatmap
        startDate='2025-01-01'
        endDate='2025-06-30'
      />

      <h3>Year Heatmap with Props</h3>
      <YearHeatmap year={2024} />
    </>
  );
};

export default page;
