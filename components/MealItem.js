import React from "react"
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ImageBackground
    ,Platform} from "react-native"



 const MealItem=(props)=>{

     

    return (
       
            <View style={styles.mealItem}>
                <TouchableOpacity activeOpacity={.8} onPress={props.onSelectMeal}>
                 <View >
                    <View style={{...styles.mealRow,...styles.mealHeader}}>
                        <ImageBackground source={{uri:props.image}} style={styles.bgImage} fadeDuration={100}>
                        <View style={styles.titleBox}><Text style={styles.title} numberOfLines={1}>{props.title}</Text></View>
                        </ImageBackground>
                    </View>
                    <View style={{...styles.mealRow,...styles.mealDetail}}>
                        <Text>{props.duration}m</Text>
                        <Text>{props.complexity.toUpperCase()}</Text>
                        <Text>{props.affordability.toUpperCase()}</Text>

                    </View>
                 </View>
                </TouchableOpacity>
                
            </View>
          )
    
 }
 const styles=StyleSheet.create({
   
   mealItem:{
       height:250,
       width:"100%",
       backgroundColor:"#ccc",  
       marginVertical:15,
       paddingBottom:10,
       borderRadius:10,
       overflow:"hidden"

   },
   mealRow:{
    flexDirection:"row",
    width:"100%"
    },
   mealHeader:{
       height:"92%",
      

   },
   mealDetail:{
    paddingHorizontal:10,
    justifyContent:"space-between",
    paddingTop:1

   },
   bgImage:{
       width:"100%",
       height:"100%",
       flexDirection:"row",
       alignItems:"flex-end",
      
       

   },
   titleBox:{
       width:"100%"
   },

   title:{
    textAlign:"center",
    backgroundColor:"rgba(0,0,0,.5)",
    padding:12,
    fontSize:20,
    fontFamily:"OpenSans-bold",
    color:"white",
    paddingVertical:5
   }
 })

 export default  MealItem