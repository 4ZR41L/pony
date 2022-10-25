import React from 'react';
import {
  SafeAreaView,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
} from 'react-native';

const Register = () => {
  return (
    <SafeAreaView
      style={styles.background}
      onPress={() => {
        'clicked';
      }}>
      <Image style={styles.profileImage} />
      <TextInput style={styles.textInput} placeholder="Adı:" />
      <TextInput style={styles.textInput} placeholder="Soyadı:" />
      <TextInput style={styles.textInput} placeholder="Ata adı:" />
      <TouchableOpacity
        style={styles.btnComplete}
        onPress={() => {
          alert('clicked');
        }}>
        <Text style={styles.btnCompleteText}>Tamamla</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
export default Register;

const styles = StyleSheet.create({
  background: {
    backgroundColor: 'orange',
    flex: 1,
    opacity: 0.8,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: 'white',
    marginVertical: 20,
  },
  textInput: {
    width: 200,
    fontsize: 20,
    color: 'black',
    fontWeight: 'bold',
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'white',
    padding: 10,
    marginVertical: 10,
    maxLength: 14,
    minim,
  },
  btnComplete: {
    position: 'absolute',
    bottom: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
    borderColor: 'green',
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: 'green',
  },
  btnCompleteText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
});
