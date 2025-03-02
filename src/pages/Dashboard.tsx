import { useState, useEffect } from "react";
import { Grid, Card, CardContent, Typography, CardMedia, Button, Pagination, Box, CircularProgress } from "@mui/material";
import { API_URL } from "../config/constants";
import { useFetch } from "../hooks/index";
import SearchBar from "../components/navbar/SearchBar";

interface Producto {
  id: number;
  nombre: string;
  precio: number;
  imagen: string;
}

const Dashboard = () => {
  const { data, error, loading } = useFetch<Producto[]>(API_URL);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(searchTerm);
  const itemsPerPage = 6;

  // Debounce para la busqueda
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 300);

    return () => clearTimeout(handler);
  }, [searchTerm]);

  // Función para normalizar texto 
  const normalizeText = (text: string) =>
    text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

  // Filtrado de productos con el término de búsqueda
  const filteredProducts = data?.filter((producto) =>
    normalizeText(producto.nombre).includes(normalizeText(debouncedSearch))
  );

  const startIndex = (page - 1) * itemsPerPage;
  const selectedProducts = filteredProducts?.slice(startIndex, startIndex + itemsPerPage);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <div>UPS! Hay un error: {error.message}</div>;
  }

  return (
    <Box sx={{ paddingTop: "75px", paddingX: { xs: 2, sm: 3 }, paddingLeft: { sm: "175px" } }}>
      <Typography variant="h4" gutterBottom>Listado de Productos</Typography>

      {/* Barra de búsqueda */}
      <SearchBar onSearchChange={(e) => setSearchTerm(e.target.value)} />

      <Grid container spacing={3} sx={{ marginTop: 2 }}>
        {selectedProducts?.map((producto) => (
          <Grid item xs={12} sm={6} md={4} key={producto.id}>
            <Card elevation={3} sx={{ borderRadius: 2 }}>
              <CardMedia component="img" alt={producto.nombre} height="200" image={producto.imagen} sx={{ objectFit: "cover" }} />
              <CardContent>
                <Typography variant="h6" gutterBottom>{producto.nombre}</Typography>
                <Typography variant="body2" color="textSecondary">Precio: ${producto.precio}</Typography>
              </CardContent>
              <Button size="small" color="primary" fullWidth sx={{ padding: 1.5, fontWeight: "bold", textTransform: "uppercase" }}>
                Ver Producto
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Paginación */}
      <Box display="flex" justifyContent="center" sx={{ marginTop: 4 }}>
        <Pagination
          count={Math.ceil((filteredProducts?.length ?? 0) / itemsPerPage)}
          page={page}
          onChange={(_, value) => setPage(value)}
          color="primary"
          shape="rounded"
        />
      </Box>
    </Box>
  );
};

export default Dashboard;
