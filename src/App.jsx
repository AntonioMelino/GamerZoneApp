import NavBar from "./components/layouts/navbar/NavBar";
import Cart from "./components/pages/cart/Cart";
import ItemDetail from "./components/pages/itemDetail/ItemDetail";
import ItemListContainer from "./components/pages/itemListContainer/ItemListContainer";
import Chekout from "./components/pages/checkout/Chekout";
import Login from "./components/pages/login/Login";
import Profile from "./components/pages/profile/Profile";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import PageNotFound from "./components/pages/pageNotFound/PageNotFound";
import CartContextProvider from "./context/CartContext";
import Footer from "./components/layouts/footer/Footer";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import ScrollToTop from "./components/common/scrollToTop/ScrollToTop";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <CartContextProvider>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
              }}
            >
              <NavBar />
              <ScrollToTop />
              <main style={{ flex: 1 }}>
                <Routes>
                  <Route path="/" element={<ItemListContainer />} />
                  <Route
                    path="/category/:name"
                    element={<ItemListContainer />}
                  />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/itemDetail/:id" element={<ItemDetail />} />
                  <Route path="/chekout" element={<Chekout />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="*" element={<PageNotFound />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </CartContextProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
