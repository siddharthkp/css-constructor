'use strict';Object.defineProperty(exports,'__esModule',{value:!0});var _slicedToArray=function(){function sliceIterator(arr,i){var _arr=[],_n=!0,_d=!1,_e=void 0;try{for(var _s,_i=arr[Symbol.iterator]();!(_n=(_s=_i.next()).done)&&(_arr.push(_s.value),!(i&&_arr.length===i));_n=!0);}catch(err){_d=!0,_e=err}finally{try{!_n&&_i['return']&&_i['return']()}finally{if(_d)throw _e}}return _arr}return function(arr,i){if(Array.isArray(arr))return arr;if(Symbol.iterator in Object(arr))return sliceIterator(arr,i);throw new TypeError('Invalid attempt to destructure non-iterable instance')}}(),_extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source)Object.prototype.hasOwnProperty.call(source,key)&&(target[key]=source[key])}return target};var _react=require('react'),_react2=_interopRequireDefault(_react);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var css=function css(a){return function(b,c,d){return _extends({},d,{value:function value(){var e=void 0,f=d.value.apply(function(j){return e=j.props,j}(this),arguments),g=fillProps(a[0],e),h=parseCss(g),i=_extends({},e,{style:h});return _react2.default.cloneElement(f,i,f.props.children)}})}},camelCase=function camelCase(a){return a.replace(/(\-[a-z])/g,function(b){return b.toUpperCase().replace('-','')})},fillProps=function fillProps(a,b){var c=/{this.props.*}/g,d=a.match(c);if(d&&d.length){var _iteratorNormalCompletion=!0,_didIteratorError=!1,_iteratorError=void 0;try{for(var _step,_iterator=d[Symbol.iterator]();!(_iteratorNormalCompletion=(_step=_iterator.next()).done);_iteratorNormalCompletion=!0){var e=_step.value,f=e;f=f.replace('{this.props.',''),f=f.substring(0,f.length-1),f=f.trim(),a=a.replace(e,b[f])}}catch(err){_didIteratorError=!0,_iteratorError=err}finally{try{!_iteratorNormalCompletion&&_iterator.return&&_iterator.return()}finally{if(_didIteratorError)throw _iteratorError}}}return a},parseCss=function parseCss(a){var b={},c=a.trim().split(';');var _iteratorNormalCompletion2=!0,_didIteratorError2=!1,_iteratorError2=void 0;try{for(var _step2,_iterator2=c[Symbol.iterator]();!(_iteratorNormalCompletion2=(_step2=_iterator2.next()).done);_iteratorNormalCompletion2=!0){var d=_step2.value,_d$trim$split=d.trim().split(':'),_d$trim$split2=_slicedToArray(_d$trim$split,2),e=_d$trim$split2[0],f=_d$trim$split2[1];e&&f&&(e=camelCase(e.trim()),f=f.trim(),b[e]=f)}}catch(err){_didIteratorError2=!0,_iteratorError2=err}finally{try{!_iteratorNormalCompletion2&&_iterator2.return&&_iterator2.return()}finally{if(_didIteratorError2)throw _iteratorError2}}return b};exports.default=css;