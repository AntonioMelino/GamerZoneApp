"use client";

import SearchIcon from "@mui/icons-material/Search";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import { Select, MenuItem, FormControl } from "@mui/material";
import "./ProductSearchBar.css";

const ProductSearchBar = ({
  searchTerm,
  setSearchTerm,
  sortOrder,
  setSortOrder,
  resultsCount,
}) => {
  // Función para limpiar todos los filtros
  const handleClearFilters = () => {
    setSearchTerm("");
    setSortOrder("");
  };

  // Verificar si hay filtros activos
  const hasActiveFilters = searchTerm !== "" || sortOrder !== "";

  return (
    <div className="product-search-bar">
      <div className="search-bar-content">
        {/* Campo de búsqueda por texto */}
        <div className="search-input-wrapper">
          <div className="input-label">Buscar productos</div>
          <div className="input-container">
            <SearchIcon className="search-icon" />
            <input
              id="product-search"
              type="text"
              className="search-input"
              placeholder="Buscar por nombre del producto..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Buscar productos"
            />
          </div>
        </div>

        {/* Selector de ordenamiento por precio - CON MUI MEJORADO */}
        <div className="sort-select-wrapper mui-select-wrapper">
          <div className="input-label">Ordenar por precio</div>
          <div className="input-container">
            <FormControl fullWidth>
              <Select
                id="sort-order"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                displayEmpty
                renderValue={(selected) => {
                  if (selected === "") return "Seleccionar";
                  if (selected === "asc") return "Precio: Menor a Mayor";
                  if (selected === "desc") return "Precio: Mayor a Menor";
                  return "Seleccionar";
                }}
                sx={{
                  backgroundColor: "var(--input-bg)",
                  color: "var(--text-color)",
                  borderRadius: "12px",
                  height: "46px",
                  width: "100%",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "var(--border-color)",
                    borderRadius: "12px",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "var(--primary-color)",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "var(--primary-color)",
                    boxShadow: "0 0 0 3px rgba(99, 102, 241, 0.1)",
                  },
                  "& .MuiSelect-select": {
                    padding: "10px 14px",
                    display: "flex",
                    alignItems: "center",
                  },
                  "& .MuiSvgIcon-root": {
                    color: "var(--primary-color)",
                  },
                }}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      backgroundColor: "var(--card-bg)",
                      color: "var(--text-color)",
                      border: "1px solid var(--border-color)",
                      borderRadius: "12px",
                      marginTop: "4px",
                      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
                    },
                  },
                }}
              >
                <MenuItem
                  value=""
                  sx={{
                    backgroundColor: "var(--card-bg)",
                    color: "var(--text-color)",
                    "&:hover": {
                      backgroundColor: "var(--primary-color-light)",
                    },
                    "&.Mui-selected": {
                      backgroundColor: "var(--primary-color)",
                      color: "white",
                      "&:hover": {
                        backgroundColor: "var(--primary-color)",
                      },
                    },
                  }}
                >
                  Sin ordenar
                </MenuItem>
                <MenuItem
                  value="asc"
                  sx={{
                    backgroundColor: "var(--card-bg)",
                    color: "var(--text-color)",
                    "&:hover": {
                      backgroundColor: "var(--primary-color-light)",
                    },
                    "&.Mui-selected": {
                      backgroundColor: "var(--primary-color)",
                      color: "white",
                      "&:hover": {
                        backgroundColor: "var(--primary-color)",
                      },
                    },
                  }}
                >
                  Precio: Menor a Mayor
                </MenuItem>
                <MenuItem
                  value="desc"
                  sx={{
                    backgroundColor: "var(--card-bg)",
                    color: "var(--text-color)",
                    "&:hover": {
                      backgroundColor: "var(--primary-color-light)",
                    },
                    "&.Mui-selected": {
                      backgroundColor: "var(--primary-color)",
                      color: "white",
                      "&:hover": {
                        backgroundColor: "var(--primary-color)",
                      },
                    },
                  }}
                >
                  Precio: Mayor a Menor
                </MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>

        {/* Botón de limpiar filtros (solo visible si hay filtros activos) */}
        {hasActiveFilters && (
          <div className="button-wrapper">
            <div className="input-label">&nbsp;</div>{" "}
            {/* Label vacío para alineación */}
            <button
              className="clear-filters-button"
              onClick={handleClearFilters}
              aria-label="Limpiar todos los filtros"
            >
              <ClearAllIcon />
              Limpiar filtros
            </button>
          </div>
        )}
      </div>

      {/* Contador de resultados */}
      {resultsCount !== undefined && (
        <div className="search-results-count">
          Mostrando <strong>{resultsCount}</strong>{" "}
          {resultsCount === 1 ? "producto" : "productos"}
        </div>
      )}
    </div>
  );
};

export default ProductSearchBar;
