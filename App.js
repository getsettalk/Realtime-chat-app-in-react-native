import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from './src/Screen/Home'
import About from './src/Screen/About'
const Stack = createNativeStackNavigator();
const App = () => {
  return (
  <NavigationContainer>
   <Stack.Navigator initialRouteName='Home'>
   <Stack.Screen name='Home' component={Home} />
    <Stack.Screen name='About' component={About} />
   </Stack.Navigator>
  </NavigationContainer>
  )
}

export default App