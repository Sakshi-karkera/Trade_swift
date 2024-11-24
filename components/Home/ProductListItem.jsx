import { View, Text, Image } from 'react-native';
import React from 'react';
import Colors from '../../constants/Colors';
import { TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import MarkFav from '../MarkFav';

export default function ProductListItem({ product }) {
  const router = useRouter();
  
  // Function to limit the product name to two words
  const truncateName = (name) => {
    if (!name) return '';
    const words = name.split(' ');
    return words.length > 2 ? `${words[0]} ${words[1]}..` : name;
  };

  return (
    <TouchableOpacity 
      onPress={() => router.push({
        pathname: '/product-details',
        params: product,
      })} 
      style={{
        padding: 10,
        marginRight: 15,
        backgroundColor: Colors.WHITE,
        borderRadius: 10,
      }}
    >
      <View style={{
        position: 'absolute',
        zIndex: 10,
        right: 10,
        top: 10,
      }}>
        <MarkFav product={product} color={"black"} />
      </View>
      
      <Image 
        source={{ uri: product?.imageUrl }}
        style={{
          width: 150,
          height: 195,
          objectFit: 'cover',
          borderRadius: 10,
        }} 
      />
      
      <Text style={{
        fontFamily: 'outfit-medium',
        fontSize: 18,
      }}>
        {truncateName(product?.name)} {/* Use the truncate function here */}
      </Text>
      
      <View style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <Text style={{
          color: Colors.GRAY,
          fontFamily: 'outfit',
        }}>
          {product.brand}
        </Text>

        <Text style={{
          color: Colors.PRIMARY,
          fontFamily: 'outfit',
          backgroundColor: Colors.LIGHT_PRIMARY,
          paddingHorizontal: 7,
          borderRadius: 10,
          fontSize: 11,
        }}>
          Rs.{product?.price}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
