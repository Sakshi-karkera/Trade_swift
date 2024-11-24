import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { getDocs, query, where, collection } from 'firebase/firestore';
import { db } from '../../config/FirebaseConfig';
import { useUser } from '@clerk/clerk-expo';
import UserItem from '../../components/inbox/UserItem';

export default function Inbox() {
  const { user } = useUser();
  const [userList, setUserList] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if (user) {
      GetUserList();
    }
  }, [user]);

  // Get User List Depends on Current User Emails
  const GetUserList = async () => {
    setLoader(true);
    setUserList([]);
    try {
      const q = query(
        collection(db, 'Chat'),
        where('userIds', 'array-contains', user?.primaryEmailAddress?.emailAddress)
      );

      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        setUserList((prevList) => [...prevList, doc.data()]);
      });
    } catch (error) {
      console.error("Error fetching user list:", error);
    } finally {
      setLoader(false);
    }
  };

  // Filter the list of Other Users
  const MapOtherUserList = () => {
    const list = [];
    userList.forEach((record) => {
      const otherUser = record.users?.filter(
        (u) => u?.email !== user?.primaryEmailAddress?.emailAddress
      );
      if (otherUser && otherUser.length > 0) {
        const result = {
          docId: record.id,
          ...otherUser[0],
        };
        list.push(result);
      }
    });
    return list;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inbox</Text>
      {loader ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={MapOtherUserList()}
          refreshing={loader}
          onRefresh={GetUserList}
          keyExtractor={(item, index) => item.docId || index.toString()}
          renderItem={({ item }) => (
            <View style={styles.listItem}>
              <UserItem userInfo={item} />
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontFamily: 'outfit-medium',
    fontSize: 30,
    marginBottom: 20,
    marginTop:20
    
  },
  listItem: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 3,
  },
});
