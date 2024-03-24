/*
* @license Apache-2.0
*
* Copyright (c) 2021 The Stdlib Authors.
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

// TypeScript Version: 4.1

/**
* Interface describing function options.
*/
interface Options {
	/**
	* Input value floating-point data type (e.g., `float64` or `float32`). Default: `'float64'`.
	*/
	dtype?: 'float64' | 'float32';
}

/**
* Compiles a module string which exports a function for evaluating a polynomial.
*
* @param c - polynomial coefficients sorted in ascending degree
* @param options - function options
* @returns module string exporting a function for evaluating a polynomial
*
* @example
* var str = compile( [ 3.0, 2.0, 1.0 ] );
* // returns <string>
*/
declare function compile( c: Array<number>, options?: Options ): string;


// EXPORTS //

export = compile;
