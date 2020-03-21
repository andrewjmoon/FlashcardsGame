import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { Container, Button, Form } from 'native-base';
import { handleNewCardToDeck } from '../actions';
import TouchButton from '../components/TouchButton';
import { lightYellow, green, textGray, white } from '../utils/colors';
import { connect, useDispatch } from 'react-redux';

const AddCard = ({ navigation }) => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const dispatch = useDispatch();

  const deckId = navigation.getParam('title', 'undefined');

  const handleQuestion = value => {
    setQuestion(value);
  };

  const handleAnswer = value => {
    setAnswer(value);
  };

  const onSubmit = () => {
    const card = {
      question,
      answer
    };

    dispatch(handleNewCardToDeck(card, deckId));

    resetCard();
    navigation.goBack();
  };
  const resetCard = () => {
    setQuestion('');
    setAnswer('');
  };

  return (
    <View style={styles.container}>
      <Form>
        <TextInput
          style={styles.input}
          value={question}
          onChangeText={handleQuestion}
          placeholder="question"
        />
        <TextInput
          style={styles.input}
          value={answer}
          onChangeText={handleAnswer}
          placeholder="answer"
        />
      </Form>
      <TouchButton
        btnStyle={{ backgroundColor: green, borderColor: white }}
        txtStyle={{ color: white }}
        onPress={onSubmit}
      >
        Create Card
      </TouchButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: lightYellow,
    marginTop: 30
  },
  block: {
    marginBottom: 20
  },
  title: {
    fontSize: 32
  },
  input: {
    borderWidth: 1,
    borderColor: textGray,
    backgroundColor: white,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 5,
    fontSize: 20,
    height: 40,
    marginBottom: 20
  }
});

export default connect()(AddCard);
