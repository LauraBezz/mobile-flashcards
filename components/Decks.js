import React, {Component} from 'react'
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native'
import {AppLoading} from 'expo'

import {connect} from 'react-redux'
import {receiveDecks} from '../actions/decks'
import {receiveDecksStorage} from '../utils/api'

import {white, black} from '../utils/colors'

class Decks extends React.Component {

	state = {
		ready: false,
	}

	componentDidMount() {
		const {dispatch} = this.props
		receiveDecksStorage().then((decks) => {
			dispatch(receiveDecks(decks))
		}).then(() => {
			this.setState(() => ({ready: true}))
		})
	}


	render() {
		const {decks} = this.props
		const {ready} = this.state

		if (ready === false) {
			return <AppLoading />
		}


		return (
			<View style={styles.container}>
				{
					decks != undefined && Object.values(decks).length  > 0 &&
						Object.values(decks).map((deck) => (
								<TouchableOpacity key={deck.title}
												  style={styles.card}
												  onPress={() => this.props.navigation.navigate('Deck', {deckId: deck.title})}>
									<Text style={styles.title}>{deck.title}</Text>
									<Text style={styles.text}>{deck.questions.length} cards</Text>
								</TouchableOpacity>
						))
				}
				{
					decks == null || Object.values(decks).length == 0 &&
					<Text style={styles.title}>No decks</Text>
				}
			</View>
		)
	}
}


const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		backgroundColor: white
	},
	card: {
		borderRadius: 4,
		borderWidth: 1,
		borderColor: '#d6d7da',
		padding: 5,
		margin: 5,
		backgroundColor: white
	},
	title: {
		alignSelf: 'center',
		paddingTop: 10,
		fontSize: 15,
		color: black
	},
	text: {
		alignSelf: 'center',
		fontSize: 12,
		color: black
	}
})

function mapStateToProps({decks}) {
	return {
		decks
	}
}

export default connect(mapStateToProps)(Decks)