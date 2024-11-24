import { View, Text, FlatList, Pressable, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from 'expo-router';
import { useUser } from '@clerk/clerk-expo';
import { collection, deleteDoc, doc, getDocs, where } from 'firebase/firestore';
import { query } from 'firebase/database';
import { db } from '../../config/FirebaseConfig';
import ProductListItem from './../../components/Home/ProductListItem';
import Colors from '../../constants/Colors';

export default function UserPost() {
  const navigation = useNavigation();
  const { user } = useUser();
  const [userPostList, setUserPostList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'User Post',
    });
    user && GetUserPost();
  }, [user]);

  /**
   * Fetches user posts
   */
  const GetUserPost = async () => {
    setLoading(true);
    const q = query(
      collection(db, 'Products'),
      where('email', '==', user?.primaryEmailAddress?.emailAddress)
    );
    const querySnapshot = await getDocs(q);

    const posts = [];
    querySnapshot.forEach((doc) => {
      posts.push({ id: doc.id, ...doc.data() });
    });
    setUserPostList(posts);
    setLoading(false);
  };

  const onRefresh = () => {
    GetUserPost();
  };

  const OnDeletePost = (docId) => {
    Alert.alert('Delete Post', 'Are you sure you want to delete this post?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete',
        onPress: () => deletePost(docId),
      },
    ]);
  };

  const deletePost = async (docId) => {
    await deleteDoc(doc(db, 'Products', docId));
    GetUserPost();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>User Post</Text>

      {loading ? (
        <ActivityIndicator size="large" color={Colors.LIGHT_PRIMARY} style={styles.loader} />
      ) : userPostList.length === 0 ? (
        <Text style={styles.noPostText}>No Post Found</Text>
      ) : (
        <FlatList
          data={userPostList}
          numColumns={userPostList.length === 1 ? 1 : 2} // Adjust columns dynamically
          refreshing={loading}
          onRefresh={onRefresh}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={[styles.itemContainer, userPostList.length === 1 && styles.singlePost]}>
              <ProductListItem product={item} />
              <Pressable onPress={() => OnDeletePost(item?.id)} style={styles.deleteButton}>
                <Text style={styles.deleteButtonText}>Delete</Text>
              </Pressable>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  headerText: {
    fontFamily: 'outfit-medium',
    fontSize: 30,
    marginBottom: 10,
  },
  itemContainer: {
    flex: 1,
    margin: 5,
  },
  singlePost: {
    alignSelf: 'center', // Center a single post
    width: '50%', // Adjust the width for better layout
  },
  deleteButton: {
    backgroundColor: Colors.LIGHT_PRIMARY,
    padding: 7,
    borderRadius: 7,
    marginTop: 5,
  },
  deleteButtonText: {
    fontFamily: 'outfit',
    textAlign: 'center',
    fontSize: 15,
  },
  noPostText: {
    fontSize: 18,
    textAlign: 'center',
    color: 'gray',
    marginTop: 20,
  },
  loader: {
    marginTop: 20,
    alignSelf: 'center',
    color:Colors.BLACK
  },
});
