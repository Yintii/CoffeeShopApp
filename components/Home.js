import React from 'react'
import { Button, View } from 'react-native'
import { Auth } from 'aws-amplify'
import { useSelector } from 'react-redux'

//navigation prop provided by react-navigation
export const Home = ({ navigation }) => {

    //cart state provided by redux
    const cart = useSelector(state => state.cart.value)

    //provides the cart(n) on the header of the navigation
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Button onPress={() => navigation.navigate("Cart", { cart: cart })} title={`Cart (${cart.length})`} />
            ),
        });
        //updates when the navigation is changed or when the cart is updated
    }, [navigation, cart])

    //aws auth function to sign out user
    async function handleSignOut() {
        try {
            await Auth.signOut();
        } catch (error) {
            console.error(
                "There was an error while signing out: ",
                error
            );
        }
    }
    return (
        <View>
            <Button
                title="Menu"
                onPress={() => navigation.navigate("Menu")}
            />
            <Button
                title='SignOut'
                onPress={handleSignOut}
            />
        </View>
    )
}

export default Home;