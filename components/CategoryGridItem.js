import React from "react"
import {View,Text,StyleSheet,TouchableOpacity,TouchableNativeFeedback,Platform} from "react-native"



 const CategoryGridItem=(props)=>{

    let TouchableCmp=TouchableOpacity
    if(Platform.OS === "android" && Platform.Version >=21){
        TouchableCmp=TouchableNativeFeedback
    }

    return (
       
            <View  style={styles.gridItem} >
                <TouchableCmp 
                    style={{flex:1}}
                    onPress={()=>props.onSelect()}>
                  <View style={{...styles.container,...{backgroundColor:props.color,opacity:.8}}} >
                  <Text style={styles.title} numberOfLines={2}>{props.title}</Text>
                  </View>
                </TouchableCmp>
            </View>
          )
    
 }
 const styles=StyleSheet.create({
    gridItem:{
        flex:1,
        margin:15,
        height:150  
      } ,
      container:{
          flex:1,
          borderRadius:10,
          shadowColor:"black",
          shadowOpacity:.26,
          shadowOffset:{width:0,height:2},
          shadowRadius:10,
          elevation:3,
          justifyContent:"flex-end",
          alignItems:"flex-end",
          padding:10
      },
      title:{
          fontFamily:"OpenSans-bold",
          fontSize:22,
          textAlign:"right"
      }
 })

 export default  CategoryGridItem