import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SideBarAdmin from '../components/SideBarAdmin'; 
import '../styles/CrearProducto.css'; 
import { createProduct } from '../api/productApi';
import type { ProductForm } from '../types/ProductTypes'; 

// Tipos de elementos que pueden cambiar
type InputElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

/**
 * Función auxiliar para parsear y aplicar la lógica de redondeo a números.
 * Esto asegura que el precio sea un múltiplo de 50.
 */
const parseAndValidateNumber = (value: string, name: string): number => {
    // 1. Si el valor es una cadena vacía o inválida, retornamos 0
    if (value === "") return 0;
    
    let numValue = parseInt(value, 10);
    if (isNaN(numValue)) return 0;

    // 2. Lógica de redondeo para el precio (múltiplo de 50)
    if (name === 'price') {
        const step = 50; 
        numValue = Math.round(numValue / step) * step; 
    }
    
    return numValue;
};

export default function CrearProducto() {
    
    const navigate = useNavigate(); 
    
    const [formData, setFormData] = useState<ProductForm>({
        name: '',
        category: '',
        price: '', // Se mantiene como string para reflejar el input type="number"
        stock: 0, 
        description: '',
        imageUrl: '', // Opcional (se maneja en handleSubmit)
    });
    const [mensaje, setMensaje] = useState('');
    const [esError, setEsError] = useState(false);

    /**
     * Maneja los cambios en todos los campos del formulario.
     */
    const handleChange = (e: ChangeEvent<InputElement>): void => {
        const { name, value, type } = e.target;
        
        let finalValue: string | number;

        if (type === 'number') {
            // Guardamos el valor exacto del input (que puede ser string o number)
            finalValue = value; 
        } else if (name === 'stock') {
             // Si fuera un campo de stock tipo string
            finalValue = parseAndValidateNumber(value, name);
        } else {
            finalValue = value;
        }

        setFormData(prev => ({
            ...prev,
            [name]: finalValue as ProductForm[keyof ProductForm]
        }));
    };

    /**
     * Maneja el envío del formulario: guarda el producto en localStorage y redirige.
     */
    const handleSubmit = (e: FormEvent): void => {
        e.preventDefault();
        setMensaje('Guardando producto...');
        setEsError(false);
        
        // 1. Determinar la URL final (con placeholder si está vacía)
        const finalImageUrl = formData.imageUrl || '/imagenesreact/placeholder_product.jpg';
        
        // 2. Preparar los datos para la API (asegurando los tipos correctos)
        const productToSave: ProductForm = {
            ...formData,
            // Convertimos el precio de vuelta a string y aplicamos la validación final (redondeo)
            price: String(parseAndValidateNumber(String(formData.price), 'price')), 
            // Aseguramos que el stock sea number
            stock: Number(formData.stock), 
            imageUrl: finalImageUrl, 
        };

        // 3. Llamar a la API para crear el producto
        const success = createProduct(productToSave); 

        if (success) {
            setMensaje(`¡Producto "${formData.name}" creado con éxito! Redirigiendo...`);
            setEsError(false);
            
            // 4. Redirección al listado de productos después de un breve delay
            setTimeout(() => {
                navigate('/administrador/productos'); 
            }, 1000); 
            
        } else {
            setMensaje('Error: No se pudo crear el producto. Asegúrate de que el nombre sea único.');
            setEsError(true);
        }
    };

    return (
        <div className="admin-layout">
            <SideBarAdmin />
            
            <main className="main-content">
                <div className="crear-producto-header">
                    <h1><i className="bi bi-plus-circle"></i> Crear nuevo producto</h1>
                    <Link to="/administrador/productos" className="volver-link"><i className="bi bi-arrow-left"></i> Volver al listado</Link>
                    {mensaje && (
                        <p className={`mensaje-feedback ${esError ? 'error-mensaje' : 'success-mensaje'}`} style={{ marginTop: 10 }}>
                            {mensaje}
                        </p>
                    )}
                </div>
                
                <form className="crear-producto-form" onSubmit={handleSubmit}>
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="name">Nombre del producto</label>
                            <input type="text" id="name" name="name" className="form-control" value={formData.name} onChange={handleChange} required maxLength={80} autoComplete="off" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="category">Categoría</label>
                            <select id="category" name="category" className="form-control" value={formData.category} onChange={handleChange} required>
                                <option value="" disabled>Seleccione categoría</option>
                                <option value="Computadores">Computadores</option>
                                <option value="Tarjetas de Video">Tarjetas de Video</option>
                                <option value="Periféricos">Periféricos</option>
                                <option value="Monitores">Monitores</option>
                                <option value="Almacenamiento">Almacenamiento</option>
                                <option value="Accesorios">Accesorios</option>
                                <option value="Juegos de mesa">Juegos de mesa</option>
                            </select>
                        </div>
                    </div>
                    
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="price">Precio ($ CLP)</label>
                            {/* step="50" obliga al usuario a usar múltiplos de 50 */}
                            <input type="number" id="price" name="price" className="form-control" value={formData.price} onChange={handleChange} required min="0" step="50" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="stock">Stock</label>
                            <input type="number" id="stock" name="stock" className="form-control" value={formData.stock} onChange={handleChange} required min="0" step="1" />
                        </div>
                    </div>
                    
                    <div className="form-row">
                        <div className="form-group form-group-full">
                            <label htmlFor="description">Descripción</label>
                            <textarea id="description" name="description" className="form-control" value={formData.description} onChange={handleChange} rows={3} maxLength={300} required></textarea>
                        </div>
                    </div>
                    
                    <div className="form-row">
                        <div className="form-group form-group-full">
                            {/* 🔑 Campo de URL de imagen opcional */}
                            <label htmlFor="imageUrl">URL de la Imagen (Opcional)</label>
                            <input 
                                type="text" 
                                id="imageUrl" 
                                name="imageUrl" 
                                className="form-control" 
                                value={formData.imageUrl} 
                                onChange={handleChange} 
                                placeholder="Ej: /imagenesreact/mouse.png o URL externa"
                            />
                        </div>
                    </div>
                    
                    <button type="submit" className="btn-crear-producto-form"><i className="bi bi-check-circle"></i> Crear producto</button>
                </form>
            </main>
        </div>
    );
}