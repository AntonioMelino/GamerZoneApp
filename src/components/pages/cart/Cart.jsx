import { Link } from "react-router"; // Mantenemos la importación desde "react-router"
import { Button, Typography, Grid, Box, TextField } from "@mui/material";
import { useContext } from "react";
import { CartContext } from "../../../context/CartContext";
import Swal from "sweetalert2";

// Función para formatear el precio
const formatPrice = (price) => {
  return new Intl.NumberFormat("es-AR").format(price);
};

const Cart = () => {
  const { resetCart, cart, removeById, getTotalAmount } =
    useContext(CartContext);

  let total = getTotalAmount();
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0); // Calcula la cantidad total de productos

  // Función para vaciar el carrito con alerta de confirmación
  const resetCartWithAlert = () => {
    Swal.fire({
      title: "¿Seguro quieres vaciar el carrito?",
      showDenyButton: true,
      confirmButtonText: "Sí",
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Carrito vaciado!", "", "success");
        resetCart();
      } else if (result.isDenied) {
        Swal.fire("Carrito salvado!", "", "info");
      }
    });
  };

  // Función para eliminar un producto con alerta de confirmación
  const removeItemWithAlert = (id) => {
    Swal.fire({
      title: "¿Seguro quieres eliminar este producto?",
      showDenyButton: true,
      confirmButtonText: "Sí",
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Producto eliminado!", "", "success");
        removeById(id); // Elimina el producto
      } else if (result.isDenied) {
        Swal.fire("Producto conservado!", "", "info");
      }
    });
  };

  return (
    <div style={{ marginTop: "75px", padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Carrito de compras
      </Typography>

      {/* Contenedor principal con dos columnas */}
      <Grid container spacing={3}>
        {/* Columna izquierda: Lista de productos */}
        <Grid item xs={8}>
          {cart.length > 0 ? (
            <>
              {cart.map((elemento) => (
                <Box
                  key={elemento.id}
                  display="flex"
                  alignItems="center"
                  borderBottom={1}
                  borderColor="divider"
                  pb={2}
                  mb={2}
                >
                  <img
                    src={elemento.imageUrl} // Asegúrate de que el producto tenga una propiedad `imageUrl`
                    alt={elemento.title}
                    style={{ width: "100px", marginRight: "20px" }}
                  />
                  <Box flexGrow={1}>
                    <Typography variant="h6">{elemento.title}</Typography>
                    <Typography variant="body1">
                      Cantidad: {elemento.quantity}
                    </Typography>
                    <Typography variant="body1">
                      Precio individual: ${formatPrice(elemento.price)}
                    </Typography>
                    <Typography variant="body1">
                      Total: ${formatPrice(elemento.price * elemento.quantity)}
                    </Typography>
                  </Box>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => removeItemWithAlert(elemento.id)} // Usa removeItemWithAlert
                  >
                    Eliminar
                  </Button>
                </Box>
              ))}
            </>
          ) : (
            <Typography variant="h5" align="center">
              No hay productos en el carrito
            </Typography>
          )}
        </Grid>

        {/* Columna derecha: Resumen de la compra */}
        <Grid item xs={4}>
          <Box p={3} bgcolor="background.paper" borderRadius={2}>
            <Typography variant="h5" gutterBottom>
              Resumen de la compra
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="body1">
                  Productos ({totalItems}){": "}
                  {/* Muestra la cantidad de productos */}
                </Typography>
              </Grid>
              <Grid item xs={6} textAlign="right">
                <Typography variant="body1">${formatPrice(total)}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1">Envío:</Typography>
              </Grid>
              <Grid item xs={6} textAlign="right">
                <Typography variant="body1">Gratis</Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Ingresar código de cupón"
                  variant="outlined"
                  size="small"
                />
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h6">Total:</Typography>
              </Grid>
              <Grid item xs={6} textAlign="right">
                <Typography variant="h6">${formatPrice(total)}</Typography>
              </Grid>
            </Grid>

            {/* Botones de acción */}
            <Box mt={4} display="flex" flexDirection="column" gap={2}>
              <Button
                variant="outlined"
                color="secondary"
                onClick={resetCartWithAlert}
                fullWidth
              >
                Vaciar carrito
              </Button>
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/checkout"
                fullWidth
              >
                Finalizar compra
              </Button>
              <Button
                variant="outlined"
                color="primary"
                component={Link}
                to="/"
                fullWidth
              >
                Continuar comprando
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default Cart;

// import { Link } from "react-router"; // Asegúrate de importar correctamente Link
// import { Button, Typography, Grid, Box, TextField } from "@mui/material";
// import { useContext } from "react";
// import { CartContext } from "../../../context/CartContext";
// import Swal from "sweetalert2";

// const formatPrice = (price) => {
//   return new Intl.NumberFormat("es-AR").format(price);
// };

// const Cart = () => {
//   const { resetCart, cart, removeById, getTotalAmount } =
//     useContext(CartContext);

//   let total = getTotalAmount();

//   const resetCartWithAlert = () => {
//     Swal.fire({
//       title: "¿Seguro quieres vaciar el carrito?",
//       showDenyButton: true,
//       confirmButtonText: "Sí",
//       denyButtonText: `No`,
//     }).then((result) => {
//       if (result.isConfirmed) {
//         Swal.fire("Carrito vaciado!", "", "success");
//         resetCart();
//       } else if (result.isDenied) {
//         Swal.fire("Carrito salvado!", "", "info");
//       }
//     });
//   };

//   return (
//     <div style={{ marginTop: "75px", padding: "20px" }}>
//       <Typography variant="h4" gutterBottom>
//         Carrito de compras
//       </Typography>

//       {/* Contenedor principal con dos columnas */}
//       <Grid container spacing={3}>
//         {/* Columna izquierda: Lista de productos */}
//         <Grid item xs={8}>
//           {cart.length > 0 ? (
//             <>
//               {cart.map((elemento) => (
//                 <Box
//                   key={elemento.id}
//                   display="flex"
//                   alignItems="center"
//                   borderBottom={1}
//                   borderColor="divider"
//                   pb={2}
//                   mb={2}
//                 >
//                   <img
//                     src={elemento.imageUrl} // Asegúrate de que el producto tenga una propiedad `imageUrl`
//                     alt={elemento.title}
//                     style={{ width: "100px", marginRight: "20px" }}
//                   />
//                   <Box flexGrow={1}>
//                     <Typography variant="h6">{elemento.title}</Typography>
//                     <Typography variant="body1">
//                       Cantidad: {elemento.quantity}
//                     </Typography>
//                     <Typography variant="body1">
//                       Precio individual: ${formatPrice(elemento.price)}
//                     </Typography>
//                     <Typography variant="body1">
//                       Subtotal: $
//                       {formatPrice(elemento.price * elemento.quantity)}
//                     </Typography>
//                   </Box>
//                   <Button
//                     variant="outlined"
//                     color="error"
//                     onClick={() => removeById(elemento.id)}
//                   >
//                     Eliminar
//                   </Button>
//                 </Box>
//               ))}
//             </>
//           ) : (
//             <Typography variant="h5" align="center">
//               No hay productos en el carrito
//             </Typography>
//           )}
//         </Grid>

//         {/* Columna derecha: Resumen de la compra */}
//         <Grid item xs={4}>
//           <Box p={3} bgcolor="background.paper" borderRadius={2}>
//             <Typography variant="h5" gutterBottom>
//               Resumen de la compra
//             </Typography>
//             <Grid container spacing={2}>
//               <Grid item xs={6}>
//                 <Typography variant="body1">Subtotal:</Typography>
//               </Grid>
//               <Grid item xs={6} textAlign="right">
//                 <Typography variant="body1">${formatPrice(total)}</Typography>
//               </Grid>
//               <Grid item xs={6}>
//                 <Typography variant="body1">Envío:</Typography>
//               </Grid>
//               <Grid item xs={6} textAlign="right">
//                 <Typography variant="body1">Gratis</Typography>
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   fullWidth
//                   label="Ingresar código de cupón"
//                   variant="outlined"
//                   size="small"
//                 />
//               </Grid>
//               <Grid item xs={6}>
//                 <Typography variant="h6">Total:</Typography>
//               </Grid>
//               <Grid item xs={6} textAlign="right">
//                 <Typography variant="h6">${formatPrice(total)}</Typography>
//               </Grid>
//             </Grid>

//             {/* Botones de acción */}
//             <Box mt={4} display="flex" flexDirection="column" gap={2}>
//               <Button
//                 variant="outlined"
//                 color="secondary"
//                 onClick={resetCartWithAlert}
//                 fullWidth
//               >
//                 Vaciar carrito
//               </Button>
//               <Button
//                 variant="contained"
//                 color="primary"
//                 component={Link}
//                 to="/checkout"
//                 fullWidth
//               >
//                 Finalizar compra
//               </Button>
//               <Button
//                 variant="outlined"
//                 color="primary"
//                 component={Link}
//                 to="/"
//                 fullWidth
//               >
//                 Continuar comprando
//               </Button>
//             </Box>
//           </Box>
//         </Grid>
//       </Grid>
//     </div>
//   );
// };

// export default Cart;

// import { Link } from "react-router";
// import { Button } from "@mui/material";
// import { useContext } from "react";
// import { CartContext } from "../../../context/CartContext";
// import Swal from "sweetalert2";

// const Cart = () => {
//   const { resetCart, cart, removeById, getTotalAmount } =
//     useContext(CartContext);

//   let total = getTotalAmount();
//   const resetCartWithAlert = () => {
//     Swal.fire({
//       title: "Seguro quieres vaciar el carrito?",
//       showDenyButton: true,
//       confirmButtonText: "Si",
//       denyButtonText: `No`,
//     }).then((result) => {
//       /* Read more about isConfirmed, isDenied below */
//       if (result.isConfirmed) {
//         Swal.fire("Carrito vaciado!", "", "success");
//         resetCart();
//       } else if (result.isDenied) {
//         Swal.fire("Carrito salvado!", "", "info");
//       }
//     });
//   };

//   return (
//     <div style={{ marginTop: "75px" }}>
//       {cart.map((elemento) => {
//         return (
//           <div
//             key={elemento.id}
//             style={{
//               margin: "10px",
//               width: "200px",
//               border: "2px solid black",
//             }}
//           >
//             <h2>{elemento.title}</h2>
//             <h2>Cantidad: {elemento.quantity}</h2>
//             <h2>Precio: {elemento.price}</h2>
//             <Button variant="text" onClick={() => removeById(elemento.id)}>
//               Eliminar
//             </Button>
//           </div>
//         );
//       })}

//       {cart.length > 0 ? (
//         <h2>El total a pagar es {total}</h2>
//       ) : (
//         <h2>No hay productos</h2>
//       )}

//       <Button variant="outlined" onClick={resetCartWithAlert}>
//         Vaciar carrito
//       </Button>

//       <Button variant="contained">
//         <Link to="/checkout">finalizar compra</Link>
//       </Button>
//     </div>
//   );
// };

// export default Cart;
