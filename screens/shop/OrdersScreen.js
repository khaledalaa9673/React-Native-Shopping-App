import React,{useEffect} from 'react';
import { Button,StyleSheet, FlatList, Text, TouchableOpacity,View} from 'react-native';
import { useSelector ,useDispatch} from 'react-redux';
import   Colors   from "../../constants/Colors"
import { Ionicons } from '@expo/vector-icons'; 
import OrderItem from "../../components/OrderItem"
import { fetchOrders} from "../../store/actions/orders";
 
 

 

const OrdersScreen = props => {
  const orders=useSelector(state=>state.orders.orders)
  const dispatch=useDispatch()
   useEffect(()=>{
   dispatch(fetchOrders())
   },[dispatch])
 
  return (
   <FlatList data={orders} keyExtractor={item=>item.id}
   renderItem={itemData=> {
    console.log(itemData.item)
    return   <OrderItem 
       items={itemData.item.items}
       date={itemData.item.readableDate}
       amount={itemData.item.totalAmount}
       />
   }}
       />
 )
      }
 
OrdersScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Your Orders',
    headerLeft:()=>{
        return (
            <TouchableOpacity style={{marginLeft:20}} onPress={() => {
              navData.navigation.toggleDrawer()}}>
               <Ionicons name="ios-menu" size={36} color="white" />
            </TouchableOpacity>
          )
    }
  }
};
 
export default OrdersScreen;