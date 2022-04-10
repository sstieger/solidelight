import { HalfStars } from '@/model/HalfStars';

import { SuggestedPlace } from './SuggestedPlace';
import { Stats } from './SuggestedPlace/Stats';
import { WithReviews } from './SuggestedPlace/WithReviews';

export function buildRatingStats(place: SuggestedPlace & WithReviews): Stats {
  const sum = place.reviews.reduce((acc, { rating }) => acc + rating, 0);
  const avg = sum / place.reviews.length;
  const averageRating = Math.round(avg * 10) / 10;
  const halfStars: HalfStars = Math.round((averageRating * 2) / 2) as HalfStars;
  const averageRatingStr = averageRating.toFixed(1);
  return {
    numberOfReviewsDescription: buildNumberOfReviewsDescription(place),
    averageRating: averageRating,
    averageRatingHalfStars: halfStars,
    averageRatingStr: averageRatingStr,
  };
}

function buildNumberOfReviewsDescription(place: SuggestedPlace & WithReviews): string {
  const nReviews = place.reviews.length;
  return `${nReviews} review${nReviews === 1 ? '' : 's'}`;
}
