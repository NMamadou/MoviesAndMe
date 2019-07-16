import { createStore } from 'redux'
import toggleFavorite from './Reducers/favoriteReducer'
import markedFilm from './Reducers/markedFilmReducer'
import setAvatar from './Reducers/avatarReducer'
import { persistCombineReducers } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const rootPersistConfig = {
  	key: 'root',
  	storage: storage
}

export default createStore(persistCombineReducers(rootPersistConfig, {toggleFavorite, markedFilm, setAvatar}))