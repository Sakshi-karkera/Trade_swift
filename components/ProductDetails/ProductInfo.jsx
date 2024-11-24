import { View, Text, Image } from 'react-native'
import React from 'react'
import Colors from '../../constants/Colors'
import Ionicons from '@expo/vector-icons/Ionicons';
import MarkFav from '../MarkFav';


export default function ProductInfo({ product }) {
    return (
        <View>
            <Image source={{ uri:product?.imageUrl }}
                style={{
                    width: '100%',
                    height: 530,
                    objectFit: 'cover',
                    backgroundColor:Colors.GRAY
                }}
            />
            <View style={{
                padding: 5,
                display:'flex',
                flexDirection:'row',
                marginLeft:15,
                alignItems:'center',
                justifyContent:'space-between',
                marginRight:10
            }}>
                <View>
                    <Text style={{
                        fontFamily: 'outfit-bold',
                        fontSize: 27
                    }}>{product.name}</Text>
                    <Text style={{
                        fontFamily: 'outfit',
                        fontSize: 16,
                        color: Colors.GRAY
                    }}>{product.address}</Text>
                </View>
                <View>
                    <MarkFav product={product}/>
                </View>

            </View>
        </View>
    )
}