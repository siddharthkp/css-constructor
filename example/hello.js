import React from 'react';
import css from './css-constructor';

export default class Hello extends React.Component {

    /* javascript constructor */
    constructor () {
        super();
    }

    /* css constructor */
    @css`
        font-size: 16px;
        text-align: center;
        color: #5AF78E;
        font-family: monospace;
    `

    render () {
        return <div>Styled text!</div>
    }
};
