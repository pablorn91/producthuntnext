import React from 'react';
import { css } from '@emotion/react';

export default function Error404 () {
    return (
        <h1
            css={ css`
                margin-top: 2rem;
                text-align: center;
            `}
        >No se puede mostrar</h1>
    )
}
