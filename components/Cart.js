import React from 'react'
import { Card } from 'react-native-elements';
import { StyleSheet, View, Text, Button } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

export const Cart = ({ navigation, route }) => {
    //this is the cart from redux still, passed in from whatever navigate() sent it here.
    const { cart } = route.params;


    function RenderCartItems() {
        let cartItems = cart.map(item => {
            return (
                <Card
                    featuredTitle={item.name}
                    /*
                        VERYBAD
                        This code needs to be changed with
                        the changes in menuitem. Each menuitem
                        will be added to a counter if there
                        are multiple of the same item

                        that's what this wonky Math.random() call is here for

                        So when 2 coffees are ordered (no mods let's say)
                        the cart should display " Black Coffee x2" instead 
                        of two instances of black coffee
                        then the ids will correspond to each part of the
                        order and the number of items
                    */
                    key={item.id * Math.random()}
                >
                    <Text>{item.name}</Text>

                </Card>
            )
        })
        return cartItems
    }

    function RenderPrice() {
        /*
            totals up the price of all items in the cart
            this needs to be changed as well bc when we 
            change the cart structure to include modifications to items
            and implementing the changes to multiple items in 1 order
            this will no longer work
        */
        let total = 0;
        for (let i = 0; i < cart.length; i++) {
            total += cart[i].price.small;
        }
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
        marginTop: 20,
        marginBottom: 20
    }
})