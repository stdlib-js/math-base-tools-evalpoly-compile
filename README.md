<!--

@license Apache-2.0

Copyright (c) 2018 The Stdlib Authors.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

-->

# evalpoly

[![NPM version][npm-image]][npm-url] [![Build Status][test-image]][test-url] [![Coverage Status][coverage-image]][coverage-url] <!-- [![dependencies][dependencies-image]][dependencies-url] -->

> Compile a module for evaluating a [polynomial][@stdlib/math/base/tools/evalpoly].

<section class="intro">

</section>

<!-- /.intro -->



<section class="usage">

## Usage

```javascript
import compile from 'https://cdn.jsdelivr.net/gh/stdlib-js/math-base-tools-evalpoly-compile@deno/mod.js';
```

#### compile( c )

Compiles a module `string` containing an exported function which evaluates a [polynomial][@stdlib/math/base/tools/evalpoly] having coefficients `c`.

```javascript
var str = compile( [ 3.0, 2.0, 1.0 ] );
// returns <string>
```

In the example above, the output `string` would correspond to the following module:

```javascript
'use strict';

// MAIN //

/**
* Evaluates a polynomial.
*
* ## Notes
*
* -   The implementation uses [Horner's rule][horners-method] for efficient computation.
*
* [horners-method]: https://en.wikipedia.org/wiki/Horner%27s_method
*
*
* @private
* @param {number} x - value at which to evaluate the polynomial
* @returns {number} evaluated polynomial
*/
function evalpoly( x ) {
    if ( x === 0.0 ) {
        return 3.0;
    }
    return 3.0 + (x * (2.0 + (x * 1.0))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;
```

The coefficients should be ordered in **ascending** degree, thus matching summation notation.

</section>

<!-- /.usage -->

<section class="notes">

## Notes

-   The function is intended for **non-browser** environments for the purpose of generating module files.

</section>

<!-- /.notes -->

<section class="examples">

## Examples

<!-- eslint no-undef: "error" -->

```javascript
import randu from 'https://cdn.jsdelivr.net/gh/stdlib-js/random-base-randu@deno/mod.js';
import round from 'https://cdn.jsdelivr.net/gh/stdlib-js/math-base-special-round@deno/mod.js';
import Float64Array from 'https://cdn.jsdelivr.net/gh/stdlib-js/array-float64@deno/mod.js';
import compile from 'https://cdn.jsdelivr.net/gh/stdlib-js/math-base-tools-evalpoly-compile@deno/mod.js';

var coef;
var sign;
var str;
var i;

// Create an array of random coefficients...
coef = new Float64Array( 10 );
for ( i = 0; i < coef.length; i++ ) {
    if ( randu() < 0.5 ) {
        sign = -1.0;
    } else {
        sign = 1.0;
    }
    coef[ i ] = sign * round( randu()*100.0 );
}

// Compile a module for evaluating a polynomial:
str = compile( coef );
console.log( str );
```

</section>

<!-- /.examples -->

<!-- Section for related `stdlib` packages. Do not manually edit this section, as it is automatically populated. -->

<section class="related">

</section>

<!-- /.related -->

<!-- Section for all links. Make sure to keep an empty line after the `section` element and another before the `/section` close. -->


<section class="main-repo" >

* * *

## Notice

This package is part of [stdlib][stdlib], a standard library with an emphasis on numerical and scientific computing. The library provides a collection of robust, high performance libraries for mathematics, statistics, streams, utilities, and more.

For more information on the project, filing bug reports and feature requests, and guidance on how to develop [stdlib][stdlib], see the main project [repository][stdlib].

#### Community

[![Chat][chat-image]][chat-url]

---

## License

See [LICENSE][stdlib-license].


## Copyright

Copyright &copy; 2016-2021. The Stdlib [Authors][stdlib-authors].

</section>

<!-- /.stdlib -->

<!-- Section for all links. Make sure to keep an empty line after the `section` element and another before the `/section` close. -->

<section class="links">

[npm-image]: http://img.shields.io/npm/v/@stdlib/math-base-tools-evalpoly-compile.svg
[npm-url]: https://npmjs.org/package/@stdlib/math-base-tools-evalpoly-compile

[test-image]: https://github.com/stdlib-js/math-base-tools-evalpoly-compile/actions/workflows/test.yml/badge.svg
[test-url]: https://github.com/stdlib-js/math-base-tools-evalpoly-compile/actions/workflows/test.yml

[coverage-image]: https://img.shields.io/codecov/c/github/stdlib-js/math-base-tools-evalpoly-compile/main.svg
[coverage-url]: https://codecov.io/github/stdlib-js/math-base-tools-evalpoly-compile?branch=main

<!--

[dependencies-image]: https://img.shields.io/david/stdlib-js/math-base-tools-evalpoly-compile.svg
[dependencies-url]: https://david-dm.org/stdlib-js/math-base-tools-evalpoly-compile/main

-->

[umd]: https://github.com/umdjs/umd
[es-module]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules

[deno-url]: https://github.com/stdlib-js/math-base-tools-evalpoly-compile/tree/deno
[umd-url]: https://github.com/stdlib-js/math-base-tools-evalpoly-compile/tree/umd
[esm-url]: https://github.com/stdlib-js/math-base-tools-evalpoly-compile/tree/esm

[chat-image]: https://img.shields.io/gitter/room/stdlib-js/stdlib.svg
[chat-url]: https://gitter.im/stdlib-js/stdlib/

[stdlib]: https://github.com/stdlib-js/stdlib

[stdlib-authors]: https://github.com/stdlib-js/stdlib/graphs/contributors

[stdlib-license]: https://raw.githubusercontent.com/stdlib-js/math-base-tools-evalpoly-compile/main/LICENSE

[@stdlib/math/base/tools/evalpoly]: https://github.com/stdlib-js/math-base-tools-evalpoly/tree/deno

</section>

<!-- /.links -->
