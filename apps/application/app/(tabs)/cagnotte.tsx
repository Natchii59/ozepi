import {SafeAreaView, Text, View} from 'react-native'
import React from 'react'
import Header from "@/components/header/header";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function Cagnotte() {

    return (
        <SafeAreaView style={{flex: 1}}>
            <Header headerName="Cagnotte"/>
            <View className="p-5 flex justify-between flex-row">
                <View className="flex flex-col">
                    <Text className='text-lg font-bold'>[Nom cagnotte]</Text>
                    <Text>[Description cagnotte]</Text>
                </View>
                <View className="flex">
                    <Text className='text-lg'>[0€]</Text>
                    <Text className='text-base'>[0€]</Text>
                </View>
            </View>
            <View className="p-5 flex justify-center flex-col">
                <Text className='text-center'>0% progress</Text>
                <View className="w-full bg-gray-200 rounded-full h-4" style={{backgroundColor:'rgba(0, 0, 0, 0.1)'}}>
                    <View className=" h-4 rounded-full" style={{width:'80%', backgroundColor:'#66B3FF'}}></View>
                </View>
            </View>

            <View className="p-2 flex justify-between flex-row text-center items-center">
                <View className={'flex flex-row items-center justify-center'}>
                    <Ionicons name="person-circle-outline" className='ps-2' size={32}
                              color="black"/>
                    <Text className='p-0.5'>Name</Text>
                </View>
                <Text>15/07</Text>
                <Text className='font-bold text-lg'>+50€</Text>
            </View>
            <View className="p-2 flex justify-between flex-row text-center items-center">
                <View className={'flex flex-row items-center justify-center'}>
                    <Ionicons name="person-circle-outline" className='ps-2' size={32}
                              color="black"/>
                    <Text className='p-0.5'>Name</Text>
                </View>
                <Text>15/07</Text>
                <Text className='font-bold text-lg'>+50€</Text>
            </View>
            

        </SafeAreaView>
    )
}