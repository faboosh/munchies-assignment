import React from "react";
import styles from "./Pill.module.css";

export default function Badge({
  children,
  active,
  indicator,
}: {
  children: React.ReactNode;
  active?: boolean;
  indicator?: boolean;
}) {
  return (
    <div className={`${styles.wrapper} ${active ? styles.active : ""}`}>
      <p className="fs-body">
        {indicator && (
          <div
            className={`${styles.indicator} ${active ? styles.active : ""}`}
          />
        )}
        {children}
      </p>
    </div>
  );
}
