export interface iItem {
  id: string;
  name: string;
  quantity: {
    unit: unit;
    value: number;
  };
  checked: boolean;
}

export enum unit {
  kg = 'kg',
  g = 'g',
  l = 'l',
  ml = 'ml',
  unit = 'unità',
}
