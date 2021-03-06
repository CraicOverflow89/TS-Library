/**
 * Array Extension
 */
declare interface Array<T> {
	drop(count: number): Array<T>
	first(logic: (element: T) => boolean): T
	forEachBreakable(logic: (element: T) => boolean): void
	partition(logic: (element: T) => boolean): Pair<Array<T>, Array<T>>
	remove(object: T): boolean
	take(count: number): Array<T>
	windowed(size: number): Array<Array<T>>
}

/**
 * Drops an amount of elements from an array
 *
 * @param count The amount of elements to drop
 * @returns Array<T>
 */
Array.prototype.drop = function(count: number) {
	if(count < 1 || !Number.isInteger(count)) return []
	return this.slice(count)
}

/**
 * Fetches the first element in an array matching a predicate or null
 *
 * @param logic The logic to match against an element
 * @returns T
 */
Array.prototype.first = function(logic: (element: any) => boolean) {
	for(let x = 0; x < this.length; x ++) {
		if(logic(this[x])) return this[x]
	}
	return null
}

/**
 * Executes logic against each element in an array providing true is returned each time
 *
 * @param logic The logic to execute (returns true to continue the loop)
 * @returns void
 */
Array.prototype.forEachBreakable = function(logic: (element: any) => boolean) {
	for(let x = 0; x < this.length; x ++) {
		if(!logic(this[x])) return
	}
}

/**
 * Partitions an array into a pair of arrays based on a predicate
 *
 * @param logic The logic that returns true/false to determine first/second allocation
 * @returns Pair<Array, Array>
 */
Array.prototype.partition = function(logic: (element: any) => boolean) {
	const first = []
	const second = []
	for(let x = 0; x < this.length; x ++) {
		logic(this[x]) ? first.push(this[x]) : second.push(this[x])
	}
	return new Pair(first, second)
}

/**
 * Removes an element from the array
 *
 * @param object The element to remove
 * @returns boolean Success of removal
 */
Array.prototype.remove = function(object: any): boolean {
	const index = this.indexOf(object)
	if(index < 0) return false
	this.splice(index, 1)
	return true
}

/**
 * Takes an amount of elements from an array
 *
 * @param count The amount of elements to take
 * @returns Array<T>
 */
Array.prototype.take = function(count: number) {
	if(count < 1 || !Number.isInteger(count)) return []
	return this.slice(0, count)
}

/**
 * Converts array into multiple arrays of elements
 *
 * @param size The size of each window
 * @returns Array
 */
Array.prototype.windowed = function(size: number): Array<Array<any>> {
	const result = []
	let window = []
	for(let x = 0; x < this.length; x ++) {
		if(window.length == size) {
			result.push(window)
			window = []
		}
		window.push(this[x])
	}
	result.push(window)
	return result
}

/**
 * HTMLElement Extension
 */
declare interface HTMLElement {
	addClass(value: string): void
	getClassArray(): Array<string>
	removeClass(value: string): void
}

/**
 * Adds a class to the element
 *
 * @param value The class to add
 * @returns void
 */
HTMLElement.prototype.addClass = function(value: string) {
	const classList = this.getClassArray()
	if(classList.indexOf(value) < 0) {
		classList.push(value)
	}
	this.className = classList.join(" ")
}

/**
 * Gets classes associated with an element
 *
 * @returns Array<string>
 */
HTMLElement.prototype.getClassArray = function() {
	return this.className.splitPopulated(" ")
}

/**
 * Removes a class from the element
 *
 * @param value The class to remove
 * @returns void
 */
HTMLElement.prototype.removeClass = function(value: string) {
	const classList = this.getClassArray()
	if(classList.indexOf(value) > -1) {
		classList.remove(value)
	}
	this.className = classList.join(" ")
}

/**
 * Number Extension
 */
declare interface Number {
	toPaddedString(count: number): string
}
declare interface NumberConstructor {
	isInteger(value: number): boolean
}

/**
 * Determines if a number is an integer
 *
 * @param value The number to check
 * @returns boolean
 */
Number.isInteger = function(value: number): boolean {
	return typeof value === "number" && isFinite(value) && Math.floor(value) === value
}

/**
 * Creates a string with padded zeroes
 *
 * @param count The minimum number of digits
 * @returns string
 */
Number.prototype.toPaddedString = function(count: number): string {
	const result = this.toString()
	return "0".repeat(count - result.length) + result
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
	contains(value: string): boolean
	endsWith(value: string): boolean
	repeat(count: number): string
	splitPopulated(delimiter: string): Array<string>
	startsWith(value: string): boolean
}

/**
 * Determines if a string contains a substring
 *
 * @param value The substring to check for inside of the string
 * @returns boolean
 */
String.prototype.contains = function(value: string): boolean {
	return this.indexOf(value) > -1
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
	if(count < 1 || !Number.isInteger(count)) return ""
	return Array(count).join(this)
}

/**
 * Splits a string into a list based on a delimeter ignoring empty strings
 *
 * @param delimiter The string to split on
 * @returns Array<string>
 */
String.prototype.splitPopulated = function(delimiter: string) {
	const result = this.split(delimiter)
	if(result.length == 1 && result[0] == "") return []
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
 * Window Extension
 */
declare interface Window {
	innerSize: () => Dimension2D
}

/**
 * Fetches current window size
 *
 * @returns Dimension2D
 */
Window.prototype.innerSize = function(): Dimension2D {
	return new Dimension2D(window.innerWidth, window.innerHeight)
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
 * 2D Size Data
 */
class Dimension2D {
	width: number
	height: number

	constructor(width: number, height: number) {
		this.width = width
		this.height = height
	}

	/**
	 * Provides string of dimension data
	 *
	 * @returns string
	 */
	toString(): string {
		return `{width: ${this.width}, height: ${this.height}}`
	}
}

/** 
 * 3D Size Data
 */
class Dimension3D {
	width: number
	height: number
	depth: number

	constructor(width: number, height: number, depth: number) {
		this.width = width
		this.height = height
		this.depth = depth
	}

	/**
	 * Provides string of dimension data
	 *
	 * @returns string
	 */
	toString(): string {
		return `{width: ${this.width}, height: ${this.height}, depth: ${this.depth}}`
	}
}

/**
 * Map of Key / Value Entries
 */
class HashMap<T> {
	data: {[key: string]: T} = {}

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
 * Pair Data
 */
class Pair<T1, T2> {
	first: T1
	second: T2

	constructor(first: T1, second: T2) {
		this.first = first
		this.second = second
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

	/**
	 * Provides string of point data
	 *
	 * @returns string
	 */
	toString(): string {
		return `{x: ${this.x}, y: ${this.y}}`
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

	/**
	 * Provides string of point data
	 *
	 * @returns string
	 */
	toString(): string {
		return `{x: ${this.x}, y: ${this.y}, z: ${this.z}}`
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