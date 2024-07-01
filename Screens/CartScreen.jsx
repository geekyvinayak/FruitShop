import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeftIcon } from "react-native-heroicons/micro";
import { cartItems } from "../constants";
import { themeColors } from "../appUtils";
import FruitCardCart from "../Components/FruitCardCart";

export default function CartScreen(props) {
  const navigation = useNavigation();
  return (
    <SafeAreaView className="flex-1 flex justify-between bg-orange-50">
      <View className="flex-row justify-start mx-5">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="border border-gray-300 rounded-xl mt-5"
        >
          <ChevronLeftIcon size="30" color="gray" />
        </TouchableOpacity>
      </View>
      <View className="cart mx-5 flex-1">
        <Text style={{ color: themeColors.text }} className="text-2xl py-10">
          Your <Text className="font-bold">cart</Text>
        </Text>
        <View>
          {cartItems.map((item, index) => (
            <FruitCardCart fruit={item} key={index} />
          ))}
        </View>
        <View className="flex-row justify-end py-4">
          <Text className="text-lg">
            Total price:{" "}
            <Text className="font-bold text-yellow-500">240.70</Text>
          </Text>
        </View>
      </View>
      <View className="flex-row justify-between items-center mx-7">
        <TouchableOpacity
          style={{
            backgroundColor: "orange",
            opacity: 0.8,
            shadowColor: "orange",
            shadowRadius: 25,
            shadowOffset: { width: 0, height: 15 },
            shadowOpacity: 0.4,
          }}
          className="p-3 flex-1 rounded-xl"
        >
          <Text className="text-xl text-center text-white font-bold">
            Payment
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
