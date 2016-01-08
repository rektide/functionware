var
  tape= require( "tape")
var
  Functionware= require( "..")

function mkAdd(n){
	return function(a){
		return a + n
	}
}

tape("Latter function overrides earlier function", t => {
	var
	  functionware= Functionware()
	functionware._functionware.add(mkAdd(1))
	t.equal(functionware(0), 1, "Single function works")
	functionware._functionware.add(mkAdd(2))
	t.equal(functionware(1), 3, "New function takes precedent")
	t.end()
})

tape("Accept function", t => {
	var
	  functionware= Functionware()
	functionware._functionware.add(mkAdd(2))
	t.equal(functionware(1), 3, "Single function works")

	var
	  was
	function accept(agg, state, i){
		t.equal(i, 1)
		t.equal(agg, 3)
		was = agg
	}
	function addMore(){
		return was + 3
	}

	functionware._functionware.add(addMore, accept)
	t.equal(functionware(1), 6, "Contextual add works")

	t.end()

})
