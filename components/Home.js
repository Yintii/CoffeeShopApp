import React from 'react'
import { Button, View } from 'react-native'
import { Auth } from 'aws-amplify'
import { useSelector } from 'react-redux'

export const Home = ({ navigation }) => {

    const cart = useSelector(state => state.cart.value)

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Button onPress={() => navigation.navigate("Cart", { cart: cart })} title={`Cart (${cart.length})`} />
            ),
        });
    }, [navigation, cart])

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
                onPress={() => navigation.navigate("Menu", { cart: cart })}
            />
            <Button
                title='SignOut'
                onPress={handleSignOut}
            />
        </View>
    )
}

export default Home;