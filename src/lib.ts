/**
 * Number Extension
 */
declare interface Number {
	isInteger(): boolean
	toPaddedString(count: number): string
}

/**
 * Determines if a number is an integer
 *
 * @returns boolean
 */
Number.prototype.isInteger = function(): boolean {
	return typeof this === "number" && isFinite(this) && Math.floor(this) === this
}

/**
 * Creates a string with padded zeroes
 *
 * @param count The minimum number of digits
 * @returns string
 */
Number.prototype.toPaddedString = function(count: number): string {
	let result = this.toString()
	result = "0".repeat(count - result.length) + result
	return result
}

/**
 * Object Extension
 */
declare interface Object {
	apply(logic: (it: Object) => void): Object
	let(logic: (it: Object) => any): any
	when(logic: {}, none: () => void | null): void
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
 * Invokes logic of matching condition
 *
 * @param logic Map of condition / result pairs
 * @param none Logic to invoke if no condition is met
 * @returns void
 */
Object.prototype.when = function(logic: {property: CallableFunction}, none: () => void = null): void {
	const condition = Object.keys(logic)
	for(let x = 0; x < condition.length; x ++) {
		if(condition[x] == this) {
			logic[condition[x]]()
			return
		}
	}
	if(none !== null) none()
}

/**
 * String Extension
 */
declare interface String {
	endsWith(value: string): boolean
	repeat(count: number): string
	startsWith(value: string): boolean
}

/**
 * Determines if a string ends with a string
 *
 * @param value The string to check
 * @returns boolean
 */
String.prototype.endsWith = function(value: string): boolean {
	return this.substr(this.length - value.length) == value
}

/**
 * Repeats a string a number of times
 *
 * @param count The amount of times to repeat
 * @returns string
 */
String.prototype.repeat = function(count: number): string {
	if(count < 1 || !count.isInteger()) return ""
	let result = this
	let x = 0
	while(++ x < count) result += result
	return result
}

/**
 * Determines if a string starts with a string
 *
 * @param value The string to check
 * @returns boolean
 */
String.prototype.startsWith = function(value: string): boolean {
	return this.substr(0, value.length) == value
}

/**
 * Bound Property Data
 */
class BoundProperty<T> {
	getter: () => T
	setter: (value: T) => void

	constructor(getter: () => T, setter: (value: T) => void) {
		this.getter = getter
		this.setter = setter
	}

	/**
	 * Creates a BoundProperty using an element and property
	 *
	 * @param element The element to bind to
	 * @param property The property to bind to
	 * @return BoundProperty
	 */
	static bind<T1>(element: HTMLElement, property: string): BoundProperty<T1> {
		return new BoundProperty<T1>(() => {
			return element[property]
		}, (value: T1) => {
			element[property] = value
		})
	}

	/**
	 * Gets the value of the bound property
	 *
	 * @returns T
	 */
	get(): T {
		return this.getter()
	}

	/**
	 * Sets the value of the bound property
	 *
	 * @param value The new value to set
	 * @returns void
	 */
	set(value: T): void {
		this.setter(value)
	}
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
		return ((value: number) => {
			let result = Number(value).toString(16)
			if(result.length < 2) result = "0" + result
			return result
		}).let((it: CallableFunction) => ("#" + it(this.r) + it(this.g) + it(this.b)).toUpperCase())
	}
}

/**
 * Map of Key / Value Entries
 */
class HashMap<T> {
	data: {} = {}

	/**
	 * Clears all data in the map
	 *
	 * @returns void
	 */
	clear(): void {
		this.data = {}
	}

	/**
	 * Checks if the map contains a key
	 *
	 * @param key The key to search for
	 * @returns boolean
	 */
	containsKey(key: string): boolean {
		return this.data.hasOwnProperty(key)
	}

	/**
	 * Gets data from the map
	 *
	 * @param key The key to read from
	 * @returns any
	 */
	get(key: string): T {
		return this.data[key]
	}

	/**
	 * Puts data in the map
	 *
	 * @param key The key to write with
	 * @param value The value to write
	 * @returns void
	 */
	put(key: string, value: T): void {
		this.data[key] = value
	}

	/**
	 * Removes an entry from the map
	 *
	 * @param key The key to search for
	 * @returns boolean
	 */
	remove(key: string): boolean {

		// Not Found
		if(!this.data.hasOwnProperty(key)) return false

		// Remove Entry
		delete this.data[key]
		return true
	}

	/**
	 * Creates an array of data
	 *
	 * @param logic The logic to invoke against each entry
	 * @returns Array
	 */
	toArray<R>(logic: (k: string, v: T) => R): Array<R> {
		const result = []
		const keys = Object.keys(this.data)
		for(let x = 0; x < keys.length; x ++) {
			result.push(logic(keys[x], this.data[keys[x]]))
		}
		return result
	}
}

/**
 * 2D Point Data
 */
class Point2D {
	x: number
	y: number

	constructor(x: number, y: number) {
		this.x = x
		this.y = y
	}
}

/**
 * 3D Point Data
 */
class Point3D {
	x: number
	y: number
	z: number

	constructor(x: number, y: number, z: number) {
		this.x = x
		this.y = y
		this.z = z
	}
}

/**
 * String Buffer
 */
class StringBuffer {
	data: Array<string> = []

	/**
	 * Appends data to the buffer
	 *
	 * @param data The data to append
	 * @returns void
	 */
	append(data: string): void {
		this.data.push(data)
	}

	/**
	 * Creates a string from the buffer
	 *
	 * @returns string
	 */
	toString(): string {
		return this.data.join("")
	}
}