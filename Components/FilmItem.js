import React from 'react'
import { Alert, StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import { getImageFromApi } from '../API/TMDBApi'
import FadeIn from '../Animations/FadeIn'
import moment from 'moment'

class FilmItem extends React.Component {
	constructor(props) {
        super(props)

        this.state = {
        	filmTitle: '',
        	isDateDisplayed: false
        }
    }

	_displayFavoriteImage() {
	    if (this.props.isFilmFavorite) {
	      	// Si la props isFilmFavorite vaut true, on affiche le 🖤
	      	return (
		        <Image
		          style={styles.favorite_image}
		          source={require('../Images/ic_favorite.png')}
		        />
	      	)
	    }
	}

	_onLongPressTitle = () => {
		const { film } = this.props

		if (this.state.isDateDisplayed) {
			this.setState({
	    		filmTitle: film.title,
	    		isDateDisplayed: false
	  		})
		} else {
			this.setState({
	    		filmTitle: 'Sorti le ' + moment(new Date(film.release_date)).format('DD/MM/YYYY'),
	    		isDateDisplayed: true
	  		})
		}
	};

	_displayFilmItem() {
		const { film, displayDetailForFilm } = this.props

		return (
	  		<FadeIn>
	      		<TouchableOpacity
					style={styles.main_container}
					onPress={() => displayDetailForFilm(film.id)}>
			        <Image
						style={styles.image}
						source={{uri: getImageFromApi(film.poster_path)}}
					/>
					<View style={styles.content_container}>
						<View style={styles.header_container}>
							{this._displayFavoriteImage()}
					    	<Text style={styles.title_text}>{film.title}</Text>
					    	<Text style={styles.vote_text}>{film.vote_average}</Text>
					  	</View>
					  	<View style={styles.description_container}>
					    	<Text style={styles.description_text} numberOfLines={6}>{film.overview}</Text>
					    	{/* La propriété numberOfLines permet de couper un texte si celui-ci est trop long, il suffit de définir un nombre maximum de ligne */}
					  	</View>
						<View style={styles.date_container}>
						    <Text style={styles.date_text}>{film.release_date}</Text>
						</View>
					</View>
				</TouchableOpacity>
			</FadeIn>
		)
	}

	_displayFilmVuItem() {
		const { film, displayDetailForFilm } = this.props

		return (
	  		<FadeIn>
	      		<TouchableOpacity
					style={styles.marked_film_main_container}
					onPress={() => displayDetailForFilm(film.id)}>
			        <Image
						style={styles.image_marked_film}
						source={{uri: getImageFromApi(film.poster_path)}}
					/>
					<View style={styles.content_container}>
						<View style={styles.header_container}>
							<TouchableOpacity
								onLongPress={this._onLongPressTitle}
								onPress={() => displayDetailForFilm(film.id)}>
						    	<Text
						    		//style={styles.marked_film_title_text}>{film.title}
						    		style={styles.marked_film_title_text}>{this.state.filmTitle}
						    	</Text>
						    </TouchableOpacity>
					  	</View>
					</View>
				</TouchableOpacity>
			</FadeIn>
		)
	}

	componentDidMount() {
		const { film } = this.props

        this.setState({ filmTitle: film.title })
    }

	render() {
		const { isMarkedFilm } = this.props

		if (isMarkedFilm != undefined && isMarkedFilm) {
			return (
				this._displayFilmVuItem()
			)
		} else {
			return (
				this._displayFilmItem()
			)
		}
	}
}

const styles = StyleSheet.create({
  	main_container: {
	    height: 190,
	    flexDirection: 'row'
	},
	marked_film_main_container: {
	    flexDirection: 'row',
	    margin: 5
	},
  	image: {
	    width: 120,
	    height: 180,
	    margin: 5,
	    backgroundColor: 'gray'
  	},
  	image_marked_film: {
	    width: 75,
	    height: 75,
	    margin: 5,
	    borderRadius: 200 / 2
  	},
  	content_container: {
	    flex: 1,
	    margin: 5
  	},
  	header_container: {
	    flex: 3,
	    flexDirection: 'row'
  	},
  	title_text: {
	    fontWeight: 'bold',
	    fontSize: 20,
	    flex: 1,
	    flexWrap: 'wrap',
	    paddingRight: 5,
  	},
  	marked_film_title_text: {
	    fontWeight: '600',
	    color: 'gray',
	    fontSize: 16,
	    flex: 1,
	    flexWrap: 'wrap',
	    paddingRight: 10,
	    marginVertical: 22
  	},
  	vote_text: {
	    fontWeight: 'bold',
	    fontSize: 26,
	    color: '#666666'
  	},
  	description_container: {
    	flex: 7
  	},
  	description_text: {
	    fontStyle: 'italic',
	    color: '#666666'
  	},
  	date_container: {
    	flex: 1
  	},
  	date_text: {
	    textAlign: 'right',
	    fontSize: 14
  	},
  	favorite_image: {
	    width: 25,
	    height: 25,
	    marginRight: 5
  	}
})

export default FilmItem