import React from 'react'
import { SafeAreaView, StatusBar, Text, View } from 'react-native'
import Header from '@/components/header/header'
import Ionicons from "@expo/vector-icons/Ionicons";


export default function CaisseComune() {
  return (
    <SafeAreaView style={{flex: 1}}>


      <Header headerName="Caisse Commune"/>
      <View className="p-5 flex justify-between flex-row">
        <View className="flex flex-col">
          <Text className='text-lg font-bold'>[Nom Caisse Commune]</Text>
        </View>
      </View>



{/*      <View className="p-5 flex justify-center flex-col">
        <ProgressArc progress={0} />
      </View>*/}

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