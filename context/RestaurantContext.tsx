"use client";
import { Restaurant } from "@/types";
import { createContext, useContext, useEffect, useState } from "react";
import { useFilterContext } from "./FilterContext";
import { getRestaurants } from "@/actions/restaurants";

export const RestaurantContext = createContext<{
  restaurants: Restaurant[];
  filteredRestaurants: Restaurant[];
  restaurantWithinSelectedDeliveryTimes: (restaurant: Restaurant) => boolean;
  restaurantInSelectedPriceRanges: (restaurant: Restaurant) => boolean;
  restaurantInSelectedCategories: (restaurant: Restaurant) => boolean;
}>({
  restaurants: [],
  filteredRestaurants: [],
  restaurantWithinSelectedDeliveryTimes: () => false,
  restaurantInSelectedPriceRanges: () => false,
  restaurantInSelectedCategories: () => false,
});

export const RestaurantContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>(
    []
  );
  const {
    selectedDeliveryTimes,
    deliveryTimes,
    selectedPriceRanges,
    selectedCategories,
  } = useFilterContext();

  const restaurantWithinSelectedDeliveryTimes = (restaurant: Restaurant) => {
    if (selectedDeliveryTimes.length === 0) return true;
    const selectedDeliveryTimesData = selectedDeliveryTimes.map(
      (val) => deliveryTimes[val]
    );
    const deliveryTime = restaurant.delivery_time_minutes;

    // AND filtering, ie within some selected delivery time
    return selectedDeliveryTimesData.some(
      ({ min, max }) => deliveryTime >= min && deliveryTime < max
    );
  };

  const restaurantInSelectedPriceRanges = (restaurant: Restaurant) => {
    if (selectedPriceRanges.length === 0) return true;
    const selectedPriceRangeIds = selectedPriceRanges.map(({ id }) => id);

    // AND filtering, ie within some selected price range
    return selectedPriceRangeIds.includes(restaurant.price_range_id);
  };

  const restaurantInSelectedCategories = (restaurant: Restaurant) => {
    if (selectedCategories.length === 0) return true;
    const selectedCategoryIds = selectedCategories.map(({ id }) => id);

    // AND filtering, ie within some selected category
    return selectedCategoryIds.some((categoryId) =>
      restaurant.filterIds.includes(categoryId)
    );
  };

  useEffect(() => {
    getRestaurants().then((res) => {
      setRestaurants(res.restaurants);
    });
  }, []);

  useEffect(() => {
    setFilteredRestaurants(
      restaurants
        .filter(restaurantInSelectedCategories)
        .filter(restaurantInSelectedPriceRanges)
        .filter(restaurantWithinSelectedDeliveryTimes)
    );
  }, [
    restaurants,
    selectedCategories,
    selectedDeliveryTimes,
    selectedPriceRanges,
  ]);

  return (
    <RestaurantContext.Provider
      value={{
        restaurants,
        filteredRestaurants,
        restaurantWithinSelectedDeliveryTimes,
        restaurantInSelectedCategories,
        restaurantInSelectedPriceRanges,
      }}
    >
      {children}
    </RestaurantContext.Provider>
  );
};

export const useRestaurantContext = () => useContext(RestaurantContext);
