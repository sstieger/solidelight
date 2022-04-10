// Minimal rating of a review for it to be included in the profile generation.
// This is based on the assumption that ratings with less than three stars tend
// to be directed against the location rather than the food type itself.
export const MIN_RATING_FOR_TASTE_PROFILE_RELEVANCE = 3;

// Relevance of the physical distance from the user to the POI
// (1 - POI and user taste profile similarity relevance).
export const DISTANCE_RELEVANCE = 0.4;

// Relevance of the base food type (1 - variation food type relevance).
export const BASE_TYPE_RELEVANCE = 0.6;

// Relevance of the user's liked food type weights
// (1 - POI's matching food type weights relevance).
export const LIKED_TYPE_RELEVANCE = 0.7;
