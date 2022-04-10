import { fetch } from '@inrupt/solid-client-authn-browser';
import { ActionTree } from 'vuex';

import { PersistentPlaceReviewWithPlace } from '@/model/PersistentPlaceReviewWithPersistentPlace';
import { Place } from '@/model/Place';
import { PlaceReviewWithoutPlaceUrl } from '@/model/PlaceReviewWithoutPlaceUrl';
import { SuggestedPlace } from '@/recommend/SuggestedPlace';
import { WithReviews } from '@/recommend/SuggestedPlace/WithReviews';
import { SuggestedPlacesMetaInfo } from '@/recommend/SuggestedPlacesMetaInfo';
import { buildRatingStats } from '@/recommend/buildRatingStats';
import { buildTasteProfile } from '@/recommend/buildTasteProfile';
import { findSuggestedPlacesNearby } from '@/recommend/findSuggestedPlacesNearby';
import { addReview, deleteReview, getReviews, updateReview } from '@/solid/placeReviews';
import { deletePlace } from '@/solid/places';
import { getReviewsForHereId } from '@/solid/reviewLinks';
import { State as RootState } from '@/store/state';
import { getSolidProfile } from '@/utils/solid/getSolidProfile';

import {
  ADD_OWN_REVIEW_MUTATION as ADD_OWN_REVIEW_MUTATION,
  DELETE_OWN_REVIEW_MUTATION,
  SET_OWN_REVIEWS_MUTATION,
  SET_SUGGESTED_PLACES_MUTATION,
  SET_SUGGESTED_PLACE_REVIEWER_NAME_MUTATION,
  SET_SUGGESTED_PLACE_REVIEWS_AND_STATS_MUTATION,
  SET_TASTE_PROFILE_MUTATION,
  UPDATE_OWN_REVIEW_MUTATION,
} from './mutations';
import { State } from './state';

export const FETCH_OWN_REVIEWS_ACTION = 'fetchOwnReviews';
export const ADD_OWN_REVIEW_ACTION = 'addOwnReview';
export const UPDATE_OWN_REVIEW_ACTION = 'updateOwnReview';
export const DELETE_OWN_REVIEW_ACTION = 'deleteOwnReview';
export const SUGGEST_PLACES_ACTION = 'suggestPlaces';
export const FETCH_SUGGESTED_PLACE_REVIEWER_NAMES_ACTION = 'fetchSuggestedPlaceReviewerNames';

export const actions: ActionTree<State, RootState> = {
  async [FETCH_OWN_REVIEWS_ACTION]({ rootState, state, commit }) {
    if (!rootState.user.appContainerUrl) {
      throw new Error('Can not fetch reviews, app container URL not known');
    }
    const reviews = await getReviews(rootState.user.appContainerUrl, fetch);
    commit(SET_OWN_REVIEWS_MUTATION, reviews);
    commit(SET_TASTE_PROFILE_MUTATION, buildTasteProfile(state.ownReviews));
  },
  async [ADD_OWN_REVIEW_ACTION](
    { rootState, state, commit },
    config: { review: PlaceReviewWithoutPlaceUrl; place: Place },
  ) {
    if (!rootState.user.appContainerUrl) {
      throw new Error('Can not save review, app container URL not known');
    }
    const persistentReview = await addReview(config.review, config.place, rootState.user.appContainerUrl, fetch);
    commit(ADD_OWN_REVIEW_MUTATION, persistentReview);
    commit(SET_TASTE_PROFILE_MUTATION, buildTasteProfile(state.ownReviews));
  },
  async [UPDATE_OWN_REVIEW_ACTION]({ rootState, state, commit }, updatedReview: PersistentPlaceReviewWithPlace) {
    if (!rootState.user.appContainerUrl) {
      throw new Error('Can not update review, app container URL not known');
    }
    await updateReview(updatedReview, rootState.user.appContainerUrl, fetch);
    commit(UPDATE_OWN_REVIEW_MUTATION, updatedReview);
    commit(SET_TASTE_PROFILE_MUTATION, buildTasteProfile(state.ownReviews));
  },
  async [DELETE_OWN_REVIEW_ACTION]({ rootState, state, commit }, review: PersistentPlaceReviewWithPlace) {
    if (!rootState.user.appContainerUrl) {
      throw new Error('Can not delete review, app container URL not known');
    }
    await Promise.all([
      deleteReview(review.id, rootState.user.appContainerUrl, fetch),
      deletePlace(review.place.id, rootState.user.appContainerUrl, fetch),
    ]);
    commit(DELETE_OWN_REVIEW_MUTATION, review.id);
    commit(SET_TASTE_PROFILE_MUTATION, buildTasteProfile(state.ownReviews));
  },
  async [SUGGEST_PLACES_ACTION]({ rootState, state, commit }) {
    const position = rootState.user.geolocationPosition;
    if (!position) {
      throw new Error('Can not generate suggestions, no geolocation available');
    }
    const metaInfo: SuggestedPlacesMetaInfo = {
      geolocationTimestamp: position.timestamp,
      tasteProfileTimestamp: state.tasteProfile?.createdAt ?? Date.now(),
    };
    const suggestedPlaces: (SuggestedPlace & WithReviews)[] = (
      await findSuggestedPlacesNearby(state.tasteProfile, position.coords)
    ).map((place) => {
      return { ...place, reviews: [] };
    });
    commit(SET_SUGGESTED_PLACES_MUTATION, { metaInfo, suggestedPlaces });
    const fetchAndAddReviews = async (place: SuggestedPlace) => {
      // This never throws, just returns an empty array in case of an error.
      const reviews = await getReviewsForHereId(place.id, place, fetch);
      if (reviews.length) {
        const placeWithReviews = { ...place, reviews };
        const stats = buildRatingStats(placeWithReviews);
        commit(SET_SUGGESTED_PLACE_REVIEWS_AND_STATS_MUTATION, { id: place.id, reviews, stats });
      }
    };
    Promise.all(state.suggestedPlaces.map((place) => fetchAndAddReviews(place)));
  },
  async [FETCH_SUGGESTED_PLACE_REVIEWER_NAMES_ACTION]({ state, getters, commit }, placeId: string) {
    const place = state.suggestedPlaces.find((place) => place.id === placeId);
    if (!place) {
      return;
    }
    await Promise.allSettled(
      place.reviews
        .filter(({ creatorWebId: author }) => getters.suggestedPlaceReviewerById(author) === null)
        .map(async ({ creatorWebId: author }) => {
          const profile = await getSolidProfile(author, fetch);
          if (profile.name) {
            commit(SET_SUGGESTED_PLACE_REVIEWER_NAME_MUTATION, { id: author, name: profile.name });
          }
        }),
    );
  },
};
