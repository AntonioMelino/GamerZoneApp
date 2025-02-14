import NavBar from "./components/layouts/navbar/NavBar";
import Cart from "./components/pages/cart/Cart";
import ItemDetail from "./components/pages/itemDetail/ItemDetail";
import ItemListContainer from "./components/pages/itemListContainer/ItemListContainer";
import Chekout from "./components/pages/checkout/Chekout";

import { BrowserRouter , Routes , Route } from "react-router"
import PageNotFound from "./components/pages/pageNotFound/PageNotFound";

function App() {
  

  return (

    <BrowserRouter>
      <NavBar/>
        <Routes>
          <Route path="/" element={<ItemListContainer/>}/>
          <Route path="/category/:name" element={<ItemListContainer/>}/>
          <Route path="/cart" element={<Cart/>}/>
          <Route path="/itemDetail/:id" element={<ItemDetail/>}/>
          <Route path="/checkout" element={<Chekout/>}/>
          <Route path="*" element={<PageNotFound/>}/>
        </Routes>
    </BrowserRouter>


);
}

export default App