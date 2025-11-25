import React, { useState, useEffect, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import { useCart } from '../context/cartContex'; 
import { getAllProducts } from '../api/productApi'; 
import type { Product } from '../types/ProductTypes';
import '../styles/SeccionJuegosMesa.css';

const CATEGORY_MAP: { [key: string]: { name: string, icon: string } } = {
    '/secciones/juegosdemesa': { name: 'Juegos de mesa', icon: 'bi-controller' },
    '/secciones/accesorios': { name: 'Accesorios', icon: 'bi-headset' },
    '/secciones/consolas': { name: 'Consolas', icon: 'bi-xbox' },
    '/secciones/pcdeescritorio': { name: 'Computadoras gamers', icon: 'bi-pc-display' },
    '/secciones/sillasgamers': { name: 'Sillas gamer', icon: 'bi-chair' },
    '/secciones/mousepad': { name: 'Mousepads', icon: 'bi-mouse' },
    '/secciones/poleraspersonalizadas': { name: 'Poleras y polerones personalizados', icon: 'bi-shirt' },
};

// Función de utilidad para formato de moneda (muestra formato CL)
const formatMoney = (n: string | number) => {
    const cleanNumberString = String(n).replace(/\./g, ''); 
    const numberValue = Number(cleanNumberString);

    return new Intl.NumberFormat('es-CL', { 
        style: 'currency', 
        currency: 'CLP', 
        maximumFractionDigits: 0 
    }).format(numberValue);
};

export default function CategorySection() {
    const { pathname } = useLocation();
    const { addItem } = useCart();
    
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const categoryInfo = CATEGORY_MAP[pathname];
    const categoryName = categoryInfo ? categoryInfo.name : 'Productos';
    const categoryIcon = categoryInfo ? categoryInfo.icon : 'bi-tags';

    // --- CORRECCIÓN PRINCIPAL AQUÍ ---
    useEffect(() => {
        const fetchProducts = async () => {
            setIsLoading(true);
            try {
                // Esperamos a que el backend responda
                const storedProducts = await getAllProducts();
                setProducts(storedProducts);
            } catch (error) {
                console.error("Error cargando productos:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, []);
    // ----------------------------------

    // FILTRO: Filtra productos por categoría
    const filteredProducts = useMemo(() => {
        if (!categoryName || categoryName === 'Productos') return products;

        const targetCategoryLower = categoryName.toLowerCase(); 

        return products.filter(p => p.category.toLowerCase() === targetCategoryLower);
    }, [products, categoryName]);

    // Función para añadir al carrito
    const handleAddToCart = (product: Product) => {
        // Limpieza robusta para evitar NaN en el carrito
        const priceCleanString = String(product.price).replace(/\D/g, '');
        const priceAsNumber = Number(priceCleanString);
        
        if (isNaN(priceAsNumber)) {
            console.error("Error de conversión de precio:", product.price);
            alert("Error al añadir al carrito: El precio del producto no es válido.");
            return;
        }

        addItem({
            id: String(product.id),
            nombre: product.name,
            precioUnitario: priceAsNumber,
            cantidad: 1, 
        });
    };

    if (isLoading) {
        return <div className="text-center mt-5">Cargando productos...</div>;
    }

    return (
        <>
            <Navbar />

            <div className="container">
                <h1 className="titulo-seccion"><i className={`bi ${categoryIcon}`}></i> {categoryName}</h1>
                
                {filteredProducts.length === 0 ? (
                    <p className="text-center mt-4">No hay productos disponibles en esta categoría.</p>
                ) : (
                    <div className="row g-4">
                        {filteredProducts.map(p => (
                            <div className="col-md-6 col-lg-4" key={p.id}>
                                <div className="card h-100 text-center">
                                    <img src={p.imageUrl || 'https://via.placeholder.com/150'} className="card-img-top" alt={p.name} />
                                    <div className="card-body">
                                        <h5 className="card-title">{p.name}</h5>
                                        <div style={{minHeight: '3em'}}>
                                            {/* Espacio para descripción corta */}
                                        </div>
                                        <div>
                                            <span className="precio">{formatMoney(p.price)}</span>
                                        </div>
                                    </div>
                                    <div className="card-footer bg-transparent border-0 d-grid gap-2">
                                        {/* Enlace al detalle del producto */}
                                        <Link to={`/productos/${p.id}`} className="btn btn-vermas">Ver más</Link>
                                        
                                        {/* Botón de añadir al carrito */}
                                        <button 
                                            className="btn btn-primary" 
                                            onClick={() => handleAddToCart(p)}
                                            disabled={p.stock <= 0}
                                        >
                                            <i className="bi bi-cart"></i> {p.stock > 0 ? 'Añadir al Carrito' : 'Agotado'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                
                <Link to="/categorias" className="catalogo-link">← Volver al catálogo</Link>
            </div>

            <Footer />
        </>
    );
}