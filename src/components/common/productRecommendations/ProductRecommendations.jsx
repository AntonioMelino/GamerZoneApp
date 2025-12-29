"use client";

import { useState, useEffect } from "react";
import { db } from "../../../firebaseConfig";
import { collection, query, where, getDocs, limit } from "firebase/firestore";
import { useNavigate } from "react-router";
import "./ProductRecommendations.css";

const ProductRecommendations = ({ currentProductId, currentCategory }) => {
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecommendedProducts = async () => {
      try {
        let productsQuery;
        const productsRef = collection(db, "products");

        // Estrategia 1: Buscar por misma categoría (si existe)
        if (currentCategory) {
          productsQuery = query(
            productsRef,
            where("category", "==", currentCategory),
            limit(8) // Traer más para filtrar después
          );
        }
        // Estrategia 2: Traer productos aleatorios
        else {
          productsQuery = query(productsRef, limit(12));
        }

        const querySnapshot = await getDocs(productsQuery);
        const products = [];

        querySnapshot.forEach((doc) => {
          const productData = doc.data();
          // Excluir el producto actual
          if (doc.id !== currentProductId) {
            products.push({
              id: doc.id,
              ...productData,
              // Si no tiene tags, crear uno básico basado en categoría
              tags: productData.tags || [productData.category || "general"],
            });
          }
        });

        // Mezclar productos y tomar 6
        const shuffled = [...products].sort(() => 0.5 - Math.random());
        setRecommendedProducts(shuffled.slice(0, 6));
      } catch (error) {
        console.error("Error fetching recommended products:", error);
        // Si hay error, usar array vacío
        setRecommendedProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendedProducts();
  }, [currentProductId, currentCategory]);

  if (loading) {
    return (
      <div className="recommendations-loading">Cargando recomendaciones...</div>
    );
  }

  if (recommendedProducts.length === 0) {
    return null;
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
    }).format(price);
  };

  return (
    <div className="product-recommendations">
      <h3 className="recommendations-title">También te puede interesar</h3>
      <p className="recommendations-subtitle">
        Productos relacionados con lo que estás viendo
      </p>

      <div className="recommendations-grid">
        {recommendedProducts.map((product) => (
          <div
            key={product.id}
            className="recommended-product-card"
            onClick={() => navigate(`/itemDetail/${product.id}`)}
          >
            <div className="recommended-product-image">
              <img
                src={product.imageUrl || "/placeholder-product.jpg"}
                alt={product.title}
                onError={(e) => {
                  e.target.src = "/placeholder-product.jpg";
                }}
              />
            </div>
            <div className="recommended-product-info">
              <h4 className="recommended-product-title">{product.title}</h4>
              <p className="recommended-product-price">
                {formatPrice(product.price)}
              </p>
              <span className="recommended-product-category">
                {product.category || "Sin categoría"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductRecommendations;
