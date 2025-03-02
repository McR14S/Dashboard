import { InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import "./navbar.css"; // Asegúrate de importar tu hoja de estilos

interface SearchBarProps {
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void; // Recibe la función que actualiza el término de búsqueda
}

export default function SearchBar({ onSearchChange }: SearchBarProps) {
  return (
    <div className="search-container">
      <div className="search-icon">
        <SearchIcon />
      </div>
      <InputBase
        className="search-input"
        placeholder="Buscar..."
        inputProps={{ "aria-label": "search" }}
        onChange={onSearchChange}
      />
    </div>
  );
}
