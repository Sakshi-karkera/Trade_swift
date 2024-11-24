import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React from 'react';
import Header from '../../components/Home/Header';
import Slider from '../../components/Home/Slider';
import ListByCategory from '../../components/Home/ListByCategory';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Colors from '../../constants/Colors';
import { TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';

export default function Home() {
  return (
    <ScrollView
      style={{
        padding: 20,
        marginTop: 20,
      }}
      showsVerticalScrollIndicator={false} // Optional: Hides the vertical scrollbar
    >
      {/* Header */}
      <Header />

      {/* Slider */}
      <Slider />

      {/* Petlist + Category */}
      <ListByCategory />

      {/* Add New Pet Option */}
      <Link href={'/add-new-product'} style={styles.addNewProductContainer}>
        <FontAwesome name="shopping-cart" size={24} color={Colors.PRIMARY} />
        <Text style={styles.addNewProductText}>Add New Product</Text>
      </Link>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  addNewProductContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    textAlign: 'center',
    padding: 20,
    marginTop: 20,
    backgroundColor: Colors.LIGHT_PRIMARY,
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
    borderRadius: 15,
    borderStyle: 'dashed',
    justifyContent: 'center',
    marginBottom:30
  },
  addNewProductText: {
    fontFamily: 'outfit-medium',
    color: Colors.PRIMARY,
    fontSize: 18,
  },
});
