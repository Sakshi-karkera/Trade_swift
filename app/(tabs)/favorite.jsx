import { View, Text, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import Shared from './../../Shared/Shared';
import { useUser } from '@clerk/clerk-expo';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../config/FirebaseConfig';
import ProductListItem from './../../components/Home/ProductListItem';

export default function Favorite() {

  const { user } = useUser();
  const [favIds, setFavIds] = useState([]);
  const [favProductList,setFavProductList]=useState([]);
  const[loader,setLoader]=useState(false);

  useEffect(() => {
    user && GetFavProductIds();
  }, [user]);

  //Fav IDs
  const GetFavProductIds = async () => {
    setLoader(true);
    const result = await Shared.GetFavList(user);
    setFavIds(result?.favorites || []);
    setLoader(false);
    GetFavProductList(result?.favorites || []);
    
  };

  //Fetch Related Product List
  const GetFavProductList = async (favIds) => {
    setLoader(true);
    setFavProductList([])
    if (favIds.length === 0) {
      console.log("No favorite product IDs.");
      return; // Exit early if favIds is empty
    }

    const q = query(collection(db, 'Products'), where('id', 'in', favIds));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      console.log(doc.data());
      setFavProductList(prev=>[...prev,doc.data()])
    })
    setLoader(false);
  };

  return (
    <View style={{
      padding: 20,
      marginTop: 20
    }}>
      <Text style={{
        fontFamily: 'outfit-medium',
        fontSize: 30
      }}>Favorites</Text>
      <FlatList 
      onRefresh={GetFavProductIds}
      refreshing={loader}

      data={favProductList}
      numColumns={2}
      renderItem={({item,index})=>(
        <View>
          <ProductListItem product={item}/>
        </View>

      )}/>
    </View>
  );
}
