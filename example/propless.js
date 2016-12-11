import React from 'react';
import css from './css1';

export default class Propless extends React.Component {

    /* javascript constructor */
    constructor (props) {
        super(props);
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
