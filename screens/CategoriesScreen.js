import React from "react"
import {View,Text,StyleSheet,Button,FlatList,TouchableOpacity} from "react-native"
import {CATEGORIES} from "../data/dummy-data"
import Colors from "../constants/colors"
import CategoryGridItem from "../components/CategoryGridItem"
import { Ionicons } from "@expo/vector-icons"


const CategoriesScreen=(props)=>{

  const renderGridItem=(itemData)=>{

    return <CategoryGridItem 
               title={itemData.item.title} 
               color={itemData.item.color}
               onSelect={()=>props.navigation.navigate({
      routeName:"CategoryMeals",
      params:{
        id:itemData.item.id
        }})}/>
}


    return ( <FlatList 
                keyExtractor={(item,index)=>item.id} 
                numColumns={2} 
                data={CATEGORIES} 
                renderItem={renderGridItem} 
            />)
}
 
CategoriesScreen.navigationOptions =(navData)=> ({
  headerTitle:'Meal Categories',
  headerStyle:{
    backgroundColor:Colors.primary 
  },
  headerTintColor: "white",
  headerLeft:()=>{
    return (
     <TouchableOpacity style={styles.iconBox} onPress={()=>{
      navData.navigation.toggleDrawer()
     }}>
      <Ionicons name="ios-menu" size={36} color="black" />
     </TouchableOpacity>)
  }
})

const styles=StyleSheet.create({
 
    screen:{
         flex:1,
         justifyContent:"center",
         alignItems:"center"
     },
   
   iconBox:{
    marginHorizontal:15,
    justifyContent:"center",
    alignItems:"center"
   }
})

export default  CategoriesScreen