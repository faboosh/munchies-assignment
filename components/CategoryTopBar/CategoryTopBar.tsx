"use client";
import React from "react";
import styles from "./CategoryTopBar.module.scss";
import { useFilterContext } from "@/context/FilterContext";
import CategoryTopBarItem from "../CategoryTopBarItem";

export default function CategoryTopBar() {
  const { categories, categoryIsSelected, toggleCategory } = useFilterContext();
  return (
    <div className={styles.wrapper}>
      <div className={styles.scrollable}>
        {categories.map((category) => (
          <CategoryTopBarItem
            active={categoryIsSelected(category)}
            onClick={() => toggleCategory(category)}
            key={category.id}
            category={category}
          />
        ))}
      </div>
    </div>
  );
}
