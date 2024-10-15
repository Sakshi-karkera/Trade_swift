import { View, Text } from 'react-native'
import React from 'react'
import Header from '../../components/Home/Header'
import Slider from '../../components/Home/Slider'
import ListByCategory from '../../components/Home/ListByCategory'


export default function home() {
  return (
    <View style={{
      padding:20,
      marginTop:20
    }}>
      {/* Header*/}
      <Header/>
      {/* Slider */}
      <Slider/>
      {/*Petlist + Category */}
      <ListByCategory/>
      
      {/* Add New Pet Option */}
    </View>
  )
}