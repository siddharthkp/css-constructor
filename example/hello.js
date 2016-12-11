import React from 'react';
//import css from 'css-constructor';  // production - use this!
import css from './css-constructor'; // development - for me

export default class Hello extends React.Component {

    /* javascript constructor */
    constructor (props) {
        super(props);
    }

    /* css constructor */
    @css`
        font-size: 16px;
        text-align: center;
        color: {this.props.color};
        font-family: monospace;
    `

    render () {
        return <div>Styled {this.props.color} text!</div>
    }
};
