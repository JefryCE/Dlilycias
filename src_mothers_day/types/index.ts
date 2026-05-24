export type Category = 'ALFAJORES' | 'CUPCAKES' | 'DONAS' | 'MACETA' | 'PIE' | 'TARTALETA' | 'TORTA';

export interface Product {
  id: string;
  name: string;
  category: Category;
  price: number;
  image: string;
  description: string;
  mothersDayMessage: string;
  tag?: string;
}

export const CATEGORIES: { key: Category | 'ALL'; label: string }[] = [
  { key: 'ALL', label: 'Todos' },
  { key: 'ALFAJORES', label: 'Alfajores' },
  { key: 'CUPCAKES', label: 'Cupcakes' },
  { key: 'DONAS', label: 'Donas' },
  { key: 'MACETA', label: 'Macetas' },
  { key: 'PIE', label: 'Pie' },
  { key: 'TARTALETA', label: 'Tartaletas' },
  { key: 'TORTA', label: 'Tortas' },
];
