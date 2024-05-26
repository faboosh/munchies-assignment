"use client";
import { Restaurant } from "@/types";
import { createContext, useContext, useState } from "react";
import { useFilterContext } from "./FilterContext";

export const RestaurantContext = createContext<{
  restaurants: Restaurant[];
  restaurantWithinSelectedDeliveryTimes: (restaurant: Restaurant) => boolean;
}>({
  restaurants: [],
  restaurantWithinSelectedDeliveryTimes: () => false,
});

export const RestaurantContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const { selectedDeliveryTimes, deliveryTimes } = useFilterContext();

  const restaurantWithinSelectedDeliveryTimes = (restaurant: Restaurant) => {
    const selectedDeliveryTimesData = selectedDeliveryTimes.map(
      (val) => deliveryTimes[val]
    );
    const deliveryTime = restaurant.delivery_time_minutes;
    return selectedDeliveryTimesData.some(
      ({ min, max }) => deliveryTime >= min && deliveryTime < max
    );
  };

  const restaurantInSelectedPriceRanges = (restaurant: Restaurant) => {};

  return (
    <RestaurantContext.Provider
      value={{ restaurants, restaurantWithinSelectedDeliveryTimes }}
    >
      {children}
    </RestaurantContext.Provider>
  );
};

export const useRestaurantContext = () => useContext(RestaurantContext);
