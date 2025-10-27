export interface CartItem {
  id: string;
  nombre: string;
  precioUnitario: number;
  cantidad: number;
}

export interface CartContextType {
  items: CartItem[];
  total: number;
  // Funciones de modificación del estado
  addItem: (product: { id: string; nombre: string; precio: number }) => void;
  updateQuantity: (id: string, newQuantity: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
}