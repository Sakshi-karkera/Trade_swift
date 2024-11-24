import { View, Text, Pressable } from 'react-native'
import React, { useState } from 'react'
import Colors from '../../constants/Colors';

export default function About({ product }) {

    const [readMore, setReadMore] = useState(true);

    return (
        <View style={{
            padding: 15,
        }}>
            <Text style={{
                fontFamily: 'outfit-medium',
                fontSize: 20,
            }}>About</Text>

            <Text numberOfLines={readMore ? 3 : 30} style={{
                fontFamily: 'outfit',
                fontSize: 14,
                padding: 2
            }}>
                {product.about}
            </Text>

            <Pressable onPress={() => setReadMore(!readMore)}>
                <Text style={{
                    fontFamily: 'outfit-medium',
                    fontSize: 14,
                    color: Colors.SECONDARY
                }}>
                    {readMore ? 'Read More...' : 'Show Less...'}
                </Text>
            </Pressable>
        </View>
    )
}
