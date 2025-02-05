import NavBar from "./components/layouts/navbar/NavBar";
import ItemListContainer from "./components/pages/itemListContainer/ItemListContainer";

function App() {
  

  return (
    <div>
      <NavBar/>
      <ItemListContainer greeting="¡Bienvenido a nuestra tienda!"/>
    </div>
  );
}

export default App
