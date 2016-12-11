import React from 'react';

let css = (rawCSS) => (target, name, descriptor) => ({
    ...descriptor,
    value: () => {
        let style = parseCss(rawCSS);
        let renderedElement = descriptor.value.apply(this, arguments);
        let newProps = {...renderedElement.props, style};
        return React.cloneElement(renderedElement, newProps, renderedElement.props.children);
    }
});

let camelCase = (key) => key.replace(/(\-[a-z])/g, $1 => $1.toUpperCase().replace('-',''));

let parseCss = (rawCSS) => {
    let styles = {};
    let rules = rawCSS[0].trim().split('\n');
    for (let rule of rules) {
        let [key, value] = rule.trim().replace(';', '').split(':');
        key = camelCase(key.trim());
        value = value.trim();
        styles[key] = value;
    }
    return styles;
}

export default css;
