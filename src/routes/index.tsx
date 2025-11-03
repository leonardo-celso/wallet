import { Home } from '@/src/screens/home';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { AddCard } from "@/src/screens/add-card";
import { AddCardSuccess } from "@/src/screens/add-card-success";
import { CardsList } from "@/src/screens/card-list";

export type RootStackParamList = {
  Home: undefined;
  AddCard: undefined;
  Cards: undefined;
  AddCardSuccess: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppRoutes() {
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false, animation: 'none' }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="AddCard" component={AddCard} />
      <Stack.Screen name="AddCardSuccess" component={AddCardSuccess} />
      <Stack.Screen name="Cards" component={CardsList} />
    </Stack.Navigator>
  );
}