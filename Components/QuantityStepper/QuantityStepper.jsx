// QuantityStepper.js
import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { MinusIcon, PlusIcon } from 'react-native-heroicons/micro';

const QuantityStepper = ({ initialQuantity = 0, min = 1, max = 100, step = 1, onChange, buttonColor = 'blue' }) => {
    const [quantity, setQuantity] = useState(initialQuantity);

    const increaseQuantity = () => {
        if (quantity < max) {
            const newQuantity = quantity + step;
            setQuantity(newQuantity);
        }
    };

    const decreaseQuantity = () => {
        if (quantity > min) {
            const newQuantity = quantity - step;
            setQuantity(newQuantity);
        }
    };

    return (
        <View className="flex-col items-end space-y-2 flex-1 ml-5">
            <View className='flex-row space-x-3 items-center'>
            <TouchableOpacity className="rounded-lg" onPress={decreaseQuantity} style={{ backgroundColor: buttonColor }}>
                <MinusIcon size="30" color="white" />
            </TouchableOpacity>
            <Text>{quantity}</Text>
            <TouchableOpacity className="rounded-lg" style={{ backgroundColor: buttonColor }} onPress={increaseQuantity}>
                <PlusIcon size="30" color="white" />
            </TouchableOpacity>
            </View>
            {initialQuantity != quantity && <TouchableOpacity className='text-xl p-2 rounded-xl' style={{ backgroundColor: fruit.shadow, opacity: 0.9, shadowColor: fruit.shadow, shadowRadius: 25, shadowOffset: { width: 0, height: 15 }, shadowOpacity: 0.5, elevation: 9 }} onPress={() => onChange(quantity)}><Text className='text-center text-white font-bold text-xl'>Update Cart</Text></TouchableOpacity>}
        </View>
    );
};



export default QuantityStepper;
