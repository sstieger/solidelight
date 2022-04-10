import { FoodTypeWeightMap } from './FoodTypeWeightMap';

export function createFoodTypeWeightMapFromTypeIds(typeIds: string[]): FoodTypeWeightMap {
  const unweightedTypes: FoodTypeWeightMap = {};
  for (const typeId of typeIds) {
    unweightedTypes[typeId] = { id: typeId, weight: 0 };
  }
  return weightEqually(unweightedTypes);
}

export function weightEqually(types: FoodTypeWeightMap): FoodTypeWeightMap {
  const typesCount = Object.keys(types).length;
  if (typesCount === 0) {
    return {};
  }
  const weightedTypes: FoodTypeWeightMap = {};
  const weight = 1 / typesCount;
  for (const id in types) {
    weightedTypes[id] = { id, weight };
  }
  return weightedTypes;
}
