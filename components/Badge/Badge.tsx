import React from "react";
import styles from "./Badge.module.scss";

export default function Badge({
  children,
  onClick,
  selected,
  small,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  selected?: boolean;
  small?: boolean;
}) {
  return (
    <div
      className={`${styles.badge} ${selected ? styles.selected : ""}  ${
        onClick ? styles.clickable : ""
      } ${small ? styles.small : ""}`}
      onClick={onClick}
    >
      <p className="fs-body">{children}</p>
    </div>
  );
}
