import React, { useEffect } from "react"
import {Text,View,StyleSheet, Button,FlatList} from "react-native"
import { useDispatch, useSelector } from "react-redux"
import CartItem from "../../components/CartItem"
import {deleteItem} from "../../store/actions/cart"
import {addOrder} from "../../store/actions/orders"



const CartScreen=(Props)=>{
  const dispatch=useDispatch()
  const sum=useSelector(state=>state.cart.totalSum)
  const items=useSelector(state=>{
  const products=[]
  for (let  key in state.cart.items) {
    products.push({
     id:key,
     price:state.cart.items[key].productPrice,
     title:state.cart.items[key].productTitle,
     quantity:state.cart.items[key].quantity
   })
  
    
  }

  return products
})

 
  return(
    <View styles={styles.screen}>
      <View style={styles.totalBox}>
       <Text style={{fontSize:22,opacity:.6}}>Total: $ {sum.toFixed(2)}</Text> 
         
       <Button 
       style={styles.btn} title="Order Now" 
        onPress={()=>  dispatch(addOrder(items,sum.toFixed(2)))} 
        disabled={items.length === 0}
        />
      
      </View> 
      <FlatList 
         data={items}
         keyEtractor={(item=>item.id)}         
         renderItem={itemData=>{
           return <CartItem 
           quantity={itemData.item.quantity}
           title={itemData.item.title}
           key={itemData.item.id}
           price={itemData.item.price}
           deleteItem={()=>{
             dispatch(deleteItem(itemData.item.id))
           }}
           />
         }}
         />
    </View>
  )
}
const styles=StyleSheet.create({
  
   totalBox:{
     
     width:"90%",
     height:70,
     shadowColor:"black",
     shadowOffset:{width:2,height:2},
     shadowRadius:5,
     shadowOpacity:.4,
     elevation:4,
     backgroundColor:"white",
     margin:20,
     padding:15,
     flexDirection:"row",
     justifyContent:"space-between",
     alignItems:"center"
   },
  
 
})
export default CartScreen