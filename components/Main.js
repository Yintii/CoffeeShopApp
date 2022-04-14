import React from 'react'
import { Home } from './Home';
import { Menu } from './Menu';
import { MenuItem } from './MenuItem';
import { Cart } from './Cart';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

function MyStack() {

    return (
        //all components recieve a 'navigation' object in their props
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Menu" component={Menu} />
            <Stack.Screen name="MenuItem" component={MenuItem} />
            <Stack.Screen name="Cart" component={Cart} />
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
