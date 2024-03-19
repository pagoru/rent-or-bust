
export const somethingSystem = () => {
	
	const onLoad = () => {
		console.log('load')
	}
	const onDestroy = () => {
		console.log('destroy')
	}
	
	return {
		onLoad,
		onDestroy
	}
}