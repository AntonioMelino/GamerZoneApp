"use client";

import { useState, useEffect } from "react";
import ProductCard from "../../common/productCard/ProductCard";
import { useParams } from "react-router";
import { Grid } from "@mui/material";
import ProductSkeleton from "../../common/productSkeleton/ProductSkeleton";
import { db } from "../../../firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import ImageCarousel from "../../common/imageCarousel/ImageCarousel";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ProductSearchBar from "../../common/ProductSearchBar/ProductSearchBar";
import SearchIcon from "@mui/icons-material/Search"; // Importar SearchIcon
import "./ItemListContainer.css";

const images = [
  "https://res.cloudinary.com/dhwsxp2c8/image/upload/v1741310377/165_ln6rel.jpg",
  "https://res.cloudinary.com/dhwsxp2c8/image/upload/v1741310459/197_fizpur.png",
  "https://res.cloudinary.com/dhwsxp2c8/image/upload/v1741310494/201_wzkwcf.png",
  "https://res.cloudinary.com/dhwsxp2c8/image/upload/v1741310516/200_jkadux.jpg",
  "https://res.cloudinary.com/dhwsxp2c8/image/upload/v1741310540/175_b2dyu9.jpg",
  "https://res.cloudinary.com/dhwsxp2c8/image/upload/v1741310569/190_hhaa5p.jpg",
  "https://res.cloudinary.com/dhwsxp2c8/image/upload/v1741310588/168_f3dbnv.jpg",
  "https://res.cloudinary.com/dhwsxp2c8/image/upload/v1741310874/19-02-2025-11-02-24-Web_Banner_5000G_01_jxgahp.jpg",
];

const ItemListContainer = () => {
  const { name } = useParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9);

  useEffect(() => {
    setCurrentPage(1);
    setLoading(true);
    setSearchTerm("");
    setSortOrder("");

    const coleccionDeProductos = collection(db, "products");
    let consulta = coleccionDeProductos;

    if (name && name !== "Todos") {
      const coleccionFiltrada = query(
        coleccionDeProductos,
        where("category", "==", name)
      );
      consulta = coleccionFiltrada;
    }

    const getProducts = getDocs(consulta);

    getProducts
      .then((res) => {
        const newArray = res.docs.map((elemento) => {
          return { id: elemento.id, ...elemento.data() };
        });
        setItems(newArray);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [name]);

  const filteredProducts = items.filter((product) => {
    // Usa product.title en lugar de product.name
    const productTitle = product?.title || "";
    return productTitle.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOrder === "asc") return a.price - b.price;
    if (sortOrder === "desc") return b.price - a.price;
    return 0;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  return (
    <div className="item-list-container">
      {!name && <ImageCarousel images={images} />}

      {!loading && items.length > 0 && (
        <ProductSearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          resultsCount={sortedProducts.length}
        />
      )}

      {name && (
        <div className="category-header">
          <h1 className="category-title">{name}</h1>
          <p className="category-subtitle">
            Descubre los mejores productos en {name}
          </p>
        </div>
      )}

      {!loading && sortedProducts.length > 0 && (
        <div className="items-per-page-selector">
          <label>Productos por página:</label>
          <select value={itemsPerPage} onChange={handleItemsPerPageChange}>
            <option value={6}>6</option>
            <option value={9}>9</option>
            <option value={12}>12</option>
            <option value={18}>18</option>
          </select>
        </div>
      )}

      {loading ? (
        <Grid
          container
          spacing={3}
          sx={{
            padding: "20px",
            maxWidth: "1400px",
            margin: "0 auto",
          }}
        >
          {[...Array(6)].map((_, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <ProductSkeleton />
            </Grid>
          ))}
        </Grid>
      ) : sortedProducts.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "60px 20px",
            color: "var(--text-muted)",
          }}
        >
          <SearchIcon
            style={{ fontSize: 64, marginBottom: 16, opacity: 0.5 }}
          />
          <h2 style={{ color: "var(--text-color)" }}>
            No se encontraron productos
          </h2>
          <p>Intenta con otros términos de búsqueda o ajusta los filtros</p>
        </div>
      ) : (
        <>
          <Grid
            container
            spacing={3}
            sx={{
              padding: "20px",
              maxWidth: "1400px",
              margin: "0 auto",
            }}
          >
            {currentItems.map((item) => (
              <Grid item key={item.id} xs={12} sm={6} md={4}>
                <ProductCard {...item} />
              </Grid>
            ))}
          </Grid>

          {totalPages > 1 && (
            <div className="pagination-container">
              <button
                className="pagination-button"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeftIcon />
                Anterior
              </button>

              <div className="pagination-buttons">
                {[...Array(totalPages)].map((_, index) => {
                  const pageNumber = index + 1;
                  if (
                    pageNumber === 1 ||
                    pageNumber === totalPages ||
                    (pageNumber >= currentPage - 1 &&
                      pageNumber <= currentPage + 1)
                  ) {
                    return (
                      <button
                        key={pageNumber}
                        className={`pagination-button pagination-number ${
                          currentPage === pageNumber ? "active" : ""
                        }`}
                        onClick={() => handlePageChange(pageNumber)}
                      >
                        {pageNumber}
                      </button>
                    );
                  } else if (
                    pageNumber === currentPage - 2 ||
                    pageNumber === currentPage + 2
                  ) {
                    return (
                      <span
                        key={pageNumber}
                        style={{ color: "var(--text-muted)" }}
                      >
                        ...
                      </span>
                    );
                  }
                  return null;
                })}
              </div>

              <button
                className="pagination-button"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Siguiente
                <ChevronRightIcon />
              </button>
            </div>
          )}

          <div className="pagination-info">
            Mostrando {indexOfFirstItem + 1} -{" "}
            {Math.min(indexOfLastItem, sortedProducts.length)} de{" "}
            {sortedProducts.length} productos
          </div>
        </>
      )}
    </div>
  );
};

export default ItemListContainer;
