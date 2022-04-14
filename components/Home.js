import React, { useState } from 'react'
import { Button, View } from 'react-native'
import { Auth } from 'aws-amplify'
import { coffees } from '../testData/coffees'

function Home({ navigation }) {
    const [selectedItem, setSelectedItem] = useState({})

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