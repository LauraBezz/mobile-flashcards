import { RECEIVE_DECKS, ADD_DECK, DELETE_DECK, ADD_CARD, DELETE_CARD } from '../actions/decks';

function decks (state = {}, action) {
	switch (action.type) {
		case RECEIVE_DECKS :
			return {
				...state,
				...action.decks,
			}
		case ADD_DECK :
			return {
				...state,
				...action.deck
			}
		case DELETE_DECK :
			state[action.deckId] = undefined
			delete state[action.deckId]
			return {
				...state,
				...action.deck
			}
		case ADD_CARD :
			return {
				...state,
				...state[action.deckId].questions.push(action.card)
			}
		default :
			return state
	}
}
export default decks