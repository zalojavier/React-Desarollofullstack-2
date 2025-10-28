import React, { useState } from 'react';
import { useCart } from '../context/cartContex';
import '../styles/carrito.css';
import { updateProductStock } from '../api/productApi'; 


export default function CartPage() { 
    const { items, total, updateQuantity, removeItem, clearCart } = useCart();
    const [compraExitosa, setCompraExitosa] = useState(false);
    const [stockError, setStockError] = useState(false); 

    const formatMoney = (n: number) =>
        new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(n);

    const handleQuantityChange = (itemId: string, event: React.ChangeEvent<HTMLInputElement>) => {
        const newQuantity = parseInt(event.target.value, 10);
        if (!isNaN(newQuantity) && newQuantity >= 1) {
            updateQuantity(itemId, newQuantity);
        }
    };

    const handlePagar = () => {
        let allUpdatesSuccessful = true;
        setStockError(false); 

        // 1. Descontar el stock por cada producto vendido
        items.forEach(item => {
            const updated = updateProductStock(item.id, item.cantidad);
            if (!updated) {
                allUpdatesSuccessful = false;
            }
        });

        if (allUpdatesSuccessful) {
            // 2. Stock descontado correctamente, vaciamos el carrito
            clearCart();
            setCompraExitosa(true);
            
            setTimeout(() => setCompraExitosa(false), 5000); 

        } else {
            // 3. Fallo
            setStockError(true);
            setCompraExitosa(false); 
            setTimeout(() => setStockError(false), 8000); 
        }
    };

    return (
        <div className="carrito-root">
            
            {/* Mensajes de feedback */}
            {compraExitosa && (
                <div className="gamer-alert success" style={{ backgroundColor: '#4CAF50', color: 'white' }}>
                    ¡Compra procesada con éxito! El stock ha sido actualizado.
                </div>
            )}
            {stockError && (
                <div className="gamer-alert error" style={{ backgroundColor: '#f44336', color: 'white' }}>
                    Error al procesar la compra. Revisa la consola y el stock de los productos.
                </div>
            )}


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
                        <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #333', padding: '10px 0' }}> 
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
                                <span style={{ margin: '0 12px' }}>Total: {formatMoney(item.precioUnitario * item.cantidad)}</span>
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

            <div style={{ maxWidth: 540, margin: '24px auto 24px auto', textAlign: 'right' }}>
                <span id="total-compra" className="text-neon" style={{ fontSize: '1.3em', fontWeight: 'bold' }}>
                    {items.length === 0 ? 'Carrito vacío' : `Total de la compra: ${formatMoney(total)}`}
                </span>
            </div>

            <div className="carrito-controles">
                <button className="btn-add-cart" type="button" onClick={clearCart} disabled={items.length === 0}>
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