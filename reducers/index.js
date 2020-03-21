import {
  ADD_CARD,
  ADD_DECK,
  GET_DECKS,
  REMOVE_DECK,
  RESET_STORE
} from '../actions';
import { initialdata as INITIAL_STATE } from '../utils/api.js';

export default function decks(state = {}, action) {
  switch (action.type) {
    case RESET_STORE:
      return {
        ...INITIAL_STATE
      };

    case GET_DECKS:
      return {
        ...state,
        ...action.decks
      };

    case ADD_DECK:
      const { deck } = action;
      return {
        ...state,
        [deck.title]: deck
      };

    case REMOVE_DECK:
      const { id } = action;
      const { [id]: value, ...rest } = state;
      return {
        ...rest
      };

    case ADD_CARD:
      const { card, deckId } = action;
      return {
        ...state,
        [deckId]: {
          ...state[deckId],
          questions: state[deckId].questions.concat(card)
        }
      };

    default:
      return state;
  }
}
