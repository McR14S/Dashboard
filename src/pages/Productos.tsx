import { useState, useEffect } from "react";
import { Grid, Card, CardContent, Typography, CardMedia, Button, Pagination, Box, CircularProgress, Modal, TextField } from "@mui/material";
import { API_URL_PRODUCTOS } from "../config/constants";
import { useFetch } from "../hooks/index";
import SearchBar from "../components/navbar/SearchBar";
import { Producto } from "../types/IProduct"; 

const Productos = () => {
  const { data, error, loading } = useFetch<Producto[]>(API_URL_PRODUCTOS);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(searchTerm);
  // Modal
  const [openModal, setOpenModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Producto | null>(null);

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
    text.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

  // Filtrado de productos con el término de búsqueda
  const filteredProducts = data?.filter((producto) =>
    normalizeText(producto.nombre).includes(normalizeText(debouncedSearch))
  );

  const handleViewProduct = (id: number) => {
    console.log(`Ver detalles del producto ${id}`);
  };

  const handleDeleteProduct = async (id: number) => {
    console.log(`Producto ${id} eliminado`);
  };

  const handleAddProduct = () => {
    setSelectedProduct(null);
    setOpenModal(true);
  };

  const handleEditProduct = (producto: Producto) => {
    setSelectedProduct(producto);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

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

      <SearchBar onSearchChange={(e) => setSearchTerm(e.target.value)} />

      <Button variant="contained" color="primary" onClick={handleAddProduct} sx={{ marginBottom: 2 }}>
        Agregar Producto
      </Button>

      <Grid container spacing={3} sx={{ marginTop: 2 }}>
        {selectedProducts?.map((producto) => (
          <Grid item xs={12} sm={6} md={4} key={producto.id}>
            <Card elevation={3} sx={{ borderRadius: 2 }}>
              <CardMedia
                component="img"
                alt={producto.nombre}
                height="200"
                image={producto.imagen}
                sx={{ objectFit: "cover" }}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {producto.nombre}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Precio: ${producto.precio}
                </Typography>
              </CardContent>
              <Box display="flex" justifyContent="space-between" sx={{ padding: 2 }}>
                <Button size="small" color="primary" fullWidth sx={{ padding: 1.5, fontWeight: "bold", textTransform: "uppercase" }} onClick={() => handleViewProduct(producto.id)}>
                  Ver Producto
                </Button>
                <Button size="small" color="secondary" sx={{ padding: 1.5, fontWeight: "bold", textTransform: "uppercase" }} onClick={() => handleEditProduct(producto)}>
                  Editar
                </Button>
                <Button size="small" color="error" sx={{ padding: 1.5, fontWeight: "bold", textTransform: "uppercase" }} onClick={() => handleDeleteProduct(producto.id)}>
                  Eliminar
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box display="flex" justifyContent="center" sx={{ marginTop: 4 }}>
        <Pagination count={Math.ceil((filteredProducts ?? []).length / itemsPerPage)} page={page} onChange={(_, value) => setPage(value)} color="primary" shape="rounded" />
      </Box>

      {/* Modal para agregar/editar producto */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 400, bgcolor: "background.paper", boxShadow: 24, p: 4, borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom>
            {selectedProduct ? "Editar Producto" : "Agregar Producto"}
          </Typography>
          <TextField label="Nombre" fullWidth margin="normal" defaultValue={selectedProduct?.nombre || ""} />
          <TextField label="Precio" fullWidth margin="normal" defaultValue={selectedProduct?.precio || ""} type="number" />
          <TextField label="Imagen URL" fullWidth margin="normal" defaultValue={selectedProduct?.imagen || ""} />
          <Box display="flex" justifyContent="space-between" sx={{ marginTop: 2 }}>
            <Button variant="contained" color="primary" onClick={handleCloseModal}>
              Guardar
            </Button>
            <Button variant="outlined" onClick={handleCloseModal}>
              Cancelar
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default Productos;
