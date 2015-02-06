var
  Immutable= require( "immutable"),
  Sagaware= require( "sagaware"),
  zalgo= require("./zalgo"),
  IZ= zalgo.inverseZalgoStar

function Functionware(){
	var state= Sagaware({
	  fns: [],
	  accept: {},
	  add
	})
	function add(fn, accept, pos){
		var
		  fns= state.get( "fns"),
		  original= state
		if( !fn){
			throw new TypeRror( "'fn' required")
		}
		if( !fn.apply){
			throw new TypeError( "'fn' not a function")
		}
		if( !isNaN(accept) && pos=== undefined){
			pos= accept
			accept= undefined
		}
		if( fn!== undefined && typeof( fn)!== "function"){
			throw new TypeError( "'accept' not a function")
		}
		if( pos=== undefined){
			pos= fns.size
		}else if( isNaN(pos)){
			throw new TypeError( "'pos' not a number")
		}

		state= state.withMutations(_state => {
			// add fn
			fns= fns.splice( pos, 0, fn)
			_state.set( "fns", fns)
			// add accept
			if(accept){
				var
				  _acc= _state.get( "accept").set( pos, accept)
				_state.set( "accept", _acc)
			}
		})
		state.add= add
		original.putState( state)
		return this
	}
	state.add= add

	function functionware(){
		var
		  args= arguments,
		  result= state.get( "fns").reduce( IZ(( prev, fn, i)=>{
		  	var
			  _acc= state.getIn([ "accept", i])
			if( _acc){
				// pass in Functionware state
				fn= _acc( prev, fn, i, args, state)
			}
			if( fn){
				// call
				var
				  _v= fn.apply( this, args)
				// next
				return _v
			}
		  }), undefined)
		return result
	}
	Object.defineProperty( functionware, "_functionware", {
		value: state
	})

	return functionware
}

module.exports= Functionware
