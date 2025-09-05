import React, { useState } from 'react';
import type { JSX } from 'react';
import { StyleSheet, Text, View, Image, ImageSourcePropType, Pressable } from 'react-native';
// ✅ Correct for Expo Go
import * as Haptics from "expo-haptics";

// Dice images mapped dynamically
const diceImages: Record<number, ImageSourcePropType> = {
  1: require("../assets/images/One.png"),
  2: require("../assets/images/Two.png"),
  3: require("../assets/images/Three.png"),
  4: require("../assets/images/Four.png"),
  5: require("../assets/images/Five.png"),
  6: require("../assets/images/Six.png"),
};

const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

type DiceProps = {
  imageUrl: ImageSourcePropType;
};

const Dice = ({ imageUrl }: DiceProps): JSX.Element => (
  <Image style={styles.diceImage} source={imageUrl} />
);

export default function Index(): JSX.Element {
  const [diceNumber, setDiceNumber] = useState(1);

  const rollDiceOnTap = () => {
    const randomNumber = Math.floor(Math.random() * 6) + 1;
    setDiceNumber(randomNumber);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

  };

  return (
    <View style={styles.container}>
      <Dice imageUrl={diceImages[diceNumber]} />
      <Pressable onPress={rollDiceOnTap} style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}>
        <Text style={styles.rollDiceBtnText}>Roll the Dice</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1b1b1b',
    alignItems: 'center',
    justifyContent: 'center',
  },
  diceImage: {
    width: 200,
    height: 200,
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#5DA3FA',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  buttonPressed: {
    backgroundColor: '#4A8DE8',
  },
  rollDiceBtnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
});
