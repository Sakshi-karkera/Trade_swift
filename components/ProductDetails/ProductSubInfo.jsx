import { View, Text } from 'react-native'
import React from 'react'
import Entypo from '@expo/vector-icons/Entypo';
import Colors from '../../constants/Colors';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function ProductSubInfo({product}) {
  return (
    <View style={{
        paddingHorizontal:20,
        paddingBottom:1
    }}>
      <View style={{
        display:'flex',
        flexDirection:"row"
      }}>
        <View style={{
            display:'flex',
            flexDirection:'row',
            alignItems:'center',
            backgroundColor:Colors.WHITE,
            padding:10,
            margin:5,
            borderRadius:8,
            gap:10,
            flex:1
        }}>
        <Entypo name="location" size={30} color="black" />
        <View style={{
            flex:1
        }}>
            <Text style={{
                fontFamily:'outfit',
                fontSize:16,
                color:Colors.GRAY
            }}>Location</Text>
            <Text style={{
                fontFamily:'outfit-medium',
                fontSize:20
            }}>{product.location}</Text>
        </View>
        </View>

        <View style={{
            display:'flex',
            flexDirection:'row',
            alignItems:'center',
            backgroundColor:Colors.WHITE,
            padding:10,
            margin:5,
            borderRadius:8,
            gap:10,
            flex:1
        }}>
        <MaterialIcons name="branding-watermark" size={30} color="black" />
        <View>
            <Text style={{
                fontFamily:'outfit',
                fontSize:16,
                color:Colors.GRAY
            }}>Brand</Text>
            <Text style={{
                fontFamily:'outfit-medium',
                fontSize:20,
                
            }}>{product.brand}</Text>
            

        </View>
        </View>
      </View>
      <View style={{
        display:'flex',
        flexDirection:"row"
      }}>
        <View style={{
            display:'flex',
            flexDirection:'row',
            alignItems:'center',
            backgroundColor:Colors.WHITE,
            padding:10,
            margin:5,
            borderRadius:8,
            gap:10,
            flex:1
        }}>
        <Entypo name="location" size={30} color="black" />
        <View>
            <Text style={{
                fontFamily:'outfit',
                fontSize:16,
                color:Colors.GRAY
            }}>Location</Text>
            <Text style={{
                fontFamily:'outfit-medium',
                fontSize:20
            }}>{product.location}</Text>
        </View>
        </View>

        <View style={{
            display:'flex',
            flexDirection:'row',
            alignItems:'center',
            backgroundColor:Colors.WHITE,
            padding:10,
            margin:5,
            borderRadius:8,
            gap:10,
            flex:1
        }}>
        <Ionicons name="pricetag" size={24} color="black" />
        <View >
            <Text style={{
                fontFamily:'outfit',
                fontSize:16,
                color:Colors.GRAY
            }}>Price</Text>
            <Text style={{
                fontFamily:'outfit-medium',
                fontSize:20,
                
            }}>{product.price}</Text>
            

        </View>
        </View>
      </View>
    </View>
  )
}