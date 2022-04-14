import React from 'react'
import { coffees } from '../testData/coffees'
import { FlatList } from 'react-native-gesture-handler'
import { ListItem } from 'react-native-elements'
import { Button } from 'react-native'

export const Menu = ({ navigation, route }) => {
    const cart = route.params.cart;

    const renderItems = ({ item }) => {
        const price = item.price.toFixed(2).toString();
        return (
            <ListItem
                title={item.name}
                subtitle={price}
                onPress={() => navigation.navigate('MenuItem',
                    { item: item, title: item.name, cart: cart })}
            />
        )
    }



    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Button onPress={() => navigation.navigate("Cart", { cart: cart })} title={`Cart (${cart.length})`} />
            ),
        });
    }, [navigation, cart])
    return (
        <FlatList
            data={coffees}
            renderItem={renderItems}
            keyExtractor={item => item.id.toString()}
        />
    )
}

export default Menu;