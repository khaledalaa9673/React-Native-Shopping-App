import React, { useState }  from 'react';
import { StyleSheet,View,Text,StatusBar,SafeAreaView} from 'react-native';
import * as fonts from "expo-font"
import {AppLoading} from "expo" 
import MainNavigator from "./navigation/MealsNavigator"
import {createStore,combineReducers} from 'redux'
import {Provider} from  "react-redux"
import mealsReducer from "./reducer/mealsReducer"


const rootReducer=combineReducers({
  meals:mealsReducer
})

const store=createStore(rootReducer)
 
const fetchFonts=()=>{
 return fonts.loadAsync({
   "OpenSans":require("./assets/fonts/OpenSans-Regular.ttf"),
   "OpenSans-bold":require("./assets/fonts/OpenSans-Bold.ttf")
  })
}
 
 
export default function App() {
  const [fontLoaded,setFontLoaded]=useState(false)
   if(!fontLoaded){
     return <AppLoading 
       startAsync={fetchFonts} 
       onFinish={()=>setFontLoaded(true)}
       onError={(error)=>console.error(error)}
     />
   }
 
 
  return <Provider store={store}><MainNavigator /></Provider>

  }
const styles = StyleSheet.create({
  container: {
    flex:1
     
  }, 
  
});
