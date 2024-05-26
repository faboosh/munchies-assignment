import React from "react";
import styles from "./Pill.module.scss";

export default function Pill({
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
          <span
            className={`${styles.indicator} ${
              active ? styles.indicator__active : ""
            }`}
          />
        )}
        {children}
      </p>
    </div>
  );
}
