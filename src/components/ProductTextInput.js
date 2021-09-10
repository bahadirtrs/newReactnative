import React from 'react'
import {TextInput, StyleSheet, Dimensions } from 'react-native'
const width=Dimensions.get('screen').width
export default function ProductTextInputProductTextInput(props) {
    return (
        <TextInput
            style={styles.textInput}
            keyboardType={props.type=='num' ? 'numeric' : 'default' }
            placeholder={props.placeholder}
            onChangeText={(text)=>props.setValue(text)}
            value={props.value}
            autoCapitalize = 'none'
            clearButtonMode='always'
            inlineImageLeft='search_icon'
        />
    )
}
const styles = StyleSheet.create({
    textInput:{
        backgroundColor:'white',
        width:'95%',
        borderWidth:1,
        padding:12,
        margin:5,
        borderColor:'#ddd',
        borderRadius:8,
        fontSize:12
    }
})