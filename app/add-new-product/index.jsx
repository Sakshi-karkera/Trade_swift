import { View, Text, Image, TextInput, StyleSheet, ScrollView, Pressable, ToastAndroid } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation, useRouter } from 'expo-router';
import Colors from '../../constants/Colors';
import { TouchableOpacity } from 'react-native';
import { collection, doc, getDocs, setDoc } from 'firebase/firestore';
import { db, storage } from '../../config/FirebaseConfig';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useUser } from '@clerk/clerk-expo';
import { ActivityIndicator } from 'react-native';

export default function AddNewProduct() {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({ Category: 'Clothing' });
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();
  const [image, setImage] = useState();
  const [loader, setLoader] = useState(false);
  const { user } = useUser();
  const router=useRouter();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Add New Product '
    });
    GetCategories();
  }, []);

  /**
   * Used to Get Category List from database
   */
  const GetCategories = async () => {
    const snapshot = await getDocs(collection(db, 'Category'));
    const categories = [];
  
    snapshot.forEach((doc) => {
      categories.push(doc.data());
    });
  
    setCategoryList(categories);
  };
  /**
   * Used to pick image from gallery
   */
  const imagePicker = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleInputChange = (fieldName, fieldValue) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: fieldValue
    }));
  };

  const onSubmit = () => {
    const requiredFields = ['name', 'brand', 'category', 'location', 'address', 'about', 'price'];

    // Check if all required fields are present and not empty
    const isFormValid = requiredFields.every(field => formData[field] && formData[field].trim());

    if (!isFormValid || !image) {
      ToastAndroid.show('Enter All Details', ToastAndroid.TOP);
      return;
    }

    UploadImage();
  };

  /**
   * Used to Upload Image to Firebase Storage (server)
   */
  const UploadImage = async () => {
    setLoader(true);
    const resp = await fetch(image);
    const blobImage = await resp.blob();
    const storageRef = ref(storage, '/TradeSwift/' + Date.now() + '.jpg');

    uploadBytes(storageRef, blobImage).then((snapshot) => {
      console.log('File Uploaded');
    }).then(resp => {
      getDownloadURL(storageRef).then(async (downloadUrl) => {
        console.log(downloadUrl);
        SaveFormData(downloadUrl);
      });
    });
  };

  const SaveFormData = async (imageUrl) => {
    const docId = Date.now().toString();
    await setDoc(doc(db, 'Products', docId), {
      ...formData,
      imageUrl: imageUrl,
      username: user?.fullName,
      email: user?.primaryEmailAddress?.emailAddress,
      userImage: user?.imageUrl,
      id: docId
    });
    setLoader(false);
    router.replace('/(tabs)/home')
  };

  return (
    <ScrollView style={{
      padding: 20
    }}>
      <Text style={{
        fontFamily: 'outfit-medium',
        fontSize: 20
      }}>Add New Product to Sell</Text>
      <Pressable onPress={imagePicker}>
        {!image ? 
          <Image source={require('./../../assets/images/placeholder.jpg')}
            style={{
              height: 120,
              width: 120,
              borderRadius: 15,
              borderWidth: 1,
              borderColor: Colors.GRAY
            }} 
          /> :
          <Image source={{ uri: image }} style={{
            height: 120,
            width: 120,
            borderRadius: 15,
            borderWidth: 1,
            borderColor: Colors.GRAY
          }} />}
      </Pressable>
      
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Product Name*</Text>
        <TextInput style={styles.input} onChangeText={(value) => handleInputChange('name', value)} />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Brand Name*</Text>
        <TextInput style={styles.input} onChangeText={(value) => handleInputChange('brand', value)} />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Category*</Text>
        <Picker style={styles.input}
          selectedValue={selectedCategory}
          onValueChange={(itemValue) => {
            setSelectedCategory(itemValue);
            handleInputChange('category', itemValue);
          }}>
          {categoryList.map((Category, index) => (
            <Picker.Item key={index} label={Category.name} value={Category.name} />
          ))}
        </Picker>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Location*</Text>
        <TextInput style={styles.input} onChangeText={(value) => handleInputChange('location', value)} />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Address*</Text>
        <TextInput style={styles.input} onChangeText={(value) => handleInputChange('address', value)} />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>About Product*</Text>
        <TextInput style={styles.input} onChangeText={(value) => handleInputChange('about', value)}
          numberOfLines={5}
          multiline={true} />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Price*</Text>
        <TextInput keyboardType="numeric" style={styles.input} onChangeText={(value) => handleInputChange('price', value)} />
      </View>

      <TouchableOpacity 
        style={styles.button} 
        disabled={loader}
        onPress={onSubmit}>
        {loader ? <ActivityIndicator size={'large'} /> :
          <Text style={{
            fontFamily: 'outfit-medium',
            textAlign: 'center'
          }}>Submit</Text>}
      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 5
  },
  input: {
    padding: 10,
    backgroundColor: Colors.WHITE,
    borderRadius: 7,
    fontFamily: 'outfit'
  },
  label: {
    marginVertical: 5,
    fontFamily: 'outfit'
  },
  button: {
    padding: 15,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 7,
    marginVertical: 10,
    marginBottom: 50
  }
});
