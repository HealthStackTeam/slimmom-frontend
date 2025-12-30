import { createSelector } from "@reduxjs/toolkit";
import { selectDailyRate } from "../dailyRate/selectors"; // Önceki adımda yazdığımız dailyRate selector'ı

export const selectDiaryProducts = (state) => state.diary.products;
export const selectDiaryIsLoading = (state) => state.diary.isLoading;

// 1. tuketilen kalori toplamı
export const selectCaloriesConsumed = createSelector(
  [selectDiaryProducts],
  (products) => {

    const caloriesArray = [];

    for(const p of products) {
     caloriesArray.push((p.weight/p.product.weight) * p.product.calories);
    }
    
    return caloriesArray.reduce((total, cal) => total + cal, 0);
  }
);

// 2. kalan kalori
export const selectCaloriesLeft = createSelector(
  [selectDailyRate, selectCaloriesConsumed],
  (dailyRate, consumed) => {
    if (!dailyRate) return 0; // Hedef yoksa kalan da yoktur
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