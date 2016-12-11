import React from 'react';

function css (className) {
    if (typeof className === 'function') {
        Object.defineProperty(className.prototype, 'render', {
             value: wrapper(className)
        });
    }
}

function wrapper(className) {
    let fn = className.prototype.render;
    return function () {
        let rawCSS = className.prototype.css.apply(this, arguments);
        let style = parseCss(rawCSS);
        let renderedElement = fn.apply(this, arguments);
        let newProps = {...renderedElement.props, style};
        return React.cloneElement(renderedElement, newProps, renderedElement.props.children);
    }
}

let camelCase = (key) => key.replace(/(\-[a-z])/g, $1 => $1.toUpperCase().replace('-',''));

let parseCss = (rawCSS) => {
    let styles = {};
    let rules = rawCSS.trim().split('\n');
    for (let rule of rules) {
        let [key, value] = rule.trim().replace(';', '').split(':');
        key = camelCase(key.trim());
        value = value.trim();
        styles[key] = value;
    }
    return styles;
}

export default css;
