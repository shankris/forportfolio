"use client";

import React, { useState } from "react";
import Image from "next/image";
import styles from "./UserStack.module.css";

const UserStack = ({ users }) => {
  const [hovered, setHovered] = useState(null);

  return (
    <div className={styles.stack}>
      {users.map((user, index) => (
        <div
          key={user.id}
          className={styles.avatarWrapper}
          style={{ zIndex: hovered === index ? 20 : users.length - index }}
          onMouseEnter={() => setHovered(index)}
          onMouseLeave={() => setHovered(null)}
        >
          <Image
            src={user.avatar}
            alt={user.name}
            width={50}
            height={50}
            className={styles.avatar}
          />
          <span className={styles.name}>{user.name}</span>
        </div>
      ))}
    </div>
  );
};

export default UserStack;
