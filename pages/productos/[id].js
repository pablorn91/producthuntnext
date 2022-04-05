import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { es } from 'date-fns/locale';
import Layout from '../../components/layout/Layout';
import Error404 from '../../components/layout/404'; 
//sesion con firebase
import useAutenticacion from '../../hooks/useAutenticacion';
//firebase
import { db } from '../../firebase';
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";

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

const CreadorProducto = styled.p`
    padding: .5rem 2rem;
    background-color: #DA552F;
    color: #fff;
    text-transform: uppercase;
    font-weight: bold;
    display: inline-block;
    text-align: center;
`;

export default function Producto () {

    const [ producto, setProducto ] = useState({});
    const [ error, setError ] = useState(false);
    const [ comentario, setComentario ] = useState({});
    const [ consultarDB, setConsultarDB] = useState(true);

    //Routing para obtener el ID actual
    const router = useRouter()
    const { query: { id } } = router;

    const usuario = useAutenticacion()

    useEffect( () => {
        if (id && consultarDB) {
            const obtenerProducto = async () => {
                const docRef = doc(db, "productos", id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    
                    const producto = docSnap.data();
                    setProducto(producto)
                    setConsultarDB(false)
                  } else {
                    setError(true)
                    setConsultarDB(false)
                  }
            }
            obtenerProducto();
        }
    }, [id])

    if(Object.keys(producto).length === 0 && !error ) return 'Cargando... ';

    const { comentarios, creado, creador, descripcion, empresa, nombre, url, urlimagen, votos, haVotado } = producto;

    //Administrar y validar los votos
    const votarProducto = () => {
        if(!usuario) return router.push('/login');

        //Obtener y sumar un nuevo voto
        const nuevoTotal = votos + 1;

        //Verificar si el usuario actual ha votado
        if(haVotado.includes(usuario.uid)) return;

        //Guardar el ID del usuario que ha votado
        const nuevoHaVotado = [... haVotado, usuario.uid];

        //Actualizar en la BD
        const docRef = doc(db, "productos", id);
        updateDoc(docRef, {votos: nuevoTotal, haVotado: nuevoHaVotado})

        //Actualizar el State
        setProducto({
            ...producto,
            votos: nuevoTotal
        })

        setConsultarDB(true);
    }

    //Funciones para crear comentarios
    const comentarioChange = e => {
        setComentario({
            ...comentario,
            [e.target.name]: e.target.value
        })
    }

    //Identifica si el comentario es del creador del producto
    const esCreador = id => {
        if (creador.id === id) {
            return true;
        }
    }

    const agregarComentario = e => {
        e.preventDefault()
        if(!usuario) return router.push('/login');
        
        //informacion extra al comentario
        comentario.usuarioId = usuario.uid;
        comentario.usuarioNombre = usuario.displayName;

        //Tomar Copia de comentarios y agregarlos al arreglo
        const nuevosComentarios = [...comentarios, comentario];

        //Actualizar la BD
        const docRef = doc(db, "productos", id);
        updateDoc(docRef, {comentarios: nuevosComentarios})

        //Actualizara el state
        setProducto({
            ...producto,
            comentarios: nuevosComentarios
        })

        setConsultarDB(true);
    }

    //Función que revisa que el creador del producto sea el mismo que está autenticado
    const puedeBorrar =() => {
        if(!usuario) return false;

        if (creador.id === usuario.uid) {
            return true;
        }
    }

    //Elimina un producto de la base de datos
    const eliminarProducto = async () => {

        if(!usuario) return router.push('/login');

        if (creador.id !== usuario.uid) {
            return router.push('/login');
        }

        try {
            const docRef = doc(db, "productos", id);
            await deleteDoc(docRef);
            router.push('/')
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <Layout>
                
            {error ? <Error404 /> : (

                <div className='contenedor'>
                <h1 css={css`
                    text-align: center;
                    margin-top: 5rem;
                `}
                >{nombre}</h1>

                <ContenedorProducto>
                    <div>
                        <p>Publicado hace: {formatDistanceToNow(new Date(creado), {locale: es})}</p>
                        <p>Por: {creador.nombre} de {empresa}</p>
                        <img src={urlimagen} />
                        <p>{descripcion}</p>

                        { usuario && (
                            <>
                                <h2>Agrega tu comentario</h2>

                                <form 
                                    onSubmit={agregarComentario}
                                >
                                    <Campo>
                                        <input
                                            type="text"
                                            name="mensaje"
                                            onChange={comentarioChange}
                                        />
                                    </Campo>
                                    <InputSubmit
                                        type="submit"
                                        value="Agregar Comentario"
                                    />
                                </form>
                            </>
                        ) }

                        <h2 css={css`
                            margin: 2rem 0;
                        `}
                        
                        >Comentarios</h2>

                        {comentarios.length === 0 ? "Aún no hay comentarios" : (
                            <ul>
                                {comentarios.map((comentario, i) => (
                                    <li
                                        key={`${comentario.usuarioId}-${i}`}
                                        css={css`
                                            border: 1px solid #e1e1e1;
                                            padding: 2rem;
                                        `}
                                    >
                                        <p>{comentario.mensaje}</p>
                                        <p>Escrito por: 
                                            <span
                                                css={css`
                                                    font-weight: bold;
                                                `}
                                            >
                                            {''} {comentario.usuarioNombre}
                                            </span>
                                        </p>
                                        { esCreador(comentario.usuarioId) && <CreadorProducto>Es Creador</CreadorProducto>}
                                    </li>
                                ))}
                            </ul>
                        )}
                        
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

                            { usuario && (
                                <Boton
                                    onClick={votarProducto}
                                >
                                    Votar
                                </Boton>
                            )}
                        </div>
                    </aside>
                </ContenedorProducto>

                { puedeBorrar() && 
                    <Boton
                        onClick={eliminarProducto}
                    >Eliminar Producto </Boton>
                }
                </div>
            )}

        </Layout>
        
    )
}