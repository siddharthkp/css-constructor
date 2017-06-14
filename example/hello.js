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

        /* Use props in your CSS */
        color: {this.props.color.sampleColor};

        /* Pseudo selectors */
        &:hover {
            color: #FFF;
        }

        /* Nested elements */
        img {
            border-radius: 50%;
        }
        #handle {
            margin-top: 20px;
        }

        /* Media queries */
        @media (max-width: 600px) {
            & {font-size: 18px;}
        }
    `

    render () {
        return (<div className="existing">
            <img src="https://github.com/siddharthkp.png"/>
            <div id="handle">@siddharthkp</div>
        </div>)
    }
};
