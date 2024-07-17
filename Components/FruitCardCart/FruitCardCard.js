import { View, Text, TouchableOpacity, Image, Alert } from "react-native";
import React from "react";
import { themeColors } from "../../appUtils";
import { MinusIcon, PlusIcon } from "react-native-heroicons/micro";
import { removeItem, updateQty } from "../../slices/navSlice";
import { useDispatch } from "react-redux";

export default function FruitCardCart({ fruit }) {
  const dispatch = useDispatch()
  const handelUpdateQuantity = (qty) => {
    if(qty == 0){
      Alert.alert(
        'Remove From Cart',
        'My Alert Msg', // <- this part is optional, you can pass an empty string
        [
          {text: 'OK', onPress: () => dispatch(removeItem({ id:fruit.id })) },
        ],
        {cancelable: false},
      );
    }
    dispatch(updateQty({ id:fruit.id,qty }));
}
  return (
    <View className="flex-row justify-between items-center space-x-5 mb-4">
      <View className="ml-5">
        <TouchableOpacity className="flex-row justify-center -mb-10 shadow-lg z-20">
          <Image
            source={fruit.image}
            style={{
              height: 65,
              width: 65,
              shadowColor: fruit.shadow,
              overflow: "visible",
              shadowRadius: 15,
              shadowOffset: { width: 0, height: 20 },
              shadowOpacity: 0.4,
            }}
          />
        </TouchableOpacity>
        <View
          style={{ backgroundColor: fruit.color, height: 60, width: 60 }}
          className={` rounded-3xl flex justify-end items-center -mt-2`}
        ></View>
      </View>
      <View className="flex-1 space-y-1">
        <Text
          style={{ color: themeColors.text }}
          className=" text-base font-bold"
        >
          {fruit.name}
        </Text>
        <Text className="text-yellow-500 font-extrabold">$ {fruit.price}</Text>
      </View>
      <View className="flex-row items-center space-x-2">
        <TouchableOpacity className="bg-gray-300 p-1 rounded-lg" onPress={()=>handelUpdateQuantity(fruit.qty+1)}>
          <PlusIcon size="15" color="white" />
        </TouchableOpacity>
        <Text>{fruit.qty}</Text>
        <TouchableOpacity className="bg-gray-300 p-1 rounded-lg" onPress={()=>handelUpdateQuantity(fruit.qty-1)}>
          <MinusIcon size="15" color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
