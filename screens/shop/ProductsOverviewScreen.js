import React, { useEffect,useState }  from 'react';
import { FlatList ,View,TouchableOpacity,Button, Text,ActivityIndicator} from 'react-native';
import { useSelector,useDispatch } from 'react-redux';
import ProductItem from "../../components/ProductItem"
import {addToCart} from "../../store/actions/cart"
import { Ionicons } from '@expo/vector-icons';  
import   Colors   from "../../constants/Colors"
import {fetchProducts} from "../../store/actions/products"
import { useCallback } from 'react/cjs/react.development';
 

const ProductsOverviewScreen = props => {
  const [isLoading,setIsLoading]=useState(false)
  const [error ,setError]=useState()
  const [isRefreshing,setIsRefreshing]=useState(false)
  const dispatch=useDispatch()
  const products = useSelector(state => state.products.availableProducts);

  const loadedProducts=useCallback(async()=>{
    setError(null)
    setIsRefreshing(true)
   try {
     await dispatch(fetchProducts())
   } catch (error) {
     setError(error.message)
   }
   setIsRefreshing(false)
  },[dispatch,setError,setIsLoading])


useEffect(()=>{
  setIsLoading(true)
 loadedProducts().then(()=>{
  setIsLoading(false)
 })
  },[dispatch,loadedProducts])

  useEffect(()=>{ // it  work after the first render of the component that me we need to fetch the prodyuct by use effect for the first time
   const willFocusSub=  props.navigation.addListener("willFocus",loadedProducts)
   return ()=>{
     willFocusSub.remove()
   }
  },[loadedProducts])
    
if(error){
  return <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
    <Text>an error occurred</Text>
    <Button title="Try Again" color={Colors.primary} onPress={loadedProducts} />
  </View>
}
if(isLoading){
  return <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
    <ActivityIndicator color={Colors.primary} size="large" />
  </View>
}
if(!isLoading && products.length === 0 ){
  return <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
    <Text>there is no products</Text>
  </View>
}

  const onSelectItemHandler=(id,title)=>{
    props.navigation.navigate("ProductDetail",{
      id:id,
     title:title}) 

  }
  return (
 
      <FlatList
      onRefresh={loadedProducts}
      refreshing={isRefreshing}
      data={products}
      keyExtractor={item => item.id}
      renderItem={itemData => 
      <ProductItem 
       title={itemData.item.title}
       image={itemData.item.imageUrl}
       price={itemData.item.price}
       onSelect={ ()=>onSelectItemHandler(itemData.item.id,itemData.item.title)}
       

       >
         <Button title="View Details" color={Colors.primary} onPress={()=>onSelectItemHandler(itemData.item.id,itemData.item.title)}/> 
          <Button  title="To Cart" color={Colors.primary} onPress={()=>dispatch(addToCart(itemData.item))}/> 
       </ProductItem>
      }
    />
    
  );
};

ProductsOverviewScreen.navigationOptions =(navData) =>({
  headerTitle: 'All Products',
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
      <TouchableOpacity style={{marginRight:20}} onPress={()=>navData.navigation.navigate("cart")}>
        <Ionicons name="md-cart" size={36} color="white" />
      </TouchableOpacity>
    )
  },

})

 



export default ProductsOverviewScreen;
