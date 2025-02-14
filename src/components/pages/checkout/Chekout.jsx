import { useState } from "react"

const Chekout = () => {

    const [user, setUser] = useState({
        nombre: "",
        email: "",
        telefono: "",
    })

    const handleSubmit = (evento) => {
        evento.preventDefault();
        console.log(user);
    }

    const handleChange = (evento) =>{
        const {value, name} = evento.target;
        setUser({...user, [name]: value});
    }

  return (
    <div>
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="nombre" name="nombre" onChange={handleChange}/>
            <input type="text" placeholder="email" name="email" onChange={handleChange}/>
            <input type="text" placeholder="telefono" name="telefono" onChange={handleChange}/>

            <button>Comprar</button>
            <button type="button">Cancelar</button>
        </form>
    </div>
  )
}

export default Chekout