import React from 'react'
import { Card } from 'react-native-elements';
import { StyleSheet, View, Text, Button, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

export const Cart = ({ navigation, route }) => {
    //this is the cart from redux still, passed in from whatever navigate() sent it here.
    const { cart } = route.params;
    console.log(cart)

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
                <View
                    style={styles.cartItem}
                    key={item.id}
                >
                    <View style={{ width: 100 }}>
                        <Text>{item.name}</Text>
                        <Text style={{ color: 'grey', fontSize: 12 }}>{item.size}</Text>
                    </View>
                    <View style={styles.cartItemPrice}>
                        <Text>${(price).toFixed(2)}</Text>
                        <Text style={styles.itemMultiplier}>x{item.count}</Text>
                        <Text>${(price * item.count).toFixed(2)}</Text>
                    </View>
                    <View>
                        {item.modifications.cream &&
                            <Text>Cream</Text>
                        }
                        {item.modifications.oatmilk &&
                            <Text>Oat milk</Text>
                        }
                        {item.modifications.sugar &&
                            <Text>Sugar</Text>
                        }
                    </View>
                </View >

            )
        })
        return cartItems
    }

    function RenderPrice() {
        let total = 0;
        cart.forEach(item => {
            switch (item.size) {
                case ('small'):
                    total += item.price.small * item.count
                    break;
                case ('medium'):
                    total += item.price.medium * item.count
                    break;
                case ('large'):
                    total += item.price.large * item.count
                    break;
            }
        })
        return <Card><Text>Your Total is: ${total.toFixed(2)}</Text></Card>

        r
    }
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
        padding: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        margin: 20,
        alignItems: 'center',
    },
    cartItemPrice: {
        padding: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        margin: 20,
        width: 150,
        alignItems: 'center',
    },
    itemMultiplier: {
        borderRadius: 10,
        padding: 10,
        overflow: 'hidden',
        backgroundColor: 'lightgrey',
    }
})