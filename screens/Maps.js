import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet,ActivityIndicator, ScrollView, Dimensions,TouchableOpacity } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import { Ionicons } from '@expo/vector-icons';

import Shop from '../components/Shop'

import shop1 from '../assets/banners/food1.jpg'
import shop2 from '../assets/banners/food2.jpg'
import shop3 from '../assets/banners/food3.jpg'

export default function Maps({navigation}) {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  let loc;
  let dimension = Dimensions.get('window').width

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }
  if (!location) return <View style={{ flex:1,justifyContent:'center', alignItems:'center'}}><ActivityIndicator/></View>;
  return (
    <View>
      <View style={styles.searchBar}>
      <Ionicons name="md-search" size={24} color="black" style={{marginLeft:20}} />
      <TextInput placeholder='Search' style={{marginLeft:20,width:'80%'  }}/>
      </View>
      
      <MapView
        style={styles.mapStyle}
        region={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
      >
        
        <Marker
          coordinate={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          }}
        />
      </MapView>
      <View>
      <ScrollView horizontal={true} >
        <View style={styles.shop}>
        <Shop img={shop1} title='Food store one' navigation={navigation}/>
        </View>
        <View style={styles.shop}>
        <Shop img={shop2} title='Food store two' navigation={navigation}/>
        </View>
        <View style={styles.shop}>
        <Shop img={shop3} title='Food store three' navigation={navigation}/>
        </View>
      </ScrollView>
      </View>
      
    </View>
  );
}

Maps.navigationOptions = ({navigation}) => {
  return {
    headerRight:() => (
      <TouchableOpacity style={{ marginRight: 10 }} onPress={() => navigation.navigate('Cart')}>
         <Ionicons name="md-cart" size={32} color={Platform.OS ==='android' ? 'white':'#888'} />
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:5,
  },
  mapStyle: {
    width: "100%",
    height: "40%",
  },
  shop:{
    width:Dimensions.get('window').width -20,
     padding:5
  },
  searchBar:{
    alignItems:'center',
    // marginTop:26,
    flexDirection:'row',
     padding:10,
     borderWidth:1,
    borderColor:'grey'
    }
});
