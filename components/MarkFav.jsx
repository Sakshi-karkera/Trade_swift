import { View, Text, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useUser } from '@clerk/clerk-expo';
import Shared from '../Shared/Shared';

export default function MarkFav({ product,color='black' }) {

    const { user } = useUser();
    const [favList, setFavList] = useState();
    useEffect(() => {
        user && GetFav();
    }, [user])

    const GetFav = async () => {
        const result = await Shared.GetFavList(user);
        console.log(result);
        setFavList(result?.favorites ? result?.favorites : [])
    }

    const AddToFav=async()=>{
        const favResult=favList;
        favResult.push(product?.id)
        await Shared.UpdateFav(user,favResult);
        GetFav();
    }

    const removeFromFav=async()=>{
        const favResult=favList.filter(item=>item!=product.id);
        await Shared.UpdateFav(user,favResult);
        GetFav();
    }

    return (
        <View>

            {favList?.includes(product.id) ? <Pressable onPress={removeFromFav}>
                <Ionicons name="heart" size={30} color="red" />
            </Pressable> :
                <Pressable onPress={()=>AddToFav()}>
                    <Ionicons name="heart-outline" size={30} color={color} />
                </Pressable>}
        </View>
    )
}