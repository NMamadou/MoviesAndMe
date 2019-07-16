import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
//import FilmList from './FilmList'
import FilmsVusList from './FilmsVusList'
import { connect } from 'react-redux'

class FilmsVus extends React.Component {
	render() {
	    return (
	      	<View style={styles.main_container}>
		        <FilmsVusList
		          	films={this.props.markedFilms}
		          	navigation={this.props.navigation}
		          	markedFilmsList={true}
		        />
	      	</View>
	    )
  	}
}

const styles = StyleSheet.create({
  	main_container: {
    	flex: 1
  	}
})

const mapStateToProps = state => {
  	return {
  		favoritesFilm: state.toggleFavorite.favoritesFilm,
    	markedFilms: state.markedFilm.markedFilms
  	}
}

export default connect(mapStateToProps)(FilmsVus)