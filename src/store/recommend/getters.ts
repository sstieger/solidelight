import { GetterTree } from 'vuex';

import { State as RootState } from '@/store/state';
import { sortArrayByDateFieldDesc } from '@/utils/sort/sortArrayByDateFieldDesc';

import { State } from './state';

export const getters: GetterTree<State, RootState> = {
  ownReviewById: (state) => (id: string) => state.ownReviews.find((review) => review.id === id) ?? null,
  ownReviewsByLastModifiedDate: (state) => sortArrayByDateFieldDesc(state.ownReviews, (review) => review.dateModified),
  suggestedPlaceById: (state) => (id: string) => state.suggestedPlaces.find((place) => place.id === id) ?? null,
  suggestedPlaceReviewerById: (state) => (id: string) =>
    state.suggestedPlacesReviewers.find((reviewer) => reviewer.id === id) ?? null,
};
