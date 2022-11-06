import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from './src/Screen/Home'
import Dash from './src/Screen/Dash'
import SplashScreen from 'react-native-splash-screen'

const Stack = createNativeStackNavigator();

const App = () => {
  // useEffect(()=>{
  //   setTimeout(() => {
  //     setShowSplash(false)
  //   }, 4000);
  // },[])
  useEffect(()=>{
    SplashScreen.hide();
  },[])
  return (
  <NavigationContainer>
   <Stack.Navigator  screenOptions={{
    headerShown:false
   }}>
   <Stack.Screen name='Home' component={Home} />
   <Stack.Screen name='Dash' component={Dash} />
 
   </Stack.Navigator>
  </NavigationContainer>
  )
}

export default App