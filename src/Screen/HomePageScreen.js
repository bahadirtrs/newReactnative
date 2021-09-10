import React,{useState, useEffect} from 'react'
import {Text, SafeAreaView,StyleSheet, TouchableOpacity,View,KeyboardAvoidingView,Image, TouchableWithoutFeedback, Keyboard, Dimensions, FlatList,Alert } from 'react-native'
import ProductAddModal from './ProductAdd'
import ProductTextInput from '../components/ProductTextInput'
import ProductItemVertical from '../components/ProductItemVertical'
import ProductItem from '../components/ProductItem'
import { useFocusEffect } from "@react-navigation/native"
const width=Dimensions.get('screen').width

export default function HomeScreen({navigation, params}) {
const [products, setProducts] = useState([])
const [filterData, setFilterData] = useState([])
const [term, setTerm] = useState("")


useEffect(() => {
  getAllProduct()
  
}, [])


useEffect(() => {
  if (term.length>1) {
    SearchFilter(term)
  }
}, [term])

useFocusEffect(
  React.useCallback(() => {
    getAllProduct()
  }, [])
);

getAllProduct = async() =>{
    try {
      const response = await fetch('https://bahadirtiras.com.tr/akinsoftApi/getProduct.php');
      const responseJson = await response.json();
      //setProducts(responseJson);
      //console.log(responseJson);
      SectionList(responseJson)
    }
    catch (error) {
      console.error(error);
    }
  }

  const SearchFilter = (text)=>{
    const newData = products.filter( item => {
    const ListItem = item.category.toLowerCase();
      return( ListItem.indexOf(text.toLowerCase())> -1);
    })
    setFilterData(newData);
  }

  SectionList =(data)=>{
    let allArray=[]
    for (let i = 0; i < data.length; i++) {
      let array={}
      let productList=[]
      array.category=data[i]?.urun_kategorisi;
     
      for (let j = 0; j < data.length; j++) {
        let singleProduct = {}
        if(data[i].urun_kategorisi==data[j].urun_kategorisi){
          singleProduct.urun_adi=data[j].urun_adi
          singleProduct.urun_id=data[j].id
          singleProduct.urun_fiyati=data[j].urun_fiyati
          singleProduct.urun_miktari=data[j].urun_miktari
          singleProduct.urun_url=data[j].urun_url
          productList.push(singleProduct)
        }
      }
      array.datas=productList;
      if(data[i]?.urun_kategorisi!=data[i+1]?.urun_kategorisi){
        allArray.push(array);
      }
    }
    setProducts(allArray)
    console.log(JSON.stringify(allArray) );
  }

  return (
    
  <KeyboardAvoidingView
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    style={styles.container}>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <SafeAreaView style={styles.container} >
      <SafeAreaView/>
      <ProductTextInput placeholder={'Kategori Ara'} 
        value={term} 
        setValue={(text)=>{setTerm(text)}} 
      />
      {term?.length > 1 ? <ProductList products={filterData}/> : undefined}
      {!(term?.length > 1) ? <ProductList products={products} /> : undefined}
      <TouchableOpacity onPress={()=>navigation.push('Urunekle')}  style={styles.buttonContainer}>
        <Image source= {require('../assets/img/add.jpeg')} style={styles.addButton} />
      </TouchableOpacity>
    </SafeAreaView>
    </TouchableWithoutFeedback>
  </KeyboardAvoidingView>

  )
}

const ProductList = ({ products }) => {
  const [layoutType, setlayoutType] = useState(true)
  if(products.length>0){
    return (
      <SafeAreaView style={styles.itemExp} >
        <View style={{width:width, flexDirection:'row', justifyContent:'center', marginBottom:10}} >
          <TouchableOpacity onPress={()=>setlayoutType(!layoutType)} 
            style={[styles.leftLayout, {backgroundColor:!layoutType?'#118ab2': '#f1f1f1' }]} >
                <Text style={{color:!layoutType?'#fff':'#000', fontSize:12 }} > {'Liste Görünümü' }</Text>
           </TouchableOpacity>
           <TouchableOpacity onPress={()=>setlayoutType(!layoutType)} 
            style={[ styles.rightLayout, {backgroundColor:layoutType?'#118ab2': '#f1f1f1', }]} >
                <Text style={{color:layoutType?'#fff':'#000', fontSize:12 }} > {'Kart Görünümü' }</Text>
           </TouchableOpacity>
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={products}
          renderItem={({item,index})=>
            <View style={styles.itemContainer} >
              <View style={styles.categoryContainer} >
                <Text style={styles.categoryText} > {item.category}</Text>
                <Text> {item?.datas?.length} Adet </Text>
              </View >
              {
                layoutType
                ?<ProductItem item={item.datas}/>
                :<ProductItemVertical item={item.datas} key={index} />
              }
            </View>
          }
        />
        
     </SafeAreaView>
    )
  }else{
    return(
      <View style={styles.noItem} >
        <Text style={styles.noItemText} >Kategori veya ürün bulunamadı.</Text>
      </View>
    )
  }
}



const styles = StyleSheet.create({
  container:{
    width:Dimensions.get('screen').width,
    height:Dimensions.get('screen').height-100,
    flexDirection:'column',
    justifyContent:'flex-start',
    alignItems:'center',
    backgroundColor:'#f8f8f8',
  },
 flatlist:{
  flex:1
  
 },
 buttonContainer:{
  position:'absolute',
  bottom:-80,
  right:0
 },

//Search 
itemExp:{
  width:width-20, 
  backgroundColor:'#f8f8f8', 
  margin:10
},
itemContainer:{
  backgroundColor:'white', 
  borderRadius:5, 
  marginVertical:4, 
  borderWidth:0.4, 
  borderColor:'#e1e1e1'
},
categoryContainer:{
  flexDirection:'row', 
  justifyContent:'space-between', 
  borderBottomColor:'#eee', 
  borderBottomWidth:1, 
  paddingHorizontal:10, 
  paddingVertical:10
},
categoryText:{
  fontSize:16, 
  fontWeight:'600'
},
noItem:{
  flex:1, 
  justifyContent:'flex-start', 
  alignItems:'center', 
  paddingTop:30
},
noItemText:{ 
  fontSize:16, 
  color:'#444'
},
addButton:{
  width:50,
 height:50,
 margin:15
},

leftLayout:{padding:7,borderColor:'#118ab2', borderWidth:0.3, borderTopLeftRadius:5, borderBottomLeftRadius:5 },
rightLayout:{padding:7, borderColor:'#118ab2', borderWidth:0.3, borderTopRightRadius:5, borderBottomRightRadius:5}
})
