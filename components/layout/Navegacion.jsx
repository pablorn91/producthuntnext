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
            <Link href="/">
              <a>Inicio</a>
            </Link>
            <Link href="/populares">
              <a>Populares</a>
            </Link>
            { usuario && (
              <Link href="/nuevo-producto">
                <a>Nuevo Producto</a>
              </Link>
            )}
    </Nav>
  )
}

export default Navegacion