import React from 'react'
import { View, Text, Button } from 'react-native'

export const MenuItem = ({ route, navigation }) => {
    const { item } = route.params;
    console.log(item);
    return (
        <View>
            <Text>
                {item.name} - - {item.price}
            </Text>
            <Button
                title="Go Back"
                onPress={() => navigation.goBack()}
            />
        </View>
    )
}
