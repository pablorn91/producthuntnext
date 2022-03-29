export default function validarCrearProducto(valores) {
    let errores = {};

    //Validar Nombre de usuario
    if(!valores.nombre) {
        errores.nombre = 'El Nombre es obligatorio'
    }

    //Validar la empresa
    if(!valores.empresa) {
        errores.empresa = 'El Nombre de Empresa es obligatoria'
    }
    
    if(!valores.imagen) {
        errores.imagen = 'No has seleccionado imagen'
    }

    //validar la url
    if (!valores.url) {
        errores.url = 'La URL del producto es obligatoria'
    } else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(valores.url)) {
        errores.url = 'URL no válida'
    }

    //validar descripción
    if(!valores.descripcion) {
        errores.descripcion = 'Agrega una descripción de tu producto'
    }

    return errores
}