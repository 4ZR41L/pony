import React, {useState} from 'react';
import database from '@react-native-firebase/database';
import {
  SafeAreaView,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
  Platform,
} from 'react-native';

const reference = database
  .database(
    'https://pony-98eb5-default-rtdb.europe-west1.firebasedatabase.app/',
  )
  .ref('/Users/10001')
  .once('value')
  .then(snapshot => {
    console.log(snapshot.val);
  });

const App = () => {
  let userID;
  let [name, setName] = useState('');
  let [surname, setSurname] = useState('');
  let [fathername, setFathername] = useState('');
  let [birthDate, setBirthDate] = useState('');
  let [school, setSchool] = useState('');
  let [home, setHome] = useState('');
  let [profilePicture, setProfilePicture] = useState('');
  let registrationDate = new Date().toLocaleString();
  let deviceDetails = {
    os: Platform.OS,
    osVersion: Platform.Version,
    brand: Platform.__constants.Brand,
  };
  let userData = {
    name: name,
    surname: surname,
    fathername: fathername,
    birthdate: birthDate,
    school: school,
    home: home,
    profilepicture: profilePicture,
    registrationDate: registrationDate,
    deviceDetails: deviceDetails,
  };

  const completeRegistration = () => {
    if (
      name !== '' &&
      surname !== '' &&
      fathername !== '' &&
      birthDate !== '' &&
      school !== '' &&
      home !== '' &&
      profilePicture !== ''
    ) {
      //register the user
      Alert.alert('registration completed: \n ' + userData);
    } else {
      if (name === '' || name.length < 3) {
        Alert.alert('Xəta!', 'Məktəblinin adını daxil edin.');
      } else if (surname === '' || surname.length < 5) {
        Alert.alert('Məktəblinin soyadını daxil edin.');
      } else if (fathername === '' || fathername.length < 3) {
        Alert.alert('Məktəblinin ata adını daxil edin.');
      } else if (birthDate === '' || birthDate.length < 7) {
        Alert.alert('Məktəblinin doğum tarixini daxil edin.');
      } else if (school === '' || school.length < 5) {
        Alert.alert('Məktəblinin gedəcəyi məktəbi seçin.');
      } else if (home === '' || home.length < 5) {
        Alert.alert('Məktəblinin yaşadığı ünvanı seçin.');
      } else if (profilePicture === '') {
        Alert.alert('Məktəblinin şəklini seçin.');
      }
    }
  };

  return (
    <SafeAreaView style={styles.background}>
      <Image style={styles.profileImage} />
      <TextInput
        style={styles.textInput}
        placeholder="Adı:"
        onChangeText={text => {
          setName(text);
        }}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Soyadı:"
        onChangeText={text => {
          setSurname(text);
        }}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Ata adı:"
        onChangeText={text => {
          setFathername(text);
        }}
      />
      <TouchableOpacity
        style={styles.btnComplete}
        onPress={() => {
          console.log(Platform);
        }}>
        <Text style={styles.btnCompleteText}>Tamamla</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
export default App;

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
  },
  btnComplete: {
    position: 'absolute',
    bottom: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: 'transparent',
    elevation: 20,
    shadowColor: 'white',
    shadowOffset: 10,
    shadowOpacity: 10,
    shadowBlur: 10,
    shadowRadius: 10,
    shadowOffsetX: 10,
    shadowRoot: 10,
  },
  btnCompleteText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
});
