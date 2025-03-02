import { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, TextField, Button, DialogActions } from "@mui/material";
import { Producto } from "../../types/IProduct";

interface ProductoModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (producto: Producto) => void;
  producto?: Producto | null;
}

const ProductoModal = ({ open, onClose, onSave, producto }: ProductoModalProps) => {
  const [formData, setFormData] = useState<Producto>({
    id: 0,
    nombre: "",
    precio: 0,
    imagen: "",
  });

  // Cuando el modal se abre con un producto existente, llenar los campos
  useEffect(() => {
    if (producto) {
      setFormData(producto);
    } else {
      setFormData({ id: 0, nombre: "", precio: 0, imagen: "" });
    }
  }, [producto]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSave(formData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>{producto ? "Editar Producto" : "Nuevo Producto"}</DialogTitle>
      <DialogContent>
        <TextField
          label="Nombre"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Precio"
          name="precio"
          type="number"
          value={formData.precio}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="URL Imagen"
          name="imagen"
          value={formData.imagen}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">Cancelar</Button>
        <Button onClick={handleSubmit} color="primary">Guardar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductoModal;
