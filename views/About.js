import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { lightYellow } from '../utils/colors';

const About = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Welcome to the About Page. The purpose of the Flashcard Game is for the
        user to answer true or false questions for any topic the user chooses.
        The user can Add a Deck, Delete a Deck, or Reset to the Original Decks.
        The User can also click on a certain Deck and will be directed to the
        different options: Add Card, Start Quiz, Delete Deck, Reset Decks. The
        User can automatically reset the Decks to the original number pressing
        the Reset Decks button. However, if the user deletes all of the Decks
        then the user should reload the mobile app and then press the Reset
        button on the bottom navigation tab to reset to the original decks.
      </Text>
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
    fontSize: 25,
    textAlign: 'center'
  }
});

export default About;
