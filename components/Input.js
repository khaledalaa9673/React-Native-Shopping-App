import React , {useEffect, useReducer} from 'react'
import {View,StyleSheet,Text,TextInput} from "react-native"
 
const INPUT_CHANGE="INPUT_CHANGE"
const INPUT_BLUR="INPUT_BLUR"

const inputReducer=(state,action)=>{
  switch (action.type) {
      case INPUT_CHANGE:
          return {
              ...state,
              value:action.value,
              isValid:action.isValid
          }
      case INPUT_BLUR: 
      return {
          ...state,
          touched:true
      }
      default:
         return state
  }
}

const Input=(props)=>{
 const [inputState,dispatch] = useReducer(inputReducer,{
    value:props.initialValue ? props.initialValue : "",
    isValid:props.initiallyValid,
    touched:false
 })

const {onInputChange,id}=props
 
  useEffect(()=>{
   onInputChange(id,inputState.value,inputState.isValid)
 },[onInputChange,inputState])


 const textChangeHandler=text=>{
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let isValid = true;
    if (props.required && text.trim().length === 0) {
      isValid = false;
    }
    if (props.email && !emailRegex.test(text.toLowerCase())) {
      isValid = false;
    }
    if (props.min != null && +text < props.min) {
      isValid = false;
    }
    if (props.max != null && +text > props.max) {
      isValid = false;
    }
    if (props.minLength != null && text.length < props.minLength) {
      isValid = false;
    }
    
  dispatch({type:INPUT_CHANGE,value:text,isValid:isValid})
 }

 const lostFocusHandler=()=>{
     dispatch({type:INPUT_BLUR})
 }
    return (
        <View style={styles.formControl}>
          <Text style={styles.label}>{props.label}</Text>
          <TextInput 
          {...props}
           value={inputState.value} 
           style={styles.input} 
          onChangeText={textChangeHandler}
          onBlur={lostFocusHandler}
          />
          {inputState.touched && !inputState.isValid  && <Text style={{color:"red"}}>{props.errorText}</Text>}
        </View>
    )
}
const styles=StyleSheet.create({
    formControl:{
        width:"100%"
      },
      label:{
        fontWeight:"bold",
        marginVertical:10,
        
      },
      input:{
        paddingHorizontal:2,
        paddingVertical:5,
        backgroundColor:"#eee",
        borderBottomWidth:1,
      }
}
)

export default Input