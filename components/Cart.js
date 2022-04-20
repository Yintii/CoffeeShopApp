import React from 'react'

import { StyleSheet, View, Text, Button, Image } from 'react-native';
import { ListItem, Card } from '@rneui/themed';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem } from '../redux/cartSlice';


export const Cart = ({ navigation, route }) => {
    //this is the cart from redux still, passed in from whatever navigate() sent it here.
    const cart = useSelector(state => state.cart.value)
    const dispatch = useDispatch()

    console.log(cart)

    //working on this functionality / styling
    //not currently working
    function removeItemFromCart(id) {
        let index = 0;
        for (let i = 0; i < cart.length; i++) {
            if (cart[i].id === id) {
                index = i
                break
            }
        }
        dispatch(removeItem(index))
    }

    function RenderCartItems() {
        let cartItems = cart.map(item => {
            let price;
            if (item.size === "small") {
                price = item.price.small;
            } else if (item.size === "medium") {
                price = item.price.medium;
            } else if (item.size === "large") {
                price = item.price.large;
            }
            return (
                <ListItem.Swipeable
                    key={item.id}
                    rightContent={() => (
                        <Button
                            title="Delete"
                            onPress={() => removeItemFromCart(item.id)}
                            icon={{ name: 'delete', color: 'white' }}
                            buttonStyle={{ minHeight: '100%', backgroundColor: 'red' }}
                        />
                    )
                    }
                >
                    <ListItem.Content style={styles.cartItem}>
                        <Image source={item.img} style={{ width: 50, height: 50, }} />
                        <View>
                            <Text>{item.name}</Text>
                            <Text style={styles.muted}>{item.size}</Text>
                            {item.modifications.cream &&
                                <Text style={styles.muted}>Cream</Text>
                            }
                            {item.modifications.oatmilk &&
                                <Text style={styles.muted}>Oat milk</Text>
                            }
                            {item.modifications.sugar &&
                                <Text style={styles.muted}>Sugar</Text>
                            }
                            {item.modifications.stevia &&
                                <Text style={styles.muted}>Stevia</Text>
                            }
                            {item.modifications.almondmilk &&
                                <Text style={styles.muted}>Almond milk</Text>
                            }
                        </View>
                        <View style={styles.cartItemPrice}>
                            <Text>${(price).toFixed(2)}</Text>
                            <Text style={styles.itemMultiplier}>x{item.count}</Text>
                            <Text>${(price * item.count).toFixed(2)}</Text>
                        </View>
                        <View>

                        </View>
                    </ListItem.Content>
                </ListItem.Swipeable >
            )
        })
        return cartItems
    }

    function RenderPrice() {
        let subTotal = 0;
        cart.forEach(item => {
            switch (item.size) {
                case ('small'):
                    subTotal += item.price.small * item.count
                    break;
                case ('medium'):
                    subTotal += item.price.medium * item.count
                    break;
                case ('large'):
                    subTotal += item.price.large * item.count
                    break;
            }
        })
        let tax = subTotal * .056;
        let total = subTotal + tax;
        return (
            <Card>
                <Text>SubTotal: ${subTotal.toFixed(2)}</Text>
                <Text>Tax: ${(tax).toFixed(2)}</Text>
                <Text>Total: ${total.toFixed(2)}</Text>
            </Card>
        )

        r
    }

    //provides the 'cart(n)' on the header of the navigation
    React.useLayoutEffect(() => {
        navigation.setOptions({
            title: `Cart`,
        });
        //updates when the navigation is changed or when the cart is updated
    }, [navigation, cart])
    return (
        <View style={styles.container}>
            <ScrollView >
                <RenderCartItems />
            </ScrollView>
            <RenderPrice />
            <Button style={styles.btn} title="Check out" onPress={() => console.log("Checking out!")} />
            <Button style={styles.btn} title="Back" onPress={() => navigation.goBack()} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        maxHeight: 700,
    },
    btn: {
        marginTop: 200,
        marginBottom: 20
    },
    cartItem: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    cartItemPrice: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    muted: {
        color: 'grey',
        fontSize: 12
    },
    itemMultiplier: {
        borderRadius: 10,
        padding: 10,
        overflow: 'hidden',
        backgroundColor: 'lightgrey',
    }
})