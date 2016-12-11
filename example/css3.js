'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function cssConstructor(className) {
    if (typeof className === 'function') {
        Object.defineProperty(className.prototype, 'render', {
            value: wrapper(className)
        });
    }
}

function wrapper(className) {
    var fn = className.prototype.render;
    return function () {
        var rawCSS = className.prototype.css.apply(this, arguments);
        var style = parseCss(rawCSS);
        var renderedElement = fn.apply(this, arguments);
        var newProps = _extends({}, renderedElement.props, { style: style });
        return _react2.default.cloneElement(renderedElement, newProps, renderedElement.props.children);
    };
}

var camelCase = function camelCase(key) {
    return key.replace(/(\-[a-z])/g, function ($1) {
        return $1.toUpperCase().replace('-', '');
    });
};

var parseCss = function parseCss(rawCSS) {
    var styles = {};
    var rules = rawCSS.trim().split('\n');
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = rules[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var rule = _step.value;

            var _rule$trim$replace$sp = rule.trim().replace(';', '').split(':'),
                _rule$trim$replace$sp2 = _slicedToArray(_rule$trim$replace$sp, 2),
                key = _rule$trim$replace$sp2[0],
                value = _rule$trim$replace$sp2[1];

            key = camelCase(key.trim());
            value = value.trim();
            styles[key] = value;
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    return styles;
};

function css(rawCSS) {
    var rules = rawCSS[0].trim().split('\n');

    return function (target, name, descriptor) {
        return _extends({}, descriptor, {
            value: function value() {
                var props = void 0;
                function giveMeProps(object) {
                    props = object.props;
                    return object;
                }
                var rendered = descriptor.value.apply(giveMeProps(this), arguments);
                var newProps = _extends({}, props);

                return _react2.default.cloneElement(rendered, newProps, rendered.props.children);
            }
        });
    };
}

function css1(rawCSS) {
    return function (target, name, descriptor) {
        var _this = this,
            _arguments = arguments;

        return _extends({}, descriptor, {
            value: function value() {
                var style = parseCss(rawCSS);
                var renderedElement = descriptor.value.apply(_this, _arguments);
                var newProps = _extends({}, renderedElement.props, { style: style });
                return _react2.default.cloneElement(renderedElement, newProps, renderedElement.props.children);
            }
        });
    };
};

module.exports = {
    cssConstructor: cssConstructor, css: css
};
