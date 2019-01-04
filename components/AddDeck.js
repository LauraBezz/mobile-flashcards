import React, {Component} from 'react'
import {Text, View, StyleSheet, TouchableOpacity, Platform, TextInput} from 'react-native'
import {connect} from 'react-redux'
import {NavigationActions} from 'react-navigation'

import {addDeck} from '../actions/decks'
import {addDeckStorage} from '../utils/api'
import {black, purple, white} from '../utils/colors'

function SubmitBtn({onPress}) {
	return (
		<TouchableOpacity
			style={Platform.OS === 'ios' ? styles.submitButton : styles.submitButton}
			onPress={onPress}>
			<Text style={styles.submitButton}>Create deck</Text>
		</TouchableOpacity>
	)
}


class AddDeck extends Component {

	state = {
		title :  ""
	}

	toHome = () => {
		this.props.navigation.dispatch(NavigationActions.back())
	}


	submitButton = () => {
		const {title} = this.state
		this.props.dispatch(addDeck({
			[title] : {
				title: title,
				questions: []
			}
		}))
		this.setState(() => ({title: ""}))
		this.toHome()
		addDeckStorage({title})
	}

	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.title}>What is the title of your new deck?</Text>
				<TextInput
					style={styles.input}
					onChangeText={(title) => this.setState({title})}
					value={this.state.title}
				/>
				<SubmitBtn onPress={this.submitButton} />
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
		marginBottom: 100,
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

function mapDispatchToProps (dispatch, { navigation }) {
	return {
		remove: () => dispatch(addEntry({
			[entryId]: timeToString() === entryId
				? getDailyReminderValue()
				: null
		})),
	}
}

export default connect(mapDispatchToProps)(AddDeck)