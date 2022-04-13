import React from 'react'
import { coffees } from '../testData/coffees';
import { ListItem } from 'react-native-elements';
import { FlatList } from 'react-native';

const renderItems = ({ item }) => {
    let price = item.price.toFixed(2).toString();
    console.log(item)
    return (
        <ListItem
            id={item.id}
            title={item.name}
            subtitle={"$" + price}
        />
    )
}


export const MenuItems = () => {
    return (
        <FlatList
            data={coffees}
            renderItem={renderItems}
            keyExtractor={item => item.id.toString()}
        />
    )
}
