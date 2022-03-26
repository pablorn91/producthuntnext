import Link from "next/link"

const Navegacion = () => {
  return (
    <nav>
            <Link href="/">Inicio</Link>
            <Link href="/populares">Populares</Link>
            <Link href="/nuevo-producto">Nuevo Producto</Link>
    </nav>
  )
}

export default Navegacion