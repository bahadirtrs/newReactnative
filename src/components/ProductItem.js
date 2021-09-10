import React from 'react'
import { View, Text,StyleSheet, Dimensions,FlatList,SafeAreaView, TouchableOpacity, Image } from 'react-native'
import { useNavigation } from "@react-navigation/native"
const width=Dimensions.get('screen').width
const height=Dimensions.get('screen').height

export default function ProductItem({item}) {
    const { push } = useNavigation()
    return (
        <SafeAreaView style={{flexDirection:'row', justifyContent:'flex-start', margin:10,}} >
        <FlatList
        data={item}
        numColumns={3}
        style={styles.flatlist}
        renderItem= { ({item})=>
        <TouchableOpacity style={styles.container} onPress={()=>push('Detaylar', {item:item})}  >
            <View>
                <Image source={{uri:item.urun_url}} style={styles.productImage} />
                <View style={{justifyContent:'flex-start', alignItems:'flex-start'}} >
                    <Text numberOfLines={2} style={styles.productName}>{item.urun_adi} </Text>
                    <Text numberOfLines={1} style={styles.productCount}>{item.urun_miktari} Adet</Text>
                    <Text numberOfLines={1} style={styles.productPrice}>{item?.urun_fiyati} ₺ </Text>
                </View>
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
        justifyContent:'center',
        alignItems:'center',
        width:(Dimensions.get('screen').width-70)/3,
        backgroundColor:'#fff',
        margin:5,
        padding:10,
        borderRadius:5,
        borderWidth:0.4,
        borderColor:'#d1d1d1'
    },
    flatlist:{
        justifyContent:'center',
    },
    productImage:{
        width:'100%', 
        height:100
    },

    productName:{ 
        width:'100%', 
        fontSize:13, 
        fontWeight:'600', 
        textAlign:'center', 
        width:width*0.25
    },
    productCount:{ 
        width:'100%', 
        fontSize:10, 
        fontWeight:'400', 
        textAlign:'center'
    },
    productPrice:{ 
        width:'100%', 
        fontSize:12, 
        fontWeight:'600', 
        color:'red', 
        textAlign:'center'
    }

})
