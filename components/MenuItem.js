import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { addItem } from '../redux/cartSlice';
import { View, Text, Button, StyleSheet } from 'react-native'

export const MenuItem = ({ route, navigation }) => {
    //cart state provided by redux
    const cart = useSelector(state => state.cart.value)
    const dispatch = useDispatch()
    const { item } = route.params;


    //provides the 'cart(n)' on the header of the navigation
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Button onPress={() => navigation.navigate("Cart", { cart: cart })} title={`Cart (${cart.length})`} />
            ),
        });
        //updates when the navigation is changed or when the cart is updated
    }, [navigation, cart])


    return (
        <View style={styles.container}>
            {/*
                need to edit this to include the picture of the item
                and include a better formatting of the info
            */}
            <Text>
                {item.name} - - {item.price.toFixed(2)}
            </Text>

            <View>
                {/* 
                    This item object needs to be edited by the UI
                    It is take the basic coffee structure,
                    then add on details to the order such
                    as creamer/milk/sugar/black/etc.
                */}
                <Button
                    title="Add to Cart"
                    onPress={() => {
                        dispatch(addItem(item))
                    }}
                />
                <Button
                    title="Go Back"
                    onPress={() => navigation.goBack()}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 20,
        minHeight: 450
    }
})