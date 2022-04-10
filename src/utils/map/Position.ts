export interface Position {
  id: string;
  title: string;
  resultType: 'street' | 'houseNumber';
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
}
