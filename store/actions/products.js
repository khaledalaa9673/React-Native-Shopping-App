import Product from "../../models/product"
export const DELETE_PRODUCT="DELETE_PRODUCT"
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCTS="SET_PRODUCTS"

export const fetchProducts=()=>{
  return async (dispatch,getState) =>{
    const id=getState().auth.userId
   try {
    const response=await fetch("https://rn-shop-app-a2cb8-default-rtdb.firebaseio.com/products.json") 
  if(!response.ok){
    throw new Error("something went wrong")
  }

    const resData= await response.json()
    const loadedProducts=[]
    for(const key in resData){
      loadedProducts.push(
        new Product(key,
          resData[key].ownerId,
          resData[key].title,
          resData[key].imageUrl,
          resData[key].description,
          resData[key].price))
    }
    dispatch({
      type:SET_PRODUCTS,
      products:loadedProducts.filter(prod=>prod.ownerId !== id) ,
      userProducts:loadedProducts.filter(prod=>prod.ownerId === id)
    })
   } catch (error) {
     throw new Error(error.message)
   }
  }
}

export const deleteProduct=(id)=>{
  
  return async (dispatch,getState)=>{
    const token=getState().auth.token
     const response= await fetch(`https://rn-shop-app-a2cb8-default-rtdb.firebaseio.com/products/${id}.json?auth=${token}`,{
        method:"DELETE",
        
        
      })
      if(!response.ok){
        throw new Error("something went wrong")
      }
    return dispatch({
      type:DELETE_PRODUCT,
      id
  })
}}
export const createProduct = (title, description, imageUrl, price) => {
  return async (dispatch,getState)=>{
    const token=getState().auth.token
    const id=getState().auth.userId
    const response=await fetch(`https://rn-shop-app-a2cb8-default-rtdb.firebaseio.com/products.json?auth=${token}`,{
      method:"Post",
      headers:{
        "Content-Type":"application/json" // to let the firebase know that we will send a json data
      },
      body:JSON.stringify({
        title,
        imageUrl,
        price,
        description,
        ownerId:id
      })
      // the body property used to put the data that should send it request and it shhoud be in json format and java script givs us a way to transfer onjects and array to json format but JSON.stringify 
    })// here we can put  then and pass func with response argument which will carry the name propert then we access name   on response(argu)and catch with error argu in the passed function of catch  in that argu instead of async await which we should put await with it statement of the request on variable and then access response.name which carry the id of the  posted data 
     // if we pass object witout stringify we can acces .name on data on argu which pass in then fun and if we  use strigif and pass we access name on the result of response .json fun
    /* we can pass the object without json stringify or json() and pass it ordinary if we used axios  or by fetch and store it   */
   // to be more clear we can console.log the response
     // use to transfer json format to object and we jus await with it it takes time 
    if(response.ok){
      const resData= await response.json()
      dispatch ({
        type: CREATE_PRODUCT,
        productData: {
          id:resData.name,
          title,
          description,
          imageUrl,
          price,
          ownerId:id
        }
      })
    }
   
  }
}
  
  export const updateProduct = (id, title, description, imageUrl) => {
 
    return async (dispatch,getState)=>{
      const token=getState().auth.token
    const response=   await fetch(`https://rn-shop-app-a2cb8-default-rtdb.firebaseio.com/products/${id}.json?auth=${token}`,{
        method:"PATCH",
        headers:{
          "Content-Type":"application/json" // to let the firebase know that we will send a json data
        },
        body:JSON.stringify({
          title,
          imageUrl,
          description
        })
      })
      if(!response.ok){
        throw new Error("something went wrong")
      }
    return dispatch ({
      type: UPDATE_PRODUCT,
       id: id,
      productData: {
        title,
        description,
        imageUrl,
      }
    })
  }}