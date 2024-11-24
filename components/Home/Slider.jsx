import { View, Text, FlatList, StyleSheet, Image, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import {db} from './../../config/FirebaseConfig'
import Colors from '../../constants/Colors';


export default function Slider() {
    const[sliderList,setSliderList]=useState([]);
    useEffect(()=>{
        GetSliders();
    },[])

    const GetSliders=async()=>{
        setSliderList([]);
        const snapshot=await getDocs(collection(db,'Sliders'));
        snapshot.forEach((doc)=>{
            console.log(doc.data());
            setSliderList(sliderList=>[...sliderList,doc.data()])
        })
    }
  return (
    <View style={styles.sliderContainer}>
      <FlatList
      horizontal={true}
      showsHorizontalScrollIndicator={false}
        data={sliderList}
        renderItem={({item,index})=>(
            <View>
                <Image source={{uri:item?.imageUrl}}
                style={styles.sliderImage}/>
            </View>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
    sliderContainer: {
        marginTop: 15,
    },
    sliderImage:{
        width: Dimensions.get('screen').width * 0.8,
        height: 170,
        borderRadius: 15,
        marginRight: 15
    }
})
