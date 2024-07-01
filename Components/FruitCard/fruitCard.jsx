import { View, Text, Image, Touchable, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { HeartIcon } from 'react-native-heroicons/micro'

const FruitCard = ({ fruit }) => { 
  const [isFavourite,setFavourite] = useState(false)
  return (
    <View style={{ width: 270, borderRadius: 40, backgroundColor: fruit.color(1) }} className="mx-3">
      <View className="flex-row justify-end">
        <TouchableOpacity onPress={()=>setFavourite(!isFavourite)} className="mr-4 mt-4 p-3 rounded-full" style={{backgroundColor:"rgba(255,255,255,0.3)"}}>
          <HeartIcon size={25} color={isFavourite?fruit.shadow:"white"} />
        </TouchableOpacity>
      </View>
      <View className="flex-row justify-center"
        style={{
          shadowColor: fruit.shadow,
          shadowRadius: 40,
          shadowOffset: { width: 0, height: 50 },
          shadowOpacity: 0.6,
          elevation: 10,
        }}>
        <Image source={fruit.image} style={{ width: 210, height: 210 }} />
      </View>
      <View className="ml-4 my-4">
        <Text className='font-bold text-xl text-white shadow'>{fruit.name}</Text>
        <Text className='font-bold text-lg text-white shadow tracking-wide'>$ {fruit.price}</Text>

      </View>
    </View>
  )
}

export default FruitCard