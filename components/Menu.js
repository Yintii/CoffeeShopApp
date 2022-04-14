import React from 'react'
import { coffees } from '../testData/coffees'
import { FlatList } from 'react-native-gesture-handler'
import { ListItem } from 'react-native-elements'
import { Button } from 'react-native'
import { useSelector } from 'react-redux'

export const Menu = ({ navigation }) => {
    //cart state provided by redux
    const cart = useSelector(state => state.cart.value)

    const renderItems = ({ item }) => {
        //keep number format of x.xx and change to string
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


    //provides the cart(n) on the header of the navigation
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Button onPress={() => navigation.navigate("Cart", { cart: cart })} title={`Cart (${cart.length})`} />
            ),
        });
        //updates when the navigation is changed or when the cart is updated
    }, [navigation, cart])

    return (
        //create a list of items using the coffee data, render it with the renderItems components
        // each gets a unique key from the keyextractor that is their respective id
        <FlatList
            data={coffees}
            renderItem={renderItems}
            keyExtractor={item => item.id.toString()}
        />
    )
}

export default Menu;