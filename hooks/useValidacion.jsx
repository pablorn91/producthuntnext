import React, { useState, useEffect } from 'react'

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
    }, [errores])

    //funcion que se ejecuta conforme al usuario escriba algo
    const handleChange = e => {
        setValores({
            ...valores,
            [e.target.name]: e.target.value
        })
    }

    //maneja el cambio de state de imagen
    const handleChangeImagen = e => {
        setValores({
            ...valores,
            imagen: e.target.files[0]
        })
    }

    //funcion que se ejecuta cuando el usuario hace submit
    const handleSubmit = e => {
        e.preventDefault()
        const erroresValidacion = validar(valores)
        setErrores(erroresValidacion)
        setSubmitForm(true)
    }

    //cuando se realiza el evento de blur
    const handleBlur = () => {
        const erroresValidacion = validar(valores)
        setErrores(erroresValidacion)
    }

  return {
      valores,
      errores,
      handleChange,
      handleChangeImagen,
      handleSubmit,
      handleBlur
  }
}

export default useValidacion