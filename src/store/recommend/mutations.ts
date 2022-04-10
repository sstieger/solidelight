import { MutationTree } from 'vuex';

import { PersistentPlaceReviewWithPlace } from '@/model/PersistentPlaceReviewWithPersistentPlace';
import { SuggestedPlace } from '@/recommend/SuggestedPlace';
import { WithReviews } from '@/recommend/SuggestedPlace/WithReviews';
import { WithStats } from '@/recommend/SuggestedPlace/WithStats';
import { SuggestedPlacesMetaInfo } from '@/recommend/SuggestedPlacesMetaInfo';
import { TasteProfile } from '@/recommend/TasteProfile';

import { DEFAULT_STATE, State } from './state';

export const SET_OWN_REVIEWS_MUTATION = 'setOwnReviews';
export const ADD_OWN_REVIEW_MUTATION = 'addOwnReview';
export const UPDATE_OWN_REVIEW_MUTATION = 'updateOwnReview';
export const DELETE_OWN_REVIEW_MUTATION = 'deleteOwnReview';
export const SET_TASTE_PROFILE_MUTATION = 'setTasteProfile';
export const SET_SUGGESTED_PLACES_MUTATION = 'setSuggestedPlaces';
export const SET_SUGGESTED_PLACE_REVIEWS_AND_STATS_MUTATION = 'setSuggestedPlaceReviewsAndStats';
export const SET_SUGGESTED_PLACE_REVIEWER_NAME_MUTATION = 'setSuggestedPlaceReviewerName';
export const CLEAR_RECOMMEND_STATE_MUTATION = 'clearRecommendState';

export const mutations: MutationTree<State> = {
  [SET_OWN_REVIEWS_MUTATION](state, reviews: PersistentPlaceReviewWithPlace[]) {
    state.ownReviews = reviews;
  },
  [ADD_OWN_REVIEW_MUTATION](state, newReview: PersistentPlaceReviewWithPlace) {
    state.ownReviews.push(newReview);
  },
  [UPDATE_OWN_REVIEW_MUTATION](state, updatedReview: PersistentPlaceReviewWithPlace) {
    const index = state.ownReviews.findIndex((review) => review.id === updatedReview.id);
    if (typeof index !== 'undefined') {
      state.ownReviews[index] = updatedReview;
    }
  },
  [DELETE_OWN_REVIEW_MUTATION](state, reviewId: string) {
    state.ownReviews = state.ownReviews.filter((review) => review.id !== reviewId);
  },
  [SET_TASTE_PROFILE_MUTATION](state, profile: TasteProfile) {
    state.tasteProfile = profile;
  },
  [SET_SUGGESTED_PLACES_MUTATION](
    state,
    params: {
      metaInfo: SuggestedPlacesMetaInfo;
      suggestedPlaces: (SuggestedPlace & WithReviews)[];
    },
  ) {
    state.suggestedPlacesMetaInfo = params.metaInfo;
    state.suggestedPlaces = params.suggestedPlaces;
  },
  [SET_SUGGESTED_PLACE_REVIEWS_AND_STATS_MUTATION](state, params: { id: string } & WithReviews & WithStats) {
    const place = state.suggestedPlaces.find(({ id }) => id === params.id);
    if (place) {
      place.reviews = params.reviews;
      place.stats = params.stats;
    }
  },
  [SET_SUGGESTED_PLACE_REVIEWER_NAME_MUTATION](state, params: { id: string; name: string }) {
    const reviewer = state.suggestedPlacesReviewers.find(({ id }) => id === params.id);
    if (reviewer) {
      reviewer.name = params.name;
    } else {
      state.suggestedPlacesReviewers.push(params);
    }
  },
  [CLEAR_RECOMMEND_STATE_MUTATION](state) {
    state.ownReviews = DEFAULT_STATE.ownReviews;
    state.tasteProfile = DEFAULT_STATE.tasteProfile;
    state.suggestedPlacesMetaInfo = DEFAULT_STATE.suggestedPlacesMetaInfo;
    state.suggestedPlaces = DEFAULT_STATE.suggestedPlaces;
    state.suggestedPlacesReviewers = DEFAULT_STATE.suggestedPlacesReviewers;
  },
};
