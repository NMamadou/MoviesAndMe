const initialState = { markedFilms: [] }

function markedFilm(state = initialState, action) {
  	let nextState

  	switch (action.type) {
    	case 'MARKED_FILM':
      		const markedFilmIndex = state.markedFilms.findIndex(item => item.id === action.value.id)

      		if (markedFilmIndex !== -1) {
        		// Le film est déjà dans les films vus, on le supprime de la liste
			    nextState = {
			      	...state,
			      	markedFilms: state.markedFilms.filter( (item, index) => index !== markedFilmIndex)
			    }
      		} else {
			    // Le film n'est pas dans les films vus, on l'ajoute à la liste
			    nextState = {
			      	...state,
			      	markedFilms: [...state.markedFilms, action.value]
			    }
      		}

      		return nextState || state
  		default:
    		return state
  	}
}

export default markedFilm