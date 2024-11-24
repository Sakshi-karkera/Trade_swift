import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import Category from './Category';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../config/FirebaseConfig';
import ProductListItem from './ProductListItem';

export default function ListByCategory() {
  const [productList, setProductList] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    GetProductList('Clothing');
  }, []);

  /**
   * Used to get product list on category selection
   * @param {*} category 
   */
  const GetProductList = async (category) => {
    setLoader(true);
    setProductList([]);

    try {
      const q = query(collection(db, 'Products'), where('category', '==', category));
      const querySnapshot = await getDocs(q);

      const products = [];
      querySnapshot.forEach(doc => {
        products.push(doc.data());
      });

      setProductList(products);
    } catch (error) {
      console.error("Error fetching product list: ", error);
      // Optionally set an error state to display an error message to the user
    } finally {
      setLoader(false);
    }
  };

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <Category category={(value) => GetProductList(value)} />
      {loader ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          style={{ marginTop: 10 }}
          horizontal={true}
          refreshing={loader}
          onRefresh={() => GetProductList('Clothing')}
          data={productList}
          renderItem={({ item }) => (
            <ProductListItem product={item} />
          )}
          keyExtractor={(item, index) => index.toString()} // Use a unique key for each item
        />
      )}
    </View>
  );
}
