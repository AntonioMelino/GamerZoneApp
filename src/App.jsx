import NavBar from "./components/layouts/navbar/NavBar";
import Cart from "./components/pages/cart/Cart";
import ItemDetail from "./components/pages/itemDetail/ItemDetail";
import ItemListContainer from "./components/pages/itemListContainer/ItemListContainer";

import { BrowserRouter , Routes , Route } from "react-router"

function App() {
  

  return (

    <BrowserRouter>
      <NavBar/>
        <Routes>
          <Route path="/" element={<ItemListContainer/>}/>
          <Route path="/category/:name" element={<ItemListContainer/>}/>
          <Route path="/cart" element={<Cart/>}/>
          <Route path="/itemDetail/:id" element={<ItemDetail/>}/>
          <Route path="*" element={<h2>404 Not Found</h2>}/>
        </Routes>
    </BrowserRouter>


);
}

export default App

// <div>
//   <ItemListContainer/>
//   <ItemDetail/>
// </div>