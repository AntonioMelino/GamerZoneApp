import PropTypes from "prop-types";

const ItemListContainer = ({ greeting }) => {
  return (
    <div style={{ padding: "20px", border: "1px solid #ccc", textAlign: "center", borderRadius: "8px" }}>
      <h2>{greeting}</h2>
    </div>
  )
}

ItemListContainer.propTypes = {
    greeting: PropTypes.string.isRequired, // greeting debe ser una cadena obligatoria
  };

export default ItemListContainer