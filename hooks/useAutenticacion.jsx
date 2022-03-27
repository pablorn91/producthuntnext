import React, { useEffect, useState } from 'react';
import { auth } from '../firebase';

function useAutenticacion() {
    const [ usuarioAutenticado, setUsuarioAutenticado ] = useState(null)

    useEffect(() => {
        const unsuscribe = auth.onAuthStateChanged( usuario => {
            if ( usuario ) {
                setUsuarioAutenticado(usuario)
            } else {
                setUsuarioAutenticado(null)
            }
        })
        return () => unsuscribe();
    }, [])

    return usuarioAutenticado
}

export default useAutenticacion