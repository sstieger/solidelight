export interface FoodTypeWeightMapWithAverageRating {
  [id: string]: FoodTypeWeightWithAverageRating;
}

export interface FoodTypeWeightWithAverageRating {
  id: string;
  weight: number;
  averageRating: number;
}
