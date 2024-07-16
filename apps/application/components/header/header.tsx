import {SafeAreaView, Text, View} from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';

type Props = {
    headerName: string
}

export default function Header(props : Props) {
    return (
        <SafeAreaView >
            <View className="flex justify-between flex-row p-5 align-items-center">
                <Text className='font-extrabold text-xl'>{props.headerName || 'Default'}</Text>
                <Ionicons onPress={() => console.log('ok')} name="add-outline" className='ps-2' size={32} color="black" />
            </View>
        </SafeAreaView>
    )

}