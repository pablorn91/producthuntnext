import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import Layout from '../../components/layout/Layout';
import Error404 from '../../components/layout/404';

//firebase
import { db } from '../../firebase';
import { doc, getDoc } from "firebase/firestore";

export default function Producto () {

    const [ producto, setProducto ] = useState({});
    const [ error, setError ] = useState(false);

    //Routing para obtener el ID actual
    const router = useRouter()
    const { query: { id } } = router;

    useEffect( () => {
        if (id) {
            const obtenerProducto = async () => {
                const docRef = doc(db, "productos", id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    
                    const producto = docSnap.data();
                    setProducto(producto)
                  } else {
                    setError(true)
                  }
            }
            obtenerProducto();
        }
    }, [id])

    return(
        <Layout>
            <>
            
            {error && <Error404 />}
            </>
        </Layout>
        
    )
}