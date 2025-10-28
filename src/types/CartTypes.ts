export interface CartItem {
  id: string;
  nombre: string;
  precioUnitario: number;
  cantidad: number;
}

export interface CartContextType {
  items: CartItem[];
  total: number;
  addItem: (product: CartItem) => void;
  updateQuantity: (id: string, newQuantity: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
}