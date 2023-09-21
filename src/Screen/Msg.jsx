import { View, Text, StyleSheet, FlatList, useWindowDimensions, Platform, useColorScheme } from 'react-native'
import React, { memo } from 'react'

const Msg = (props) => {
    //    console.log("props.data",211)
    const isDarkMode = useColorScheme() === 'dark';
    const { height } = useWindowDimensions();
    const scrHeight = height
    function CMESSAGE(msg) {
        return (
            <View style={styles.Comebox}>
                <View style={[styles.dFlex, { width: 150 }]}>
                    <Text style={{ fontSize: 14, color: '#97979b', letterSpacing: 0.3, textTransform: 'capitalize' }}>{msg.name}</Text>
                    {/* <Text style={{ fontSize: 12, color: '#97979b' }}>{msg.time}</Text> */}
                </View>
                <View style={{ alignItems: 'baseline' }}>
                    <Text style={styles.ComeSMS}>{msg.msg}</Text>
                    <Text style={{ fontSize: 12, color: '#97979b' }}>{msg.time}</Text>

                </View>
            </View>
        )
    }
    function OMESSAGE(msg) {
        return (
            <View style={styles.OutBox}>
                <View>
                    <Text style={{ fontSize: 12, color: '#97979b' }}>{msg.time}</Text>
                </View>
                <View style={{ alignItems: 'baseline' }}>
                    <Text style={styles.outMsg}>
                        {msg.msg}
                    </Text>
                </View>
            </View>
        )
    }

    return (
        <View >

            <FlatList
                // initialScrollIndex={props.data.length - 1}
                inverted
                contentContainerStyle={{ flexDirection: 'column-reverse' }}
                style={[styles.ScrBox, { backgroundColor: isDarkMode ? '#1d1d1d' : "#f7f7f7" }]}
                data={props.data}
                showsVerticalScrollIndicator={false}

                renderItem={(msg) => {
                    return (msg.item.type == 1 ? OMESSAGE(msg.item) : CMESSAGE(msg.item))
                }}

            />
        </View>

    )
}

const styles = StyleSheet.create({
    ScrBox: {
        display: 'flex',
        width: '100%',
        height: '86.8%',
        backgroundColor: 'white',
        paddingVertical: 5,
        paddingHorizontal: 5
    },
    // Coiming sms 
    Comebox: {
        width: 'auto',
        maxWidth: 220,
        height: 'auto',
        marginVertical: 5,
        marginBottom: 9

    },
    dFlex: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    ComeSMS: {
        width: 'auto',
        maxWidth: 220,
        backgroundColor: '#8f8be8',
        padding: 5,
        borderRadius: 9,
        fontSize: 18,
        color: '#fff',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    },
    // outgoing sms
    OutBox: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignSelf: 'flex-end',
        width: 'auto',
        maxWidth: 220,
        height: 'auto',
        // backgroundColor:'#e6e5e5',
        marginVertical: 4,
        marginBottom: 5,
        padding: 2,
        alignItems: 'flex-end',
        // float:'right'
    },
    outMsg: {
        backgroundColor: '#e9eafd',
        color: '#4b4b4e',
        padding: 4,
        borderRadius: 9,
        fontSize: 17,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    }
});
export default memo(Msg)