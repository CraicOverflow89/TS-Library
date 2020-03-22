/**
 * Object Extension
 */
declare interface Object {
	apply(logic: (it: Object) => void): Object
	let(logic: (it: Object) => any): any
}

/**
 * Applies logic to object and returns object
 *
 * @param logic Callable logic to execute using object
 * @returns Object
 */
Object.prototype.apply = function(logic: (it: Object) => void): Object {
	logic(this)
	return this
}

/**
 * Applies logic to object and returns result
 *
 * @param logic Callable logic to execute using object
 * @returns any
 */
Object.prototype.let = function(logic: (it: Object) => any): any {
	return logic(this)
}

/**
 * Colour Data
 */
class Colour {
	r: number
	g: number
	b: number

	constructor(r: number, g: number, b: number) {
		this.r = r
		this.g = g
		this.b = b
	}

	/**
	 * Provides hexidecimal colour code
	 *
	 * @returns string
	 */
	toHex(): string {
		const toHex = function(value: number) {
			return Number(value).toString(16).let((it: string) => {
				if(it.length < 2) it = "0" + it
				return it
			})
		}
		return ("#" + toHex(this.r) + toHex(this.g) + toHex(this.b)).toUpperCase()
	}
}

/**
 * Point Data
 */
class Point {
	x: number
	y: number

	constructor(x: number, y: number) {
		this.x = x
		this.y = y
	}
}

/**
 * String Buffer
 */
class StringBuffer {
	data: Array<string> = []

	append(data: string): void {
		this.data.push(data)
	}

	toString(): string {
		return this.data.join("")
	}
}