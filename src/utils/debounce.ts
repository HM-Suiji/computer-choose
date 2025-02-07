/**
 * @function 防抖函数
 * @param func
 * @param delay
 * @returns Function
 */
function debounce<A extends any[], R>(
	func: (...args: A) => R,
	delay: number = 1000,
	callback?: () => void
): (...args: A) => void {
	//随环境不同，timer type 不同
	//string | number | NodeJS.Timeout | undefined
	let timer: any
	return (...args) => {
		if (timer) {
			clearTimeout(timer)
			callback?.()
		}
		timer = setTimeout(() => func(...args), delay)
	}
}

export { debounce }
