import React from 'react';
import css from './css2';

@css
export default class WithProps extends React.Component {

    /* javascript constructor */
    constructor (props) {
        super(props);
    }

    /* css constructor */
    css () {
        return `
            font-size: 16px;
            text-align: center;
            color: ${this.props.color || '#5AF78E'};
            font-family: monospace;
        `
    }

    render () {
        return <div>Styled {this.props.color} text!</div>
    }
};
