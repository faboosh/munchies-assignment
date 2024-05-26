"use client";
import { useFilterContext } from "@/context/FilterContext";
import React from "react";
import styles from "./FilterPicker.module.scss";
import BadgeGroup from "../BadgeGroup";
import Badge from "../Badge";

export default function FilterPicker() {
  const {
    categories,
    categoryIsSelected,
    toggleCategory,
    priceRanges,
    priceRangeIsSelected,
    togglePriceRange,
    deliveryTimes,
    deliveryTimeIsSelected,
    toggleDeliveryTime,
  } = useFilterContext();

  return (
    <div className={styles.wrapper}>
      <h2 className="fs-h1">Filter</h2>
      <BadgeGroup className={styles.category} title="FOOD CATEGORY">
        {categories.map((category) => (
          <Badge
            key={category.id}
            selected={categoryIsSelected(category)}
            onClick={() => toggleCategory(category)}
          >
            {category.name}
          </Badge>
        ))}
      </BadgeGroup>
      <BadgeGroup title="DELIVERY TIME">
        {Object.entries(deliveryTimes).map(([_key, deliveryTime]) => (
          <Badge
            key={deliveryTime.id}
            selected={deliveryTimeIsSelected(deliveryTime.id)}
            onClick={() => toggleDeliveryTime(deliveryTime.id)}
          >
            {deliveryTime.text}
          </Badge>
        ))}
      </BadgeGroup>
      <BadgeGroup title="PRICE RANGE">
        {priceRanges.map((priceRange) => (
          <Badge
            small
            key={priceRange.id}
            selected={priceRangeIsSelected(priceRange)}
            onClick={() => togglePriceRange(priceRange)}
          >
            {priceRange.range}
          </Badge>
        ))}
      </BadgeGroup>
    </div>
  );
}
