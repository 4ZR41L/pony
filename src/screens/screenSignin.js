import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import LottieView from 'lottie-react-native';
const Register = () => {
  return (
    <SafeAreaView style={styles.background}>
      <Text style={{fontSize: 40, fontWeight: 'bold'}}>Pony</Text>
      <Text style={{fontSize: 30, fontWeight: 'bold'}}>School Transport</Text>
      <View style={{width: '100%', height: 300}}>
        <LottieView
          source={require('../animations/bus-transport.json')}
          autoPlay
          loop
        />
      </View>

      <View
        style={{
          width: '100%',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TextInput
          style={{
            width: 'auto',
            height: 'auto',
            textAlign: 'center',
            color: 'white',
            fontSize: 30,
            padding: 12,
            borderWidth: 4,
            borderColor: 'orange',
            borderRadius: 100,
            backgroundColor: 'red',
            shadowColor: '#171717',
            shadowOffset: {width: -2, height: 4},
            shadowOpacity: 0.2,
            shadowRadius: 3,
          }}
          keyboardType={'phone-pad'}
          maxLength={10}
          placeholder={'mobil nömrə'}
          placeholderTextColor={'#deccc5'}
        />
        <TouchableOpacity
          style={{
            borderWidth: 4,
            borderColor: 'orange',
            borderRadius: 100,
            paddingHorizontal: 25,
            paddingVertical: 2,
            margin: 20,
          }}>
          <Text
            style={{
              fontSize: 30,
              fontWeight: '800',
              color: 'orange',
              letterSpacing: 5,
            }}>
            Giriş
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Register;
