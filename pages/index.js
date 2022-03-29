import React, { useEffect, useState } from 'react';

import Layout from "../components/layout/Layout"
import DetallesProducto from '../components/layout/DetallesProducto';

//firebase
import { db, } from '../firebase';
import { collection, getDocs } from "firebase/firestore";

export default function Home() {

  const [ productos, setProductos ] = useState([])

  useEffect(() =>{

      const obtenerProductos = async () => {
        const querySnapshot = await getDocs(collection(db, "productos"));

        let productos = [];
    
         querySnapshot.forEach((producto) => {

          productos = [
            ...productos,
            {
             id: producto.id,
             ...producto.data()
            }
          ]
          
          setProductos(productos)
          // console.log(producto.id, " => ", producto.data());
         });
      }
      obtenerProductos();

  }, [])

  return (
   <div>
       <Layout>
        <div className='listado-productos'>
          <div className='contenedor'>
            <ul className='bg-white'>
              { productos.map( producto => (
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
