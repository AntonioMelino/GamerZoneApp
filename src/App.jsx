import NavBar from "./components/layouts/navbar/NavBar";
import ItemDetail from "./components/pages/itemDetail/ItemDetail";
import ItemListContainer from "./components/pages/itemListContainer/ItemListContainer";

function App() {
  

  return (
    <div>
      <NavBar/>
      <ItemListContainer/>
      <ItemDetail/>
    </div>
  );
}

export default App
