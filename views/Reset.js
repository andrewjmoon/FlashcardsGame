import React, { useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { blue, gray } from '../utils/colors';
import { connect, useDispatch } from 'react-redux';
import { handleResetDeck } from '../actions';
import { lightYellow, textGray, white, green } from '../utils/colors';

const Reset = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(handleResetDeck());
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}> Reset </Text>
      <View style={styles.block}>
        <Text style={styles.blockText}>Application has been reset.</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: lightYellow,
    alignItems: 'center'
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
  title: {
    fontSize: 28
  },
  blockText: {
    fontSize: 18,
    color: textGray
  }
});

export default connect()(Reset);
