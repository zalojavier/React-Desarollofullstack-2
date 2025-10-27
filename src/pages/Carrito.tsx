import React from 'react';
import { useCart } from '../context/cartContex';
import '../styles/carrito.css'; // Mantenemos la referencia al CSS

/**
 * Componente CarritoPage (Contenedor Funcional)
 * Este componente usa el estado del carrito a través del hook useCart.
 * Mapea la lógica (modificar, eliminar) a los botones de la vista.
 */
export function CartPage() {
  // 1. Obtener estado y funciones del Contexto
  const { items, total, updateQuantity, removeItem, clearCart } = useCart();

  const formatMoney = (n: number) =>
    new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(n);

  const handleQuantityChange = (itemId: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(event.target.value, 10);
    if (!isNaN(newQuantity) && newQuantity >= 1) {
      updateQuantity(itemId, newQuantity);
    }
  };

  const handlePagar = () => {
    // Aquí iría la lógica de pago. Por ahora, solo vaciamos el carrito y avisamos.
    clearCart();
    // En lugar de alert, usamos una implementación de mensaje de éxito
    console.log("Pago simulado exitoso.");
    // Podrías usar un estado local para mostrar un modal de éxito aquí
  };

  return (
    <div className="carrito-root">
      <div className="gamer-alert">
        <span className="gamer-icon"><i className="fas fa-shopping-cart" /></span>
        <span>
          ¡Bienvenido a tu carrito!
          <a href="/" className="gamer-link" style={{ marginLeft: 8 }}>Seguir comprando</a>
        </span>
      </div>

      <h1 className="titulo-gamer">Carrito de compras</h1>

      <div id="carrito">
        {items.length === 0 ? (
          <p>El carrito está vacío.</p>
        ) : (
          items.map(item => (
            <div key={item.id}>
              {/* Contenido Izquierdo */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span>{item.nombre}</span>
                <span style={{ fontWeight: 700 }}>{formatMoney(item.precioUnitario)} c/u</span>
              </div>

              {/* Contenido Derecho */}
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <input
                  type="number"
                  value={String(item.cantidad)}
                  min={1}
                  onChange={(e) => handleQuantityChange(item.id, e)}
                />
                <span style={{ marginRight: 12 }}>Total: {formatMoney(item.precioUnitario * item.cantidad)}</span>
                <button 
                    className="btn-eliminar" 
                    type="button" 
                    onClick={() => removeItem(item.id)}
                >
                  <i className="fas fa-trash-alt" /> Eliminar
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div style={{ maxWidth: 540, margin: '0 auto 24px auto' }}>
        <span id="total-compra" className="text-neon" style={{ fontSize: '1.3em' }}>
          {items.length === 0 ? 'Carrito vacío' : `Total de la compra: ${formatMoney(total)}`}
        </span>
      </div>

      <div className="carrito-controles">
        <button className="btn-add-cart" type="button" onClick={clearCart}>
          <i className="fas fa-trash-alt" /> Vaciar carrito
        </button>
        <a href="/" className="btn-login"><i className="fas fa-arrow-left" /> Seguir comprando</a>
        <button 
            id="btn-pagar" 
            className="btn-add-cart" 
            type="button" 
            onClick={handlePagar}
            disabled={items.length === 0}
        >
          <i className="fas fa-credit-card" /> Pagar
        </button>
      </div>
    </div>
  );
}

export default CartPage;
