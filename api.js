import React from 'react';

let css = (rawCSSWithProps) => (target, name, descriptor) => ({
    ...descriptor,
    value: function () {
        let props;
        let giveMeProps = (object) => {
            props = object.props;
            return object;
        };
        let rendered = descriptor.value.apply(giveMeProps(this), arguments);

        let rawCSS = fillProps(rawCSSWithProps[0], props)
        let style = parseCss(rawCSS);
        let newProps = {...props, style};

        return React.cloneElement(rendered, newProps, rendered.props.children);
    }
});

let camelCase = (key) => key.replace(/(\-[a-z])/g, $1 => $1.toUpperCase().replace('-',''));

let fillProps = (rawCSSWithProps, props) => {
    let re = /{this.props.*}/g;
    let matches = rawCSSWithProps.match(re);
    if (matches && matches.length) {
        for (let match of matches) {
            let keyword = match;
            keyword = keyword.replace('{this.props.', '');
            keyword = keyword.substring(0, keyword.length-1); // }
            keyword = keyword.trim();

            rawCSSWithProps = rawCSSWithProps.replace(match, props[keyword]);
        }
    }
    return rawCSSWithProps;
}

let parseCss = (rawCSS) => {
    let styles = {};
    let rules = rawCSS.trim().split(';');
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

export default css;
