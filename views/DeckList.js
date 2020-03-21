import React, { useEffect } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { connect, useDispatch, useSelector } from 'react-redux';
import { handleInitialData } from '../actions';
import { darkBlue, textGray, lightYellow } from '../utils/colors';

const DeckList = ({ navigation }) => {
  const dispatch = useDispatch();
  const { decks } = useSelector(decks => ({
    decks
  }));
  useEffect(() => {
    dispatch(handleInitialData());
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <Text style={styles.title}> Flashcards Game</Text>

        {decks &&
          Object.values(decks).map(deck => {
            return (
              <TouchableOpacity
                key={deck.title}
                onPress={() =>
                  navigation.navigate('DeckView', { title: deck.title })
                }
              >
                <View style={styles.deckContainer}>
                  <View>
                    <Text style={styles.deckText}>{deck.title}</Text>
                  </View>
                  <View>
                    <Text style={styles.cardText}>
                      {deck.questions.length} cards
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}

        <View style={{ marginBottom: 30 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: lightYellow,
    padding: 20
  },
  title: {
    fontSize: 40,
    textAlign: 'center',
    marginBottom: 16,
    color: darkBlue
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
    color: darkBlue
  }
});

export default connect()(DeckList);
