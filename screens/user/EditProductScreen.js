import React, { useEffect, useReducer,useCallback,useState }  from 'react';
import { View ,Text,ScrollView, StyleSheet,TouchableOpacity, Alert, KeyboardAvoidingView,ActivityIndicator} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Ionicons } from '@expo/vector-icons'; 
import * as productsActions from '../../store/actions/products';
import Input from "../../components/Input"
import   Colors   from "../../constants/Colors"

const FORM_UPDATE="FORM_UPDATE"

const FormReducer=(state,action)=>{
  if(action.type === FORM_UPDATE){
   const updatedValues={
     ...state.inputValues,
     [action.input]:action.value
   }
   const updatedValidities={
     ...state.inputValidities,
     [action.input]:action.isValid
   }
   let updatedIsValid=true
   for(let key in updatedValidities){
    updatedIsValid=updatedIsValid && updatedValidities[key]
   }
   return {
     formIsValid:updatedIsValid,
     inputValues:updatedValues,
     inputValidities:updatedValidities
   }
  } 
  return state
}

const EditProductScreen = props => {
  const [isLoading,setIsLoading]=useState(false)
  const [error ,setError]=useState()
  const dispatch = useDispatch();
  let id= props.navigation.getParam("id")
  let product

  if(id){
    
  
 product=useSelector(state=>state.products.userProducts.find(product=>product.id === id))
  }
  useEffect(()=>{
    if(error){
      Alert.alert("error",error,["okay"])
    }
  },[error])
  const [fromState,dispatchFormState]=useReducer(FormReducer,{
    inputValues:{
    title:product ? product.title : "",
    imageUrl:product ? product.imageUrl : "",
    description:product ? product.description : "",
    price:""
    },
    inputValidities:{
     
    title:product ? true: false,
    imageUrl:product ? true : false,
    description:product ? true : false,
    price: product ? true : false
    },
    formIsValid:product ? true : false
  })
   

  const submitHandler = useCallback(async() => {
    if(!fromState.formIsValid){
     Alert.alert("Wrong Input","please enter valid input",[{text:"Okay"}])
      return
    }
    setError(null)
    setIsLoading(true)
   try {
    if (product) {
      await dispatch(
         productsActions.updateProduct(id, fromState.inputValues.title,fromState.inputValues.description,fromState.inputValues.imageUrl)
       );
     } else {
      await dispatch(
         productsActions.createProduct(fromState.inputValues.title,fromState.inputValues.description,fromState.inputValues.imageUrl, +fromState.inputValues.price)
       );
     }
     props.navigation.goBack()
   } catch (error) {
     setError(error.message)
   }
    setIsLoading(false)
  
  }, [dispatch, id,fromState]);
useEffect(()=>{
  props.navigation.setParams({"submit":submitHandler})
},[submitHandler])

const inputChangeHandler=useCallback((inputIdentifier,inputValue,inputValidity)=>{
     
    dispatchFormState({
      type:FORM_UPDATE,
      value:inputValue,
      isValid:inputValidity,
      input:inputIdentifier
    })
},[dispatchFormState])
 
if(isLoading){
  return <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
    <ActivityIndicator color={Colors.primary} size="large" />
  </View>
}

  return (
   <KeyboardAvoidingView style={{flex:1}}  >
     <ScrollView> 
    <View style={styles.form}>
         <Input 
          id="title" // we make this id instead of bind because it bind with every render cycle so it make infinite loop  so when i make focus in on input it work but when ui switch to another input it donot work and actually make the back button of the navigation stp working and this bind fuction actually the call back nerver effect on it because it makes bind with every render cycle
          label="title"
          errorText="please enter a valid title"
          keyboardType="default"
          autoCapitalize="sentences"
          autoCorrect
          returnKeyType="next"
          onInputChange={inputChangeHandler}
          initialValue={product ? product.title :""}
          initiallyValid={!!product}
          required
         />
           <Input 
          id="imageUrl" // we make this id instead of bind because it bind with every render cycle so it make infinite loop  so when i make focus in on input it work but when ui switch to another input it donot work and actually make the back button of the navigation stp working and this bind fuction actually the call back nerver effect on it because it makes bind with every render cycle
          label="image Url"
          errorText="please enter a valid image url"
          keyboardType="default"
          returnKeyType="next"
          initialValue={product ? product.imageUrl :""}
          initiallyValid={!!product}
          required
          onInputChange={inputChangeHandler}
          
         />
         {!product &&  <Input 
          id="price" // we make this id instead of bind because it bind with every render cycle so it make infinite loop  so when i make focus in on input it work but when ui switch to another input it donot work and actually make the back button of the navigation stp working and this bind fuction actually the call back nerver effect on it because it makes bind with every render cycle
          label="price"
          errorText="please enter a valid price "
          keyboardType="decimal-pad"
          returnKeyType="next"
          required
          min={0.1}
          onInputChange={inputChangeHandler}
         />}
          <Input 
          id="description"
          label="description"
          errorText="please enter a valid description "
          keyboardType="default"
          autoCapitalize="sentences"
          autoCorrect
          multiline
          numberOfLines={3}
          initialValue={product ? product.description :""}
          initiallyValid={!!product}
          required
          onInputChange={inputChangeHandler}
         />
         
         
        
         
        
    </View>    
   </ScrollView> 
   </KeyboardAvoidingView>
  );
};

EditProductScreen.navigationOptions =(navData) =>{
  const submit=navData.navigation.getParam("submit")
  return {
  headerTitle: navData.navigation.getParam("id") ? 'Eidt Product' :"Add Product",
  headerRight:()=>{
    return (
      <TouchableOpacity style={{marginRight:20}} onPress={submit}>
        <Ionicons name="ios-checkmark" size={36} color="white" />
      </TouchableOpacity>
    )
  },
}

}

const styles=StyleSheet.create({
  form:{
    margin:20,

  },
  

})

export default EditProductScreen;
