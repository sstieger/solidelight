import { FoodTypeIds } from '@/recommend/FoodTypeIds';

export function splitFullFoodTypeId(foodTypeId: string): FoodTypeIds {
  const [baseId] = foodTypeId.split('-');
  const variationId = foodTypeId;
  return { baseId, variationId };
}
