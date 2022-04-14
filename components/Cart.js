import React from 'react'
import { Card } from 'react-native-elements';
import { View, Text, Button } from 'react-native'

export const Cart = ({ navigation, route }) => {
    const { cart } = route.params;
    function RenderCartItems() {
        let cartItems = cart.map(item => {
            return (
                <Card
                    featuredTitle={item.name}
                    key={item.id * Math.random()}
                >
                    <Text>{item.name}</Text>

                </Card>
            )
        })
        return cartItems
    }
    return (
        <View>
            <RenderCartItems />
            <Button style={{ padding: 20 }} title="Back" onPress={() => navigation.goBack()} />
        </View>
    )
}
