import React from 'react'
import { StyleSheet, View, Text, Button, Image, TouchableOpacity, Modal, Pressable } from 'react-native';
import { ListItem, Card } from '@rneui/themed';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem } from '../redux/cartSlice';
import { STRIPE_API_KEY } from "@env"
import stripe from 'react-native-stripe-payments';
stripe.setOptions({ publishingKey: STRIPE_API_KEY });


export const Cart = ({ navigation }) => {


    //this is the cart from redux still, passed in from whatever navigate() sent it here.
    const cart = useSelector(state => state.cart.value)
    const [modalActive, setModalActive] = React.useState(false)
    const dispatch = useDispatch()

    const cardDetails = {
        number: '4242424242424242',
        expMonth: 10,
        expYear: 24,
        cvc: '888',
    }

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
    function DeleteCartItemButton({ id }) {
        return (
            <TouchableOpacity
                onPress={() => removeItemFromCart(id)}
                style={styles.removeItemButton}
            >
                <Text style={styles.removeText}>Delete</Text>
            </TouchableOpacity >
        )
    }

    function RenderCartItems() {
        let cartItems = cart.map((item, i) => {
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
                    key={i}
                    rightContent={() => (
                        <DeleteCartItemButton id={item.id} />
                    )}

                >
                    <ListItem.Content style={styles.cartItem}>
                        <Image source={item.img} style={{ width: 50, height: 50, }} />
                        <View style={{ width: '33%' }}>
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
    }

    function Checkout() {
        const [cardNumber, setCardNumber] = React.useState(0);
        const [expMonth, setExpMonth] = React.useState(0)
        const [expYear, setExpYear] = React.useState(0)
        const [cvc, setCvc] = React.useState(0)

        return (
            <View style={styles.centeredView}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                        setModalVisible(!modalVisible);
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>Hello World!</Text>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => setModalVisible(!modalVisible)}
                            >
                                <Text style={styles.textStyle}>Hide Modal</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
                <Pressable
                    style={[styles.button, styles.buttonOpen]}
                    onPress={() => setModalVisible(true)}
                >
                    <Text style={styles.textStyle}>Show Modal</Text>
                </Pressable>
            </View>
        );
    }

    function handlePayment() {
        stripe.confirmPayment('client_secret_from_backend', cardDetails)
            .then(result => {
                Console.log("Success")
            })
            .catch(err => console.error("There was an error with payment"))
    }

    //provides the 'cart(n)' on the header of the navigation
    React.useLayoutEffect(() => {
        navigation.setOptions({
            title: `Cart`,
            headerBackTitle: 'Back'

        });
        //updates when the navigation is changed or when the cart is updated
    }, [navigation, cart])

    return (
        <View style={styles.container}>

            <Checkout />

            <ScrollView>
                <RenderCartItems />
            </ScrollView>
            <RenderPrice />
            <TouchableOpacity style={styles.checkOutBtn} onPress={() => setModalActive(!modalActive)}>
                <Text style={styles.checkOutBtnText}>Check out</Text>
            </TouchableOpacity>
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
        justifyContent: 'space-between',
        width: '100%'
    },
    cartItemPrice: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '40%'
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
    },
    removeItemButton: {
        display: 'flex',
        backgroundColor: 'red',
        textAlign: 'center',
        color: 'white',
        justifyContent: 'center',
        height: 75
    },
    removeText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 20
    },
    checkOutBtn: {
        margin: 25,
        backgroundColor: 'black',
    },
    checkOutBtnText: {
        textAlign: 'center',
        color: 'white',
        padding: 25,
        fontSize: 25
    }
})