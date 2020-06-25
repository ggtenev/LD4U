import React from "react";
import { View, FlatList, Text, StyleSheet,TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Product from "../../components/Product";
import { Ionicons } from '@expo/vector-icons';

import * as cartActions from '../../store/actions/cart'

export default function ProductsOverview() {
  const products = useSelector((state) => state.products.availableProducts);
  const dispatch = useDispatch()

  return (
    <View >
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Product
            title={item.title}
            img={item.imageUrl}
            price={item.price}
            description={item.description}
            addToCart ={() => dispatch(cartActions.addToCart(item))}
          />
        )}
      />
    </View>
  );
}

ProductsOverview.navigationOptions = ({navigation}) => {
  return {
    title:'Products',
    headerRight:() => (
      <TouchableOpacity style={{ marginRight: 10 }} onPress={() => navigation.navigate('Cart')}>
         <Ionicons name="md-cart" size={32} color={Platform.OS ==='android' ? 'white':'#888'} />
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  items: {
    alignItems: "center",
  },
});
