import React, { useState, useEffect, useCallback } from 'react'; // Agregamos useCallback
import { Link } from 'react-router-dom'; 
import SideBarAdmin from '../components/SideBarAdmin';
import '../styles/listaProductos.css';
import { getAllProducts } from '../api/productApi';
import type { Product } from '../types/ProductTypes'; 

/**
 * ListaProductos - Muestra los productos cargados desde localStorage.
 */
export default function ListaProductos() {
    
    const [products, setProducts] = useState<Product[]>([]); 
    const [view, setView] = useState('tabla');
    const [modalOpen, setModalOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    // Función para cargar los productos (útil para recargar la lista después de crear/eliminar)
    const loadProducts = useCallback(() => {
        const storedProducts: Product[] = getAllProducts();
        
        // --- CÓDIGO DE DEPURACIÓN CLAVE ---
        console.log("-----------------------------------------");
        console.log("Productos Cargados desde LocalStorage/API:");
        console.table(storedProducts); 
        console.log("Total de productos cargados:", storedProducts.length);
        console.log("-----------------------------------------");
        // --- FIN CÓDIGO DE DEPURACIÓN ---

        setProducts(storedProducts);
    }, []);

    // Cargamos los productos al montar el componente
    useEffect(() => {
        loadProducts();
    }, [loadProducts]); // El dependency array incluye loadProducts

    const formatPrice = (priceString: string) => { 
        return priceString; 
    };

    return (
        <div className="admin-layout">
            <SideBarAdmin />

            <main className="main-content">
                <div className="productos-header">
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                        <h1>Productos</h1>
                        
                        <div className="view-controls" role="tablist" aria-label="Vista productos">
                            <button
                                type="button"
                                className={`toggle-btn ${view === 'tabla' ? 'active' : ''}`}
                                onClick={() => setView('tabla')}
                                aria-pressed={view === 'tabla'}
                            >
                                <i className="bi bi-table" /> Tabla
                            </button>
                            <button
                                type="button"
                                className={`toggle-btn ${view === 'tablero' ? 'active' : ''}`}
                                onClick={() => setView('tablero')}
                                aria-pressed={view === 'tablero'}
                            >
                                <i className="bi bi-grid-3x3-gap" /> Tablero
                            </button>
                        </div>
                    </div>

                    <div className="create-area" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        {/* Enlace para crear usuario */}
                        <Link
                          className="btn-crear-usuario"
                          to="/administrador/crear_usuario" 
                          title="Crear nuevo usuario"
                        >
                            <i className="bi bi-person-plus" /> Crear usuario
                        </Link>

                        {/* Botón crear producto con dropdown */}
                        <div className="create-wrapper">
                            <button
                                className="btn-crear-producto"
                                type="button"
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                aria-haspopup="true"
                                aria-expanded={dropdownOpen}
                            >
                                <i className="bi bi-plus-circle" /> Crear producto
                                <i className={`bi ${dropdownOpen ? 'bi-caret-up-fill' : 'bi-caret-down-fill'}`} style={{ marginLeft: 6 }} />
                            </button>

                            {dropdownOpen && (
                                <div className="create-dropdown" role="menu">
                                    <button className="create-dropdown-item" type="button" onClick={() => { setModalOpen(true); setDropdownOpen(false); }}>
                                        <i className="bi bi-file-earmark-plus" /> Nuevo producto
                                    </button>
                                    <button className="create-dropdown-item" type="button" onClick={() => { setDropdownOpen(false); alert('Importar CSV (demo)'); }}>
                                        <i className="bi bi-file-arrow-up" /> Importar CSV
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="panel-box">
                    {/* VISTA: TABLA */}
                    {view === 'tabla' && (
                        <div className="productos-table-wrapper">
                            <table className="productos-table">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Imagen</th>
                                        <th>Nombre</th>
                                        <th>Categoría</th>
                                        <th>Precio</th>
                                        <th>Stock</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map((p) => (
                                        <tr key={p.id}>
                                            <td>{p.id}</td>
                                            {/* Usamos p.imageUrl y p.name según tu ProductType */}
                                            <td><img src={p.imageUrl} alt={p.name} className="producto-img" /></td> 
                                            <td>{p.name}</td> 
                                            <td>{p.category}</td>
                                            <td>{formatPrice(p.price)}</td>
                                            <td>{p.stock}</td>
                                            <td>
                                                <button className="btn-editar-producto" type="button">
                                                    <i className="bi bi-pencil" /> Editar
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {products.length === 0 && (
                                <p style={{ textAlign: 'center', padding: '20px' }}>No hay productos registrados.</p>
                            )}
                        </div>
                    )}

                    {/* VISTA: TABLERO / CARDS */}
                    {view === 'tablero' && (
                        <div className="product-board" style={{ padding: 18 }}>
                            {products.map((p) => (
                                <article className="product-card" key={p.id}>
                                    <div className="product-card-media">
                                        <img src={p.imageUrl} alt={p.name} /> 
                                    </div>
                                    <div className="product-card-body">
                                        <h3 className="product-card-title">{p.name}</h3>
                                        <p className="product-card-category">{p.category}</p>
                                        <div className="product-card-meta">
                                            <span className="product-price">{formatPrice(p.price)}</span>
                                            <span className="product-stock">{p.stock} en stock</span>
                                        </div>
                                    </div>
                                    <div className="product-card-actions">
                                        <button className="btn-editar-producto small"><i className="bi bi-pencil" /> Editar</button>
                                        <button className="btn-editar-producto small remove"><i className="bi bi-trash" /> Eliminar</button>
                                    </div>
                                </article>
                            ))}
                            {products.length === 0 && (
                                <p style={{ textAlign: 'center', padding: '20px', width: '100%' }}>No hay productos registrados.</p>
                            )}
                        </div>
                    )}
                </div>

                {/* MODAL (sin cambios) */}
                {modalOpen && (
                    <div className="modal-backdrop" role="dialog" aria-modal="true">
                        <div className="modal-card">
                            <header className="modal-header">
                                <h2>Crear producto (demo)</h2>
                                <button className="modal-close" onClick={() => setModalOpen(false)} aria-label="Cerrar">&times;</button>
                            </header>
                            <div className="modal-body">
                                <label> Nombre <input type="text" placeholder="Nombre del producto" /> </label>
                                <label> Categoría <input type="text" placeholder="Categoría" /> </label>
                                <label> Precio <input type="text" placeholder="$0" /> </label>
                                <label> Stock <input type="number" min="0" defaultValue={0} /> </label>
                            </div>
                            <footer className="modal-footer">
                                <button className="btn-crear-producto ghost" onClick={() => setModalOpen(false)}>Cancelar</button>
                                <button className="btn-crear-producto" onClick={() => { alert('Simulación: producto creado (demo)'); setModalOpen(false); }}>Crear (demo)</button>
                            </footer>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}