import { PersistentPlace } from './PersistentPlace';
import { PersistentPlaceReview } from './PersistentPlaceReview';

export type PersistentPlaceReviewWithPlace = PersistentPlaceReview & { place: PersistentPlace };
