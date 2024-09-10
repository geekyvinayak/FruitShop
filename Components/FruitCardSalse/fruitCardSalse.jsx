import {View, Text, Image, Touchable, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';

const FruitCardSalse = ({fruit}) => {
  const [isFavourite, setFavourite] = useState(false);
  const natvigation = useNavigation();
  return (
    <View className="mr-6">
      <TouchableOpacity
        className="-mb-9 flex-row justify-center shadow-lg z-10"
        onPress={() =>
          natvigation.navigate('Product', {id:fruit.id})
        }>
        <Image
          source={fruit.image}
          style={{
            height: 65,
            width: 65,
            shadowColor: fruit.shadow,
            overflow: 'visible',
            shadowRadius: 15,
            shadowOffset: {width: 0, height: 20},
            shadowOpacity: 0.4,
            elevation: 6,
          }}
        />
      </TouchableOpacity>
      <View
        style={{backgroundColor: fruit.color(0.4), height: 75, width: 80}}
        className="rounded-3xl flex justify-end items-center">
        <Text className="font-semibold text-center text-gray-800 pb-3 tracking-wide">
          {fruit.price}
        </Text>
      </View>
    </View>
  );
};

export default FruitCardSalse;
