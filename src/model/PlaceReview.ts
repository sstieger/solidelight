import { FullStars } from '@/model/FullStars';

export interface PlaceReview {
  creatorWebId: string;
  placeUrl: string;
  dateCreated: Date;
  dateModified: Date;
  rating: FullStars;
  review: string | null;
}
