import {AsyncStorage} from 'react-native'

export const DECKS_STORAGE_KEY = 'decks'
export const NOTIFICATION_KEY = 'UdaciFitness:notifications'

const DECKS_DEFAULT = {
	React: {
		title: 'React',
		questions: [
			{
				question: 'What is React?',
				answer: 'A library for managing user interfaces'
			},
			{
				question: 'Where do you make Ajax requests in React?',
				answer: 'The componentDidMount lifecycle event'
			}
		]
	},
	JavaScript: {
		title: 'JavaScript',
		questions: [
			{
				question: 'What is a closure?',
				answer: 'The combination of a function and the lexical environment within which that function was declared.'
			}
		]
	}
}

export function _receiveDecksStorage() {
	//AsyncStorage.clear()
	return AsyncStorage.getItem(DECKS_STORAGE_KEY)
		.then(result => {
			//console.log("GET AsyncStorage =========>", result)
			return JSON.parse(result)
		});
}

export function _addDeckStorage({title}) {
	return AsyncStorage.getItem(DECKS_STORAGE_KEY).then((results) => {
		let data = JSON.parse(results)
		if (data === null) {
			data = {}
		}
		data[title] = {
			title: title,
			questions: []
		}
		//console.log("SET AsyncStorage =========>", data)
		AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data))
			.catch(res => {
				console.error("_addDeckStorage::", res)
			})
	})
}

export function _removeDeckStorage(key) {
	return AsyncStorage.getItem(DECKS_STORAGE_KEY)
		.then((results) => {
			const data = JSON.parse(results)
			data[key] = undefined
			delete data[key]
			AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data))
				.catch(res => {
					console.error("_addDeckStorage::", res)
				})
		})
}

export function _addCardStorage(deckId, card) {
	return AsyncStorage.getItem(DECKS_STORAGE_KEY)
		.then((results) => {
			let data = JSON.parse(results)
			if (data === null) {
				data = {}
			}

			data[deckId].questions.push(card)
			AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data))
				.catch(res => {
					console.error("_addDeckStorage::", res)
				})
		})
}