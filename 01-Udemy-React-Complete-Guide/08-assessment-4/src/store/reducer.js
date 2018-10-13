const initialState = {
	persons: []
}

const reducer = (prevState = initialState, action) => {
	switch ( action.type ) {
		case 'ADD_PERSON':
			const newPerson = {
	            id: Math.random(), // not really unique but good enough here!
	            name: action.personData.name,
	            age: action.personData.age
	        }
	        return {
	        	...prevState,
	        	persons: prevState.persons.concat(newPerson)
	        }
	    case 'REMOVE_PERSON':
	    	const updatedPersonsArray = prevState.persons.filter(person => person.id !== action.id)
	    	return {
	    		...prevState,
	    		persons: updatedPersonsArray
	    	}
	    default: 
	    	return prevState
	}
}


export default reducer;