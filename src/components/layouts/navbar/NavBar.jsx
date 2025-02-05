//import CartWidget from "./CartWidget"
import dragon from "../../../assets/dragon-solid.svg";
import CartWidget from "../../common/cartWidget/CartWidget"


const NavBar = () => {
  return (

    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <img src={dragon} alt="Logo" style={{ width: "30px", height: "30px" }} />
        <a className="navbar-brand" href="#">
          GameZoneApp
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="#pc">
                PC
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#consolas">
                Consolas
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#videojuegos">
                Videojuegos
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#accesorios">
                Accesorios
              </a>
            </li>
          </ul>
        </div>
      </div>
      <CartWidget/>
    </nav>
  )
}

export default NavBar
