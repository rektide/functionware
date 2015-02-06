function zalgo( val, fn){
	if( val && val.then){
		return val.then( fn)
	}
	return fn( val)
}

function zalgoStar( args, fn){
	var
	  candidate= args&& args[ 0],
	  thennable= candidate.then? candidate: null,
	  args= arguments
	if( !thennable){
		return fn.apply( this, args)
	}
	return thennable.then(( val)=> {
		args[0]= val
		return fn.apply( this, args)
	})
}

function inverseZalgoStar( fn){
	return function(){
		var args= arguments
		return zalgoStar( args, fn)
	}
}

module.exports= zalgo
module.exports.zalgo= zalgo
module.exports.default= zalgo

module.exports.zalgoStar= zalgoStar
module.exports.inverseZalgoStar= inverseZalgoStar
