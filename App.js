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
  View,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {launchImageLibrary} from 'react-native-image-picker';
import LinearGradient from 'react-native-linear-gradient';

const App = () => {
  const [open, setOpen] = useState(false);

  let userID = 10001;

  let [name, setName] = useState('');
  let [surname, setSurname] = useState('');
  let [fathername, setFathername] = useState('');
  const [birthday, setBirthday] = useState();
  const [birthdayText, setBirthdayText] = useState('Doğum tarixini seçin: ');
  let [school, setSchool] = useState('eeeeef');
  let [home, setHome] = useState('eeeeef');
  let [profilePicture, setProfilePicture] = useState('');
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
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          height: '50%',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'center',
          width: '100%',
          padding: 10,
        }}>
        <TouchableOpacity
          style={{
            zIndex: 2,
            elevation: Platform.OS === 'android' ? 50 : 0,

            backgroundColor: '#BFACE0',
            borderRadius: 100,
          }}
          onPress={() => {
            selectPicture();
          }}>
          <Image
            style={styles.profileImage}
            source={
              profilePicture === ''
                ? require('./src/images/camera-icon.png')
                : {uri: profilePicture}
            }
          />
        </TouchableOpacity>
        <LinearGradient
          colors={['#BFACE0', '#A084CA', '#645CAA']}
          style={styles.background}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View
              style={{
                flex: 1,
                flexDirection: 'column',
                zIndex: 1,
              }}>
              <TextInput
                style={styles.textInput}
                placeholder="Ad:"
                onChangeText={text => {
                  setName(text);
                }}
              />
              <TextInput
                style={styles.textInput}
                placeholder="Soyad:"
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
            </View>
            <View
              style={{
                flex: 1,
                height: '100%',
                justifyContent: 'flex-start',
                alignItems: 'flex-end',
                paddingTop: 10,
              }}>
              <TouchableOpacity onPress={() => setOpen(true)}>
                <Text style={styles.birthdayText}>{birthdayText}</Text>

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
            </View>
          </View>
          <View
            style={{
              backgroundColor: 'red',
              width: '100%',
              padding: 5,
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={{color: 'black', fontSize: 20}}>salam</Text>
          </View>
        </LinearGradient>
      </View>

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
    flex: 1,
    flexDirection: 'column',
    position: 'absolute',
    top: 100,
    zIndex: 1,
    width: '100%',
    height: 'auto',
    paddingRight: 5,
    paddingBottom: 5,
    paddingTop: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0,
    borderRadius: 20,
    shadowColor: '#645CAA',
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.48,
    shadowRadius: 11.95,
    elevation: 10,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 100,

    borderWidth: 1,
    shadowColor: '#645CAA',
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.48,
    shadowRadius: 11.95,
    elevation: 10,
  },
  textInput: {
    width: 180,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    borderColor: '#645CAA',
    fontsize: 16,
    alignSelf: 'center',
    color: 'black',
    fontWeight: 'bold',
    backgroundColor: 'white',
    paddingHorizontal: 15,
    marginVertical: 5,
    maxLength: 14,
    shadowColor: '#ffffff',
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.48,
    shadowRadius: 11.95,
    elevation: 15,
  },
  birthdayText: {
    fontSize: 16,
    color: 'black',
    backgroundColor: 'white',
    borderColor: '#645CAA',
    width: 180,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    padding: 5,
    paddingHorizontal: 10,
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
    backgroundColor: 'black',
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
