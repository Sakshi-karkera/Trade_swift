import { View, Text, ScrollView, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router'
import ProductInfo from '../../components/ProductDetails/ProductInfo';
import ProductSubInfo from '../../components/ProductDetails/ProductSubInfo';
import AboutProduct from '../../components/ProductDetails/AboutProduct';
import OwnerInfo from '../../components/ProductDetails/OwnerInfo';
import { TouchableOpacity } from 'react-native';
import Colors from '../../constants/Colors';
import { useUser } from '@clerk/clerk-expo';
import { collection, doc, getDoc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { db } from '../../config/FirebaseConfig';




export default function ProductDetails() {
    const product=useLocalSearchParams();
    const navigation=useNavigation();
    const{user}=useUser();
    const router=useRouter();
    
    useEffect(()=>{
        navigation.setOptions({
            headerTransparent:true,
            headerTitle:''
        })
    },[])

    /**
     * used to initiate chat between two users
     */
    const InitiateChat=async()=>{
      const docId1=user?.primaryEmailAddress?.emailAddress+'_'+product?.email;
      const docId2=product?.email+'_'+user?.primaryEmailAddress?.emailAddress;

      const q=query(collection(db,'Chat'),where('id','in',[docId1,docId2]));
      const querySnapshot=await getDocs(q);
      querySnapshot.forEach(doc=>{
        console.log(doc.data());
         router.push({
          pathname:'/chat',
          params:{id:doc.id}
         })
      })

      if(querySnapshot.docs?.length==0){
        await setDoc(doc(db,'Chat',docId1),{
          id:docId1,
          users:[
            {
            email:user?.primaryEmailAddress?.emailAddress,
            imageUrl:user?.imageUrl,
            name:user?.fullName
            },
            {
              email:product?.email,
              imageUrl:product?.userImage,
              name:product?.username
            }
          ],
          userIds:[user?.primaryEmailAddress?.emailAddress,product?.email]
        });
        router.push({
          pathname:'/chat',
          params:{id:docId1}
        })
      }

    }

  return (
    <View>
      <ScrollView>
      {/*product info*/}
      
      <ProductInfo product={product}/>
      {/**Product sub info */}
      <ProductSubInfo product={product}/>
      {/*About*/}
      <AboutProduct product={product}/>
      {/*Owner details*/}
      <OwnerInfo product={product}/>
      <View style={{height:70}}>

      </View>
      </ScrollView>
      {/*Buy product button*/}
      <View style={styles?.bottomContainer}>
      <TouchableOpacity 
      onPress={InitiateChat}
      style={styles.adoptBtn}>
        <Text style={{
          fontSize:20,
          fontFamily:"outfit-medium",
        
        }}>Buy Product</Text>
      </TouchableOpacity>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  adoptBtn:{
    padding:15,
    backgroundColor:Colors.PRIMARY,
    alignItems: 'center', // Centers the text horizontally
    justifyContent: 'center' // Centers the text vertically
  },
  bottomContainer:{
    position:'absolute',
    width:'100%',
    bottom:0,
  }
})