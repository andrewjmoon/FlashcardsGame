import {
  addCardToDeck,
  getDecks as load,
  deleteDeck,
  resetDecks,
  saveDeckTitle
} from '../utils/api';

export const RESET_STORE = 'RESET_STORE';
export const GET_DECKS = 'GET_DECKS';
export const ADD_DECK = 'ADD_DECK';
export const REMOVE_DECK = 'REMOVE_DECK';
export const ADD_CARD = 'ADD_CARD';

export function resetStore() {
  return {
    type: RESET_STORE
  };
}

export function getDecks(decks) {
  return {
    type: GET_DECKS,
    decks
  };
}

export function addDeck(deck) {
  return {
    type: ADD_DECK,
    deck
  };
}

export function removeDeck(id) {
  return {
    type: REMOVE_DECK,
    id
  };
}

export function addCard(card, deckId) {
  return {
    type: ADD_CARD,
    card,
    deckId
  };
}

export const handleInitialData = () => {
  return async dispatch => {
    const decks = await load();
    console.debug('handleInitialData:', decks);
    dispatch(getDecks(decks));
    return decks;
  };
};

export const handleAddDeck = deck => {
  return async dispatch => {
    await saveDeckTitle(deck.title);
    dispatch(addDeck(deck));
  };
};

export const handleDeleteDeck = id => {
  return async dispatch => {
    await deleteDeck(id);
    dispatch(removeDeck(id));
  };
};

export const handleNewCardToDeck = (card, deckId) => {
  return async dispatch => {
    await addCardToDeck(deckId, card);
    dispatch(addCard(card, deckId));
  };
};

export const handleResetDeck = () => {
  return async dispatch => {
    await resetDecks();
    dispatch(resetStore());
  };
};
