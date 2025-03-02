import { useState } from "react";

interface Producto {
    id: number;
    nombre: string;
    precio: number;
    imagen: string;
}


export const useProducts = () => { 
    const [productos, setProductos] = useState<Producto[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Obtener productos
    const fetchProducts = async () => {
        setLoading(true);
        try {
            const response = await fetch(`API_URL_PRODUCTOS`);
            if (!response.ok) throw new Error("Error al obtener los productos");
            const data = await response.json();
            setProductos(data)
        } catch (err){
            setError(err as string);
        } finally {
            setLoading(false);
        }
    };

    // Crear producto
    const addProduct = async (producto: Producto) => {
        try {
        const response = await fetch(`API_URL_PRODUCTOS`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(producto),
        });

        if (!response.ok) throw new Error("Error al crear el producto");

        const nuevoProducto = await response.json();
        setProductos([...productos, nuevoProducto]);
        } catch (err) {
        setError(err as string);
        }
    };

    // Actualizar producto
    const updateProduct = async (id: number, nuevosDatos: Partial<Producto>) => { 
        try {
            const response = await fetch(`API_URL_PRODUCTOS/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(nuevosDatos),
            });

            if (!response.ok) throw new Error("Error al actualizar el producto");

            const productoActualizado = await response.json();
            setProductos(productos.map((p) => (p.id === id ? productoActualizado : p)));
        } catch (err) {
            setError(err as string);
        }
    }

    // Eliminar producto
    const deleteProduct = async (id: number) => { 
        try {
            const response = await fetch(`API_URL_PRODUCTOS/${id}`, {
                method: "DELETE",
            });

            if (!response.ok) throw new Error("Error al eliminar el producto");

            setProductos(productos.filter((p) => p.id !== id));
        } catch (err) {
            setError(err as string);
        }
    }

    return { productos, loading, error, fetchProducts, addProduct, updateProduct, deleteProduct };
}