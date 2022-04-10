import { Place } from '@/utils/map/Place';

export interface SuggestedPlaceScores {
  tasteProfile: number;
  distance: number;
  overall: number;
}

export interface WithScores {
  scores: SuggestedPlaceScores;
}

export type SuggestedPlace = Place & WithScores;
