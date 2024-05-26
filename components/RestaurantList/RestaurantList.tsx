"use client";
import React from "react";
import styles from "./RestaurantList.module.scss";
import { useRestaurantContext } from "@/context/RestaurantContext";
import RestaurantCard from "../RestaurantCard";

export default function RestaurantList() {
  const { filteredRestaurants } = useRestaurantContext();
  return (
    <div className={styles.wrapper}>
      {filteredRestaurants.map((restaurant) => (
        <RestaurantCard key={restaurant.id} restaurant={restaurant} />
      ))}
    </div>
  );
}
