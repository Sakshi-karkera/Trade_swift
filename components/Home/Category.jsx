import { View, Text, FlatList, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from './../../config/FirebaseConfig'
import { Image } from 'react-native';
import Colors from './../../constants/Colors'
import { TouchableOpacity } from 'react-native';


export default function Category({category}) {

  const[categoryList,setCategoryList]=useState([]);
  const[selectedCategory,setSelectedCategory]=useState('Clothing');

  useEffect(()=>{
    GetCategories();
  },[])
/**
 * Used to Get Category List from database
 */
  const GetCategories = async () => {
    setCategoryList([]);
    const snapshot = await getDocs(collection(db, 'Category'));
    snapshot.forEach((doc) => {
      setCategoryList(categoryList=>[...categoryList,doc.data()])
    })
  }
  return (
    <View style={{
      marginTop: 20
    }}>
      <Text style={{
        fontFamily: "outfit-medium",
        fontSize: 20
      }}>Category</Text>

      <FlatList 
      horizontal // This makes the list scroll horizontally
      showsHorizontalScrollIndicator={false} // Hide the scroll indicator if desired
      data={categoryList}
      keyExtractor={(item, index) => item.name + index} // Add unique key for each item
      renderItem={({item,index})=>(
        <TouchableOpacity 
        onPress={()=>{
          setSelectedCategory(item.name);
          category(item.name)
        }}
        style={{
          flex:1
        }}>
          <View style={[styles.container,
            selectedCategory==item.name&&styles.selectedCategoryContainer]}>
                <Image source={{uri:item?.imageUrl}}
                style={{
                  width:80,
                  height:80,
                  borderRadius:99,
                  alignItems:'center',
                  top:2.5

                }}/>
            </View>
            <Text style={{
              textAlign:'center',
              fontFamily:'outfit'
            }}>{item?.name}</Text>
        </TouchableOpacity>
      )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    backgroundColor:Colors.LIGHT_PRIMARY,
    alignItems:'center',
    borderWidth:0,
    borderRadius:80,
    borderColor:Colors.PRIMARY,
    margin:5,
    width:85,
    height:85,
  },
  selectedCategoryContainer:{
    backgroundColor:Colors.SECONDARY,
    borderColor:Colors.SECONDARY
  }

})
