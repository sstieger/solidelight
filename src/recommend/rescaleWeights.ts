import { FoodTypeWeightMap } from './FoodTypeWeightMap';

export function rescaleWeights(types: FoodTypeWeightMap): FoodTypeWeightMap {
  const scaledTypes: FoodTypeWeightMap = {};
  let weightSum = 0;
  for (const id in types) {
    weightSum += types[id].weight;
  }
  for (const id in types) {
    const type = types[id];
    const weight = type.weight / weightSum;
    scaledTypes[id] = { ...type, weight };
  }
  return scaledTypes;
}
