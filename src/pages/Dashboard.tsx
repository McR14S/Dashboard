import { Grid, Card, CardContent, Typography, CardMedia, Button, Pagination, Box, CircularProgress } from "@mui/material";
import { API_URL } from "../config/constants";
import { useFetch } from "../hooks/index";
import { useState } from "react";

interface Producto {
  id: number;
  nombre: string;
  precio: number;
  imagen: string;
}

const Dashboard = () => {
  const { data, error, loading } = useFetch<Producto[]>(API_URL);
  const [page, setPage] = useState(1); // Estado para la página actual
  const itemsPerPage = 6; // Número de productos por página

  // Si está cargando, muestra un loader
  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  // Si hay un error, muestra el mensaje de error
  if (error) {
    return <div>UPS! Hay un error: {error.message}</div>;
  }

  // Función para manejar el cambio de página
  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  // Obtener el rango de productos para la página actual
  const startIndex = (page - 1) * itemsPerPage;
  const selectedProducts = data?.slice(startIndex, startIndex + itemsPerPage);

  return (
    <Box
      sx={{
        paddingTop: "75px",
        paddingX: { xs: 2, sm: 3 },
        paddingLeft: { sm: "175px" },
      }}
    >
      <Typography variant="h4" gutterBottom>
        Listado de Productos
      </Typography>

      <Grid container spacing={3}>
        {selectedProducts?.map((producto) => (
          <Grid item xs={12} sm={6} md={4} key={producto.id}>
            <Card elevation={3} sx={{ borderRadius: 2 }}>
              <CardMedia
                component="img"
                alt={producto.nombre}
                height="200"
                image={producto.imagen}
                sx={{
                  objectFit: "cover", // Asegura que la imagen ocupe el área sin distorsión
                }}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {producto.nombre}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Precio: ${producto.precio}
                </Typography>
              </CardContent>
              <Button
                size="small"
                color="primary"
                fullWidth
                sx={{
                  padding: 1.5,
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  "&:hover": {
                    backgroundColor: "#1976d2", // Color de hover en azul
                  },
                }}
              >
                Ver Producto
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Componente de Paginación */}
      <Box
        display="flex"
        justifyContent="center"
        sx={{ marginTop: 4 }}
      >
        <Pagination
          count={Math.ceil((data?.length ?? 0) / itemsPerPage)} // Usamos ?? para asegurar que si data?.length es undefined, se use 0
          page={page}
          onChange={handleChangePage}
          color="primary"
          shape="rounded"
        />
      </Box>
    </Box>
  );
};

export default Dashboard;
