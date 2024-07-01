import { Image, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { ChevronLeftIcon } from 'react-native-heroicons/micro'
import { SafeAreaView } from 'react-native-safe-area-context'
import { themeColors } from '../appUtils'
import StarRating from 'react-native-star-rating-widget'

const ProductScreen = (props) => {
    fruit = props.route.params
    const navitgation = useNavigation()
    return (
        <View className='flex-1' style={{ backgroundColor: fruit.color }}>
            <SafeAreaView>
                <View className='flex-row justify-start mx-5 mt-5'>
                    <TouchableOpacity onPress={() => navitgation.goBack()} style={{ backgroundColor: 'rgba(255,255,255,0.2)' }} className='border border-gray-50 rounded-xl'><ChevronLeftIcon size={30} color='white' /></TouchableOpacity>
                </View>
                <View className='flex-row justify-center mt-5 pb-10'
                    style={{
                        shadowColor: fruit.shadow,
                        shadowRadius: 50,
                        shadowOffset: { width: 0, height: 50 },
                        shadowOpacity: 0.7
                    }}
                >
                    <Image source={fruit.image} style={{ height: 290, width: 290 }} />
                </View>
            </SafeAreaView>
            <View  style={{borderTopLeftRadius:45,borderTopRightRadius:45}} className='bg-orange-50 flex-1 px-6 space-y-2'>
                    <Text style={{color:themeColors.text}} className='mt-8 text-2xl font-bold'>{fruit.name}</Text>
                    <View className="flex-row justify-between mb-3">
                        <Text className='text-gray-500 font-semibold'>{fruit.desc}</Text>
                        <Text className='text-gray-500 font-semibold'>Sold <Text className='text-gray-800 font-extrabold'>250</Text></Text>
                    </View>
                    <StarRating starSize={18} onChange={()=>{}} rating={fruit.stars}/>
                    <View style={{height:165}}>
                        <Text style={{color:themeColors.text}} className='tracking-wider py-3'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</Text>
                    </View>
                    <View className='flex-row justify-between items-center'>
                        <Text className='text-3xl' style={{color:themeColors.text}}>$ {fruit.price}</Text>
                   <TouchableOpacity className='text-3xl p-3 ml-6 flex-1 rounded-xl' style={{backgroundColor:fruit.shadow , opacity:0.9,shadowColor:fruit.shadow,shadowRadius:25,shadowOffset:{width:0,height:15},shadowOpacity:0.5,elevation:9}}><Text className='text-center text-white font-bold text-xl'>Add to Cart</Text></TouchableOpacity>
                    </View>
            </View>
        </View>
    )
}

export default ProductScreen;