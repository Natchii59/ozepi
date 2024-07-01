import { Tabs } from 'expo-router';
import React from 'react';
import { HomeIcon as HomeIconOutline, HomeIcon as HomeIconSolid, CogIcon as CogIconOutline, CogIcon as CogIconSolid, GiftIcon as GiftIconOutline, GiftIcon as GiftIconSolid, RectangleGroupIcon as RectangleGroupIconOutline, RectangleGroupIcon as RectangleGroupIconSolid } from 'react-native-heroicons/outline'; // ou 'solid' pour les icônes pleines

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Acceuil',
          tabBarIcon: ({ color, focused }) => (
            focused ? <HomeIconSolid color={color} /> : <HomeIconOutline color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Cagnotte"
        options={{
          title: 'Cagnotte',
          tabBarIcon: ({ color, focused }) => (
            focused ? <GiftIconSolid color={color} /> : <GiftIconOutline color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Caisse_Comune"
        options={{
          title: 'Caisse Comune',
          tabBarIcon: ({ color, focused }) => (
            focused ? <RectangleGroupIconSolid color={color} /> : <RectangleGroupIconOutline color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Paramettre"
        options={{
          title: 'Paramettre',
          tabBarIcon: ({ color, focused }) => (
            focused ? <CogIconSolid color={color} /> : <CogIconOutline color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
