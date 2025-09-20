"use client";

import { useState } from "react";
import { Settings, ChevronRight } from "lucide-react";
import styles from "./FloatingDevButton.module.css";

export default function FloatingDevButton({ errorCount = 0 }) {
  const [open, setOpen] = useState(false);
  const [submenu, setSubmenu] = useState(null);

  const hasError = errorCount > 0;

  const menuItems = [
    { label: "Issues", badge: errorCount > 0 ? errorCount : null },
    { label: "Route", right: "Static" },
    { label: "Try Turbopack", submenu: ["Docs", "Benchmarks"], icon: <ChevronRight size={16} /> },
    { label: "Route Info", submenu: ["Params", "Headers"], icon: <ChevronRight size={16} /> },
    { label: "Preferences", icon: <Settings size={16} /> },
  ];

  return (
    <div className={styles.wrapper}>
      {/* Floating button */}
      <button
        className={`${styles.floatingButton} ${hasError ? styles.error : ""}`}
        onClick={() => {
          setOpen(!open);
          setSubmenu(null);
        }}
        aria-label='Open Dev Tools'
      >
        <span className={styles.buttonLabel}>N</span>
        {hasError && <span className={styles.dot}></span>}
      </button>

      {/* Popover Menu */}
      {open && (
        <div className={styles.menu}>
          {menuItems.map((item, i) => (
            <div
              key={i}
              className={styles.menuItem}
              onClick={() => {
                if (item.submenu) {
                  setSubmenu(item.label);
                } else {
                  setOpen(false);
                }
              }}
            >
              <span>{item.label}</span>

              <div className={styles.itemRight}>
                {item.badge && <span className={styles.badge}>{item.badge}</span>}
                {item.right && <span className={styles.rightLabel}>{item.right}</span>}
                {item.icon && <span className={styles.icon}>{item.icon}</span>}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Submenu Popover */}
      {submenu && (
        <div className={styles.submenu}>
          {menuItems
            .find((m) => m.label === submenu)
            ?.submenu.map((sub, i) => (
              <div
                key={i}
                className={styles.submenuItem}
              >
                {sub}
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
