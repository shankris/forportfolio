"use client";

import React, { useMemo } from "react";
import styles from "./YearHeatmap.module.css";
import data from "./data.json";

export default function YearHeatmap({ year }) {
  const yearStart = useMemo(() => new Date(`${year}-01-01`), [year]);
  const yearEnd = useMemo(() => new Date(`${year}-12-31`), [year]);

  // Filter data for this year
  const yearData = useMemo(
    () =>
      data.filter((d) => {
        const dt = new Date(d.date);
        return dt >= yearStart && dt <= yearEnd;
      }),
    [year, yearStart, yearEnd]
  );

  // Create lookup by date string
  const lookup = useMemo(() => {
    const map = {};
    yearData.forEach((d) => (map[d.date] = d));
    return map;
  }, [yearData]);

  // Build 7x12 grid (rows = weekdays, columns = months)
  const grid = useMemo(() => {
    const g = Array.from({ length: 7 }, () => Array(12).fill(null));

    yearData.forEach((d) => {
      const date = new Date(d.date);
      const day = date.getDay(); // 0=Sun..6=Sat
      const month = date.getMonth(); // 0=Jan..11=Dec
      g[day][month] = d;
    });

    return g;
  }, [yearData]);

  const monthNames = useMemo(() => ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], []);
  const dayNames = useMemo(() => ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], []);

  return (
    <div className={styles.yearHeatmap}>
      {/* Month Labels */}
      <div className={styles.monthRow}>
        <div className={styles.dayLabelSpacer} /> {/* empty top-left corner */}
        {monthNames.map((m) => (
          <div
            key={m}
            className={styles.monthLabel}
          >
            {m}
          </div>
        ))}
      </div>

      {/* Heatmap Grid */}
      <div className={styles.grid}>
        {grid.map((row, dayIndex) => (
          <div
            key={dayIndex}
            className={styles.row}
          >
            <div className={styles.dayLabel}>{dayNames[dayIndex]}</div>
            {row.map((cell, monthIndex) => {
              const count = cell?.count || 0;
              return (
                <div
                  key={monthIndex}
                  className={styles.cellWrapper}
                >
                  <div className={`${styles.cell} ${styles["level" + Math.min(count, 4)]}`}>
                    {cell && (
                      <span className={styles.tooltip}>
                        {new Date(cell.date).toLocaleDateString("en-US", {
                          weekday: "short",
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                        <br />
                        {cell.text}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
