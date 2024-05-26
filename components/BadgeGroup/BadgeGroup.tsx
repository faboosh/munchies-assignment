import React from "react";
import styles from "./BadgeGroup.module.scss";

export default function BadgeGroup({
  children,
  title,
  className,
}: {
  children: React.ReactNode;
  title?: string;
  className?: string;
}) {
  return (
    <div className={`${styles.wrapper} ${className ? className : ""}`}>
      {title && <h3 className="fs-subtitle">{title}</h3>}
      <div className={styles.inner}>{children}</div>
    </div>
  );
}
