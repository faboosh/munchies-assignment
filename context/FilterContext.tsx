"use client";
import { getCategories } from "@/actions/category";
import { getPriceRanges } from "@/actions/price-range";
import { DeliveryTime, Category, PriceRange, DeliveryTimeEnum } from "@/types";
import { createContext, useContext, useEffect, useState } from "react";

const DeliveryTimes: Record<DeliveryTimeEnum, DeliveryTime> = {
  [DeliveryTimeEnum.ZeroToTen]: {
    id: DeliveryTimeEnum.ZeroToTen,
    min: 0,
    max: 10,
    text: "0-10 min",
  },
  [DeliveryTimeEnum.TenToThirty]: {
    id: DeliveryTimeEnum.TenToThirty,
    min: 10,
    max: 30,
    text: "10-30 min",
  },
  [DeliveryTimeEnum.ThirtyToSixty]: {
    id: DeliveryTimeEnum.ThirtyToSixty,
    min: 30,
    max: 60,
    text: "30-60 min",
  },
  [DeliveryTimeEnum.OneHourOrMore]: {
    id: DeliveryTimeEnum.OneHourOrMore,
    min: 60,
    max: Infinity,
    text: "1 hour+",
  },
};

export const FilterContext = createContext<{
  categories: Category[];
  selectedCategories: Category[];
  categoryIsSelected: (category: Category) => boolean;
  removeCategory: (category: Category) => void;
  selectCategory: (category: Category) => void;
  toggleCategory: (category: Category) => void;

  deliveryTimes: Record<DeliveryTimeEnum, DeliveryTime>;
  selectedDeliveryTimes: DeliveryTimeEnum[];
  deliveryTimeIsSelected: (time: DeliveryTimeEnum) => boolean;
  removeDeliveryTime: (time: DeliveryTimeEnum) => void;
  selectDeliveryTime: (time: DeliveryTimeEnum) => void;
  toggleDeliveryTime: (time: DeliveryTimeEnum) => void;
  priceRanges: PriceRange[];
  selectedPriceRanges: PriceRange[];
  priceRangeIsSelected: (priceRange: PriceRange) => boolean;
  removePriceRange: (priceRange: PriceRange) => void;
  selectPriceRange: (priceRange: PriceRange) => void;
  togglePriceRange: (priceRange: PriceRange) => void;
}>({
  categories: [],
  selectedCategories: [],
  categoryIsSelected: () => false,
  removeCategory: () => {},
  selectCategory: () => {},
  toggleCategory: () => {},
  deliveryTimes: DeliveryTimes,
  selectedDeliveryTimes: [],
  deliveryTimeIsSelected: () => false,
  removeDeliveryTime: () => {},
  selectDeliveryTime: () => {},
  toggleDeliveryTime: () => {},
  priceRanges: [],
  selectedPriceRanges: [],
  priceRangeIsSelected: () => false,
  removePriceRange: () => {},
  selectPriceRange: () => {},
  togglePriceRange: () => {},
});

export const FilterContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [selectedDeliveryTimes, setSelectedDeliveryTimes] = useState<
    DeliveryTimeEnum[]
  >([]);
  const [priceRanges, setPriceRanges] = useState<PriceRange[]>([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<PriceRange[]>(
    []
  );

  const categoryIsSelected = (category: Category) =>
    selectedCategories.some(({ id }) => id === category.id);

  const selectCategory = (category: Category) => {
    if (categoryIsSelected(category)) return;

    setSelectedCategories([...selectedCategories, category]);
  };

  const removeCategory = (category: Category) => {
    setSelectedCategories(
      selectedCategories.filter(({ id }) => id !== category.id)
    );
  };

  const toggleCategory = (category: Category) => {
    if (categoryIsSelected(category)) {
      removeCategory(category);
    } else {
      selectCategory(category);
    }
  };

  const deliveryTimeIsSelected = (time: DeliveryTimeEnum) =>
    selectedDeliveryTimes.includes(time);

  const selectDeliveryTime = (time: DeliveryTimeEnum) => {
    if (deliveryTimeIsSelected(time)) return;
    setSelectedDeliveryTimes([...selectedDeliveryTimes, time]);
  };

  const removeDeliveryTime = (time: DeliveryTimeEnum) => {
    setSelectedDeliveryTimes(
      selectedDeliveryTimes.filter((timeToCompare) => time !== timeToCompare)
    );
  };

  const toggleDeliveryTime = (time: DeliveryTimeEnum) => {
    if (deliveryTimeIsSelected(time)) {
      removeDeliveryTime(time);
    } else {
      selectDeliveryTime(time);
    }
  };

  const priceRangeIsSelected = (priceRange: PriceRange) =>
    selectedPriceRanges.some(({ id }) => id === priceRange.id);

  const selectPriceRange = (priceRange: PriceRange) => {
    if (priceRangeIsSelected(priceRange)) return;
    setSelectedPriceRanges([...selectedPriceRanges, priceRange]);
  };

  const removePriceRange = (priceRange: PriceRange) => {
    setSelectedPriceRanges(
      selectedPriceRanges.filter(({ id }) => id !== priceRange.id)
    );
  };

  const togglePriceRange = (priceRange: PriceRange) => {
    if (priceRangeIsSelected(priceRange)) {
      removePriceRange(priceRange);
    } else {
      selectPriceRange(priceRange);
    }
  };

  useEffect(() => {
    getCategories().then((res) => {
      setCategories(res.filters);
    });
    getPriceRanges().then((res) => {
      setPriceRanges(res);
    });
  }, []);

  return (
    <FilterContext.Provider
      value={{
        categories,
        selectedCategories,
        categoryIsSelected,
        selectCategory,
        removeCategory,
        toggleCategory,
        deliveryTimes: DeliveryTimes,
        selectedDeliveryTimes,
        deliveryTimeIsSelected,
        selectDeliveryTime,
        removeDeliveryTime,
        toggleDeliveryTime,
        priceRanges,
        selectedPriceRanges,
        priceRangeIsSelected,
        selectPriceRange,
        removePriceRange,
        togglePriceRange,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilterContext = () => useContext(FilterContext);
