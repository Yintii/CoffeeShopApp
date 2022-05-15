import React from 'react'
import { coffees } from '../testData/coffees'
import { ScrollView } from 'react-native-gesture-handler'
import { ListItem, Avatar } from '@rneui/themed'
import { Button } from 'react-native'
import { useSelector } from 'react-redux'
import { Auth } from 'aws-amplify'


export const Menu = ({ navigation }) => {
    //cart state provided by redux
    const cart = useSelector(state => state.cart.value)

    function returnItemCount() {
        let totalItems = 0;
        if (!cart[0]) return 0
        for (let i = 0; i < cart.length; i++) {
            totalItems += cart[i].count;
        }
        return totalItems;
    }

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

    //provides the cart(n) on the header of the navigation
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <Button onPress={() => handleSignOut()} title={`Log out`} />
            ),
        });
        //updates when the navigation is changed or when the cart is updated
    }, [navigation, cart])

    const RenderItems = () => {
        let drinks = coffees.map(each => {
            const price = each.price.small.toFixed(2).toString();
            return (
                <ListItem key={each.id * each.count} onPress={() => navigation.navigate('MenuItem',
                    { item: each, title: each.name, img: each.img, cart: cart })} >
                    <Avatar rounded source={each.img} />
                    <ListItem.Content>
                        <ListItem.Title>{each.name}</ListItem.Title>
                        <ListItem.Subtitle>${price}</ListItem.Subtitle>
                    </ListItem.Content>
                    <ListItem.Chevron />
                </ListItem>
            )
        })

        return drinks
    }

    //provides the cart(n) on the header of the navigation
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Button onPress={() => navigation.navigate("Cart", { cart: cart })} title={`Cart (${returnItemCount()})`} />
            ),
        });
        //updates when the navigation is changed or when the cart is updated
    }, [navigation, cart])

    return (
        //create a list of items using the coffee data, render it with the renderItems components
        // each gets a unique key from the keyextractor that is their respective id
        <ScrollView>
            <RenderItems />
        </ScrollView>
    )
}

export default Menu;