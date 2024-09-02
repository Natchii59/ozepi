import { Tabs } from 'expo-router'
import React from 'react'

import { TabBarIcon } from '@/components/navigation/tab-bar-icon'

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false
      }}
    >
      <Tabs.Screen
        name='index'
        options={{
          title: 'Accueil',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? 'home' : 'home-outline'}
              color={color}
            />
          )
        }}
      />
      <Tabs.Screen
        name='cagnotte'
        options={{
          title: 'Cagnotte',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? 'wallet' : 'wallet-outline'}
              color={color}
            />
          )
        }}
      />
      <Tabs.Screen
        name='CaisseCommune'
        options={{
          title: 'Caisse Commune',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? 'receipt' : 'receipt-outline'}
              color={color}
            />
          )
        }}
      />
      <Tabs.Screen
        name='Parametres'
        options={{
          title: 'Parametres',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? 'cog' : 'cog-outline'}
              color={color}
            />
          )
        }}
      />
    </Tabs>
  )
}
