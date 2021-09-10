import React,{useState} from 'react'
import { View, Text, StyleSheet, Modal, Dimensions,Image, Pressable,Alert } from 'react-native'
import ProductTextInput from '../components/ProductTextInput'
const width=Dimensions.get('screen').width
const height=Dimensions.get('screen').height

export default function DetailScreen({route}) {
    const {item} = route.params;
    const [productPrice, setProductPrice] = useState()
    const [modalVisible, setModalVisible] = useState(false);
    const [price, setPrice] = useState(item.urun_fiyati)

    UpdateProductPrice=()=>{
      if (productPrice.length>2) {
        fetch('https://bahadirtiras.com.tr/akinsoftApi/updateProduct.php', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
           urun_fiyati:productPrice,
           urun_id:item.urun_id
          })
        }).then((response) => response.json())
          .then((responseJson) => {
             Alert.alert(responseJson);
             setModalVisible(false);
             setPrice(productPrice);
             setProductPrice()
          }).catch((error) => {
              console.log(error)
           Alert.alert("Fiyat  Güncellenemedi",'Güncelleme sırasında bir hata oluştu.')
          });
      }else{
        Alert.alert("Fiyat Girilmedi",'Lütfen bu ürün için bir fiyat giriniz.')
      }
    }

    return (
        <View style={styles.container} >
            <View style={styles.productInfocontainer}>
              <Image source={{ uri:item.urun_url}}  style={styles.productImage}/>
              <View style={styles.productNameContainer} >
                <Text style={{fontSize:20,fontWeight:'600'}}> {item.urun_adi} </Text>
                <Text style={{fontSize:13}}> {item.urun_miktari} Adet</Text>
                <Text style={{fontSize:18, color:'red', fontWeight:'600'}}> {price} ₺</Text>
              </View>
            </View>
            <View style={styles.buttonContainer} >           
              <View style={styles.centeredViewContainer}>
                <Modal animationType="fade"  transparent={true} visible={modalVisible}>
                    <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                      <View style={styles.modalTitleContainer} >
                          <Text style={styles.modalText}>Ürün Fiyatını Güncelle</Text>
                          <Text style={styles.modalDesc}>
                              Değiştirmek istediğiniz yeni ürün fiyatını aşağıya giriniz ve 
                            <Text style={{fontWeight:'700'}} >"Fiyatı Güncelle"</Text> butonuna tıklayınız.</Text>
                      </View>
                    <ProductTextInput type={'num'} placeholder={'Ürünün yeni fiyatını giriniz. Örn:8.20₺'} value={productPrice} 
                        setValue={(text)=>{setProductPrice(text)}} 
                        />
                    <View style={styles.modalButtonContainer} >
                        <Pressable style={styles.button} onPress={() => UpdateProductPrice()} >
                          <Text style={styles.textStyle}>Fiyatı Güncelle</Text>
                        </Pressable>
                        <Pressable style={styles.button} onPress={() => setModalVisible(!modalVisible)}>
                          <Text style={styles.textStyle}>İptal</Text>
                        </Pressable>
                        </View>
                    </View>
                    </View>
                </Modal>
                <Pressable style={styles.buttonBig} onPress={() => setModalVisible(true)}>
                  <View style={{flexDirection:'row'}} >
                    <Text style={styles.textStyleButton}>Fiyatı Güncelle</Text>
                  </View>
                </Pressable>
              </View>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        width:Dimensions.get('screen').width,
        justifyContent:'space-between',
        alignItems:'center',
        backgroundColor:'#f8f8f8'
    },

    productInfocontainer:{
      margin:10,
      backgroundColor:'white',
      padding:20, 
      justifyContent:'center', 
      alignItems:'center', 
      width:width-20,
      borderRadius:5,
      borderWidth:0.3,
      borderColor:'#c1c1c1'
    },

    productImage:{ 
      width:180, 
      height:180, 
      borderRadius:10, 
      padding:20
    },

    productNameContainer:{
      paddingVertical:20, 
      justifyContent:'center', 
      alignItems:'center'
    },

    modalTitleContainer:{ 
      flexDirection:'column', 
      justifyContent:'flex-start', 
      alignItems:'flex-start', 
      width:width*0.75, 
      paddingVertical:5, 
      marginBottom:10, 
      borderBottomWidth:1, 
      borderBottomColor:'#eee'
    },

    modalDesc:{
      fontSize:11, 
      paddingVertical:3, 
      color:'#333'
    },

    modalButtonContainer:{
      flexDirection:'row', 
      width:width-40, 
      justifyContent:'space-evenly', 
      marginTop:10
    },

    buttonContainer:{
        width:Dimensions.get('screen').width-40,
        padding:10,
        margin:20,
     },

     centeredView: {
        backgroundColor:'#00000030',
        height:height,
        justifyContent:'center',
        alignItems: "center",
        marginTop: 0,
      },
    
      centeredViewContainer: {
        justifyContent:'center',
        alignItems: "center",
      },
    
      modalView: {
        paddingVertical:20,
        width:width-50,
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
        elevation: 5
      },
      button: {
        width:width/3.5,
        borderRadius: 5,
        padding: 10,
        elevation: 2,
         borderWidth:1,
         borderColor:'#118ab2'
      },
      buttonBig: {
        width:width*0.8,
        backgroundColor:'#118ab2',
        borderRadius: 5,
        padding: 10,
        elevation: 2,
         borderWidth:1,
         borderColor:'#118ab2',
         alignItems:'center'
      },
     
      textStyle: {
        fontSize:12,
        color: "#118ab2",
        fontWeight: "normal",
        textAlign: "center"
      },

      textStyleButton: {
      fontSize:12,
      color: "white",
      fontWeight: "normal",
      textAlign: "center",
      textAlign:'center'
    },

      modalText: {
        fontSize:16,
        fontWeight:'700',
        textAlign: "center"
      },

})
