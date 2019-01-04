import React, {Component} from 'react'
import {Text, View, TouchableOpacity, StyleSheet, TextInput} from 'react-native'

import {connect} from 'react-redux'
import {purple, white, black, gray} from '../utils/colors'
import {clearLocalNotification, setLocalNotification } from '../utils/helpers'

function Button({onPress, disabled, textBtn}) {
	return (
		<TouchableOpacity
			disabled={disabled}
			style={disabled ? styles.submitBtnDisabled : styles.submitBtn}
			onPress={disabled ? () => {} : onPress}>
			<Text style={styles.text}>{textBtn}</Text>
		</TouchableOpacity>
	)
}

function ViewAnswer({onPress, disabled}) {
	return (
		<TouchableOpacity
			disabled={disabled}
			style={disabled ? styles.submitBtnDisabled : styles.submitBtn}
			onPress={disabled ? () => {} : onPress}>
			<Text style={styles.text}>VIEW ANSWER</Text>
		</TouchableOpacity>
	)
}

function HideAnswer({onPress, disabled}) {
	return (
		<TouchableOpacity
			disabled={disabled}
			style={disabled ? styles.submitBtnDisabled : styles.submitBtn}
			onPress={disabled ? () => {} : onPress}>
			<Text style={styles.text}>HIDE ANSWER</Text>
		</TouchableOpacity>
	)
}

function Back({onPress, disabled}) {
	return (
		<TouchableOpacity
			disabled={disabled}
			style={disabled ? styles.submitBtnDisabled : styles.submitBtn}
			onPress={disabled ? () => {} : onPress}>
			<Text style={styles.text}>&lt;&lt; BACK</Text>
		</TouchableOpacity>
	)
}

function Next({onPress, disabled}) {
	return (
		<TouchableOpacity
			disabled={disabled}
			style={disabled ? styles.submitBtnDisabled : styles.submitBtn}
			onPress={disabled ? () => {} : onPress}>
			<Text style={styles.text}>NEXT &gt;&gt;</Text>
		</TouchableOpacity>
	)
}

class Quiz extends React.Component {

	state = {
		index: 0,
		view: false,
		answer: "",
		score: 0,
		errors: 0,
		message: "",
		fgDisabledSubmitAnswer: false,
		fgDisabledViewAnswer: true,
		fgDisabledNext: true
	}

	toHome = () => {
		this.props.navigation.navigate('Decks')
	}

	toQuiz = (title) => {
		this.setState(() => ({
			index: 0,
			view: false,
			answer: "",
			score: 0,
			errors: 0,
			message: "",
			fgDisabledSubmitAnswer: false,
			fgDisabledViewAnswer: true,
			fgDisabledNext: true
		}))
		this.props.navigation.navigate('Quiz', {deckId: title})
	}

	submitAnswer = (index) => {
		const {deck} = this.props
		let {score, answer, errors} = this.state
		deck.questions[index].answer === answer ?
			this.setState(() => ({
				score: ++score,
				message: "The answer is right",
				fgDisabledSubmitAnswer: true,
				fgDisabledViewAnswer: false,
				fgDisabledNext: false
			})) :
			this.setState(() => ({
				errors: ++errors,
				message: "The answer is wrong",
				fgDisabledSubmitAnswer: true,
				fgDisabledViewAnswer: false,
				fgDisabledNext: false
			}))
		this.setState(() => ({
			view: false
		}))
		clearLocalNotification().then(setLocalNotification)
	}

	viewAnswer = () => {
		this.setState(() => ({
			view: true
		}))
	}

	hideAnswer = () => {
		this.setState(() => ({
			view: false
		}))
	}

	nextCard = (index) => {
		this.setState(() => ({
			view: false,
			index: ++index,
			answer: "",
			message: "",
			fgDisabledSubmitAnswer: false,
			fgDisabledViewAnswer: true,
			fgDisabledNext: true
		}))
	}

	backCard = (index) => {
		this.setState(() => ({
			view: false,
			index: --index
		}))
	}

	render() {
		const {deck} = this.props
		const {fgDisabledSubmitAnswer, fgDisabledViewAnswer, fgDisabledNext} = this.state
		const {view, index, score, errors, message} = this.state
		let cardNumber = index + 1

		return (

			<View style={styles.container}>
				{
					deck != undefined && deck.questions.length === 0 &&
						<View>
							<Text style={styles.title}>Sorry! No cards here!</Text>
						</View>
				}
				{
					deck != undefined && deck.questions.length >0 &&
					<View>
						<Text style={styles.cardNumber}>{cardNumber + "/" + deck.questions.length}</Text>
						<Text style={styles.title}>{deck.questions[index].question}</Text>
						<TextInput
							style={styles.input}
							onChangeText={(answer) => this.setState({answer})}
							value={this.state.answer}
						/>
						<Text style={styles.message}>{message}</Text>
						<Text style={styles.title}>
							{view && deck.questions[index].answer}
						</Text>
						<Text style={styles.cardNumber}>
							SCORE: {score}
						</Text>
						<Text style={styles.cardNumber}>
							ERRORS: {errors}
						</Text>
						<Text style={styles.cardNumber}>
							RESULT: {score/deck.questions.length*100} %
						</Text>
						<View style={styles.buttons}>
							<Button textBtn={"<< RESTART"} onPress={() => this.toQuiz(deck.title)} />
							<Button textBtn={"SUBMIT"} onPress={() => this.submitAnswer(index)} disabled={fgDisabledSubmitAnswer} />
							{!view && <Button textBtn={"VIEW ANSWER"} onPress={() => this.viewAnswer()} disabled={fgDisabledViewAnswer} />}
							{view && <Button textBtn={"HIDE ANSWER"} onPress={() => this.hideAnswer()} />}
							{index !== deck.questions.length - 1 && <Button textBtn={"NEXT >>"} onPress={() => this.nextCard(index)} disabled={fgDisabledNext} />}
							{index === deck.questions.length - 1 && <Button textBtn={"HOME >>"} onPress={() => this.toHome()} disabled={fgDisabledNext} />}
						</View>
					</View>
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
	title: {
		fontSize: 20,
		paddingTop: 5,
		paddingBottom: 10
	},
	input: {
		fontSize: 18,
		height: 40,
		borderColor: 'gray',
		borderWidth: 1
	},
	message: {
		fontSize: 17,
		marginBottom: 10,
	},
	cardNumber: {
		fontSize: 20,
		textAlign: 'right',
		paddingTop: 20
	},
	buttons: {
		paddingTop: 30,
		flexDirection: 'column',
		backgroundColor: white,
	},
	submitBtn: {
		height: 40,
		borderRadius: 4,
		borderWidth: 1,
		fontSize: 12,
		padding: 10,
		paddingRight: 30,
		paddingLeft: 30,
		marginBottom: 2,
		borderColor: purple,
		backgroundColor: purple,
		color: white
	},
	submitBtnDisabled: {
		height: 40,
		borderRadius: 4,
		borderWidth: 1,
		fontSize: 12,
		padding: 10,
		paddingRight: 30,
		paddingLeft: 30,
		marginLeft: 5,
		marginRight: 5,
		marginBottom: 2,
		borderColor: gray,
		backgroundColor: gray,
		color: white
	},
	text: {
		color: white
	},
	textBlack: {
		color: black
	}
})


function mapStateToProps(state, {navigation}) {
	const {deckId} = navigation.state.params

	return {
		deck: state.decks[deckId],
	}
}

export default connect(mapStateToProps)(Quiz)