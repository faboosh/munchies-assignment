import React from "react";
import styles from "./CategoryTopBarItem.module.scss";
import { Category } from "@/types";
import Image from "next/image";

export default function CategoryTopBarItem({
  category,
  active,
  onClick,
}: {
  category: Category;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={`${styles.wrapper} ${active ? styles.active : ""}`}
    >
      <div className={styles.text_wrapper}>
        <p className="fs-title">{category.name}</p>
      </div>
      <Image
        alt="restaurant image"
        src={category.image_url}
        width={80}
        height={80}
        className={styles.image}
      />
    </div>
  );
}
