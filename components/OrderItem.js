import React from 'react'
import {View,StyleSheet,Text,Button,FlatList} from "react-native"
 import { useState } from 'react';
import CartItem from "./CartItem"



const OrderItem=(props)=>{
    const [detail,ToggleDetail]=useState(false)
    console.log(props)
    return (
        <View style={styles.cart}>
            <View  style={styles.row}>
                <Text >{props.amount}$</Text>
                <Text>{props.date}</Text>
            
            </View>
           <View style={{width:150,marginLeft:70}}>
               <Button   title=" more details" 
               onPress={()=>ToggleDetail(prev=>!prev)}
               />
               </View>
           {detail && 
            <FlatList 
             data={props.items}
             keyExtractor={(item)=>item.id}
             renderItem={itemData=>{
                 return <CartItem 
                 quantity={itemData.item.quantity}
                title={itemData.item.title}
                key={itemData.item.id}
                price={itemData.item.price}
                 
                 
                 />
             }}
            
            />
           
           }
       </View>
    )
}
const styles=StyleSheet.create({
   cart:{
    width:"80%",
    marginHorizontal:40,
    marginBottom:10,
    backgroundColor:"white",
    padding:20,
   },
   row:{
       flexDirection:"row",
       alignItems:"center",
       justifyContent:"space-between"
   }
}
)

export default OrderItem