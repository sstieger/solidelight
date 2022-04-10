import { FoodTypeIds } from '@/recommend/FoodTypeIds';
import { TasteProfile } from '@/recommend/TasteProfile';
import { intersect } from '@/utils/math/intersect';

import { FoodTypeWeightMap } from './FoodTypeWeightMap';
import { createFoodTypeWeightMapFromTypeIds } from './createFoodTypeMapWeightMapFromTypeIds';
import { BASE_TYPE_RELEVANCE, LIKED_TYPE_RELEVANCE } from './parameters';
import { useVariationIdAsBaseIdTooIfGeneralType } from './useVariationIdAsBaseIdTooIfGeneralType';

export function calcTasteProfilePlaceSimilarityScore(profile: TasteProfile, placeTypes: FoodTypeIds[]): number {
  const finalPlaceTypes = placeTypes.map((type) => useVariationIdAsBaseIdTooIfGeneralType(type));
  const placeBaseTypesWeighted = createFoodTypeWeightMapFromTypeIds(finalPlaceTypes.map(({ baseId }) => baseId));
  const baseTypesSimilarity = calcSimilarityScore(profile.baseTypes, placeBaseTypesWeighted);
  const placeVariationTypesWeighted = createFoodTypeWeightMapFromTypeIds(
    finalPlaceTypes.map(({ variationId }) => variationId),
  );
  const variationTypesSimilarity = calcSimilarityScore(profile.variationTypes, placeVariationTypesWeighted);
  return baseTypesSimilarity * BASE_TYPE_RELEVANCE + variationTypesSimilarity * (1 - BASE_TYPE_RELEVANCE);
}

function calcSimilarityScore(likedTypes: FoodTypeWeightMap, placeTypes: FoodTypeWeightMap): number {
  // Get the food types included in both the user's liked types and the place's types.
  const commonTypeIds = intersect(new Set<string>(Object.keys(likedTypes)), new Set<string>(Object.keys(placeTypes)));
  let commonLikedWeightsSum = 0;
  commonTypeIds.forEach((id) => (commonLikedWeightsSum += likedTypes[id].weight));
  let commonPlaceWeightsSum = 0;
  commonTypeIds.forEach((id) => (commonPlaceWeightsSum += placeTypes[id].weight));
  return commonLikedWeightsSum * LIKED_TYPE_RELEVANCE + commonPlaceWeightsSum * (1 - LIKED_TYPE_RELEVANCE);
}
