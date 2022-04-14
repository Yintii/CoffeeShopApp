import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { addItem } from '../redux/cartSlice';
import { View, Text, Button, StyleSheet } from 'react-native'

export const MenuItem = ({ route, navigation }) => {
    const cart = useSelector(state => state.cart.value)
    const dispatch = useDispatch()
    const { item } = route.params;
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Button onPress={() => navigation.navigate("Cart", { cart: cart })} title={`Cart (${cart.length})`} />
            ),
        });
    }, [navigation, cart])
    return (
        <View style={styles.container}>
            <Text>
                {item.name} - - {item.price}
            </Text>

            <View>
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