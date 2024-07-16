import React from 'react'
import {SafeAreaView, StatusBar, Text} from 'react-native'

export default function HomeScreen() {
  return (
      <SafeAreaView className="flex-1 items-center justify-center bg-white">
          <Text className='text-red-800 font-bold bg-orange-400'>Bah alors y'a tailwind ?</Text>
          <StatusBar/>
      </SafeAreaView>
  )
}

