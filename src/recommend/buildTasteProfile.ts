import { PersistentPlaceReviewWithPlace } from '@/model/PersistentPlaceReviewWithPersistentPlace';

import { TasteProfile } from './TasteProfile';
import { MIN_RATING_FOR_TASTE_PROFILE_RELEVANCE } from './parameters';
import { rescaleWeights } from './rescaleWeights';
import { splitFullFoodTypeId } from './splitFullFoodTypeId';
import { useVariationIdAsBaseIdTooIfGeneralType } from './useVariationIdAsBaseIdTooIfGeneralType';

type StrIdNumMap = { [id: string]: number };

export function buildTasteProfile(reviews: PersistentPlaceReviewWithPlace[]): TasteProfile {
  const baseTypeSums: StrIdNumMap = {};
  const variationTypeSums: StrIdNumMap = {};
  for (const review of reviews) {
    if (review.rating < MIN_RATING_FOR_TASTE_PROFILE_RELEVANCE) {
      continue;
    }
    const placeTypes = review.place.foodTypes.map((type) =>
      useVariationIdAsBaseIdTooIfGeneralType(splitFullFoodTypeId(type)),
    );
    const typeWeight = 1 / placeTypes.length;
    for (const { baseId: id } of placeTypes) {
      baseTypeSums[id] = (baseTypeSums[id] ?? 0) + typeWeight * review.rating;
    }
    for (const { variationId: id } of placeTypes) {
      variationTypeSums[id] = (variationTypeSums[id] ?? 0) + typeWeight * review.rating;
    }
  }
  const unscaledProfile: Omit<TasteProfile, 'createdAt'> = { baseTypes: {}, variationTypes: {} };
  for (const id in baseTypeSums) {
    unscaledProfile.baseTypes[id] = { id, weight: baseTypeSums[id] };
  }
  for (const id in variationTypeSums) {
    unscaledProfile.variationTypes[id] = { id, weight: variationTypeSums[id] };
  }
  const scaledProfile: TasteProfile = {
    createdAt: Date.now(),
    baseTypes: rescaleWeights(unscaledProfile.baseTypes),
    variationTypes: rescaleWeights(unscaledProfile.variationTypes),
  };
  return scaledProfile;
}
