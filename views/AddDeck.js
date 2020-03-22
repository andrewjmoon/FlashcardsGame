import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  KeyboardAvoidingView
} from 'react-native';
import TouchButton from '../components/TouchButton';
import { white, lightYellow, textGray, blue } from '../utils/colors';
import { connect, useDispatch } from 'react-redux';
import { handleAddDeck } from '../actions';

const AddDeck = ({ navigation }) => {
  const [text, setText] = useState('');

  const dispatch = useDispatch();

  const handleSubmit = () => {
    const deck = {
      title: text,
      questions: []
    };

    dispatch(handleAddDeck(deck));
    resetDeck();

    navigation.navigate('DeckView', { title: deck.title });
  };
  const resetDeck = () => {
    setText('');
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={value => setText(value)}
        placeholder="Deck Name"
        onSubmitEditing={handleSubmit}
      />
      <TouchButton
        style={styles.title}
        btnStyle={{ backgroundColor: blue, borderColor: white }}
        txtStyle={{ color: white }}
        onPress={handleSubmit}
      >
        Create Deck
      </TouchButton>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: lightYellow
  },

  title: {
    textAlign: 'center',
    fontSize: 32,
    marginTop: 30,
    marginBottom: 40,
    padding: 20
  },
  input: {
    borderWidth: 1,
    borderColor: textGray,
    backgroundColor: white,
    textAlign: 'center',
    borderRadius: 5,
    fontSize: 20,
    height: 50,
    marginTop: 80
  }
});

export default connect()(AddDeck);
