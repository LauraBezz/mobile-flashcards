import React from 'react';
// react-native imports
import {View, Platform, StatusBar} from 'react-native'
import {createStackNavigator, createAppContainer} from "react-navigation";
import {createBottomTabNavigator} from 'react-navigation-tabs';
// expo imports
import {Constants} from 'expo'
// redux imports
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import reducer from './reducers'
import middleware from './middleware'
// project imports
import {purple, white} from './utils/colors'
import {setLocalNotification} from './utils/helpers'

import Deck from './components/Deck'
import Decks from './components/Decks'
import AddDeck from './components/AddDeck'
import AddCard from './components/AddCard'
import Quiz from './components/Quiz'


function UdaciStatusBar({backgroundColor, ...props}) {
	return (
		<View style={{backgroundColor, height: Constants.statusBarHeight}}>
			<StatusBar translucent backgroundColor={backgroundColor} {...props} />
		</View>
	)
}

const MaterialBottomTabNavigator = createBottomTabNavigator({
		Decks: {
			screen: Decks,
			navigationOptions: {
				title: 'Decks'
			}
		},
		AddDeck: {
			screen: AddDeck,
			navigationOptions: {
				title: 'Add deck'
			}
		},
	},
	{
		tabBarOptions: {
			activeTintColor: white,
			labelStyle: {
				fontSize: 20,
			},
			style: {
				backgroundColor: purple,
			},
		}
	}
)

const MainNavigator = createStackNavigator({
	Home: {
		screen: MaterialBottomTabNavigator
	},
	Deck: {
		screen: Deck,
		navigationOptions: ({ navigation }) => ({
			title: `Deck: ${navigation.state.params.deckId}`,
		}),
	},
	AddCard: {
		screen: AddCard,
		navigationOptions: ({ navigation }) => ({
			title: 'Add card',
		}),
	},
	Quiz: {
		screen: Quiz,
		navigationOptions: ({ navigation }) => ({
			title: 'Start quiz',
		}),
	}
});

const MainMenu = createAppContainer(MainNavigator);

export default class App extends React.Component {

	componentDidMount() {
		setLocalNotification()
	}

	render() {
		return (
			<Provider store={createStore(reducer, middleware)}>
				<View style={{flex: 1}}>
					<MainMenu />
				</View>
			</Provider>
		);
	}
}