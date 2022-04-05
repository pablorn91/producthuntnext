import React, {useState} from 'react';
import { css } from '@emotion/react'
import Router, { useRouter } from 'next/router';
import Layout from "../components/layout/Layout"
import { Formulario, Campo, InputSubmit, Error } from '../components/ui/Formulario'
import Error404 from '../components/layout/404';
//validaciones
import useValidacion from '../hooks/useValidacion';
import validarCrearProducto from '../validacion/validarCrearProducto';

//sesion con firebase
import useAutenticacion from '../hooks/useAutenticacion';
//firebase
import { collection, addDoc } from 'firebase/firestore'
import { db, storage, ref, uploadBytesResumable, getDownloadURL } from '../firebase';

import { nombreAleatorio } from '../helpers'

const STATE_INICIAL = {
    nombre: '',
    empresa: '',
    imagen: null,
    url: '',
    descripcion: '',
}

export default function NuevoProducto() {

  const [ error, setError ] = useState(false);
  const [ urlImagen, setUrlImagen ] = useState('')

  const [ prog, setProg ]= useState(0)

  const { valores, errores, handleChange, handleChangeImagen, handleSubmit, handleBlur } = useValidacion(STATE_INICIAL, validarCrearProducto, crearProducto)

  const { nombre, empresa, imagen, url, descripcion } = valores

  //hook de routing para redireccionar
    const router = useRouter()

  const usuario = useAutenticacion()

  async function crearProducto() {
    //si el usuario no esta autenticado llevar al login
    if(!usuario) {
        return router.push('/login')
    }

    //manejar imagenes con firebase
            if (!imagen) return;
            const storageRef = ref(storage, `/productos/${nombreAleatorio()}`);
            const uploadTask = uploadBytesResumable(storageRef, imagen);
            uploadTask.on("state_changed", (snapshot) => {
                setProg(Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100));
            },
            (error) => console.log(error),
            () => {
                getDownloadURL(uploadTask.snapshot.ref)
                .then(urlimagen => {
                    console.log(urlimagen);
                        //crear el objeto de nuevo producto
                    const producto = {
                        nombre,
                        empresa,
                        url,
                        urlimagen,
                        descripcion,
                        votos: 0,
                        comentarios: [],
                        creado: Date.now(),
                        creador: {
                            id: usuario.uid,
                            nombre: usuario.displayName
                        },
                        haVotado: []
                    }

                    //insertarlo en la base de datos
                    const docRef = addDoc(collection(db, "productos"), producto)
                    console.log("Documento agregado con ID: ", docRef)
                    router.push('/')
                })
            }
            )    
                 
  } 

return (
 <div>
     <Layout>

         { usuario ? (
            <>
                <h1
                css={css`
                    text-align: center;
                    margin-top: 5rem;
                `}
                >Nuevo Producto</h1>
                <Formulario
                    onSubmit={handleSubmit}
                    noValidate
                >
                <fieldset>
                    <legend>Información General</legend>
                
                    <Campo>
                        <label htmlFor='nombre'>Nombre</label>
                        <input
                            type="text"
                            id='nombre'
                            placeholder='Nombre del Producto'
                            name='nombre'
                            value={nombre}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </Campo>
    
                    { errores.nombre && <Error>{errores.nombre}</Error>}
        
                    <Campo>
                        <label htmlFor='empresa'>Empresa</label>
                        <input
                            type="text"
                            id='empresa'
                            placeholder='Nombre Empresa o Compañia'
                            name='empresa'
                            value={empresa}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </Campo>
    
                    { errores.empresa && <Error>{errores.empresa}</Error>}
        
                        <Campo>
                        <label htmlFor='imagen'>Imagen</label>
                        <input
                            type="file"
                            id='imagen'
                            name='imagen'
                            accept="image/png, image/jpeg"
                            onChange={handleChangeImagen}
                        />
                    </Campo>
    
                    { errores.imagen && <Error>{errores.imagen}</Error>}
        
                    <Campo>
                        <label htmlFor='url'>URL</label>
                        <input
                            type="url"
                            id='url'
                            name='url'
                            placeholder='URL de tu producto'
                            value={url}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </Campo>
    
                    { errores.url && <Error>{errores.url}</Error>}
    
                </fieldset>
    
                <fieldset>
    
                    <legend>Sobre tu Producto</legend>
    
                    <Campo>
                        <label htmlFor='descripcion'>Descripción</label>
                        <textarea
                            id='descripcion'
                            name='descripcion'
                            value={descripcion}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </Campo>
    
                { errores.descripcion && <Error>{errores.descripcion}</Error>}
    
                </fieldset>
    
        
                { error && <Error>{error}</Error>}
                <InputSubmit
                    type="submit"
                    value="Crear Producto"
                />
    
                </Formulario>
    
            </>
         ) : <Error404/> }
      
     </Layout>
 </div>
)
}