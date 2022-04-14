import React, { useState } from 'react'
import Home from './Home';
import Menu from './Menu';
import { MenuItem } from './MenuItem';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

function MyStack() {
    const [selectedItem, setSelectedItem] = useState({})
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Menu" component={Menu} />
            <Stack.Screen name="MenuItem" component={MenuItem} />
        </Stack.Navigator>
    )
}

export const Main = () => {
    return (
        <NavigationContainer>
            <MyStack />
        </NavigationContainer>
    )
}
