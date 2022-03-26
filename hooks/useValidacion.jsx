import React, { useState, useEffect } from 'react'
import { useState } from 'react/cjs/react.production.min'

const useValidacion = ( stateInicial, validar, fn) => {

    const [ valores,setValores ] =useState(stateInicial)
    const [ errores, setErrores ] = useState({})
    const [ submitForm, setSubmitForm ] = useState(false)
    
    useEffect(() => {
        if (submitForm) {
            const noErrores = Object.keys(errores).length === 0;

            if (noErrores) {
                fn(); //funcion que se ejecuta en el comoponente
            }

            setSubmitForm(false)
        }
    }, [])

    //funcion que se ejecuta conforme al usuario escriba algo
    const handleChange = e => {
        setValores({
            ...valores,
            [e.target.name]: e.target.value
        })
    }

    //funcion que se ejecuta cuando el usuario hace submit
    const handleSubmit = e => {
        e.preventDefault()
        const erroresValidacion = validar(valores)
        setErrores(erroresValidacion)
        setSubmitForm(true)
    }

  return {
      valores,
      errores,
      submitForm,
      handleChange,
      handleSubmit
  }
}

export default useValidacion