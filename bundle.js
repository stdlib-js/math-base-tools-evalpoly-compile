// Copyright (c) 2022 The Stdlib Authors. License is Apache-2.0: http://www.apache.org/licenses/LICENSE-2.0
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e="undefined"!=typeof globalThis?globalThis:e||self).compile=t()}(this,(function(){"use strict";function e(e){if(e.__esModule)return e;var t=Object.defineProperty({},"__esModule",{value:!0});return Object.keys(e).forEach((function(r){var i=Object.getOwnPropertyDescriptor(e,r);Object.defineProperty(t,r,i.get?i:{enumerable:!0,get:function(){return e[r]}})})),t}var t=require("path").join,r=require("@stdlib/fs-read-file").sync,i=require("@stdlib/string-replace"),n=require("@stdlib/assert-is-integer").isPrimitive,o={encoding:"utf8"},l=t("/home/runner/work/math-base-tools-evalpoly-compile/math-base-tools-evalpoly-compile/lib","templates"),f=r(t(l,"single_coefficient.js.txt"),o),s=r(t(l,"evalpoly.js.txt"),o),u=r(t(l,"empty.js.txt"),o),c=r(t(l,"loop.js.txt"),o);return module.exports=function(e){var t,r,o,l,a;if(0===(o=e.length))return u;if(1===o)return r=e[0].toString(),n(e[0])&&(r+=".0"),i(f,"{{coefficient}}",r);if(l=o-1,o>500){for(r="",a=0;a<o;a++)r+="\t"+e[a].toString(),n(e[a])&&(r+=".0"),a<l&&(r+=",\n");return i(c,"{{coefficients}}",r)}for(t=e[0].toString(),n(e[0])&&(t+=".0"),a=1;a<o;a++)t+=" + (x * ",a<l&&(t+="("),t+=e[a].toString(),n(e[a])&&(t+=".0");for(a=0;a<2*(o-1)-1;a++)t+=")";return r=e[0].toString(),n(e[0])&&(r+=".0"),r=i(s,"{{coefficient}}",r),r=i(r,"{{horner}}",t),i(r,"{{eslint}}",t.length>68?" // eslint-disable-line max-len":"")},e(Object.freeze({__proto__:null}))}));
//# sourceMappingURL=bundle.js.map
