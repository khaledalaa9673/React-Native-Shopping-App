import React from "react"
import {View,Text,StyleSheet,Button,FlatList} from "react-native"
import {CATEGORIES} from "../data/dummy-data" 
import MealItem from "../components/MealItem"
import Colors from "../constants/colors"
import { useSelector } from "react-redux"

 

const CategoryMealsScreen=(props)=>{
    const renderMealItem=(itemDate)=>{
        return <MealItem 
                  title={itemDate.item.title}
                  duration={itemDate.item.duration}
                  complexity={itemDate.item.complexity}
                  affordability={itemDate.item.affordability}
                  image={itemDate.item.imageUrl}
                  onSelectMeal={()=>{
                      props.navigation.navigate({routeName:"MealDetail",params:{
                          id:itemDate.item.id,
                          mealTitle:itemDate.item.title
                      }})
                  }}
                  
                  />
 
    }  

  const id=props.navigation.getParam("id")
  const availableMeals=useSelector(state=>state.meals.filteredMeals)
  const displayMeals=availableMeals.filter(meal=>meal.categoryIds.indexOf(id) >= 0)

    return (
        <View style={styles.screen}>
             <FlatList 
               keyExtractor={(item,index)=>item.id}
               data={displayMeals} renderItem={renderMealItem}
               style={{width:"95%" }}
               />
        </View>
    )
 }
 CategoryMealsScreen.navigationOptions=(navigationData)=>{
    const id=navigationData.navigation.getParam("id")
    const selectCategory=CATEGORIES.find(cat=>cat.id===id)

    return {
        headerTitle:selectCategory.title,
       
        }

 }

 const styles=StyleSheet.create({
     screen:{
         flex:1,
         justifyContent:"center",
         alignItems:"center"
     }
 })

 export default CategoryMealsScreen  