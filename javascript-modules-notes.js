// https://www.youtube.com/watch?v=JDDn57_z5Og
// https://www.youtube.com/watch?v=_3oSWwapPKQ

// (1) classic way - script tags

// fine for small applications but as it scales you can end up with hundreds/thousands of those
// each script is also a request to the server, so having a lot of them will make the application slow
// they also need to be loaded in order 
// sometimes loaded asynchronously 



// (2) requireJS

// used to load the scripts
// uses the AMD pattern
// (define|require)(('./foobar/foo.js'), function() {
// console.log('foo')
// })


// (3) commonJS

// nodeJS uses this pattern
// require('foo')
// module.exports

// ================================================
// https://www.youtube.com/watch?v=_3oSWwapPKQ


// (4) ES6 Modules

// =========

export default 'bears!'

export function growl() {
	return 'rarrr'
}

export let type = 'Grizzly'


// =========

import bears, {growl, type as bearType} from './...'

let says = growl();
console.log(`the ${bearType} says ${says}. hooray ${bears}`)

// or 

import bears, * from .'./...'

let says = growl();
console.log(`the ${type} says ${says}. hooray ${bears}`)

// the asterix imports all named modules from a file
// better to import it as something, so that the injected files namespace doesnt get crowded
// when you import ( * as foo ), an object is created which holds all the injected data
// e.g.
import bears, * as grizzly from './...'


let says = grizzly.growl();
console.log(`the ${grizzly.bearType} says ${grizzly.says}. hooray ${grizzly.bears}`)

// tree shaking - makes it so that if were not using an exported module, then it wont be included in our bundled code
// see rollup.js