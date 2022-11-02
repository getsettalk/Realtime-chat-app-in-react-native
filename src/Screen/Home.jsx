import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = ({route,navigation}) => {

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('data', value)
    } catch (e) {
      console.log(e)
    }
  }

  
const getData = async () => {
  try {
    const value = await AsyncStorage.getItem('data')
   console.log('get',value)
  } catch(e) {
    // error reading value
    console.log('get Error',e)
  } 
}

getData();
  return (
    <View>
      <Text>Home</Text>
      <View>
        <TouchableOpacity
          onPress={()=>{
            console.log("Clicked")
            navigation.navigate('About')
            storeData("Sujeet kumar")
          }}
          style={styles.btn}
          >
          <Text> Click to Go about </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  btn:{
    backgroundColor:'green',
    padding:5
  }
})

export default Home