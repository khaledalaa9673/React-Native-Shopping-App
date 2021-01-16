import React ,{useEffect, useState}from "react"
import {ScrollView,View,KeyboardAvoidingView,StyleSheet,Button, ImageBackground, Alert,ActivityIndicator} from "react-native"
import { useDispatch } from "react-redux"
import { useCallback } from "react/cjs/react.development"
  
import Input from "../../components/Input"
import   Colors   from "../../constants/Colors"
import { signUp ,login} from "../../store/actions/auth"



const AuthScreen=(props)=>{

  const [email,setEmail]=useState("")
  const [emailValidity,setEmailValidity]=useState(false)
  const [password,setPassword]=useState("")
  const [passwordValidity,setPasswordValidity]=useState("")
  const [isSignUp,setIsSignUp]=useState(false)
  const [isLoading,setIsLoading]=useState(false)
  const [error,setError]=useState()
  const dispatch=useDispatch()
  useEffect(()=>{
    if(error){
      Alert.alert("Error",error,[{text:"okay"}]) 
      setIsLoading(false)
    }
  },[error])

   const  emailHandler=useCallback((id,email,isVaild)=>{
     setEmail(email)
     setEmailValidity(isVaild)
   
   },[setEmail,setEmailValidity])
    const passwordHandler=useCallback((id,password,isValid)=>{
        setPassword(password)
        setPasswordValidity(isValid)
   },[setPassword,setPasswordValidity])

   const authHandler= async ()=>{ 
       if( !emailValidity || !passwordValidity){
         Alert.alert("Wrong Input","plese enter vailid email and password",[{text:"okay"}])   
    
        return
       }
       setError(null)
       setIsLoading(true)
        try {
          if(isSignUp){
          
           await dispatch(signUp(email,password))
            
           props.navigation.navigate("shop")
          }else{
            setIsLoading(true)
          await  dispatch(login(email,password))
          setIsLoading(false)
          props.navigation.navigate("shop")
          }
        } catch (error) {
          setError(error.message)
        }
      
    }
    return (
 
     <KeyboardAvoidingView behavior="height" keyboardVerticalOffset={50} style={styles.screen} >
        <ImageBackground style={{width:"100%",height:"100%",alignItems:"center",justifyContent:"center"}} source={{uri:"https://media.istockphoto.com/photos/shopping-online-concept-shopping-service-on-the-online-web-with-by-picture-id1133980246"}}>

          <View style={styles.authContainer} >
            <ScrollView>
                <Input 
                 id="email"  
                 label="E-Mail"
                 errorText="please enter a valid e-mail"
                 keyboardType="default"
                 autoCapitalize="none"
                 returnKeyType="next"
                 onInputChange={emailHandler}
                 initialValue=""
                 required
                 email
                />
                  <Input 
                 id="password"  
                 label="Password"
                 errorText="please enter a vaild password"
                 keyboardType="default"
                 autoCapitalize="none"
                 onInputChange={passwordHandler}
                 initialValue=""
                 required
                 secureTextEntry
                 minLength={5}
 
                />
              
                 <View style={styles.btn}>
                  {isLoading ? <ActivityIndicator size="small" color={Colors.primary}  /> : 
                  
                  <Button  title={isSignUp ? "sign up" :"login"} onPress={authHandler}   />
                  }
                   
                 </View>
                 <View style={styles.btn}>
                    <Button  title={`Switch to ${isSignUp ? " login": "sign up "}`}  onPress={()=>{
                      setIsSignUp(s=>!s)
                    }}    />
                 </View>
                 

                     
                

            </ScrollView>
        </View>
        </ImageBackground>
    </KeyboardAvoidingView>
   
    )
}
AuthScreen.navigationOptions={
    headerTitle:"Sign in" ,
    headerStyle:{
        backgroundColor:Colors.primary,
        
    }
  
}
const styles=StyleSheet.create({
  screen:{
      
      flex:1,
      alignItems:"center",
      justifyContent:"center",
     
  },
  authContainer:{
      width:"80%",
      maxWidth:400,
      maxHeight:500,
      shadowColor:"black",
      shadowOffset:{width:0,height:2},
      shadowOpacity:0.1,
      shadowRadius:8,
      elevation:4,
      padding:10,
      borderRadius:10,
      
  },
  btn:{
      marginTop:10
  }
})
export default AuthScreen