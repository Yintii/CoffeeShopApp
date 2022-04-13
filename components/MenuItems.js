import React from 'react'
import { ListItem } from 'react-native-elements';
import { FlatList } from 'react-native';



export const MenuItems = (props) => {

    const renderItems = ({ item }) => {
        let price = item.price.toFixed(2).toString();
        return (
            <ListItem
                id={item.id}
                title={item.name}
                onPress={() => { props.onPress(item.id) }}
                subtitle={"$" + price}
            />
        )
    }


    return (
        <FlatList
            data={props.coffees}
            renderItem={renderItems}
            keyExtractor={item => item.id.toString()}
        />
    )
}
