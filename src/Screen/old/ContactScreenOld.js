import React,{useState} from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'

export default function ContactScreen({navigation, route}) {
    const {item} = route.params;
    const {setProduct} = route.params;
    const [adet, setadet] = useState(item.urunAdedi);
    return (
        <View style={styles.container} >
            <View style={{padding:20}}>
            <Text> Ürün adı: {item.urunadi} </Text>
            <Text> Ürün Hakkında: {item.urunHakkinda} </Text>
            <Text> Ürün Fiyatı: {item.urunFiyat} </Text>
            
            <View style={styles.urunAdedi} >
                <TouchableOpacity onPress={()=>{setadet(adet-1); item.urunAdedi-=1; }}>
                    <Text style={styles.button}> - </Text>
                </TouchableOpacity>
                <Text>   {adet} Adet   </Text>
                <TouchableOpacity onPress={()=>{setadet(adet+1); item.urunAdedi+=1; }}>
                    <Text style={styles.button}> + </Text>
                </TouchableOpacity>
            </View>
            </View>
            <TouchableOpacity style={styles.buttonContainer} onPress={()=>navigation.push('Anasayfa')} >
                <Text style={styles.buttonText}>Kaydet</Text>
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        width:Dimensions.get('screen').width,
        justifyContent:'space-between',
        alignItems:'flex-start',
    },
    buttonContainer:{
        width:Dimensions.get('screen').width-40,
        backgroundColor:'#118ab2',
        padding:10,
        margin:20,
     },
     buttonText:{
      color:'white',
      textAlign:'center',
      fontSize:16
     },

     urunAdedi:{
        width:Dimensions.get('screen').width,
         flexDirection:'row',
         justifyContent:'center',
         alignItems:'center',
         paddingTop:20
     }
     ,
     button:{
         fontSize:30
     }
})
