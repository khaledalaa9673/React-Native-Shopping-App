import React from "react"
import {View,StyleSheet,Text,Button, Image,TouchableOpacity  ,TouchableNativeFeedback,Platform} from "react-native"


const ProductItem=(props)=>{
    let   TouchableComp=TouchableOpacity
    if(Platform.os==="android"&&Platform.Version >=21){
        TouchableComp=TouchableNativeFeedback
    }
    return(
        <View style={styles.product}>
           <TouchableComp activeOpacity={.9} onPress={props.onSelect} useForground> 
           
            <View  styles={styles.imageContainer}>
            <Image  style={styles.image} source={{uri:props.image}}  />
            </View>
            <View style={styles.info} >
            <Text style={styles.title}>{props.title}</Text>
            <Text style={styles.price}>${props.price.toFixed(2)}</Text>
            </View>
            <View style={styles.actions}>
                {props.children}
            </View>
         
         </TouchableComp>   
         </View>
        
    )
}

const styles=StyleSheet.create({
    product:{
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white',
        height: 300,
        margin: 20,
        borderRadius: 10,
        overflow: 'hidden'
          
          
        },
        imageContainer:{
          
                width: '90%',
                height: '60%',
               
               
                overflow: 'hidden'
         
        },
        image:{
            width: 380,
            height: 180
        },
        actions:{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: '23%',
            paddingHorizontal: 20
        },
        info:{
            alignItems: 'center',
            height: '17%',
            padding: 10

        },
        price:{
            fontSize:18,
            opacity:.7
        },

        title:{
            fontSize:20
        }
})

export default ProductItem