export interface PlaceCategory {
  id: string;
  name?: string;
  primary?: boolean;
}

export interface PlaceFoodType {
  id: string;
  name: string;
  primary?: boolean;
}

export interface PlaceOpeningHours {
  categories: { id: string }[];
  text: string[];
  isOpen: boolean;
}

export interface Place {
  id: string;
  title: string;
  distance: number;
  address: {
    label: string;
    street: string;
    houseNumber?: string;
    postalCode: string;
    city: string;
    countryName: string;
  };
  position: {
    lat: number;
    lng: number;
  };
  openingHours: PlaceOpeningHours[];
  categories: PlaceCategory[];
  foodTypes: PlaceFoodType[];
}
