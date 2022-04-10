import { PersistentPlaceReviewWithPlace } from '@/model/PersistentPlaceReviewWithPersistentPlace';
import { SuggestedPlace } from '@/recommend/SuggestedPlace';
import { WithReviews } from '@/recommend/SuggestedPlace/WithReviews';
import { WithStatsOptional } from '@/recommend/SuggestedPlace/WithStatsOptional';
import { SuggestedPlacesMetaInfo } from '@/recommend/SuggestedPlacesMetaInfo';
import { TasteProfile } from '@/recommend/TasteProfile';

export interface State {
  ownReviews: PersistentPlaceReviewWithPlace[];
  tasteProfile: TasteProfile | null;
  suggestedPlacesMetaInfo: SuggestedPlacesMetaInfo | null;
  suggestedPlaces: (SuggestedPlace & WithReviews & WithStatsOptional)[];
  suggestedPlacesReviewers: { id: string; name: string | null }[];
}

export interface PersistentState {
  ownReviews: PersistentPlaceReviewWithPlace[];
  tasteProfile: TasteProfile | null;
  suggestedPlacesMetaInfo: SuggestedPlacesMetaInfo | null;
  suggestedPlaces: (SuggestedPlace & WithReviews & WithStatsOptional)[];
}

export function reduceRecommendStateToPersistentState(state: State): PersistentState {
  return {
    ownReviews: state.ownReviews,
    tasteProfile: state.tasteProfile,
    suggestedPlacesMetaInfo: state.suggestedPlacesMetaInfo,
    suggestedPlaces: state.suggestedPlaces,
  };
}

export const DEFAULT_STATE: State = {
  ownReviews: [],
  tasteProfile: null,
  suggestedPlacesMetaInfo: null,
  suggestedPlaces: [],
  suggestedPlacesReviewers: [],
};
