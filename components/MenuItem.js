import { useSelector, useDispatch } from 'react-redux';
import { addItem } from '../redux/cartSlice';
import {
    ScrollView,
    View,
    Text,
    Button,
    StyleSheet
} from 'react-native'
import React from 'react'
import { Image } from 'react-native-elements';



export const MenuItem = ({ route, navigation }) => {

    //item chosen from previous menu
    const { item } = route.params;

    //cart state provided by redux
    const cart = useSelector(state => state.cart.value)
    const dispatch = useDispatch()


    const [order, updateOrder] = React.useState({
        item: { ...item },
        size: "small",
    })


    function handleSizeChoice(choosenSize) {
        updateOrder({ item: { ...item }, size: choosenSize })
        console.log("updated size");
    }

    function handleModToggle(mod) {


        switch (mod) {
            case "cream":
                order.item.modifications.cream = true;

                break;
            case "almondmilk":
                order.item.modifications.almondmilk = true;
                break;
            case "oatmilk":
                order.item.modifications.oatmilk = true;
                break;
            case "stevia":
                order.item.modifications.stevia = true;
                break;
            case "sugar":
                order.item.modifications.sugar = true;
                break;
            default:
                console.log("something else pressed")
        }
    }



    function RenderPricesAndSizes() {
        return (
            <View style={styles.sizesContainer}>
                <Text
                    style={styles.sizes}
                    onPress={() => handleSizeChoice("small")}
                >
                    SM: ${item.price.small.toFixed(2)}</Text>
                <Text
                    style={styles.sizes}
                    onPress={() => handleSizeChoice("medium")}
                >
                    MD: ${item.price.medium.toFixed(2)}</Text>
                <Text
                    style={styles.sizes}
                    onPress={() => handleSizeChoice("large")}
                >
                    LG: ${item.price.large.toFixed(2)}</Text>
            </View>
        )
    }


    function RenderMods() {
        let mods = Object.keys(item.modifications).map(each => {
            return (
                <View style={styles.mod}>
                    <Text
                        style={styles.modText}
                        onPress={() => handleModToggle(each, item)}
                    >
                        {each}
                    </Text>
                </View>
            )
        })
        return mods;
    }

    //provides the 'cart(n)' on the header of the navigation
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Button onPress={() => navigation.navigate("Cart", { cart: cart })} title={`Cart (${cart.length})`} />
            ),
        });
        //updates when the navigation is changed or when the cart is updated
    }, [navigation, cart])


    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/*
                need to edit this to include the picture of the item
                and include a better formatting of the info
            */}
            <Image source={item.img} style={{ width: 300, height: 300, marginHorizontal: 40 }} />
            <Text style={styles.itemName}>
                {item.name}
            </Text>
            <View>
                {/* 
                    This item object needs to be edited by the UI
                    It is take the basic coffee structure,
                    then add on details to the order such
                    as creamer/milk/sugar/black/etc.
                */}
                <RenderPricesAndSizes />
                <Button title="Show order" onPress={() => printOrder()} />
                <View style={styles.modContainer}>
                    <RenderMods />
                </View>
                <Button
                    title="Add to Cart"
                    onPress={() => {
                        dispatch(addItem(order))
                    }}
                />
                <Button
                    title="Go Back"
                    onPress={() => navigation.goBack()}
                />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 20,
        minHeight: 450
    },
    itemName: {
        textAlign: 'center',
        fontSize: 20,
        margin: 20
    },
    sizesContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    sizes: {
        padding: 20,
        backgroundColor: 'black',
        color: 'white'
    },
    sizeChosen: {
        padding: 20,
        marginVertical: 10,
        backgroundColor: 'purple',
        color: 'white'
    },
    modContainer: {
        display: 'flex',
    },
    mod: {
        backgroundColor: 'black',
        marginVertical: 20
    },
    modText: {
        color: 'white',
        padding: 20,
        marginVertical: 10,
        textAlign: 'center'
    }
})