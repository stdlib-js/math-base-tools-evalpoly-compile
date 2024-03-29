/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var join = require( 'path' ).join;
var readFile = require( '@stdlib/fs-read-file' ).sync;
var replace = require( '@stdlib/string-replace' );
var isInteger = require( '@stdlib/assert-is-integer' ).isPrimitive;
var Float32Array = require( '@stdlib/array-float32' );


// VARIABLES //

var opts = {
	'encoding': 'utf8'
};
var dir = join( __dirname, 'templates' );

// Templates:
var SINGLE_COEFFICIENT_TEMPLATE = readFile( join( dir, 'single_coefficient.js.txt' ), opts ); // eslint-disable-line id-length

var EVALPOLY_TEMPLATE = readFile( join( dir, 'evalpoly.js.txt' ), opts );
var EVALPOLY_FLOAT32_TEMPLATE = readFile( join( dir, 'evalpoly.float32.js.txt' ), opts );

var EMPTY_TEMPLATE = readFile( join( dir, 'empty.js.txt' ), opts );

var LOOP_TEMPLATE = readFile( join( dir, 'loop.js.txt' ), opts );
var LOOP_FLOAT32_TEMPLATE = readFile( join( dir, 'loop.float32.js.txt' ), opts );

var MAX_CHARS = 68; // max-len (80) - chars already in line ('tab': 4, 'return ': 7, ';': 1)


// MAIN //

/**
* Compiles a module string which exports a function for evaluating a polynomial.
*
* @param {NumericArray} c - polynomial coefficients sorted in ascending degree
* @param {Options} [options] - function options
* @param {string} [options.dtype='float64'] - input value floating-point data type
* @returns {string} module string exporting a function for evaluating a polynomial
*
* @example
* var str = compile( [ 3.0, 2.0, 1.0 ] );
* // returns <string>
*/
function compile( c, options ) {
	var horner;
	var opts;
	var tmpl;
	var str;
	var n;
	var m;
	var i;

	opts = {
		'dtype': 'float64'
	};
	if ( arguments.length > 1 ) {
		opts.dtype = options.dtype || opts.dtype;
	}
	n = c.length;

	// If no coefficients, the function always returns 0...
	if ( n === 0 ) {
		return EMPTY_TEMPLATE;
	}
	if ( opts.dtype === 'float32' ) {
		// Ensure that coefficients have been converted to single-precision:
		c = new Float32Array( c );
	}
	// If only one coefficient, the function always returns that coefficient...
	if ( n === 1 ) {
		str = c[ 0 ].toString();
		if ( isInteger( c[ 0 ] ) ) {
			str += '.0';
		}
		return replace( SINGLE_COEFFICIENT_TEMPLATE, '{{coefficient}}', str );
	}
	m = n - 1;

	// Avoid exceeding the maximum stack size on V8 by using a simple loop :(. Note that the choice of `500` was empirically determined...
	if ( n > 500 ) {
		str = '';
		for ( i = 0; i < n; i++ ) {
			str += '\t' + c[ i ].toString();
			if ( isInteger( c[ i ] ) ) {
				str += '.0';
			}
			if ( i < m ) {
				str += ',\n';
			}
		}
		if ( opts.dtype === 'float32' ) {
			tmpl = LOOP_FLOAT32_TEMPLATE;
		} else {
			tmpl = LOOP_TEMPLATE;
		}
		return replace( tmpl, '{{coefficients}}', str );
	}
	// If more than one coefficient, apply Horner's method...
	if ( opts.dtype === 'float32' ) {
		horner = 'float64ToFloat32(';
	} else {
		horner = '';
	}
	horner += c[ 0 ].toString();
	if ( isInteger( c[ 0 ] ) ) {
		horner += '.0';
	}
	for ( i = 1; i < n; i++ ) {
		if ( opts.dtype === 'float32' ) {
			horner += ' + float64ToFloat32(x * ';
			if ( i < m ) {
				horner += 'float64ToFloat32(';
			}
		} else {
			horner += ' + (x * ';
			if ( i < m ) {
				horner += '(';
			}
		}
		horner += c[ i ].toString();
		if ( isInteger( c[ i ] ) ) {
			horner += '.0';
		}
	}
	// Close all the parentheses...
	for ( i = 0; i < (2*(n-1))-1; i++ ) {
		horner += ')';
	}
	if ( opts.dtype === 'float32' ) {
		horner += ')';
	}
	str = c[ 0 ].toString();
	if ( isInteger( c[ 0 ] ) ) {
		str += '.0';
	}
	if ( opts.dtype === 'float32' ) {
		tmpl = EVALPOLY_FLOAT32_TEMPLATE;
	} else {
		tmpl = EVALPOLY_TEMPLATE;
	}
	str = replace( tmpl, '{{coefficient}}', str );
	str = replace( str, '{{horner}}', horner );
	return replace( str, '{{eslint}}', ( horner.length > MAX_CHARS ) ? ' // eslint-disable-line max-len' : '' );
}


// EXPORTS //

module.exports = compile;
