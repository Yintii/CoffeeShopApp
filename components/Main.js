import React from 'react'
import { StyleSheet, View, Button } from 'react-native';
import { Auth } from 'aws-amplify';
import { MenuItems } from './MenuItems';

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
    return (
        <View style={styles.container}>
            <MenuItems />
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