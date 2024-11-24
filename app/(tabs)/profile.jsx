import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { useAuth, useUser } from '@clerk/clerk-expo';
import Colors from '../../constants/Colors';
import { useRouter } from 'expo-router';

export default function Profile() {
  const Menu = [
    { id: 1, name: 'Add New Product', icon: 'add-circle', path: '/add-new-product' },
    { id: 2, name: 'Favorites', icon: 'heart', path: '/(tabs)/favorite' },
    { id: 3, name: 'My Post', icon: 'bookmark', path: '/../User-post' },
    { id: 4, name: 'Inbox', icon: 'chatbubble', path: '/(tabs)/inbox' },
    { id: 5, name: 'Logout', icon: 'exit', path: 'logout' },
    
  ];

  const { user } = useUser();
  const router = useRouter();
  const { signOut } = useAuth();

  const onPressMenu = (menu) => {
    if (menu.id === 4) { // Check if it's the logout menu
      signOut();
      router.push('/login'); // Redirect to login page after logout
      return;
    }
    router.push(menu.path); // Navigate to other pages
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      
      {/* Profile Information */}
      <View style={styles.profileInfo}>
        <Image source={{ uri: user?.imageUrl }} style={styles.profileImage} />
        <Text style={styles.userName}>{user?.fullName}</Text>
        <Text style={styles.userEmail}>{user?.primaryEmailAddress?.emailAddress}</Text>
      </View>

      {/* Menu List */}
      <FlatList
        data={Menu}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.menuItem} onPress={() => onPressMenu(item)}>
            <Ionicons name={item.icon} size={30} color={Colors.PRIMARY} style={styles.icon} />
            <Text style={styles.menuText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 30,
    backgroundColor: Colors.BACKGROUND, // Assuming you have a background color defined in Colors
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flex: 1,
  },
  title: {
    fontFamily: 'outfit-bold',
    fontSize: 32,
    color: Colors.DARK,
    marginBottom: 20,
  },
  profileInfo: {
    alignItems: 'center',
    marginVertical: 25,
    paddingHorizontal: 10,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: Colors.PRIMARY, // Adds a border to the profile image for emphasis
  },
  userName: {
    fontFamily: 'outfit-bold',
    marginTop: 10,
    fontSize: 22,
    color: Colors.DARK,
  },
  userEmail: {
    fontFamily: 'outfit',
    fontSize: 16,
    color: Colors.GRAY,
    marginTop: 5,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 15,
    marginVertical: 8,
    backgroundColor: 'white', // Menu item background color
    borderRadius: 10, // Smooth corners for the boxes
    shadowColor: '#000', // Subtle shadow effect to create a card-like look
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5, // Adds shadow on Android
  },
  icon: {
    marginRight: 20,
  },
  menuText: {
    fontFamily: 'outfit-medium',
    fontSize: 18,
    color: Colors.DARK,
  },
});
