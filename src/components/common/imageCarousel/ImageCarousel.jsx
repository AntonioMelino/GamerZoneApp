import { useEffect, useState } from "react";
import "./ImageCarousel.css"; // Archivo de estilos

const ImageCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  // Autoplay: Cambia de imagen cada 3 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000); // Cambia de imagen cada 3 segundos (3000 ms)

    // Limpia el intervalo cuando el componente se desmonta
    return () => clearInterval(interval);
  }); // Dependencia: currentIndex

  return (
    <div className="carousel-container">
      <div
        className="carousel-slide"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {images.map((image, index) => (
          <div key={index} className="slide">
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              className="carousel-image"
            />
          </div>
        ))}
      </div>
      <button className="carousel-button prev" onClick={prevSlide}>
        &#10094;
      </button>
      <button className="carousel-button next" onClick={nextSlide}>
        &#10095;
      </button>
    </div>
  );
};

export default ImageCarousel;
