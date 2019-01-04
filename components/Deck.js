import React, {Component} from 'react'
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native'

import {connect} from 'react-redux'
import {removeDeck} from '../actions/decks'
import {removeDeckStorage} from '../utils/api'

import {purple, white, black, red, transparent} from '../utils/colors'
import {NavigationActions} from "react-navigation";

function AddCardBtn({onPress}) {
	return (
		<TouchableOpacity
			onPress={onPress}>
			<Text style={styles.addButton}>Add card</Text>
		</TouchableOpacity>
	)
}
function QuizBtn({onPress}) {
	return (
		<TouchableOpacity
			onPress={onPress}>
			<Text style={styles.startButton}>Start quiz</Text>
		</TouchableOpacity>
	)
}
function DeleteCardBtn({onPress}) {
	return (
		<TouchableOpacity
			onPress={onPress}>
			<Text style={styles.deleteButton}>Delete deck</Text>
		</TouchableOpacity>
	)
}

class Deck extends React.Component {

	state = {
		ready: false,
	}


	static navigationOptions = ({navigation}) => {
		const {deckId} = navigation.state.params
		return {
			deckId: deckId
		}
	}

	toHome = () => {
		this.props.navigation.dispatch(NavigationActions.back())
	}

	addCard = (deck) => {
		this.props.navigation.navigate('AddCard',{deckId: deck.title})
	}

	startQuiz = (deck) => {
		this.props.navigation.navigate('Quiz',{deckId: deck.title})
	}

	delete = (deckId) => {
		this.props.dispatch(removeDeck(deckId))
		removeDeckStorage(deckId)
		this.toHome()
	}

	render() {
		const {deck} = this.props

		return (
			deck != undefined &&
			<View style={styles.container}>
				<Text style={styles.title}>{deck.title}</Text>
				<Text style={styles.text}>{deck.questions.length} cards</Text>

				<AddCardBtn onPress={() => this.addCard(deck)} />
				<QuizBtn onPress={() => this.startQuiz(deck)} />
				<DeleteCardBtn onPress={() => this.delete(deck.title)} />
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
	},
	addButton: {
		borderRadius: 4,
		borderWidth: 1,
		fontSize: 12,
		padding: 10,
		paddingRight: 30,
		paddingLeft: 30,
		marginTop: 100,
		alignSelf: 'center',
		borderColor: black,
		backgroundColor: white,
		color: black
	},
	startButton: {
		borderRadius: 4,
		borderWidth: 1,
		fontSize: 12,
		padding: 10,
		paddingRight: 30,
		paddingLeft: 30,
		marginTop: 20,
		alignSelf: 'center',
		borderColor: black,
		backgroundColor: black,
		color: white
	},
	deleteButton: {
		borderRadius: 4,
		borderWidth: 1,
		fontSize: 12,
		padding: 10,
		paddingRight: 30,
		paddingLeft: 30,
		marginTop: 20,
		alignSelf: 'center',
		color: red,
		borderColor: transparent,
		backgroundColor: transparent,
	}
})

function mapStateToProps(state, {navigation}) {
	const {deckId} = navigation.state.params

	return {
		deckId,
		deck: state.decks[deckId],
	}
}

export default connect(mapStateToProps)(Deck)