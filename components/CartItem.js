import React from 'react'
import {View,StyleSheet,Text} from "react-native"
import { Ionicons } from '@expo/vector-icons'; 
import { TouchableOpacity } from 'react-native-gesture-handler';



const CartItem=(props)=>{
    return (
        <View key={props.id} style={styles.item } >
           <View style={{justifyContent:"space-between",flexDirection:"row"}}>  
                <Text style={{marginLeft:10}}>{props.quantity}</Text>
                <Text style={{marginLeft:10}} >{props.title}</Text>
           </View>
           <View style={{justifyContent:"space-between",flexDirection:"row"}}>
            <Text style={{marginLeft:10}}>{props.price}</Text>
             <TouchableOpacity onPress={props.deleteItem}>
             <Ionicons name="ios-trash" size={28} color="red" style={{marginLeft:10}} /> 

             </TouchableOpacity>
           </View>

           
            </View>
    )
}
const styles=StyleSheet.create({
    item:{
        width:"80%",
        marginHorizontal:40,
        marginBottom:10,
        borderColor:"black",
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        backgroundColor:"white",
        padding:20,

    }
}
)
export default CartItem