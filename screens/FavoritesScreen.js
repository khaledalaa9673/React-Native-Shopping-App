
import React from "react"
import {View,Text,StyleSheet,Button,FlatList,TouchableOpacity} from "react-native"
import {CATEGORIES} from "../data/dummy-data" 
import MealItem from "../components/MealItem"
import Colors from "../constants/colors"
import { Ionicons } from "@expo/vector-icons"

import { useSelector } from "react-redux"







const FavoritesScreen=(props)=>{
    const renderMealItem=(itemDate)=>{
        return <MealItem 
                  title={itemDate.item.title}
                  duration={itemDate.item.duration}
                  complexity={itemDate.item.complexity}
                  affordability={itemDate.item.affordability}
                  image={itemDate.item.imageUrl}
                  onSelectMeal={()=>{
                      props.navigation.navigate({routeName:"MealDetail",params:{
                          id:itemDate.item.id
                      }})
                  }}
                  
                  />
    
            
        
    }  
    const FavMEALS=useSelector(state=>state.meals.favoritedMeals)
      
    return (
        <View style={styles.screen}>
             <FlatList 
               keyExtractor={(item,index)=>item && item.id}
               data={FavMEALS} renderItem={renderMealItem}
               style={{width:"95%" }}
               />
        </View>
    )
 }
 FavoritesScreen.navigationOptions=(navigationData)=>{
    const id=navigationData.navigation.getParam("id")
    const selectCategory=CATEGORIES.find(cat=>cat.id===id)

    return {
        headerTitle:"Favorites Meals",
        headerLeft:()=>{
            return (
             <TouchableOpacity style={styles.iconBox} onPress={()=>{
                navigationData.navigation.toggleDrawer()
             }}>
              <Ionicons name="ios-menu" size={36} color="black" />
             </TouchableOpacity>)
          }
       
        }

 }

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

 export default FavoritesScreen  