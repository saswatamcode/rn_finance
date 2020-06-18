import React, { useState, useRef } from 'react';
import { 
  Text, 
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Animated,
  FlatList,
} from 'react-native';
import SlidingUpPanel from 'rn-sliding-up-panel';
import Carousel from 'react-native-snap-carousel';
import {MaterialIcons} from '@expo/vector-icons';


export default function App() {

  const Images = [
    {
      image: require('./assets/card1.png'),
    },
    {
      image: require('./assets/card2.png'),
    },
    {
      image: require('./assets/card3.png'),
    },
    {
      image: require('./assets/card4.png'),
    },
    {
      image: require('./assets/card5.png'),
    },
    {
      image: require('./assets/card6.png'),
    },
  ];

  const {width, height} = Dimensions.get('window');
  const carouselRef = useRef(null);

  const RenderItem = ({item}) => {
    return(
      <TouchableWithoutFeedback>
        <Image source={item.image} style={{height: 240, width: 360, borderRadius: 10}}/>
      </TouchableWithoutFeedback>
    );
  }

  return (
    <View style={styles.container}>
      <View style={{paddingTop: 50, paddingHorizontal: 14}}>

        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
          <View>
            <Text style={{fontSize: 26, color: '#fff'}}>Welcome Back,</Text>
            <Text style={{fontSize: 26, color: '#fff', opacity: 0.6}}>Saswata Mukherjee</Text>
          </View>
          <View>
            <Image 
            source={{uri:
            'https://images.pexels.com/photos/936229/pexels-photo-936229.jpeg?auto=compress&cs=tinysrgb&h750&w=1260'
            }}
            style={styles.ProfileImage} 
            />
            <View style={styles.ProfileImageNotification}></View>
          </View>
        </View>

        <View>
          <Carousel
            layout={"tinder"}
            ref={carouselRef}
            renderItem = {RenderItem}
            data={Images}
            sliderWidth={width}
            itemWidth={width - 10}
            swipeThreshold={100}
            layoutCardOffset={-12}
            inactiveSlideOpacity={0.4}
            containerCustomStyle={{
              overflow: 'visible',
              marginVertical: 30
            }}
            contentContainerCustomStyle={{
              paddingTop: 14
            }}
          />
        </View>

        <View>
          <Text style={{color: "#fff", opacity: 0.6, marginBottom: 10}}>Send Money</Text>
        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingTop: 0
  },
  ProfileImage: {
    width: 55,
    height: 55,
    borderRadius: 40
  },
  ProfileImageNotification: {
    height: 18,
    width: 18,
    borderRadius: 9,
    backgroundColor: '#4853ef',
    right: 0,
    position: 'absolute',
    borderWidth: 2,
    borderColor: '#000'
  }
})