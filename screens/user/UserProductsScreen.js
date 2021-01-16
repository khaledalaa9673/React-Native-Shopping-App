import React  from 'react';
import { FlatList ,View,TouchableOpacity,Button} from 'react-native';
import { useSelector,useDispatch } from 'react-redux';
import ProductItem from "../../components/ProductItem"
import {addToCart} from "../../store/actions/cart"
import { Ionicons } from '@expo/vector-icons'; 
import   Colors   from "../../constants/Colors"
import {deleteProduct} from "../../store/actions/products"


const UserProductsScreen = props => {
  const dispatch=useDispatch()
  const products = useSelector(state => state.products.userProducts);
  console.log(products)
  return (
    <View  >
      <FlatList
      data={products}
      keyExtractor={item => item.id}
      renderItem={itemData => 
      <ProductItem 
       title={itemData.item.title}
       image={itemData.item.imageUrl}
       price={itemData.item.price}
       onSelect={()=>{}}

       >

          <Button title="Edit" color={Colors.primary} onPress={()=>{
              props.navigation.navigate("Edit",{
                  id:itemData.item.id
              })
          }}/> 
          <Button  title="Delete" color={Colors.primary} onPress={()=>{
              dispatch(deleteProduct(itemData.item.id))
          }}/> 
       </ProductItem>
      }
    />
    </View>
  );
};

UserProductsScreen.navigationOptions =(navData) =>({
  headerTitle: 'My Products',
  headerLeft:()=>{
    return (
      <TouchableOpacity style={{marginLeft:20}} onPress={() => {
        navData.navigation.toggleDrawer()}}>
         <Ionicons name="ios-menu" size={36} color="white" />
      </TouchableOpacity>
    )
   },
   headerRight:()=>{
    return (
      <TouchableOpacity style={{marginRight:20}} onPress={() => {
        navData.navigation.navigate("Edit")    }}>
         <Ionicons name="ios-create" size={30} color="white" />
      </TouchableOpacity>
    )
   },
  

})

 



export default UserProductsScreen;
