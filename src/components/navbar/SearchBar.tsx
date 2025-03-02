import { InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import "./navbar.css"; // Asegúrate de importar tu hoja de estilos

export default function SearchBar() {
  return (
    <div className="search-container">
      <div className="search-icon">
        <SearchIcon />
      </div>
      <InputBase className="search-input" placeholder="Buscar..." inputProps={{ "aria-label": "search" }} />
    </div>
  );
}
