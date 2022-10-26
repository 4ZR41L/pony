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

const App = () => {
  let userID = 10001;
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
    registrationDate: registrationDate,
  };

  let userData = {
    personalDetails: {
      name: name,
      surname: surname,
      fathername: fathername,
      birthdate: birthDate,
      profilepicture: profilePicture,
    },
    locationDetails: {
      school: school,
      home: home,
    },
    registrationDetails: deviceDetails,
  };

  const completeRegistration = () => {
    if (name !== '' && surname !== '' && fathername !== '') {
      //register the user

      const reference = database().ref('/Users');

      //read user count to identify userID

      reference.once('value').then(snapshot => {
        userID = snapshot.numChildren() + 10001;

        //save new user to database
        database()
          .ref('Users/' + userID)
          .set(userData)
          .then(console.log(`New user ${userID} is data saved!`));
      });
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
          completeRegistration();
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
