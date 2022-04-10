import { FoodTypeIds } from '@/recommend/FoodTypeIds';

import { GENERAL_TYPE } from './constants';

export function useVariationIdAsBaseIdTooIfGeneralType(type: FoodTypeIds): FoodTypeIds {
  return type.baseId === GENERAL_TYPE ? { baseId: type.variationId, variationId: type.variationId } : type;
}
