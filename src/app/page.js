import React from "react";
import Heatmap from "@/components/Heatmap/Heatmap";
import YearHeatmap from "@/components/Heatmap2/YearHeatmap";
import FloatingDevButton from "@/components/FloatingDevButton/FloatingDevButton";
import UserStack from "@/components/UserStack/UserStack";

const page = () => {
  const users = [
    { id: 1, name: "Alice", avatar: "/avatars/alice.png" },
    { id: 2, name: "Bob", avatar: "/avatars/bob.png" },
    { id: 3, name: "Charlie", avatar: "/avatars/charlie.png" },
    { id: 4, name: "David", avatar: "/avatars/david.png" },
    { id: 5, name: "Eva", avatar: "/avatars/eva.png" },
  ];

  return (
    <>
      <h1>Components for Portfolio</h1>
      {/* <h3>GitHub Heatmap</h3>
      <Heatmap />

      <h3>GitHub Heatmap with Props</h3>
      <Heatmap
        startDate='2025-01-01'
        endDate='2025-06-30'
      /> */}
      {/* <h3>Year Heatmap with Props</h3>
      <YearHeatmap year={2024} /> */}
      {/* <FloatingDevButton errorCount={0} /> black button, no dot */}
      <div style={{ padding: "50px" }}>
        <UserStack users={users} />
      </div>
      <FloatingDevButton errorCount={2} /> {/* red button, white dot, badge in menu */}
      {/* <FloatingDevButton /> */}
    </>
  );
};

export default page;
