"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    const isStoredDark = storedTheme === "dark";

    setIsDark(isStoredDark);
    if (isStoredDark) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, []);

  function toggleDarkMode() {
    document.body.classList.toggle("dark");

    const newIsDark = !isDark;
    setIsDark(newIsDark);

    localStorage.setItem("theme", newIsDark ? "dark" : "light");
  }

  return (
    <button
      onClick={toggleDarkMode}
      aria-label='Toggle Dark Mode'
      style={{
        background: "transparent",
        border: "none",
        cursor: "pointer",
        padding: "6px",
        display: "flex",
        alignItems: "center",
      }}
    >
      {isDark ? (
        <Sun
          size={20}
          color='yellow'
        />
      ) : (
        <Moon
          size={20}
          color='black'
        />
      )}
    </button>
  );
}
