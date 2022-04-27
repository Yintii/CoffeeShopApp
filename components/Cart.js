import React from 'react'
import { StyleSheet, View, Text, Button, Image, TouchableOpacity, Modal, Pressable } from 'react-native';
import { ListItem, Card } from '@rneui/themed';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem } from '../redux/cartSlice';
import { CardField, confirmPayment, StripeProvider } from '@stripe/stripe-react-native';
import { STRIPE_API_KEY } from "@env"

export const Cart = ({ navigation }) => {


    //this is the cart from redux still, passed in from whatever navigate() sent it here.
    const cart = useSelector(state => state.cart.value)
    const [modalActive, setModalActive] = React.useState(false)
    const dispatch = useDispatch()
    const [completeCardDetails, setCompleteCardDetails] = React.useState(false)

    const CheckOut = () => {

        //this fetch is going to the a lambda, but I am getting undefined results back
        //need to fix/adjust lamda
        const fetchPaymentIntentClientSecret = async () => {
            const response = await fetch('https://h2vkwvz4nnlymrhn6sog7775fm0wrxag.lambda-url.us-west-1.on.aws/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    currency: 'usd',
                }),
            });

            const { clientSecret } = await response.json();

            return clientSecret;
        }

        const handlePaymentPress = async () => {
            if (!completeCardDetails) return

            const clientSecret = await fetchPaymentIntentClientSecret();
            console.log("Client secret: ", clientSecret)

            const billingDetails = {
                email: 'kele@keleheart.com'
            }

            const { paymentIntent, errors } = await confirmPayment(clientSecret, {
                type: 'Card',
                billingDetails,
            });

            if (errors) {
                console.error(errors);
            } else {
                console.log("success, ", paymentIntent);
            }

        };

        return (
            <Modal
                presentationStyle="pageSheet"
                animationType="slide"
                visible={modalActive}
            >
                <View style={styles.checkOutContainer}>
                    <Pressable onPress={() => setModalActive(!modalActive)}>
                        <Text style={{ fontSize: 50 }}>X</Text>
                    </Pressable>
                    <Text style={{ textAlign: 'center', fontSize: 30, margin: 40 }}>Check out</Text>
                    <CardField
                        onCardChange={(cardDetails) => {
                            if (cardDetails.complete) setCompleteCardDetails(cardDetails.complete)
                        }}
                        postalCodeEnabled={true}
                        placeholder={{
                            number: '4242 4242 4242 4242',
                        }}
                        cardStyle={{
                            backgroundColor: '#FFFFFF',
                            textColor: '#000000',
                        }}
                        style={{
                            width: '100%',
                            height: 50,
                            marginVertical: 30,
                        }}
                        onFocus={(focusedField) => {
                            console.log('focusField', focusedField);
                        }}
                    />
                    <Button onPress={handlePaymentPress} title="pay" />
                </View>
            </Modal >
        )
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
            {/** Not sure how to set this up, there seems to be a blended need of react-native-stripe and the 
             *  elements component of @stripe/react-stripe-js'; but does not seem to resolve the error about
             *  the "view config get callback from component 'div' must be a function"
             * 
             */}
            <StripeProvider publishableKey={STRIPE_API_KEY}>
                {/* <Elements stripe={stripePromise} options={options}>
                    
                </Elements> */}
                <CheckOut />
            </StripeProvider>

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