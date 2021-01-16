export const ADD_ORDER="ADD_ORDER"
export const SET_ORDERS='SET_ORDERS'
import Order from "../../models/order"


export const fetchOrders=()=>{
  return async (dispatch,getState)=>{
    const token=getState().auth.token
    const id=getState().auth.userId
     try {
      const response=await fetch(`https://rn-shop-app-a2cb8-default-rtdb.firebaseio.com/orders/${id}.json`) 
    if(!response.ok){
      throw new Error("something went wrong")
    }
  
      const resData= await response.json()
      
      const loadedorders=[]
      for(const key in resData){
        loadedorders.push(new Order(key,resData[key].items,resData[key].amount,resData[key].date))
      }
    
      dispatch({
        type:SET_ORDERS,
         orders:loadedorders
      })
     } catch (error) {
       throw error
     }
    }
  }
  
export const addOrder=(items,amount)=>{
    return async (dispatch,getState)=>{
     const token=getState().auth.token
     const id=getState().auth.userId
     console.log(id)
      const date=new Date()
   const response=await fetch(`https://rn-shop-app-a2cb8-default-rtdb.firebaseio.com/orders/${id}.json?auth=${token}`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json" 
      },
      body:JSON.stringify({
        items,
        amount,
        date:date.toISOString()
      })
    })
    if(!response.ok){
        throw new Error("something went wrong12 ")
    }
    const resData= await response.json()
   dispatch ({
        type:ADD_ORDER,
         orderData:{
             id:resData.name,
             items,
             amount,
             date: date,
            
         }
         })
    }
}
