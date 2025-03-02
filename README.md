# Dashboard App

Este proyecto es una aplicación de Dashboard creada con **React**, **TypeScript** y **Vite**. Implementa un hook personalizado `useFetch` para manejar peticiones a una API y gestionar estados de carga y error.

## 📌 Tecnologías utilizadas

- React
- TypeScript
- Vite

## 🚀 Instalación

Clona el repositorio e instala las dependencias:

```sh
# Clonar el repositorio
git clone https://github.com/McR14S/Dashboard.git
cd Dashboard

# Instalar dependencias
npm install
```

## ▶️ Uso

Ejecuta la aplicación en modo desarrollo:

```sh
npm run dev
```

La aplicación estará disponible en `http://localhost:5173/` por defecto.

## 📜 Estructura del proyecto

```
├── src
│   ├── config
│   │   ├── constants.ts   # Archivo con la constante API_URL
│   ├── hooks
│   │   ├── useFetch.ts    # Hook personalizado para llamadas a la API
│   ├── App.tsx           # Componente principal
│   ├── main.tsx          # Punto de entrada
├── index.html            # Archivo HTML principal
├── vite.config.ts        # Configuración de Vite
├── package.json          # Dependencias del proyecto
```

## 📦 Funcionalidades

- Usa `useFetch` para hacer peticiones a una API definida en `API_URL`.
- Manejo de estados de carga y error.
- Renderiza los datos obtenidos de la API en formato JSON.

## 🛠️ Código principal

### `useFetch.ts`
```tsx
import { useEffect, useState } from "react";

type Data<T> = T | null;
type ErrorType = Error | null;

interface Props<T> {
    data: Data<T>;
    loading: boolean;
    error: ErrorType;
}

export const useFetch = <T>(url: string): Props<T> => {
    const [data, setData] = useState<Data<T>>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<ErrorType>(null);

    useEffect(() => {
        let controller = new AbortController();
        setLoading(true);

        const fetchData = async () => {
            try {
                const response = await fetch(url, controller);
                if (!response.ok) {
                    throw new Error("Error en la petición");
                }
                const jsonData: T = await response.json();
                setData(jsonData);
                setError(null);
            } catch (err) {
                setError(err as Error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();

        return () => {
            controller.abort();
        };
    }, [url]);

    return { data, loading, error };
};
```

### `App.tsx`
```tsx
import { API_URL } from "./config/constants";
import { useFetch } from "./hooks";

interface Data {
  name: string;
  lastName: string;
  age: number;
}

function App() {
  const { data, error, loading } = useFetch<Data>(API_URL);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>UPS! Hay un error: {error.message}</div>;
  }

  return (
    <>
      <h1>DASHBOARD</h1>
      <div>{JSON.stringify(data)}</div>
    </>
  );
}

export default App;
```

## 🌎 Despliegue

Para construir la aplicación para producción:

```sh
npm run build
```

Puedes desplegar el proyecto en **Vercel**, **Netlify** o cualquier servicio de hosting compatible con aplicaciones frontend.

## 📜 Licencia

Este proyecto está bajo la licencia MIT.

