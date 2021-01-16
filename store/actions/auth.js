import AsyncStorage from '@react-native-async-storage/async-storage';
 
export const AUTHENTICATE="AUTHENTICATE"
export const LOGOUT='LOGOUT'
let timer
const clearLogoutTimer=()=>{
    if(timer){
        clearTimeout(timer)
    }
}
export const logout=()=>{
   
    clearLogoutTimer()
    AsyncStorage.removeItem("userData")
    
    return {type:LOGOUT}
}

const setLogoutTimer=(expirationTime)=>{
 
    return dispatch=>{
       timer= setTimeout(() => {
          
     dispatch(logout())           
    }, expirationTime/500 );
 
    }
}

export const authenticate=(token,userId,expirationDate)=>{
    return dispatch=>{
      dispatch(setLogoutTimer(expirationDate))
      dispatch(  {
        type:AUTHENTICATE,
        token:token,
        userId:userId
    })
    }
}

export const signUp=(email,password)=>{
    return async dispatch =>{
     const response=  await fetch("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCBZDya8IR8kwTD0WcgVuBjnSmbpFzf7QE",{
            method:"POST",
            "Content-Type": "application/json",
            body:JSON.stringify({
                email:email,
                password:password,
                returnScureToken:true
            })
        })
        if(!response.ok){
            const errorResData= await response.json()
          const errorId=errorResData.error.message
         let message="something went wrong !!"
         if(errorId === "EMAIL_EXISTS"){
             message="the email exists already"
         
         }
         throw new Error(message)
        }
        const resData= await response.json()
         
        dispatch(authenticate(resData.idToken,resData.localId,parseInt(resData.expiresIn)*1000))
   
        const expirationDate=new Date(new Date().getTime()+parseInt(resData.expiresIn)*1000)
        saveDataToStorage(resData.idToken,resData.localId,expirationDate)
    }
}

export const login=(email,password)=>{
    return async dispatch =>{
     const response=  await fetch("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCBZDya8IR8kwTD0WcgVuBjnSmbpFzf7QE",{
            method:"POST",
            "Content-Type": "application/json",
            body:JSON.stringify({
                email:email,
                password:password,
                returnScureToken:true
            })
        })
        if(!response.ok){
            const errorResData= await response.json()
          const errorId=errorResData.error.message
         let message="something went wrong !!"
         if(errorId === "EMAIL_NOT_FOUND"){
             message="the email could not be found please sign up"
         }else if (errorId=== "INVALID_PASSWORD") {
             message= "the password is not valid"
         }
         throw new Error(message)

        }
        const resData= await response.json()
        console.log(resData )
        dispatch(authenticate(resData.idToken,resData.localId,parseInt(resData.expiresIn)*1000))
        const expirationDate=new Date(new Date().getTime()+parseInt(resData.expiresIn)*1000)
        saveDataToStorage(resData.idToken,resData.localId,expirationDate)
        
    }
}
const saveDataToStorage=(token,userId,expiryDate)=>{
    AsyncStorage.setItem("userData",JSON.stringify({
        token:token,
        userId:userId,
        expiryDate:expiryDate.toISOString()
    }))
}

