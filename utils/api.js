import {_receiveDecksStorage, _addDeckStorage, _removeDeckStorage, _addCardStorage} from './_DATA.js'

export function receiveDecksStorage() {
	return _receiveDecksStorage()
}

export function addDeckStorage (title) {
	return _addDeckStorage(title)
}

export function removeDeckStorage(key) {
	return _removeDeckStorage(key)
}

export function addCardStorage(deckId, card) {
	return _addCardStorage(deckId, card)
}
