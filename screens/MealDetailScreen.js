import React, { useCallback, useEffect } from "react"
import {View,Text,StyleSheet,TouchableOpacity, Image,ScrollView} from "react-native"
import Colors from "../constants/colors"
import { Ionicons } from "@expo/vector-icons"
import {useSelector,useDispatch} from "react-redux"
import {toggleFavorite} from "../actions/meals"

  




 const MealDetailScreen=(props)=>{
    const id= props.navigation.getParam("id") 
    const MEALS=useSelector(state=>state.meals.filteredMeals)
    const mealDetail=MEALS.find(meal=>meal.id ===id)
    const currentMealIsFavorite = useSelector(state =>
        state.meals.favoritedMeals.some(meal => meal.id === id)
      );
    /*useEffect(()=>{
        props.navigation.setParams({
            mealTitle:mealDetail.title
        })
    },[mealDetail]) we put it inside useEffect because it change the props so makes infinite loop */
    const dispatch=useDispatch()
    const toggleFavoriteHandler= useCallback(()=>{
        dispatch(toggleFavorite(id))
    },[dispatch,id])

    useEffect(()=>{
        props.navigation.setParams({
            toggleFav:toggleFavoriteHandler
        })
    },[toggleFavoriteHandler])
    useEffect(() => {
        props.navigation.setParams({ isFav: currentMealIsFavorite });
      }, [currentMealIsFavorite]);
    return (
        <ScrollView >
         <View style={styles.screen} >
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={{uri:mealDetail.imageUrl}}/>
            </View>
            <View  style={styles.detailRow} >
                <Text>{mealDetail.duration}m</Text>
                <Text>{mealDetail.complexity.toUpperCase()}</Text>
                <Text>{mealDetail.affordability.toUpperCase()}</Text>
            </View>
            <View style={styles.header}>
                <Text style={styles.text}> Ingredients</Text>
            </View>
            {mealDetail.ingredients.map(meal=>{
                return (
                    <View key={meal} style={styles.box} ><Text>{meal}</Text></View>
                )
            })}
             <View style={styles.header}>
                <Text style={styles.text}>Steps</Text>
            </View>
            {mealDetail.steps.map(meal=>{
                return (
                    <View  key={meal} style={styles.box} ><Text>{meal}</Text></View>
                )
            })}
         </View>
        </ScrollView>
    )
 }
 MealDetailScreen.navigationOptions=(navigationData)=>{
    const title=navigationData.navigation.getParam("mealTitle")
    const toggleFavHandler=navigationData.navigation.getParam("toggleFav") 
    
    const isFavorite = navigationData.navigation.getParam('isFav');


     return {
         headerTitle: title,
         headerRight:()=>{
             console.log(isFavorite,"ss")
             return ( <TouchableOpacity style={styles.iconBox} onPress={toggleFavHandler}>
                   <Ionicons  name={isFavorite ?"ios-star":"ios-star-outline"} size={24} color="black" />
                
                    </TouchableOpacity>
             )     
        },
         headerStyle:{
            backgroundColor:Colors.primary ,
            
          },
          
          headerTintColor: "white",
          
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
     },
     imageContainer:{
         
         width:"100%",
         height:300

     },
     detailRow:{
      width:"100%",
      flexDirection:"row",
      justifyContent:"space-around",
      alignItems:"center"
     },
     image:{
        width:"100%",
        height:"100%"
     },
     header:{
         flex:1,
         justifyContent:"center",
         alignItems:"center",
     },
     text:{
        fontFamily:"OpenSans-bold",
        fontSize:20
     },
     box:{
     width:"90%",
     borderWidth:1,
     padding:5,
     marginVertical:10
      
     }
 })

export default  MealDetailScreen