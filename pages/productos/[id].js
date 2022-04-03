import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { es } from 'date-fns/locale';
import Layout from '../../components/layout/Layout';
import Error404 from '../../components/layout/404';

//firebase
import { db } from '../../firebase';
import { doc, getDoc } from "firebase/firestore";

import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Campo, InputSubmit } from '../../components/ui/Formulario'
import Boton from '../../components/ui/Boton';

const ContenedorProducto = styled.div`
    @media(min-width:768px) {
        display: grid;
        grid-template-columns: 2fr 1fr;
        column-gap: 2rem;
    }
`;

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

    if(Object.keys(producto).length === 0) return 'Cargando... '

    const { comentarios, creado, descripcion, empresa, nombre, url, urlimagen, votos } = producto;

    return(
        <Layout>
            <>
            
            {error && <Error404 />}

            <div className='contenedor'>
                <h1 css={css`
                    text-align: center;
                    margin-top: 5rem;
                `}
                >{nombre}</h1>

                <ContenedorProducto>
                    <div>
                        <p>Publicado hace: {formatDistanceToNow(new Date(creado), {locale: es})}</p>
                        <img src={urlimagen} />
                        <p>{descripcion}</p>

                        <h2>Agrega tu comentario</h2>
                        <form>
                            <Campo>
                                <input
                                    type="text"
                                    name="mensaje"
                                     
                                />
                            </Campo>
                            <InputSubmit
                                type="submit"
                                value="Agregar Comentario"
                            />
                        </form>

                        <h2 css={css`
                            margin: 2rem 0;
                        `}
                        
                        >Comentarios</h2>
                        {comentarios.map(comentario => (
                            <li>
                                <p>{comentario.nombre}</p>
                                <p>Escrito por: {comentario.usuarioNombre}</p>
                            </li>
                        ))}
                    </div>

                    <aside>
                        <Boton
                            target="_blank"
                            bgColor="true"
                            href={url}
                        >Visitar URL</Boton>

                        <div
                            css={css`
                                margin-top: 5rem;
                            `}
                        >
                            <p css={css`
                                text-align: center  ;
                            `}>{votos} Votos</p>

                            <Boton>
                                Votar
                            </Boton>
                        </div>
                    </aside>
                </ContenedorProducto>
            </div>
            </>
        </Layout>
        
    )
}