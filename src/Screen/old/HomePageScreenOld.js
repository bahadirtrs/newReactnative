import React,{useState} from 'react'
import {Text, SafeAreaView,StyleSheet, TouchableOpacity,Pressable, Dimensions, FlatList } from 'react-native'
import ProductItem from '../components/ProductItem'
const data = require("../data.json")

export default function HomeScreen({navigation, params}) {

 const [product, setProduct] = useState(
  [
    {
      "id":1,
      "urunadi": "Ürün 1",
      "urunHakkinda":" ürün hakkında 1",
      "urunFiyat":" 54.99 TL",
      "urunAdedi":10
    },
     {
      "id":2,
      "urunadi": "Ürün 2",
      "urunHakkinda":" ürün hakkında 3",
      "urunFiyat":" 54.99 TL",
      "urunAdedi":10
    },
    {
      "id":3,
      "urunadi": "Ürün 3",
      "urunHakkinda":" ürün hakkında 3",
      "urunFiyat":" 54.99 TL",
      "urunAdedi":10
    },
    {
      "id":4,
      "urunadi": "Ürün 4",
      "urunHakkinda":" ürün hakkında 4",
      "urunFiyat":" 54.99 TL",
      "urunAdedi":10
    },
    {
      "id":5,
      "urunadi": "Ürün 5",
      "urunHakkinda":" ürün hakkında 5",
      "urunFiyat":" 54.99 TL",
      "urunAdedi":10
    }
      ]
 )
  
  return (
    <SafeAreaView style={styles.container} >
      <SafeAreaView/>
      <FlatList
        data={data}
        style={styles.flatlist}
        renderItem= { ({item})=>
          <TouchableOpacity onPress={()=>navigation.push('Detaylar', {item:item, setProduct:{setProduct}})} >
             <ProductItem item={item}/>
          </TouchableOpacity>
        }
      />
      </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container:{
    flex:1,
    width:Dimensions.get('screen').width,
    flexDirection:'column',
    justifyContent:'flex-start',
    alignItems:'flex-start'
  },
 flatlist:{
  flex:1
  
 }
})
