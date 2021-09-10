import React from 'react'
import { View, Text,StyleSheet, Dimensions,FlatList,SafeAreaView, TouchableOpacity, Image } from 'react-native'
import { useNavigation } from "@react-navigation/native"
const width=Dimensions.get('screen').width
const height=Dimensions.get('screen').height

export default function ProductItemVertical({item}) {
    const { push } = useNavigation()
    return (
        <SafeAreaView style={{flexDirection:'row', justifyContent:'flex-start', margin:10,}} >
        <FlatList
        data={item}
        style={styles.flatlist}
        renderItem= { ({item})=>
        <TouchableOpacity  key={item} style={styles.container} onPress={()=>push('Detaylar', {item:item})}  >
            <View style={{ flexDirection:'row', alignItems:'center'}} >
                <View style={{width:width-120, flexDirection:'row', justifyContent:'flex-start', alignItems:'center'}} >
                    <Image source={{uri:item.urun_url}} style={styles.productImage} />
                    <View style={{justifyContent:'flex-start', alignItems:'flex-start'}} >
                        <Text numberOfLines={2} style={styles.productName}>{item.urun_adi} </Text>
                        <Text numberOfLines={1} style={styles.productCount}>{item.urun_miktari} Adet</Text>
                    </View>
                </View>
                <Text numberOfLines={1} style={styles.productPrice}>{item?.urun_fiyati} ₺ </Text>
            </View>
            <View>
            </View>
        </TouchableOpacity>
        }
      />
      </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
        width:(Dimensions.get('screen').width-50),
        backgroundColor:'#fff',
        margin:5,
        padding:4,
        borderRadius:5,
        borderWidth:0.4,
        borderColor:'#d1d1d1'
    },
    flatlist:{
        justifyContent:'center',
    },
    productImage:{
        width:60, 
        height:60
    },

    productName:{  
        fontSize:13, 
        fontWeight:'600', 
        textAlign:'center', 
    },
    productCount:{ 
        fontSize:10, 
        fontWeight:'400', 
        textAlign:'center'
    },
    productPrice:{ 
        fontSize:12, 
        fontWeight:'600', 
        color:'red', 
        textAlign:'center'
    }

})
