import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, StatusBar, TextInput, useColorScheme } from 'react-native'
import React, { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import { Alert } from 'react-native';

const Home = ({ route, navigation }) => {

  const isDarkMode = useColorScheme() === 'dark';
  const Source = require('../../assets/Images/Frame9.png');
  const [userName, setUserName] = useState('');
  // console.log(userName)
  const storeData = async (value) => {
    try {
      if (value !== '') {
        await AsyncStorage.setItem('@uname', value);
        navigation.navigate('Dash')
      } else {
        Alert.alert("Name is Required:", "Please Enter Your Valid User Name.")
      }
    } catch (e) {
      console.log(e)
      Alert.alert("Faild", e)
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar animated={true} translucent backgroundColor='transparent' />
      <ImageBackground source={Source} resizeMode='cover' style={styles.bg}>
        <LinearGradient
          colors={['#0F2027', '#203A43', '#2C5364']}
          start={{ x: 0.5, y: 1.2 }}
          end={{ x: 0.1, y: 0.5 }}
          style={styles.box}
        >


          <View style={styles.box}>
            {/* text input  */}
            <View >
              <TextInput placeholder='Enter your valid name'
                maxLength={15}
                style={styles.input} defaultValue={userName}
                onChangeText={(text) => setUserName(text)}
                placeholderTextColor={isDarkMode ? "#001C30" : "#777777"} />
            </View>

            <TouchableOpacity activeOpacity={'1'} onPress={() => {
              console.log("Click to go")
              storeData(userName)
            }}>
              <LinearGradient
                colors={['#ff9966', '#ff5e62']}
                start={{ x: 0.5, y: 1.2 }}
                end={{ x: 0.1, y: 0.5 }}
                style={styles.btn}
              >
                <Text style={styles.continue}>Continue</Text>
              </LinearGradient>
            </TouchableOpacity>
            <View>
              <Text style={{ marginTop: 25, color: '#8c8c8c' }}>Never Share Your Secret to Strangers</Text>
            </View>
          </View>


        </LinearGradient>
      </ImageBackground>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  bg: {
    flex: 1
  },
  box: {
    // backgroundColor:'red',
    width: '100%',
    height: 270,
    position: 'absolute',
    bottom: 0,
    left: 0,
    borderTopRightRadius: 50,
    display: 'flex',
    // justifyContent:'center',
    alignItems: 'center'
  },
  input: {
    backgroundColor: '#e6f7ff',
    padding: 5,
    width: 250,
    marginTop: 20,
    borderRadius: 0,
    paddingBottom: 7,
    fontSize: 17,
    borderBottomColor: '#000046',
    borderBottomWidth: 3.3,
    color: "#001C30"

  },
  btn: {
    // backgroundColor:'white',
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 30,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  continue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white'
  }

})

export default Home