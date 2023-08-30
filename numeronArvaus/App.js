import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';

export default function App() {
  const [targetNumber, setTargetNumber] = useState(Math.floor(Math.random() * 100) + 1);
  const [guess, setGuess] = useState('');
  const [feedback, setFeedback] = useState('');
  const [guessCount, setGuessCount] = useState(0);

  const makeGuess = () => {
    const parsedGuess = parseInt(guess);
    if (isNaN(parsedGuess)) {
      setFeedback('Syötä numero ensin!');
    } else {
      setGuessCount(guessCount + 1);
      if (parsedGuess === targetNumber) {
        Alert.alert(`You guessed the number in ${guessCount} guesses.`);
      } else if (parsedGuess < targetNumber) {
        setFeedback('Your guess is too low.');
      } else {
        setFeedback('Your guess is too high.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text>Guess a number between 1 and 100</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setGuess(text)}
        value={guess}
        keyboardType="numeric"
      />
      <Button title="Make guess" onPress={makeGuess} />
      <Text>{feedback}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    width: 50,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
});