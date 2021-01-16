import {ADD_TO_CART,DELETE_ITEM} from "../actions/cart"
import CartItem from "../../models/Cart-Item"
import { ADD_ORDER } from "../actions/orders";
 
import {DELETE_PRODUCT} from "../actions/products"


const initialState={
    items:{},
    totalSum:0
}

const cartReducer=(state=initialState,action)=>{
 switch (action.type) {
     case ADD_TO_CART:
         const product=action.product
         const productPrice=product.price
         const productTitle=product.title
         if(state.items[product.id]){
            const updateItem= new CartItem(state.items[product.id].quantity+1,productPrice,productTitle,
                state.items[product.id].sum+productPrice
                )  
                return{
                    ...state,
                    items:{
                        ...state.items,[product.id]:updateItem
      
                    },
                    totalSum:state.totalSum+productPrice
                }
         }else {
          const NewItem=new CartItem(1,productPrice,productTitle,productPrice)
          return {
              ...state,
              items:{
                  ...state.items,[product.id]:NewItem

              },
              totalSum:state.totalSum+productPrice
          }
         }
     case DELETE_ITEM:
       
         const item=state.items[action.id]
         const count=state.items[action.id].quantity
          
        if(count > 1){
           const   updateItem=new CartItem(
            item.quantity -1,
            item.productPrice ,
            item.productTitle,
            item.sum-item.productPrice
          )
          
          return {
            ...state,
            items:{
                ...state.items,[action.id]:updateItem

            },
            totalSum:state.totalSum-updateItem.productPrice
        }

        }else{
          const     updateItems={...state.items}
           const price=updateItems[action.id].productPrice
            delete updateItems[action.id]
            return {
                ...state,
                items:{
                    ... updateItems
    
                },
                totalSum:state.totalSum-price
            }
        }
       
        case ADD_ORDER:
            return initialState  
        
        case DELETE_PRODUCT:   
         if(!state.items[action.id]){
            return state
         } 
         const     updateItems={...state.items}
         const total=updateItems[action.id].sum
          delete updateItems[action.id]
          return {
              ...state,
              items:{
                  ... updateItems
  
              },
              totalSum:state.totalSum-total
          }

     default:
         return state
 }
}
export default cartReducer