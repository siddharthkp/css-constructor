import React from 'react';

function cssConstructor (className) {
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

function css (rawCSS) {
    let rules = rawCSS[0].trim().split('\n');

    return function (target, name, descriptor) {
        return {
            ...descriptor,
            value: function () {
                let props;
                function giveMeProps(object) {
                    props = object.props;
                    return object;
                }
                let rendered = descriptor.value.apply(giveMeProps(this), arguments);
                let newProps = {...props};

                return React.cloneElement(rendered, newProps, rendered.props.children);
            }
        }
    };
}

function css1 (rawCSS) {
    return function (target, name, descriptor) {
        return {
            ...descriptor,
            value: () => {
                let style = parseCss(rawCSS);
                let renderedElement = descriptor.value.apply(this, arguments);
                let newProps = {...renderedElement.props, style};
                return React.cloneElement(renderedElement, newProps, renderedElement.props.children);
            }
        }
    }
};

module.exports = {
    cssConstructor, css
}
