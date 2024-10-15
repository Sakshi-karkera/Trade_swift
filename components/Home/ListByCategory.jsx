import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import Category from './Category'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../config/FirebaseConfig'
import ProductListItem from './ProductListItem'





export default function ListByCategory() {
  
  const[productList,setProductList]=useState([]);
  useEffect(()=>{
    GetProductList('Clothes')
  },[])
  /**
   * Used to get product list on category selection
   * @param {*} category 
   */
  const GetProductList=async(category)=>{
    const q=query(collection(db,'Products'),where('category','==',category));
    const querySnapshot=await getDocs(q);

    querySnapshot.forEach(doc=>{
      setProductList(productList=>[...productList,doc.data()])
    })

  }
  return (
    <View>
      <Category category={(value)=>GetProductList(value)}/>
        <FlatList
        data={productList}
        renderItem={({item,index})=>(
        <ProductListItem product={item}/>
         
        )}
        />
    </View>
  )
}