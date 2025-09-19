import React from "react";
import DarkModeToggle from "./DarkModeToggle";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <>
      <header>
        <div className={`container ${styles.flexContent}`}>
          <div className={styles.siteLogo}>React Components</div>
          <div>
            <DarkModeToggle />
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
