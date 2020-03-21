import { AsyncStorage } from 'react-native';

const STORAGE_KEY = 'MobileFlashcards:decks';

export const initialdata = {
  React: {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'Where do you make Ajax/API requests in React?',
        answer: 'The componentDidMount lifecycle event'
      },
      {
        question: 'What is JSX',
        answer:
          'JSX is a shorthand for JavaScript XML. This is a type of file used by React which utilizes the expressiveness of JavaScript along with HTML like template syntax. This makes the HTML file really easy to understand. This file makes applications robust and boosts its performance.'
      },
      {
        question: 'What is arrow function in React',
        answer:
          'Arrow functions are more of brief syntax for writing the function expression. They are also called ‘fat arrow‘ (=>) the functions. These functions allow to bind the context of the components properly since in ES6 auto binding is not available by default. Arrow functions are mostly useful while working with the higher order functions..'
      }
    ]
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer:
          'The combination of a function and the lexical environment within which that function was declared.'
      },
      {
        question: 'What is a callback?',
        answer:
          'a plain JavaScript function passed to some method as an argument or option. It is a function that is to be executed after another function has finished executing, hence the name call back.'
      },
      {
        question: 'What is the DOM?',
        answer:
          'DOM stands for Document Object Model is an interface (API) for HTML and XML documents. When the browser first reads (parses) our HTML document it creates a big object, a really big object based on the HTML document this is the DOM. It is a tree-like structure that is modeled from the HTML document. The DOM is used for interacting and modifying the DOM structure or specific Elements or Nodes.'
      }
    ]
  },
  Redux: {
    title: 'Redux',
    questions: [
      {
        question: 'What is the Single source of truth?',
        answer:
          'Redux uses ‘Store’ for storing the application’s entire state at one place. So all the component’s state are stored in the Store and they receive updates from the Store itself. The single state tree makes it easier to keep track of changes over time and debug or inspect the application..'
      },
      {
        question: 'What is Redux?',
        answer: 'A predictable state container for JavaScript Apps'
      },
      {
        question: 'What is a reducer?',
        answer:
          'Pure function that takes the current state and action and returns the next state.'
      },
      {
        question: 'What is store in Redux?',
        answer:
          'Store is the object that holds the application state and provides a few helper methods to access the state, dispatch actions and register listeners. The entire state is represented by a single store. Any action returns a new state via reducers. That makes Redux very simple and predictable..'
      }
    ]
  }
};

export function getData() {
  return initialdata;
}

export async function getDecks() {
  try {
    const results = await AsyncStorage.getItem(STORAGE_KEY);

    if (results === null) {
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(initialdata));
    }

    return results === null ? decks : JSON.parse(results);
  } catch (err) {
    console.log(err);
  }
}

export async function getDeck(id) {
  try {
    const results = await AsyncStorage.getItem(STORAGE_KEY);

    return JSON.parse(results)[id];
  } catch (err) {
    console.log(err);
  }
}

export async function saveDeckTitle(title) {
  try {
    await AsyncStorage.mergeItem(
      STORAGE_KEY,
      JSON.stringify({
        [title]: {
          title,
          questions: []
        }
      })
    );
  } catch (err) {
    console.log(err);
  }
}

export async function deleteDeck(key) {
  try {
    const results = await AsyncStorage.getItem(STORAGE_KEY);
    const data = JSON.parse(results);
    data[key] = undefined;
    delete data[key];
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (err) {
    console.log(err);
  }
}

export async function addCardToDeck(title, card) {
  try {
    const deck = await getDeck(title);

    await AsyncStorage.mergeItem(
      STORAGE_KEY,
      JSON.stringify({
        [title]: {
          questions: [...deck.questions].concat(card)
        }
      })
    );
  } catch (err) {
    console.log(err);
  }
}

export async function resetDecks() {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(initialdata));
  } catch (err) {
    console.log(err);
  }
}
