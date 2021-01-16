import { createAppContainer ,createSwitchNavigator } from 'react-navigation';
import React, { useEffect } from "react"
import {SafeAreaView,View,Button} from "react-native"
import {createStackNavigator} from  "react-navigation-stack"
import ProductDetailScreen from "../screens/shop/ProductDetailScreen"
import { Platform } from 'react-native';
import CartScreen from "../screens/shop/CartScreen"
import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import Colors from '../constants/Colors';
import OrdersScreen from "../screens/shop/OrdersScreen"
import { createDrawerNavigator,DrawerItems } from 'react-navigation-drawer';
import { Ionicons } from '@expo/vector-icons'; 
import userProductsScreen from "../screens/user/UserProductsScreen"
import EditProductScreen from "../screens/user/EditProductScreen"
import AuthScreen from "../screens/user/AuthScreen"
import StartUpScreen from "../screens/StartUpScreen"
import {login, logout} from "../store/actions/auth"
import {useDispatch} from "react-redux"
 

const navigationOptions= {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primary : '',
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
  headerTitleAlign:"center"
}
const ProductsNavigator = createStackNavigator(
  {
    ProductsOverview: ProductsOverviewScreen,
    ProductDetail:ProductDetailScreen,
    cart:CartScreen
  },
  {
    navigationOptions:{
      drawerIcon: <Ionicons name="ios-cart" size={28} color="red"/>
    },
    defaultNavigationOptions:navigationOptions
  }
);

const OrdersNavigator=createStackNavigator({
  Orders:OrdersScreen
},{
  navigationOptions:{
    drawerIcon: <Ionicons name="ios-list" size={28} color="red"/>
  },
 
defaultNavigationOptions:navigationOptions
})
const AdminNavigator=createStackNavigator({
  UserProducts:userProductsScreen,
  Edit:EditProductScreen
},{
  navigationOptions:{
    drawerIcon: <Ionicons name="ios-create" size={28} color="red"/>
  },
 
defaultNavigationOptions:navigationOptions
})
const ShopNavigator=createDrawerNavigator({
  Products:ProductsNavigator,
  Orders:OrdersNavigator,
  Admin:AdminNavigator

},{
   contentOptions:{
     activeTintColor:Colors.primary
   },
   contentComponent:props=>{
     const dispatch=useDispatch()
    return ( <View style={{flex:1,paddingTop:30}}>
       <SafeAreaView forceInset={{top:"always",horizontal:"never"}}>
         <DrawerItems {...props} />
         <Button title="logout" color={Colors.primary} onPress={()=>{
           dispatch(logout())
           props.navigation.navigate("Auth")
         }} />
       </SafeAreaView>
     </View>
   )
   }
}
)
const AuthNavigator=createStackNavigator({
  Auth:AuthScreen,
})
const MainNavigator=createSwitchNavigator({
  StartUp:StartUpScreen,
  Auth:AuthNavigator,
  shop:ShopNavigator
})

export default createAppContainer(MainNavigator);
