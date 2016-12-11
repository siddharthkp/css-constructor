import React from 'react';

function css (rawCSS) {
    let rules = rawCSS[0].trim().split('\n');

    return function (target, name, descriptor) {
        return {
            ...descriptor,
            value: function () {
                let style = parseCss(rawCSS);
                let props;
                function giveMeProps(object) {
                    props = object.props;
                    return object;
                }
                let rendered = descriptor.value.apply(giveMeProps(this), arguments);
                let newProps = {...props, style};

                return React.cloneElement(rendered, newProps, rendered.props.children);
            }
        }
    };
}

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
