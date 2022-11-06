import { View, Text, StyleSheet, StatusBar, ImageBackground } from 'react-native'
import React from 'react'



const Splash = () => {
    const source = require('../../assets/splash/splash.png')
    return (
        <View style={styles.container}>
            <StatusBar animated={true} translucent backgroundColor='transparent'/>
             <ImageBackground source={source} resizeMode='cover' style={styles.image} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black'
    },
    image: {
        flex: 1,
        justifyContent: "center"
      },
})
export default Splash