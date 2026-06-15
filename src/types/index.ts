export type Category = 'ALFAJORES' | 'TORTA' | 'BROWNIE' | 'HABANITO' | 'CHOCOLATE' | 'MIXTO' | 'EMPANADAS';

export interface Product {
  id: string;
  name: string;
  category: Category;
  price: number;
  image: string;
  description: string;
  fathersDayMessage: string;
  tag?: string;
}

export const CATEGORIES: { key: Category | 'ALL'; label: string }[] = [
  { key: 'ALL', label: 'Todos' },
  { key: 'ALFAJORES', label: 'Alfajores' },
  { key: 'BROWNIE', label: 'Brownies' },
  { key: 'CHOCOLATE', label: 'Chocolates' },
  { key: 'EMPANADAS', label: 'Empanadas' },
  { key: 'HABANITO', label: 'Habanitos' },
  { key: 'MIXTO', label: 'Mixtos' },
  { key: 'TORTA', label: 'Tortas' },
];
