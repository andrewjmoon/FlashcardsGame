import React, { useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { blue, gray } from '../utils/colors';
import { connect, useDispatch, useSelector } from 'react-redux';
import { handleDeleteDeck, handleResetDeck } from '../actions';
import { lightYellow, textGray, white, green } from '../utils/colors';
import TouchButton from '../components/TouchButton';

const DeckView = ({ navigation }) => {
  const dispatch = useDispatch();
  const { decks } = useSelector(decks => ({
    decks
  }));

  const title = navigation.getParam('title', 'undefined');

  const deck = decks?.[title];

  const handleDelete = id => {
    dispatch(handleDeleteDeck(id));
    navigation.goBack();
  };

  const resetDeck = id => {
    dispatch(handleResetDeck(id));
  };

  if (!deck) {
    return null;
  }

  return (
    <View style={[styles.container]}>
      <View style={[styles.deckContainer, { padding: 30, marginBottom: 40 }]}>
        <Text style={{ textAlign: 'center', fontSize: 35 }}>{deck.title}</Text>

        <Text style={styles.cardText}>{deck.questions.length} cards</Text>
      </View>
      <View>
        <TouchButton
          btnStyle={{ backgroundColor: white, borderColor: textGray }}
          txtStyle={{ color: textGray }}
          onPress={() => navigation.navigate('AddCard', { title: deck.title })}
        >
          Add Card
        </TouchButton>
        <TouchButton
          btnStyle={{ backgroundColor: blue, borderColor: white }}
          txtStyle={{ color: white }}
          onPress={() => navigation.navigate('Quiz', { title: deck.title })}
        >
          Start Quiz
        </TouchButton>
        <TouchButton
          txtStyle={{ color: 'black' }}
          onPress={() => handleDelete(deck.title)}
        >
          Delete Deck
        </TouchButton>
        <TouchButton
          btnStyle={{ backgroundColor: green, borderColor: white }}
          txtStyle={{ color: 'black' }}
          onPress={() => resetDeck(deck.id)}
        >
          Reset Decks
        </TouchButton>
      </View>
    </View>
  );
};

DeckView.navigationOptions = ({ navigation }) => ({
  title: navigation.getParam('title', 'undefined')
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: lightYellow
  },
  deckContainer: {
    flex: 0.5,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    borderWidth: 0.5,
    backgroundColor: 'lightblue'
  },
  deckText: {
    fontSize: 28
  },
  cardText: {
    fontSize: 18,
    color: textGray
  }
});

export default connect()(DeckView);
