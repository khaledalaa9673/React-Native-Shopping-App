import React   from 'react';
import { Text,StyleSheet ,View,Button,Image} from 'react-native';
import { useSelector,useDispatch } from 'react-redux';
import   Colors   from "../../constants/Colors"
 import {addToCart} from "../../store/actions/cart"


 
const ProductDetailScreen = props => {
  const dispatch=useDispatch()

  const {navigation}=props
    const id=navigation.getParam("id")
    const product = useSelector(state => state.products.availableProducts.find(product=>product.id===id));
 
  

   return (
    <View style={styles.screen}>
      <View style={styles.imageContainer}>
      <Image  style={styles.image} source={{uri:product.imageUrl}}  />
      </View>
      <View style={styles.btn}>
      <Button onPress={()=>dispatch(addToCart(product))}
       style={{width:"100%",height:"100%"}}
       title="Add To Cart" color={Colors.primary} /> 
      </View>
 
     <View style={styles.info}>
      <Text style={styles.price}>${product.price.toFixed(2)}</Text>
      <Text style={styles.descrip}>{product.description}</Text>
     </View>
  


    </View>
  );
};

ProductDetailScreen.navigationOptions = (navData)=>{
  const title=navData.navigation.getParam("title")
 
  return {
   headerTitle:title
  }
}
 
const styles=StyleSheet.create({
  screen:{
    flex:1,
 
  },
  imageContainer:{
    width:"100%",
    height:300,
    
    
  },
  image:{
    width:"100%",
    height:"100%",
  },
  price:{
    fontSize:18,
    opacity:.7
},

descrip:{
    fontSize:20
},
info:{
  width:"100%",
  height:"10%",
  alignItems:"center"
},
btn:{
  width:"100%",
  height:"10%",
 

}
 
  
 
})



export default ProductDetailScreen;
