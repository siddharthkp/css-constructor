'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function css(rawCSSWithProps) {
    return function (target, name, descriptor) {
        return _extends({}, descriptor, {
            value: function value() {
                var props = void 0;
                function giveMeProps(object) {
                    props = object.props;
                    return object;
                }
                var rendered = descriptor.value.apply(giveMeProps(this), arguments);

                var rawCSS = fillProps(rawCSSWithProps[0], props);
                var style = parseCss(rawCSS);
                var newProps = _extends({}, props, { style: style });

                return _react2.default.cloneElement(rendered, newProps, rendered.props.children);
            }
        });
    };
}

var camelCase = function camelCase(key) {
    return key.replace(/(\-[a-z])/g, function ($1) {
        return $1.toUpperCase().replace('-', '');
    });
};

var fillProps = function fillProps(rawCSSWithProps, props) {
    var re = /{this.props.*}/g;
    var matches = rawCSSWithProps.match(re);
    if (matches && matches.length) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = matches[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var match = _step.value;

                var keyword = match;
                keyword = keyword.replace('{this.props.', '');
                keyword = keyword.substring(0, keyword.length - 1); // }
                keyword = keyword.trim();

                rawCSSWithProps = rawCSSWithProps.replace(match, props[keyword]);
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
    }
    return rawCSSWithProps;
};

var parseCss = function parseCss(rawCSS) {
    var styles = {};
    var rules = rawCSS.trim().split(';');
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
        for (var _iterator2 = rules[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var rule = _step2.value;

            var _rule$trim$split = rule.trim().split(':'),
                _rule$trim$split2 = _slicedToArray(_rule$trim$split, 2),
                key = _rule$trim$split2[0],
                value = _rule$trim$split2[1];

            if (key && value) {
                key = camelCase(key.trim());
                value = value.trim();
                styles[key] = value;
            }
        }
    } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
            }
        } finally {
            if (_didIteratorError2) {
                throw _iteratorError2;
            }
        }
    }

    return styles;
};

exports.default = css;
