import React from 'react';
import {SafeAreaView, View, Text, StyleSheet} from 'react-native';

const Home = () => {
  return (
    <SafeAreaView style={styles.background}>
      <View>
        <Text style={styles.text}>Home Screen</Text>
      </View>
    </SafeAreaView>
  );
};
export default Home;

const styles = StyleSheet.create({
  background: {
    backgroundColor: 'orange',
  },
  text: {
    fontSize: 30,
  },
});
