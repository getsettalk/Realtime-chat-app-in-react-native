import { View, Text, StyleSheet, StatusBar, Image, TouchableOpacity } from 'react-native'
import React, { memo } from 'react'

const Header = ({totalUser,thisUser}) => {
    // console.log(totalUser)
    // const volume = require('../../assets/icon/volume.png')
    // const mute = require('../../assets/icon/mute.png')
    const team = require('../../assets/icon/team.png')
    // const user = require('../../assets/icon/user.png')
    return (
        <View style={styles.headerBox}>
            <StatusBar backgroundColor={'#000033'} animated={true} translucent={false} showHideTransition={'slide'} />
            <View style={[{ display: 'flex', flexDirection: 'column' }]}>
                <Text style={[styles.text, { fontSize: 22.5, fontWeight: 'bold', letterSpacing: 0.9 }]}>Vchat</Text>
                <Text style={[styles.text, { color: "#b3ffb1", letterSpacing: 0.035, width: 150,textTransform:'capitalize'}]}>{thisUser} </Text>
            </View>
            <View style={styles.dflex}>
             
                <View>
                    <TouchableOpacity style={{display:'flex',flexDirection:'row',justifyContent:'space-around',alignItems:'center'}}>
                        <Image source={team} style={[styles.icon,{width:27,height:27}]} />
                        <Text style={[styles.text,{paddingLeft:1.28,color:'#99ff99'}]}>{totalUser}</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    headerBox: {
        width: '100%',
        height: 55,
        backgroundColor: '#000033',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 5
    },
    text: {
        color: 'white'
    },
    icon: {
        width: 20,
        height: 20,
        backgroundColor: 'white',
        borderRadius: 50,
        // padding: 8
    },
    dflex: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        flexDirection: 'row',
        width: '25%'
    }

})
export default memo(Header)