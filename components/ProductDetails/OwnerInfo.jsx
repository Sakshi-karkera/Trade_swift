import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import Colors from '../../constants/Colors'
import Ionicons from '@expo/vector-icons/Ionicons';

export default function OwnerInfo({ product }) {
    return (

        <View style={styles.container}>
            <View style={{
                display:'flex',
                flexDirection:'row',
                gap:20,
                alignItems:'center'
            }}>
                <Image source={{ uri: product?.userImage }}
                    style={{
                        width: 50,
                        height: 50,
                        borderRadius: 99

                    }} />
                <View>
                    <Text style={{
                        fontFamily: 'outfit-medium',
                        fontSize: 17
                    }}>{product?.username}</Text>
                    <Text style={{
                        fontFamily: 'outfit',
                        color: Colors.GRAY
                    }}>Product Owner</Text>
                </View>
            </View>
            <Ionicons name="send" size={24} color="black" />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        display: "flex",
        flexDirection: "row",
        alignItems: 'center',
        gap: 20,
        borderWidth: 1,
        borderRadius: 15,
        padding: 10,
        margin: 2,
        backgroundColor: Colors.WHITE,
        justifyContent:'space-between'

    }
})