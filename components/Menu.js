import React from 'react'
import { coffees } from '../testData/coffees'
import { FlatList } from 'react-native-gesture-handler'
import { ListItem } from 'react-native-elements'

function Menu({ navigation }) {
    const renderItems = ({ item }) => {
        const price = item.price.toFixed(2).toString();
        return (
            <ListItem
                title={item.name}
                subtitle={price}
                onPress={() => navigation.navigate('MenuItem', { item: item })}
            />
        )
    }

    return (
        <FlatList
            data={coffees}
            renderItem={renderItems}
            keyExtractor={item => item.id.toString()}
        />
    )
}

export default Menu;