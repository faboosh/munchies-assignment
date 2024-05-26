import React from "react";
import styles from "./BadgeGroup.module.css";

export default function BadgeGroup({
  children,
  title,
}: {
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <div className={styles.wrapper}>
      {title && <h3 className="fs-subtitle">{title}</h3>}
      <div className={styles.inner}>{children}</div>
    </div>
  );
}
