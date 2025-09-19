"use client";

import React, { useEffect, useMemo, useState } from "react";
import styles from "./Heatmap.module.css";
import data from "./data.json";

function getDates(start, end) {
  const dates = [];
  const cur = new Date(start);
  while (cur <= end) {
    dates.push(new Date(cur));
    cur.setDate(cur.getDate() + 1);
  }
  return dates;
}

function groupByWeeks(dates) {
  // Groups with weeks starting on Sunday (0)
  const weeks = [];
  let week = [];
  dates.forEach((date) => {
    if (date.getDay() === 0 && week.length) {
      weeks.push(week);
      week = [];
    }
    week.push(date);
  });
  if (week.length) weeks.push(week);
  return weeks;
}

export default function Heatmap() {
  // derive start/end from data file (assumes data sorted or full year)
  const startDate = new Date(data[0].date);
  const endDate = new Date(data[data.length - 1].date);

  // create lookup
  const lookup = useMemo(() => {
    const m = {};
    data.forEach((d) => (m[d.date] = d.count));
    return m;
  }, []);

  // generate dates & weeks
  const dates = useMemo(() => getDates(startDate, endDate), [startDate, endDate]);
  const weeks = useMemo(() => groupByWeeks(dates), [dates]);

  // compute monthLabels by finding the week that contains the 1st day of each month
  const monthLabels = useMemo(() => {
    const year = startDate.getFullYear();
    const months = [];
    for (let m = 0; m < 12; m++) {
      const first = new Date(year, m, 1);
      const iso = first.toISOString().split("T")[0];
      const weekIndex = weeks.findIndex((week) => week.some((d) => d.toISOString().split("T")[0] === iso));
      if (weekIndex !== -1) {
        months.push({
          index: weekIndex,
          month: first.toLocaleString("default", { month: "short" }),
        });
      }
    }
    return months;
  }, [startDate, weeks]);

  // read CSS variables for precise pixel math (keeps CSS + JS in sync)
  const [colWidth, setColWidth] = useState(17); // default
  const [spacer, setSpacer] = useState(30);

  useEffect(() => {
    function computeFromCSS() {
      const root = getComputedStyle(document.documentElement);
      // values may be like "14px" -> parseFloat
      const cell = parseFloat(root.getPropertyValue("--heatmap-cell-size")) || 14;
      const gap = parseFloat(root.getPropertyValue("--heatmap-cell-gap")) || 3;
      const sp = parseFloat(root.getPropertyValue("--heatmap-weekday-spacer")) || 30;
      setColWidth(cell + gap);
      setSpacer(sp);
    }
    computeFromCSS();
    window.addEventListener("resize", computeFromCSS);
    return () => window.removeEventListener("resize", computeFromCSS);
  }, []);

  return (
    <div className={styles.heatmapWrapper}>
      {/* Overlay month labels (absolute positioned) */}
      <div className={styles.monthRow}>
        {weeks.map((week, i) => {
          const firstDay = week[0];
          const month = firstDay.toLocaleString("default", { month: "short" });

          // Look at the previous week's first day
          const prevMonth = i > 0 ? weeks[i - 1][0].toLocaleString("default", { month: "short" }) : null;

          // Force the very first week to display its month
          const showLabel = i === 0 || month !== prevMonth;

          return (
            <div
              key={i}
              className={styles.monthLabel}
              style={{
                left: `calc(var(--heatmap-weekday-spacer, 30px) + ${i * (parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--heatmap-cell-size")) + parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--heatmap-cell-gap")))}px)`,
              }}
            >
              {showLabel ? month : ""}
            </div>
          );
        })}
      </div>

      <div className={styles.heatmapGrid}>
        <div className={styles.weekdayCol}>
          <span>Sun</span>
          <span>Wed</span>
          <span>Sat</span>
        </div>

        <div className={styles.weeks}>
          {weeks.map((week, wi) => (
            <div
              key={wi}
              className={styles.week}
            >
              {Array.from({ length: 7 }).map((_, di) => {
                const date = week.find((d) => d.getDay() === di);
                if (!date) {
                  return (
                    <div
                      key={di}
                      className={styles.cell}
                    />
                  );
                }
                const iso = date.toISOString().split("T")[0];
                const count = lookup[iso] || 0;
                let level = 0;
                if (count > 0) level = 1;
                if (count > 3) level = 2;
                if (count > 6) level = 3;
                if (count > 10) level = 4;

                return (
                  <div
                    key={di}
                    className={styles.tooltipWrapper}
                  >
                    <div className={`${styles.cell} ${styles["level" + level]}`} />
                    <span className={styles.tooltip}>
                      {count} contribution{count !== 1 ? "s" : ""} on{" "}
                      {date.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
