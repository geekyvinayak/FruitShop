// import { ShoppingCartIcon } from '@heroicons/react/16/solid';
import React, {useMemo, useState} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {
  Bars3CenterLeftIcon,
  SparklesIcon as SparklesIconMicro,
  ShoppingCartIcon,
  UserCircleIcon,
} from 'react-native-heroicons/micro';

// Old solid style from heroicons v1
import {categories, featuredFruits} from '../constants';
import FruitCard from '../Components/FruitCard';
import FruitCardSalse from '../Components/FruitCardSalse';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import {selectCart} from '../slices/navSlice';
function HomeScreen() {
  const [asctiveCategory, setActiveCategory] = useState('Orange');
  const navigation = useNavigation();

  return (
    <SafeAreaView className="flex-1 bg-orange-50">
      <ScrollView className="mb-5">
        {/* top view */}
        <View className="flex-row justify-between items-center mx-5 py-2">
          <Bars3CenterLeftIcon size="35" color="black" />
          <View className="flex-row gap-2">
          <TouchableOpacity
              className="bg-orange-100 p-2 rounded-xl"
              onPress={() => navigation.navigate('OtpVerification')}>
              <UserCircleIcon size="35" color="orange" />
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-orange-100 p-2 rounded-xl"
              onPress={() => navigation.navigate('Cart')}>
              <ShoppingCartIcon size="35" color="orange" />
            </TouchableOpacity>
          </View>
        </View>
        <View className="mt-4">
          <Text className="text-2xl tracking-widest font-medium ml-5">
            Seasonal
          </Text>
          <Text className="text-3xl tracking-widest font-semibold ml-5">
            Fruits And Vegetables
          </Text>
          {/* category */}
          <ScrollView
            className="mt-8 px-5"
            horizontal
            showsHorizontalScrollIndicator={false}>
            {categories.map((category, index) => {
              let isActive = asctiveCategory == category;
              let textClass = `text-xl ${isActive ? 'font-bold' : ''}`;
              return (
                <TouchableOpacity
                  onPress={() => {
                    setActiveCategory(category);
                  }}
                  key={index}>
                  <Text className={`mr-8 relative ${textClass}`}>
                    {category}
                  </Text>
                  {isActive && (
                    <Text className="ml-2 color-orange-400 font-extrabold">
                      __ _
                    </Text>
                  )}
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {/* fruits corousel */}
          <ScrollView
            className="mt-8"
            horizontal
            showsHorizontalScrollIndicator={false}>
            {featuredFruits.map((fruit, index) => {
              return <FruitCard fruit={fruit} key={index} />;
            })}
          </ScrollView>
        </View>
        <View className="mt-8 pl-5">
          <Text className="font-semibold text-xl">Hot Sales </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{overflow: 'visible'}}>
            {[...featuredFruits].reverse().map((fruit, index) => {
              return <FruitCardSalse fruit={fruit} key={index} />;
            })}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default HomeScreen;
