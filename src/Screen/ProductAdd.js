import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, Image, TouchableOpacity,TouchableWithoutFeedback, Keyboard, Dimensions, KeyboardAvoidingView, ScrollView} from "react-native";
import ProductTextInput from '../components/ProductTextInput'
import {useNavigation } from "@react-navigation/native"
import { SafeAreaView } from "react-native-safe-area-context";
const width=Dimensions.get('screen').width
const height=Dimensions.get('screen').height

  export default function ProductAdd({navigation, params}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [productName, setProductName] = useState("")
  const [productPrice, setProductPrice] = useState("")
  const [productCount, setProductCount] = useState("")
  const [productCategory, setProductCategory] = useState("")
  const [productImage, setProductImage] = useState("")
  const { push } = useNavigation()

  ItemProductAdd=()=>{
    fetch('https://bahadirtiras.com.tr/akinsoftApi/addProduct.php', {
     method: 'POST',
     headers: {
       Accept: 'application/json',
       'Content-Type': 'application/json',
     },
     body: JSON.stringify({
       product_name:productName,
       product_price:productPrice,
       product_count:productCount,
       product_category:productCategory,
       product_url:productImage
     })
   }).then((response) => response.json())
     .then((responseJson) => {
        Alert.alert(responseJson);
        setModalVisible(false);
        push('Anasayfa')
     }).catch((error) => {
      Alert.alert("Ürün eklenemedi",'Ekleme sırasında bir hata oluştu')
     });
   }

  return (
    <ScrollView style={{flex:1}} >
      <SafeAreaView/>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "position" : "height"}
        style={{flex:1}}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{justifyContent:'center', alignItems:'center'}} >
            <View style={styles.addProductHeader}>
              <Image source={require('../assets/img/store.png')} style={styles.headerImage} />
              <Text style={styles.headerTitle} > Ürün Ekle </Text>
            </View>
            <ProductTextInput type={'text'}  placeholder={'Ürün adını giriniz'} value={productName} 
            setValue={(text)=>{setProductName(text)}} 
            />
            <ProductTextInput type={'num'} placeholder={'Ürün fiyatı giriniz'} value={productPrice} 
            setValue={(text)=>{setProductPrice(text)}} 
            />
            <ProductTextInput type={'num'} placeholder={'Ürün miktarı giriniz'} value={productCount} 
            setValue={(text)=>{setProductCount(text)}} 
            />
            <ProductTextInput type={'text'} placeholder={'Ürün Kategorisi seçiniz'} value={productCategory} 
            setValue={(text)=>{setProductCategory(text)}} 
            />
            <ProductTextInput type={'text'} placeholder={'Ürün Fotoğraf URL si giriniz'} value={productImage} 
            setValue={(text)=>{setProductImage(text)}} 
            />
            <TouchableOpacity style={styles.submitButton} onPress={()=>ItemProductAdd()} >
              <Text style={styles.buttonText} > Ürün Ekle</Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  closeButton:{
    width:width*0.85,
    justifyContent:'flex-end',
    alignItems:'flex-end'
  },
  closeButtonIcon:{
    width:20,
    height:20
  },
  addProductHeader:{
    justifyContent:'center', 
    alignItems:'center', 
    padding:20
  },
  headerTitle:{
    fontSize:24, 
    fontWeight:'500'
  },
  headerImage:{
    width:110, 
    height:120
  },
  centeredView: {
    backgroundColor:'#00000030',
    height:height,
    justifyContent:'center',
    alignItems: "center",
    marginTop: 0,
  },

  centeredViewContainer: {
    flex:1,
    justifyContent:'center',
    alignItems: "center",
  },

  modalView: {
    width:width-20,
    margin: 0,
    backgroundColor: "white",
    borderRadius: 5,
    padding: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,

    paddingBottom:30
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  addButton:{
    width:50,
   height:50,
   margin:15
  },
  submitButton:{
    width:width-100,
    backgroundColor:'#118ab2',
    padding:10,
    marginBottom:100,
    marginTop:20,
    borderRadius:5
  },
  buttonText:{
    color:'white',
    fontSize:16,
     textAlign:'center'
  }
});