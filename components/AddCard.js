import React, {Component} from 'react'
import {Text, View, Platform, StyleSheet, TouchableOpacity, TextInput} from 'react-native'
import {connect} from 'react-redux'

import {purple, white, black} from '../utils/colors'
import {addCard} from "../actions/decks";
import {addCardStorage} from "../utils/api";

function SubmitBtn({onPress}) {
	return (
		<TouchableOpacity
			style={Platform.OS === 'ios' ? styles.submitButton : styles.submitButton}
			onPress={onPress}>
			<Text style={styles.submitButton}>Create card</Text>
		</TouchableOpacity>
	)
}

class Deck extends React.Component {

	state = {
		question: "",
		answer: "",
	}

	goBack = (title) => {
		this.props.navigation.navigate('Deck', {deckId: title})
	}

	submit = () => {
		const {deckId} = this.props
		const {question, answer} = this.state
		this.props.dispatch(addCard(deckId,
			{
				question: question,
				answer: answer
			}
		))
		this.setState(() => ({
			question: "",
			answer: "",
		}))
		addCardStorage(deckId, {
			question: question,
			answer: answer
		})
		this.goBack(deckId)
	}

	render() {
		const {decks} = this.state

		return (
			<View style={styles.container}>
				<Text style={styles.title}>Question:</Text>
				<TextInput
					style={styles.input}
					onChangeText={(question) => this.setState({question})}
					value={this.state.question}
				/>
				<Text style={styles.title}>Answer:</Text>
				<TextInput
					style={styles.input}
					onChangeText={(answer) => this.setState({answer})}
					value={this.state.answer}
				/>
				<SubmitBtn onPress={this.submit} />
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
		fontSize: 20,
		textAlign: 'center',
		paddingTop: 20,
		paddingBottom: 30
	},
	input: {
		height: 40,
		borderColor: 'gray',
		marginBottom: 20,
		borderWidth: 1
	},
	submitButton: {
		borderRadius: 4,
		borderWidth: 1,
		fontSize: 12,
		padding: 5,
		paddingRight: 30,
		paddingLeft: 30,
		alignSelf: 'center',
		borderColor: black,
		backgroundColor: black,
		color: white
	},
})

function mapStateToProps(dispatch, { navigation }) {
	const { deckId } = navigation.state.params
	return {
		deckId
	}
}

export default connect(mapStateToProps)(Deck)