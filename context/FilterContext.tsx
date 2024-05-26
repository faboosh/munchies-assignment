"use client";
import { getFilters } from "@/actions/filter";
import { getPriceRanges } from "@/actions/price-range";
import { DeliveryTime, Filter, PriceRange } from "@/types";
import { createContext, useContext, useEffect, useState } from "react";

export enum DeliveryTimeEnum {
  ZeroToTen,
  TenToThirty,
  ThirtyToSixty,
  OneHourOrMore,
}

const DeliveryTimes: Record<DeliveryTimeEnum, DeliveryTime> = {
  [DeliveryTimeEnum.ZeroToTen]: {
    min: 0,
    max: 10,
    text: "0-10 min",
  },
  [DeliveryTimeEnum.TenToThirty]: {
    min: 10,
    max: 30,
    text: "10-30 min",
  },
  [DeliveryTimeEnum.ThirtyToSixty]: {
    min: 30,
    max: 60,
    text: "30-60 min",
  },
  [DeliveryTimeEnum.OneHourOrMore]: {
    min: 60,
    max: Infinity,
    text: "1 hour+",
  },
};

export const FilterContext = createContext<{
  filters: Filter[];
  selectedFilters: Filter[];
  filterIsSelected: (filter: Filter) => boolean;
  removeFilter: (filter: Filter) => void;
  selectFilter: (filter: Filter) => void;
  deliveryTimes: Record<DeliveryTimeEnum, DeliveryTime>;
  selectedDeliveryTimes: DeliveryTimeEnum[];
  deliveryTimeIsSelected: (time: DeliveryTimeEnum) => boolean;
  removeDeliveryTime: (time: DeliveryTimeEnum) => void;
  selectDeliveryTime: (time: DeliveryTimeEnum) => void;
  priceRanges: PriceRange[];
  selectedPriceRanges: PriceRange[];
  priceRangeIsSelected: (priceRange: PriceRange) => boolean;
  removePriceRange: (priceRange: PriceRange) => void;
  selectPriceRange: (priceRange: PriceRange) => void;
}>({
  filters: [],
  selectedFilters: [],
  filterIsSelected: () => false,
  removeFilter: () => {},
  selectFilter: () => {},
  deliveryTimes: DeliveryTimes,
  selectedDeliveryTimes: [],
  deliveryTimeIsSelected: () => false,
  removeDeliveryTime: () => {},
  selectDeliveryTime: () => {},
  priceRanges: [],
  selectedPriceRanges: [],
  priceRangeIsSelected: () => false,
  removePriceRange: () => {},
  selectPriceRange: () => {},
});

export const FilterContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [filters, setFilters] = useState<Filter[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<Filter[]>([]);
  const [selectedDeliveryTimes, setSelectedDeliveryTimes] = useState<
    DeliveryTimeEnum[]
  >([]);
  const [priceRanges, setPriceRanges] = useState<PriceRange[]>([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<PriceRange[]>(
    []
  );

  const filterIsSelected = (filter: Filter) =>
    selectedFilters.some(({ id }) => id === filter.id);

  const selectFilter = (filter: Filter) => {
    if (filterIsSelected(filter)) return;

    setSelectedFilters([...selectedFilters, filter]);
  };

  const removeFilter = (filter: Filter) => {
    setSelectedFilters(selectedFilters.filter(({ id }) => id !== filter.id));
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

  useEffect(() => {
    getFilters().then((res) => {
      setFilters(res.filters);
    });
    getPriceRanges().then((res) => {
      setPriceRanges(res);
    });
  }, []);

  return (
    <FilterContext.Provider
      value={{
        filters,
        selectedFilters,
        filterIsSelected,
        selectFilter,
        removeFilter,
        deliveryTimes: DeliveryTimes,
        selectedDeliveryTimes,
        deliveryTimeIsSelected,
        selectDeliveryTime,
        removeDeliveryTime,
        priceRanges,
        selectedPriceRanges,
        priceRangeIsSelected,
        selectPriceRange,
        removePriceRange,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilterContext = () => useContext(FilterContext);
