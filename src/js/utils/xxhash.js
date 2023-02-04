/**
 xxHash implementation in pure Javascript

 Copyright (C) 2013, Pierre Curto
 Copyright (C) 2022, Matias Affolter
 MIT license
 */

import {UINT64, UINT32} from "cuint";

/*
	Merged this sequence of method calls as it speeds up
	the calculations by a factor of 2
 */
// this.v1.add( other.multiply(PRIME32_2) ).rotl(13).multiply(PRIME32_1);
UINT32.prototype.xxh_update = function (low, high) {
	var b00 = PRIME32_2._low
	var b16 = PRIME32_2._high

	var c16, c00
	c00 = low * b00
	c16 = c00 >>> 16

	c16 += high * b00
	c16 &= 0xFFFF		// Not required but improves performance
	c16 += low * b16

	var a00 = this._low + (c00 & 0xFFFF)
	var a16 = a00 >>> 16

	a16 += this._high + (c16 & 0xFFFF)

	var v = (a16 << 16) | (a00 & 0xFFFF)
	v = (v << 13) | (v >>> 19)

	a00 = v & 0xFFFF
	a16 = v >>> 16

	b00 = PRIME32_1._low
	b16 = PRIME32_1._high

	c00 = a00 * b00
	c16 = c00 >>> 16

	c16 += a16 * b00
	c16 &= 0xFFFF		// Not required but improves performance
	c16 += a00 * b16

	this._low = c00 & 0xFFFF
	this._high = c16 & 0xFFFF
}

/*
 * Constants
 */
var PRIME32_1 = UINT32( '2654435761' )
var PRIME32_2 = UINT32( '2246822519' )
var PRIME32_3 = UINT32( '3266489917' )
var PRIME32_4 = UINT32(  '668265263' )
var PRIME32_5 = UINT32(  '374761393' )

/**
 * Convert string to proper UTF-8 array
 * @param str Input string
 * @returns {Uint8Array} UTF8 array is returned as uint8 array
 */
function toUTF8Array (str) {
	var utf8 = []
	for (var i=0, n = str.length; (i|0) < (n|0); i = (i+1|0)>>>0) {
		var charcode = str.charCodeAt(i)
		if (charcode < 0x80) utf8.push(charcode)
		else if (charcode < 0x800) {
			utf8.push(0xc0 | (charcode >> 6),
				0x80 | (charcode & 0x3f))
		}
		else if (charcode < 0xd800 || charcode >= 0xe000) {
			utf8.push(0xe0 | (charcode >> 12),
				0x80 | ((charcode>>6) & 0x3f),
				0x80 | (charcode & 0x3f))
		}
		// surrogate pair
		else {
			i++;
			// UTF-16 encodes 0x10000-0x10FFFF by
			// subtracting 0x10000 and splitting the
			// 20 bits of 0x0-0xFFFFF into two halves
			charcode = 0x10000 + (((charcode & 0x3ff)<<10)
				| (str.charCodeAt(i) & 0x3ff))
			utf8.push(0xf0 | (charcode >>18),
				0x80 | ((charcode>>12) & 0x3f),
				0x80 | ((charcode>>6) & 0x3f),
				0x80 | (charcode & 0x3f))
		}
	}

	return new Uint8Array(utf8)
}

/**
 * XXH object used as a constructor or a function
 * @constructor
 * or
 * @param {Object|String} input data
 * @param {Number|UINT32} seed
 * @return ThisExpression
 * or
 * @return {UINT32} xxHash
 */
function XXH () {
	if (arguments.length == 2)
		return new XXH( arguments[1] ).update( arguments[0] ).digest()

	if (!(this instanceof XXH))
		return new XXH( arguments[0] )

	this.init.call(this, arguments[0])
}

/**
 * Initialize the XXH instance with the given seed
 * @method init
 * @param {Number|Object} seed as a number or an unsigned 32 bits integer
 * @return ThisExpression
 */
XXH.prototype.init = function init (seed) {
		this.seed = seed instanceof UINT32 ? seed.clone() : UINT32(seed)
		this.v1 = this.seed.clone().add(PRIME32_1).add(PRIME32_2)
		this.v2 = this.seed.clone().add(PRIME32_2)
		this.v3 = this.seed.clone()
		this.v4 = this.seed.clone().subtract(PRIME32_1)
		this.total_len = 0
		this.memsize = 0
		this.memory = null

		return this;
}

/**
 * Add data to be computed for the XXH hash
 * @method update
 * @param {String|Buffer|ArrayBuffer} input as a string or nodejs Buffer or ArrayBuffer
 * @return ThisExpression
 */
XXH.prototype.update = function (input) {
	var isArrayBuffer = false;

	if ("buffer" in input) {
		input = input.buffer;
		input = new Uint8Array(input);
		isArrayBuffer = true;
	}

	// Convert all strings to utf-8 first (issue #5)
	if (typeof input == 'string') {
		input = toUTF8Array(input);
		isArrayBuffer = true;
	}

	if (typeof ArrayBuffer !== "undefined" && input instanceof ArrayBuffer)
	{
		isArrayBuffer = true;
		input = new Uint8Array(input);
	}

	var p = 0;
	var len = input.length;
	var bEnd = p + len | 0;

	if (len == 0) return this

	this.total_len = this.total_len + len | 0;

	if (this.memsize == 0)
	{
		if (isArrayBuffer) {
			this.memory = new Uint8Array(16)
		} else {
			this.memory = new Buffer(16)
		}
	}

	if ((this.memsize + len | 0) < 16)   // fill in tmp buffer
	{
		// XXH_memcpy(this.memory + this.memsize, input, len)
		if (isArrayBuffer) {
			this.memory.set( input.subarray(0, len), this.memsize )
		} else {
			input.copy( this.memory, this.memsize, 0, len )
		}

		this.memsize = this.memsize + len | 0;
		return this;
	}

	if ((this.memsize | 0) > 0)   // some data left from previous update
	{
		// XXH_memcpy(this.memory + this.memsize, input, 16-this.memsize);
		if (isArrayBuffer) {
			this.memory.set( input.subarray(0, 16 - this.memsize | 0), this.memsize );
		} else {
			input.copy( this.memory, this.memsize, 0, 16 - this.memsize );
		}

		var p32 = 0;
		this.v1.xxh_update(
			(this.memory[p32+1|0] << 8) | this.memory[p32|0]
			,	(this.memory[p32+3|0] << 8) | this.memory[p32+2|0]
		);
		p32 = (p32 + 4 | 0) >>> 0;
		this.v2.xxh_update(
			(this.memory[p32+1|0] << 8) | this.memory[p32|0]
			,	(this.memory[p32+3|0] << 8) | this.memory[p32+2|0]
		);
		p32 = (p32 + 4 | 0) >>> 0;
		this.v3.xxh_update(
			(this.memory[p32+1|0] << 8) | this.memory[p32|0]
			,	(this.memory[p32+3|0] << 8) | this.memory[p32+2|0]
		);
		p32 = (p32 + 4 | 0) >>> 0
		this.v4.xxh_update(
			(this.memory[p32+1|0] << 8) | this.memory[p32|0]
			,	(this.memory[p32+3|0] << 8) | this.memory[p32+2]
		);

		p = p + 16 - this.memsize | 0;
		this.memsize = 0;
	}

	if ((p|0) <= (bEnd - 16|0))
	{
		var limit = bEnd - 16 | 0;

		do
		{
			this.v1.xxh_update(
				(input[p+1|0] << 8) | input[p|0]
				,	(input[p+3|0] << 8) | input[p+2|0]
			)
			p = (p + 4 | 0) >>> 0
			this.v2.xxh_update(
				(input[p+1|0] << 8) | input[p|0]
				,	(input[p+3|0] << 8) | input[p+2|0]
			)
			p = (p + 4 | 0) >>> 0
			this.v3.xxh_update(
				(input[p+1|0] << 8) | input[p|0]
				,	(input[p+3|0] << 8) | input[p+2|0]
			)
			p = (p + 4 | 0) >>> 0
			this.v4.xxh_update(
				(input[p+1|0] << 8) | input[p|0]
				,	(input[p+3|0] << 8) | input[p+2|0]
			)
			p = (p + 4 | 0) >>> 0
		} while ((p | 0) <= (limit | 0))
	}

	if ((p|0) < (bEnd|0))
	{
		// XXH_memcpy(this.memory, p, bEnd-p);
		if (isArrayBuffer) {
			this.memory.set( input.subarray(p, bEnd), this.memsize );
		} else {
			input.copy( this.memory, this.memsize, p, bEnd );
		}

		this.memsize = bEnd - p | 0;
	}

	return this
}

/**
 * Finalize the XXH computation. The XXH instance is ready for reuse for the given seed
 * @method digest
 * @return {UINT32} xxHash
 */
XXH.prototype.digest = function () {
	var input = this.memory;
	var p = 0;
	var bEnd = this.memsize;
	var h32, h;
	var u = new UINT32;

	if ((this.total_len|0) >= 16)
	{
		h32 = this.v1.rotl(1).add( this.v2.rotl(7).add( this.v3.rotl(12).add( this.v4.rotl(18) ) ) );
	}
	else
	{
		h32  = this.seed.clone().add( PRIME32_5 );
	}

	h32.add( u.fromNumber(this.total_len) );

	while ((p | 0) <= (bEnd - 4 | 0))
	{
		u.fromBits(
			(input[p+1] << 8) | input[p]
			,	(input[p+3] << 8) | input[p+2]
		)
		h32
			.add( u.multiply(PRIME32_3) )
			.rotl(17)
			.multiply( PRIME32_4 );
		p = (p + 4 | 0) >>> 0
	}

	while ((p | 0) < (bEnd | 0))
	{
		u.fromBits( input[p++], 0 )
		h32
			.add( u.multiply(PRIME32_5) )
			.rotl(11)
			.multiply(PRIME32_1);
	}

	h = h32.clone().shiftRight(15);
	h32.xor(h).multiply(PRIME32_2);

	h = h32.clone().shiftRight(13);
	h32.xor(h).multiply(PRIME32_3);

	h = h32.clone().shiftRight(16);
	h32.xor(h);

	// Reset the state
	this.init( this.seed );

	return h32;
}

/*
 * Constants
 */
var PRIME64_1 = UINT64( '11400714785074694791' )
var PRIME64_2 = UINT64( '14029467366897019727' )
var PRIME64_3 = UINT64(  '1609587929392839161' )
var PRIME64_4 = UINT64(  '9650029242287828579' )
var PRIME64_5 = UINT64(  '2870177450012600261' )

/**
 * XXH64 object used as a constructor or a function
 * @constructor
 * or
 * @param {Object|String} input data
 * @param {Number|UINT64} seed
 * @return ThisExpression
 * or
 * @return {UINT64} xxHash
 */
function XXH64 () {
	if (arguments.length == 2)
		return new XXH64( arguments[1] ).update( arguments[0] ).digest()

	if (!(this instanceof XXH64))
		return new XXH64( arguments[0] )

	this.init.call(this, arguments[0])
}

/**
 * Initialize the XXH64 instance with the given seed
 * @method init
 * @param {Number|Object} seed as a number or an unsigned 32 bits integer
 * @return ThisExpression
 */

XXH64.prototype.init = function init (seed) {
	this.seed = seed instanceof UINT64 ? seed.clone() : UINT64(seed)
	this.v1 = this.seed.clone().add(PRIME64_1).add(PRIME64_2)
	this.v2 = this.seed.clone().add(PRIME64_2)
	this.v3 = this.seed.clone()
	this.v4 = this.seed.clone().subtract(PRIME64_1)
	this.total_len = 0
	this.memsize = 0
	this.memory = null

	return this;
};

/**
 * Add data to be computed for the XXH64 hash
 * @method update
 * @param {String|Buffer|ArrayBuffer} input as a string or nodejs Buffer or ArrayBuffer
 * @return ThisExpression
 */
XXH64.prototype.update = function (input) {
	var isArrayBuffer

	if ("buffer" in input) {
		input = input.buffer;
		isArrayBuffer = true;
	}

	// Convert all strings to utf-8 first (issue #5)
	if (typeof input == 'string') {
		input = toUTF8Array(input)
		isArrayBuffer = true
	}

	if (typeof ArrayBuffer !== "undefined" && input instanceof ArrayBuffer)
	{
		isArrayBuffer = true
		input = new Uint8Array(input);
	}

	var p = 0;
	var len = input.length|0;
	var bEnd = p + len|0;

	if (len == 0) return this

	this.total_len += len

	if (this.memsize == 0)
	{
		if (isArrayBuffer) {
			this.memory = new Uint8Array(32)
		} else {
			this.memory = new Buffer(32)
		}
	}

	if (this.memsize + len < 32)   // fill in tmp buffer
	{
		// XXH64_memcpy(this.memory + this.memsize, input, len)
		if (isArrayBuffer) {
			this.memory.set( input.subarray(0, len), this.memsize )
		} else {
			input.copy( this.memory, this.memsize, 0, len )
		}

		this.memsize += len
		return this
	}

	if (this.memsize > 0)   // some data left from previous update
	{
		// XXH64_memcpy(this.memory + this.memsize, input, 16-this.memsize);
		if (isArrayBuffer) {
			this.memory.set( input.subarray(0, 32 - this.memsize), this.memsize )
		} else {
			input.copy( this.memory, this.memsize, 0, 32 - this.memsize )
		}

		var p64 = 0
		var other
		other = UINT64(
			(this.memory[p64+1|0] << 8) | this.memory[p64|0]
			,	(this.memory[p64+3|0] << 8) | this.memory[p64+2|0]
			,	(this.memory[p64+5|0] << 8) | this.memory[p64+4|0]
			,	(this.memory[p64+7|0] << 8) | this.memory[p64+6|0]
		)
		this.v1.add( other.multiply(PRIME64_2) ).rotl(31).multiply(PRIME64_1);
		p64 = (p64+8|0)>>>0;
		other = UINT64(
			(this.memory[p64+1|0] << 8) | this.memory[p64|0]
			,	(this.memory[p64+3|0] << 8) | this.memory[p64+2|0]
			,	(this.memory[p64+5|0] << 8) | this.memory[p64+4|0]
			,	(this.memory[p64+7|0] << 8) | this.memory[p64+6|0]
		)
		this.v2.add( other.multiply(PRIME64_2) ).rotl(31).multiply(PRIME64_1);
		p64 = (p64+8|0)>>>0;
		other = UINT64(
			(this.memory[p64+1|0] << 8) | this.memory[p64|0]
			,	(this.memory[p64+3|0] << 8) | this.memory[p64+2|0]
			,	(this.memory[p64+5|0] << 8) | this.memory[p64+4|0]
			,	(this.memory[p64+7|0] << 8) | this.memory[p64+6|0]
		)
		this.v3.add( other.multiply(PRIME64_2) ).rotl(31).multiply(PRIME64_1);
		p64 = (p64+8|0)>>>0;
		other = UINT64(
			(this.memory[p64+1|0] << 8) | this.memory[p64|0]
			,	(this.memory[p64+3|0] << 8) | this.memory[p64+2|0]
			,	(this.memory[p64+5|0] << 8) | this.memory[p64+4|0]
			,	(this.memory[p64+7|0] << 8) | this.memory[p64+6|0]
		)
		this.v4.add( other.multiply(PRIME64_2) ).rotl(31).multiply(PRIME64_1);

		p = p + 32 - this.memsize | 0;
		this.memsize = 0
	}

	if ((p|0) <= (bEnd - 32|0))
	{
		var limit = bEnd - 32 | 0;

		do
		{
			var other
			other = UINT64(
				(input[p+1|0] << 8) | input[p|0]
				,	(input[p+3|0] << 8) | input[p+2|0]
				,	(input[p+5|0] << 8) | input[p+4|0]
				,	(input[p+7|0] << 8) | input[p+6|0]
			)
			this.v1.add( other.multiply(PRIME64_2) ).rotl(31).multiply(PRIME64_1);
			p = (p+8|0)>>>0;
			other = UINT64(
				(input[p+1|0] << 8) | input[p|0]
				,	(input[p+3|0] << 8) | input[p+2|0]
				,	(input[p+5|0] << 8) | input[p+4|0]
				,	(input[p+7|0] << 8) | input[p+6|0]
			)
			this.v2.add( other.multiply(PRIME64_2) ).rotl(31).multiply(PRIME64_1);
			p = (p+8|0)>>>0;
			other = UINT64(
				(input[p+1|0] << 8) | input[p|0]
				,	(input[p+3|0] << 8) | input[p+2|0]
				,	(input[p+5|0] << 8) | input[p+4|0]
				,	(input[p+7|0] << 8) | input[p+6|0]
			)
			this.v3.add( other.multiply(PRIME64_2) ).rotl(31).multiply(PRIME64_1);
			p = (p+8|0)>>>0;
			other = UINT64(
				(input[p+1|0] << 8) | input[p|0]
				,	(input[p+3|0] << 8) | input[p+2|0]
				,	(input[p+5|0] << 8) | input[p+4|0]
				,	(input[p+7|0] << 8) | input[p+6|0]
			)
			this.v4.add( other.multiply(PRIME64_2) ).rotl(31).multiply(PRIME64_1);
			p = (p+8|0)>>>0;
		} while (p <= limit)
	}

	if (p < bEnd)
	{
		// XXH64_memcpy(this.memory, p, bEnd-p);
		if (isArrayBuffer) {
			this.memory.set( input.subarray(p, bEnd), this.memsize )
		} else {
			input.copy( this.memory, this.memsize, p, bEnd )
		}

		this.memsize = bEnd - p
	}

	return this
}

/**
 * Finalize the XXH64 computation. The XXH64 instance is ready for reuse for the given seed
 * @method digest
 * @return {UINT64} xxHash
 */
XXH64.prototype.digest = function () {
	var input = this.memory
	var p = 0
	var bEnd = this.memsize
	var h64, h
	var u = new UINT64

	if (this.total_len >= 32)
	{
		h64 = this.v1.clone().rotl(1)
		h64.add( this.v2.clone().rotl(7) )
		h64.add( this.v3.clone().rotl(12) )
		h64.add( this.v4.clone().rotl(18) )

		h64.xor( this.v1.multiply(PRIME64_2).rotl(31).multiply(PRIME64_1) )
		h64.multiply(PRIME64_1).add(PRIME64_4)

		h64.xor( this.v2.multiply(PRIME64_2).rotl(31).multiply(PRIME64_1) )
		h64.multiply(PRIME64_1).add(PRIME64_4)

		h64.xor( this.v3.multiply(PRIME64_2).rotl(31).multiply(PRIME64_1) )
		h64.multiply(PRIME64_1).add(PRIME64_4)

		h64.xor( this.v4.multiply(PRIME64_2).rotl(31).multiply(PRIME64_1) )
		h64.multiply(PRIME64_1).add(PRIME64_4)
	}
	else
	{
		h64  = this.seed.clone().add( PRIME64_5 )
	}

	h64.add( u.fromNumber(this.total_len) )

	while ((p|0) <= (bEnd - 8 | 0))
	{
		u.fromBits(
			(input[p+1|0] << 8) | input[p|0]
			,	(input[p+3|0] << 8) | input[p+2|0]
			,	(input[p+5|0] << 8) | input[p+4|0]
			,	(input[p+7|0] << 8) | input[p+6|0]
		)
		u.multiply(PRIME64_2).rotl(31).multiply(PRIME64_1)
		h64
			.xor(u)
			.rotl(27)
			.multiply( PRIME64_1 )
			.add( PRIME64_4 )
		p = (p+8|0)>>>0;
	}

	if ((p + 4 | 0) <= (bEnd | 0)) {
		u.fromBits(
			(input[p+1|0] << 8) | input[p|0]
			,	(input[p+3|0] << 8) | input[p+2|0]
			,	0
			,	0
		)
		h64
			.xor( u.multiply(PRIME64_1) )
			.rotl(23)
			.multiply( PRIME64_2 )
			.add( PRIME64_3 )
		p = (p+4|0)>>>0;
	}

	while ((p|0) < (bEnd|0))
	{
		u.fromBits( input[p++], 0, 0, 0 )
		h64
			.xor( u.multiply(PRIME64_5) )
			.rotl(11)
			.multiply(PRIME64_1)
	}

	h = h64.clone().shiftRight(33)
	h64.xor(h).multiply(PRIME64_2)

	h = h64.clone().shiftRight(29)
	h64.xor(h).multiply(PRIME64_3)

	h = h64.clone().shiftRight(32)
	h64.xor(h)

	// Reset the state
	this.init( this.seed )

	return h64
}

module.exports = {
	h32: XXH,
	h64: XXH64
}
