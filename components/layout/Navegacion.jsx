import Link from "next/link"
import styled from "@emotion/styled"

//sesion con firebase
import useAutenticacion from '../../hooks/useAutenticacion'

const Nav = styled.nav`
    padding-left: 2rem;
    a {
        font-size: 1.8rem;
        margin-left: 2rem;
        color: var(--grisClaro);
        font-family: 'PT Sans', sans-serif;

        &:first-of-type {
            margin-left: 0;
        }
    }
`

const Navegacion = () => {

  const usuario = useAutenticacion()

  return (
    <Nav>
            <Link href="/">Inicio</Link>
            <Link href="/populares">Populares</Link>
            { usuario && (
              <Link href="/nuevo-producto">Nuevo Producto</Link>
            )}
    </Nav>
  )
}

export default Navegacion