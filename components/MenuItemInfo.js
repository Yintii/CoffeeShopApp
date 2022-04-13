import React from 'react'
import { Text, View } from 'react-native'
import { Card } from 'react-native-elements'


function RenderMenuItem({ item }) {
    if (item) {
        console.log("ITEM: ", item)
        return (
            <Card
                featuredTitle={item.name}
            >
                <Text style={{ margin: 10 }}>
                    {item.name} - ${item.price.toFixed(2).toString()}
                </Text>
            </Card>
        )
    }
    return (
        <View style={{ margin: 20 }}>
            <Text>
                No Coffee Selected
            </Text>
        </View>
    )
}


export const MenuItemInfo = ({ item }) => {
    return (
        <RenderMenuItem item={item} />
    )
}
