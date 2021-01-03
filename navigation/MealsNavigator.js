import React from "react"
import {Platform} from "react-native"
import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from  "react-navigation-stack"
import {createBottomTabNavigator} from "react-navigation-tabs"
import CategoriesScreen from "../screens/CategoriesScreen"
import CategoryMealsScreen from "../screens/CategoryMealsScreen"
import MealDetailScreen from "../screens/MealDetailScreen"
import FavoritesScreen from "../screens/FavoritesScreen";
import FiltersScreen from "../screens/FiltersScreen"
import { Ionicons } from "@expo/vector-icons"
import {createMaterialBottomTabNavigator} from "react-navigation-material-bottom-tabs"
import { createDrawerNavigator } from 'react-navigation-drawer';
import colors from "../constants/colors"  




const  MealsNavigator=createStackNavigator({
    Categories:CategoriesScreen,
    CategoryMeals:CategoryMealsScreen,
    MealDetail:MealDetailScreen
})

const FavNavigator=createStackNavigator({
  Favorites:FavoritesScreen,
  MealDetail:MealDetailScreen
})


const config= {
    Meals:{
        screen:MealsNavigator,
        navigationOptions:{
          tabBarIcon:(tabInfo)=>(<Ionicons name="ios-restaurant" size={28} color={tabInfo.tintColor}  />),
          tabBarColor:colors.primary
        }
    },
    Favorites:{
        screen:FavNavigator,navigationOptions:{
          
          tabBarLabel:"Favorites!",
          tabBarColor:colors.accent,
          tabBarIcon:(tabInfo)=><Ionicons name="ios-star" size={28} color={tabInfo.tintColor}   />
        }
    }
  }

const MealsFavTabNavigator=Platform.os=== "android" ?
 createMaterialBottomTabNavigator(config, {
  activeTintColor: 'white',
  shifting: true,
  barStyle: {
    backgroundColor: colors.primary
  }
}) : createBottomTabNavigator(config,{
  tabBarOptions: {
    activeTintColor: colors.accent
  }
})
const FilterNavigator=createStackNavigator({
   
  FiltersScreen:FiltersScreen,
   
})
const  MainNavigator= createDrawerNavigator({
  Categories:MealsFavTabNavigator,
  Filters:FilterNavigator,
   
})

export default createAppContainer(MainNavigator)