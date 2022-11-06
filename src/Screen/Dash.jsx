import { View, Text, ToastAndroid, TextInput, TouchableOpacity, Image, StyleSheet, useWindowDimensions, KeyboardAvoidingView, Platform } from 'react-native'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'react-native';
import Header from '../Navigation/Header';
import Msg from './Msg';
import { Alert } from 'react-native';
import { io } from 'socket.io-client'
import { ActivityIndicator } from 'react-native';

// connection with socket.io server at glitch.com
let totalUser = 0;

const socket = io('https://sudsy-yummy-wisteria.glitch.me/');



const Dash = () => {


    const [userNumber, setuserNumber] = useState(totalUser)

    const { width } = useWindowDimensions();

    var data = [
        {
            "name": "Authorised",
            "msg": "Welcome !",
            "type": "2",
            "time": "Now"
        }
    ]
    const [chat, setChat] = useState(data) // all chat data store in array
    const [typedMessge, settypedMessge] = useState('')

    const sendImg = require('../../assets/icon/paper-plane.png')
    // get user Name saved in async storage
    const [user, setUser] = useState(null); // local user name

    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem('@uname')
            if (value !== null) {
                // console.log(value)
                setUser(value)
                ToastAndroid.show(value, ToastAndroid.SHORT)
            }
        } catch (e) {
            console.log('Error on reading user Name', e)
            ToastAndroid.show(e, ToastAndroid.SHORT)
        }
    }

    function formatAMPM(date) { // time format
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    }
    // first time set data
    useEffect(() => {
        // setChat(data)
        getData(); // read user name
    }, [])
    // listen other user Message 

    useMemo(() => {
        socket.on('chatMessage2', function (otherUserDAta) {
            const newChatDatas = {
                "name": otherUserDAta.name,
                "msg": otherUserDAta.msg,
                "type": otherUserDAta.type,
                "time": otherUserDAta.time
            }
            setChat(oldArray => [...oldArray, newChatDatas])
            console.log("|otherUserDAta", otherUserDAta)

        })


    }, [])
    socket.on('status', function (reced) {
        console.log("connnected with server", reced)
        totalUser = reced;
        setuserNumber(reced)
    })


    const sendMessage = useCallback(() => {
        if (typedMessge !== '') {
            const newChatData = {
                "name": user,
                "msg": typedMessge,
                "type": "1",
                "time": formatAMPM(new Date)
            }
            socket.emit('chatMessage1', {
                "name": user,
                "msg": typedMessge,
                "type": "2",
                "time": formatAMPM(new Date)
            });
            setChat(oldArray => [...oldArray, newChatData])
            settypedMessge('')
        }
        console.log(" im chatMess1")
    }, [typedMessge])


    const allContent = <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={
        Platform.select({
            ios: () => 0,
            android: () => -55
        })()} style={{ backgroundColor: 'white' }}>
        <View >

            <Header totalUser={userNumber} thisUser={user} />
            {/* chat Box  */}
            <Msg data={chat} />

            {/* input text of msg  */}
            <View style={{
                display: 'flex',
                flexDirection: 'row',
                height: 19,
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 1,
                },
                shadowOpacity: 0.20,
                shadowRadius: 1.41,

                elevation: 2,
            }}>
                <TextInput style={[styles.TextBox, { width: width - 52, paddingLeft: 5 }]}
                    placeholder="Write Messages here"
                    multiline={true}
                    defaultValue={typedMessge}
                    onChangeText={(text) => settypedMessge(text)}
                />
                <View>
                    <TouchableOpacity style={{
                        backgroundColor: (typedMessge !== '' ? '#80ffaa' : '#ff6666'),
                        width: 50,
                        height: 50,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 50,
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 9,
                        },
                        shadowOpacity: 0.48,
                        shadowRadius: 11.95,

                        elevation: 18,
                    }} onPress={sendMessage}>
                        <Image source={sendImg} style={styles.sendBtn} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    </KeyboardAvoidingView>

    return (allContent)
}
const styles = StyleSheet.create({
    TextBox: {
        width: '90%',
        height: 48,
        backgroundColor: 'white',
        borderBottomColor: 'gray',
        borderTopColor: 'gray',
        borderBottomWidth: 1,
        borderTopWidth: 1,
        backgroundColor: '#f2f2f3',
        borderRadius: 20,
        fontSize: 16,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    sendBtn: {
        width: 30,
        height: 30,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    }
})

export default memo(Dash)