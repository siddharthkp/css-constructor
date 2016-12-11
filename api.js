import React from 'react';

/*
    This get's used as decorator @css

    Get's the template literal passed to it argument.
    This contains references to props as well

    Method decorators expect a function to be returned,
    this function gets the parent class, name of the function -
    render in this case and the descriptor for the function.
*/
let css = (rawCSS) => (parentClass, name, descriptor) => ({
    ...descriptor,
    value: function () {
        let originalProps;

        /* Totally stealing props by fake rendering the component */
        let getProps = (object) => {
            originalProps = object.props;
            return object;
        };
        let rendered = descriptor.value.apply(getProps(this), arguments);

        /* Replace props and return realCSS™ */
        let realCSS = fillProps(rawCSS, originalProps)

        /* Convert real CSS to javascripty CSS */
        let style = parseCss(realCSS);

        /* Merge styles into original props */
        let newProps = {...originalProps, style};

        /*
            Pass on a clone of the rendered component
            with our merged props.
            This overrides the original render function
        */
        return React.cloneElement(rendered, newProps, rendered.props.children);
    }
});

/*
    Replace props with actual values

    Uses regex pattern to match references to props

    Supports direct usage
    color: {this.props.color}

    Does not evaluate conditions (yet)
    color: {this.props.color || 'blue'}
*/
let fillProps = (rawCSS, props) => {
    rawCSS = rawCSS[0]; // template literal = array
    let re = /{this.props.*}/g;
    let matches = rawCSS.match(re);
    if (matches && matches.length) {
        for (let match of matches) {
            let keyword = match;
            keyword = keyword.replace('{this.props.', '');
            keyword = keyword.substring(0, keyword.length-1); // remove }
            keyword = keyword.trim();
            rawCSS = rawCSS.replace(match, props[keyword]);
        }
    }
    return rawCSS;
}

/*
    Convert realCSS to javascripty CSS

    Split on semi-colon
    Trim the whitespace
    Camel case keys
*/
let parseCss = (realCSS) => {
    let styles = {};
    let rules = realCSS.trim().split(';');
    for (let rule of rules) {
        let [key, value] = rule.trim().split(':');
        if (key && value) {
            key = camelCase(key.trim());
            value = value.trim();
            styles[key] = value;
        }
    }
    return styles;
}

let camelCase = (key) => key.replace(/(\-[a-z])/g, $1 => $1.toUpperCase().replace('-',''));

export default css;
