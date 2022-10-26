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
import DatePicker from 'react-native-date-picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const App = () => {
  const [open, setOpen] = useState(false);
  let a = new Date();

  let userID = 10001;

  let [name, setName] = useState('');
  let [surname, setSurname] = useState('');
  let [fathername, setFathername] = useState('');
  const [birthday, setBirthday] = useState();
  const [birthdayText, setBirthdayText] = useState('Doğum tarixini seçin: ');
  let [school, setSchool] = useState('eeeeef');
  let [home, setHome] = useState('eeeeef');
  let [profilePicture, setProfilePicture] = useState();
  let registrationDate = new Date().toLocaleString();
  let deviceDetails = {
    os: Platform.OS,
    osVersion: Platform.Version,
    brand: Platform.__constants.Brand,
    registrationDate: registrationDate,
  };

  //select profile picture and when complete the registration this image will be upload to server

  const selectPicture = async () => {
    await launchImageLibrary({maxHeight: 300, maxWidth: 300}, response => {
      if (!response.didCancel) {
        setProfilePicture(response.assets[0].uri);
      }
    });
  };

  let userData = {
    personalDetails: {
      name: name,
      surname: surname,
      fathername: fathername,
      birthdate: birthday,
      profilepicture: profilePicture,
    },
    locationDetails: {
      school: school,
      home: home,
    },
    registrationDetails: deviceDetails,
  };

  const completeRegistration = () => {
    if (
      name !== '' &&
      surname !== '' &&
      fathername !== '' &&
      birthday !== undefined &&
      profilePicture !== undefined
    ) {
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
      } else if (birthday === undefined) {
        Alert.alert('Məktəblinin doğum tarixini daxil edin.');
      } else if (school === '' || school.length < 5) {
        Alert.alert('Məktəblinin gedəcəyi məktəbi seçin.');
      } else if (home === '' || home.length < 5) {
        Alert.alert('Məktəblinin yaşadığı ünvanı seçin.');
      } else if (profilePicture === undefined) {
        Alert.alert('Məktəblinin şəklini seçin.');
      }
    }
  };

  return (
    <SafeAreaView style={styles.background}>
      <TouchableOpacity
        onPress={() => {
          selectPicture();
        }}>
        <Image style={styles.profileImage} />
      </TouchableOpacity>

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
      <TouchableOpacity onPress={() => setOpen(true)}>
        <Text style={{fontSize: 20, color: 'white'}}>{birthdayText}</Text>
        <DatePicker
          modal
          mode="date"
          open={open}
          date={new Date()}
          confirmText={'Seç'}
          cancelText={'Bağla'}
          textColor={'orange'}
          onConfirm={date => {
            let customDateFormat =
              date.getDate() +
              '-' +
              (date.getMonth() + 1) +
              '-' +
              date.getFullYear();
            setBirthday(customDateFormat);
            setBirthdayText(customDateFormat);

            setOpen(false);
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
      </TouchableOpacity>
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
