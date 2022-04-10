interface Address {
  street: string;
  houseNumber?: string;
  postalCode: string;
  city: string;
  countryName: string;
}

export function buildAddressStr(address: Address): string {
  // The house number may be missing :/
  const spacedHouseNumber = address.houseNumber ? ` ${address.houseNumber}` : '';
  return `${address.street}${spacedHouseNumber}, ${address.postalCode} ${address.city}, ${address.countryName}`;
}
