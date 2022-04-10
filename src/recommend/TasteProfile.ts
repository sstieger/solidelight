import { FoodTypeWeightMap } from './FoodTypeWeightMap';

export interface TasteProfile {
  createdAt: number;
  baseTypes: FoodTypeWeightMap;
  variationTypes: FoodTypeWeightMap;
}
