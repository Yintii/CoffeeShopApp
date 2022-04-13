import React, { useState } from 'react'
import { StyleSheet, View, Button } from 'react-native';
import { Auth } from 'aws-amplify';
import { MenuItems } from './MenuItems';
import { MenuItemInfo } from './MenuItemInfo';
import { coffees } from '../testData/coffees';


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


export const Main = () => {

    const [selectedItem, setSelectedItem] = useState({});

    function onItemSelect(itemId) {
        console.log("Selected: ", itemId)
        setSelectedItem(itemId);
    }

    return (
        <View style={styles.container}>
            <MenuItems coffees={coffees} onPress={itemId => onItemSelect(itemId)} />
            <MenuItemInfo item={coffees.filter(coffee => coffee.id === selectedItem)[0]} />
            <Button
                title='SignOut'
                onPress={handleSignOut}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        paddingTop: 40,
    }
});