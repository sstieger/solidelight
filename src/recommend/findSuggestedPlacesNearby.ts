import { NUM_SUGGESTIONS, SUGGESTIONS_MAX_DISTANCE } from '@/constants';
import { mapPlatform } from '@/map/mapPlatform';
import { SuggestedPlace } from '@/recommend/SuggestedPlace';
import { TasteProfile } from '@/recommend/TasteProfile';
import { scorePlace } from '@/recommend/scorePlace';
import { splitFullFoodTypeId } from '@/recommend/splitFullFoodTypeId';
import { fetchEatAndDrinkPlacesNearby } from '@/utils/map/fetchEatAndDrinkPlacesNearby';
import { sortArrayByNumberFieldDesc } from '@/utils/sort/sortArrayByNumberFieldDesc';

export async function findSuggestedPlacesNearby(
  profile: TasteProfile | null,
  coords: GeolocationCoordinates,
): Promise<SuggestedPlace[]> {
  const realProfile: TasteProfile = profile ?? { baseTypes: {}, variationTypes: {}, createdAt: Date.now() };
  const likedFoodTypes = getLikedFoodTypesForPlacesRequest(realProfile);
  const nearbyPlaces = await fetchEatAndDrinkPlacesNearby(
    mapPlatform,
    coords.latitude,
    coords.longitude,
    likedFoodTypes,
    SUGGESTIONS_MAX_DISTANCE,
  );
  const allPlacesWithScores = nearbyPlaces.map((place) => {
    const placeFoodTypeIds = place.foodTypes.map(({ id }) => splitFullFoodTypeId(id));
    const scores = scorePlace(realProfile, placeFoodTypeIds, place.distance);
    return { ...place, scores };
  });
  return sortArrayByNumberFieldDesc(allPlacesWithScores, ({ scores }) => scores.overall).slice(0, NUM_SUGGESTIONS);
}

function getLikedFoodTypesForPlacesRequest(profile: TasteProfile): string[] {
  const likedBaseTypes = Object.keys(profile.baseTypes).filter((type) => !type.startsWith('800-'));
  const likedVariationTypes = Object.keys(profile.variationTypes);
  return [...likedBaseTypes, ...likedVariationTypes];
}
