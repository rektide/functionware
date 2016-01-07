var Immutable= require("immutable")

function Functionware(fn){
	var state= {
		fns: List.of(fn)
	}
	function functionware(){
		var
		  args= arguments,
		  result= functionware._functionware.fns.reduce((r, fn) => {
		  	var next= curr.apply(this, args)
		  	return next
		  }, undefined)
		return result
	}
	Object.defineProperty(functionware, "_functionware", {
		value: state
	})
	return functionware
}

module.exports= Functionware
