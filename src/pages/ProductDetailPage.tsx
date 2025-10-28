import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import { useCart } from '../context/cartContex'; 
import { getAllProducts } from '../api/productApi'; 
import type { Product } from '../types/ProductTypes';
import '../styles/ProductDetailPage.css'; // Importa el archivo CSS para el detalle

// 🔑 Función de utilidad para formato de moneda (Adaptada de SeccionJuegosMesa.jsx)
const formatMoney = (n: string | number) => {
    // Eliminar puntos de miles para que JS no lo interprete como decimal
    const cleanNumberString = String(n).replace(/\./g, ''); 
    const numberValue = Number(cleanNumberString);

    // Aplicar el formato de moneda chileno sin decimales
    return new Intl.NumberFormat('es-CL', { 
        style: 'currency', 
        currency: 'CLP', 
        maximumFractionDigits: 0 
    }).format(numberValue);
};

export default function ProductDetailPage() {
    // Obtener el ID dinámico de la URL
    const { id } = useParams<{ id: string }>(); 
    const { addItem } = useCart();
    
    const [product, setProduct] = useState<Product | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [quantity, setQuantity] = useState(1); // Controla la cantidad a añadir al carrito

    // Cargar el producto específico
    useEffect(() => {
        setIsLoading(true);
        try {
            // Busca todos los productos y luego encuentra el que coincide con el ID de la URL
            const allProducts = getAllProducts(); 
            const foundProduct = allProducts.find(p => String(p.id) === id); 
            setProduct(foundProduct || null);
            // Si el producto se encuentra, asegura que la cantidad inicial sea 1 (o menor si el stock es 0)
            if (foundProduct) {
                setQuantity(foundProduct.stock > 0 ? 1 : 0);
            }
        } catch (error) {
            console.error("Error al cargar el producto:", error);
            setProduct(null);
        } finally {
            setIsLoading(false);
        }
    }, [id]);

    // Manejar el botón de añadir al carrito
    const handleAddToCart = () => {
        if (!product || quantity <= 0) return;

        // 🔑 CORRECCIÓN: Limpieza robusta para evitar NaN en el carrito
        const priceCleanString = String(product.price).replace(/\D/g, '');
        const priceAsNumber = Number(priceCleanString);
        
        if (isNaN(priceAsNumber)) {
            console.error("Error de conversión de precio:", product.price);
            alert("Error al añadir al carrito: El precio del producto no es válido. Revisa la consola.");
            return;
        }
        
        addItem({
            id: String(product.id),
            nombre: product.name,
            precioUnitario: priceAsNumber, // Usamos el precio ya limpio
            cantidad: quantity, // Usamos la cantidad seleccionada por el usuario
        });
        alert(`Se añadieron ${quantity} de ${product.name} al carrito.`);
    };

    if (isLoading) {
        return <div className="text-center mt-5">Cargando detalles del producto...</div>;
    }

    if (!product) {
        return (
            <>
                <Navbar />
                <div className="container my-5 text-center">
                    <h2>Producto No Encontrado</h2>
                    <p>El producto con ID **{id}** no existe o no está disponible.</p>
                    <Link to="/categorias" className="btn btn-secondary mt-3">Volver al Catálogo</Link>
                </div>
                <Footer />
            </>
        );
    }
    
    // Suponiendo que el tipo Product tiene una propiedad 'description'
    const productDescription = (product as any).description || 'Este producto no tiene una descripción detallada disponible.';
    const isOutOfStock = product.stock <= 0;

    return (
        <>
            <Navbar />

            <div className="container my-5 product-detail-container">
                <div className="row">
                    {/* Sección de Imagen */}
                    <div className="col-lg-6 mb-4">
                        <img 
                            src={product.imageUrl} 
                            alt={product.name} 
                            className="img-fluid rounded shadow-sm product-image"
                        />
                    </div>

                    {/* Sección de Detalles */}
                    <div className="col-lg-6">
                        {/* Breadcrumb para navegación */}
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><Link to="/categorias">Catálogo</Link></li>
                                <li className="breadcrumb-item active" aria-current="page">{product.category}</li>
                            </ol>
                        </nav>
                        
                        <h1 className="product-name">{product.name}</h1>
                        
                        <hr />
                        
                        {/* Precio */}
                        <div className="price-section mb-4">
                            <span className="display-4 fw-bold text-danger">
                                {formatMoney(product.price)}
                            </span>
                        </div>
                        
                        {/* Descripción */}
                        <div className="description-section mb-4">
                            <h4>Descripción</h4>
                            <p className='text-secondary'>{productDescription}</p>
                        </div>

                        {/* Stock */}
                        <div className="stock-section mb-4">
                            <span className={`badge ${isOutOfStock ? 'bg-danger' : 'bg-success'}`}>
                                {isOutOfStock ? 'Agotado' : `En Stock: ${product.stock} unidades`}
                            </span>
                        </div>

                        {/* Controles de Cantidad y Carrito */}
                        <div className="cart-controls d-flex align-items-center mb-5">
                            <input
                                type="number"
                                min="1"
                                max={product.stock}
                                value={quantity}
                                onChange={(e) => {
                                    // Limita la cantidad entre 1 y el stock disponible
                                    const val = Math.max(1, Math.min(product.stock, Number(e.target.value)));
                                    setQuantity(val);
                                }}
                                className="form-control me-3"
                                style={{ width: '80px' }}
                                disabled={isOutOfStock}
                            />
                            <button
                                className="btn btn-lg btn-primary"
                                onClick={handleAddToCart}
                                disabled={isOutOfStock || quantity <= 0}
                            >
                                <i className="bi bi-cart-plus"></i> Añadir al Carrito
                            </button>
                        </div>
                        
                        <Link to={`/secciones/${product.category.toLowerCase().replace(/\s+/g, '')}`} className="text-secondary">← Volver a {product.category}</Link>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}