import { HalfStars } from '@/model/HalfStars';

export interface Stats {
  numberOfReviewsDescription: string;
  averageRating: number;
  averageRatingHalfStars: HalfStars;
  averageRatingStr: string;
}
