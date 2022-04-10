import { sortArrayByStrFieldAsc } from '@/utils/sort/sortArrayByStrFieldAsc';

import { PlaceFoodType } from './Place';

export function getSortedFoodTypeNames(foodTypes: PlaceFoodType[]): string[] {
  const types = sortArrayByStrFieldAsc(foodTypes, ({ name }: { name: string }) => name);
  let sortedTypes = [];
  const primaryTypeIndex = types.findIndex(({ primary }) => primary);
  if (primaryTypeIndex !== -1) {
    sortedTypes.push(types[primaryTypeIndex]);
    types.splice(primaryTypeIndex, 1);
  }
  sortedTypes = [...sortedTypes, ...types];
  return sortedTypes.map(({ name }: { name: string }) => name);
}
