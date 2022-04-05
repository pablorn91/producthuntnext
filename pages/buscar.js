import React, {useState, useEffect} from 'react';
import Layout from "../components/layout/Layout"
import { useRouter } from 'next/router';

import DetallesProducto from '../components/layout/DetallesProducto';
import useProductos from '../hooks/useProductos';

export default function Buscar() {
  
  const router = useRouter();
  const { query: {q} } = router;

  //Los productos
  const { productos } = useProductos('creado')
  const [ resultado, setResultado ] = useState([])

  useEffect(() => {

    const busqueda = q.toLowerCase();
    const filtro = productos.filter( producto => {
      return (
        producto.nombre.toLowerCase().includes(busqueda) ||  producto.descripcion.toLowerCase().includes(busqueda)
      )
    })
    setResultado(filtro)

  }, [q, productos])

  console.log(productos)

  console.log(q)
  return (
   <div>
        <Layout>
        <div className='listado-productos'>
          <div className='contenedor'>
            <ul className='bg-white'>
              { resultado.map( producto => (
                <DetallesProducto 
                  key={producto.id}
                  producto={producto}
                />
              ))}
            </ul>
          </div>
        </div>
       </Layout>
   </div>
  )
}
