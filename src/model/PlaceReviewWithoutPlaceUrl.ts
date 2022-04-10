import { PlaceReview } from './PlaceReview';

export type PlaceReviewWithoutPlaceUrl = Omit<PlaceReview, 'placeUrl'>;
