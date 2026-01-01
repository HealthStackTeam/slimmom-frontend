import { createSelector } from "@reduxjs/toolkit";
import { selectDailyRate } from "../dailyRate/selectors";

export const selectDiaryProducts = (state) => state.diary.products;
export const selectDiaryIsLoading = (state) => state.diary.isLoading;

// 1. tuketilen kalori toplamı
export const selectCaloriesConsumed = createSelector(
  [selectDiaryProducts],
  (products) => {
    if (!products || products.length === 0) return 0;

     let totalCalories = 0;

    for(const p of products) {
     const productCalories = (p.weight / 100) * p.product.calories;
     totalCalories += productCalories;
    }
    
    return totalCalories;
  }
);

// 2. kalan kalori
export const selectCaloriesLeft = createSelector(
  [selectDailyRate, selectCaloriesConsumed],
  (dailyRate, consumed) => {
    if (!dailyRate) return 0;
    return dailyRate - consumed;
  }
);

// 3. gunluk kalori yeme yüzdesi
export const selectCaloriesPercent = createSelector(
  [selectDailyRate, selectCaloriesConsumed],
  (dailyRate, consumed) => {
    if (!dailyRate || dailyRate === 0) return 0;
    const percent = (consumed / dailyRate) * 100;
    return Math.round(percent);
  }
);