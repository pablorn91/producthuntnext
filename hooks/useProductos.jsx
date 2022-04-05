import { useState, useEffect } from "react";

//firebase
import { db, } from '../firebase';
import { collection, getDocs, query, orderBy } from "firebase/firestore";

const useProductos = orden => {

    const [ productos, setProductos ] = useState([])

  useEffect(() =>{

      const obtenerProductos = async () => {

        const citiesRef = collection(db, "productos");
        const q = query( citiesRef, orderBy( orden, 'desc') );
        const querySnapshot = await getDocs(q);

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

  return {
      productos
  }
}

export default useProductos;
