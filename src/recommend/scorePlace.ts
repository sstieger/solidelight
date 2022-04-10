import { FoodTypeIds } from './FoodTypeIds';
import { SuggestedPlaceScores } from './SuggestedPlace';
import { TasteProfile } from './TasteProfile';
import { calcDistanceScore } from './calcDistanceScore';
import { calcTasteProfilePlaceSimilarityScore } from './calcTasteProfilePlaceSimilarityScore';
import { DISTANCE_RELEVANCE } from './parameters';

export function scorePlace(
  profile: TasteProfile,
  placeFoodTypeIds: FoodTypeIds[],
  distance: number,
): SuggestedPlaceScores {
  const profileEmpty = !Object.keys(profile.baseTypes).length && !Object.keys(profile.variationTypes).length;
  const tasteProfileScore = profileEmpty ? 0 : calcTasteProfilePlaceSimilarityScore(profile, placeFoodTypeIds);
  const distanceScore = calcDistanceScore(distance);
  const overallScore = tasteProfileScore * (1 - DISTANCE_RELEVANCE) + distanceScore * DISTANCE_RELEVANCE;
  return { tasteProfile: tasteProfileScore, distance: distanceScore, overall: overallScore };
}
