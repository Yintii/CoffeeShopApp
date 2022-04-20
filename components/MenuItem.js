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

    const [order, updateOrder] = React.useState({ ...item });

    const [size, setSize] = React.useState(item.size);

    const [cream, setCream] = React.useState(order.modifications.cream)
    const [almondmilk, setAlmondmilk] = React.useState(order.modifications.almondmilk)
    const [oatmilk, setOatmilk] = React.useState(order.modifications.oatmilk)
    const [sugar, setSugar] = React.useState(order.modifications.sugar)
    const [stevia, setStevia] = React.useState(order.modifications.stevia)

    const [numberOfItems, setNumberOfItems] = React.useState(1);

    function printOrder() {
        console.log(order);
    }

    function handleSizeChoice(choosenSize) {
        order.size = choosenSize
        updateOrder(order)
        setSize(choosenSize)
        console.log("updated size");
    }

    function handleModToggle(mod) {
        switch (mod) {
            case "cream":
                if (!order.modifications.cream) {
                    order.modifications.cream = true;
                    setCream(true);
                    console.log("creme added")
                } else {
                    order.modifications.cream = false;
                    setCream(false)
                    console.log("creme removed")
                }
                break;
            case "almondmilk":
                if (!order.modifications.almondmilk) {
                    order.modifications.almondmilk = true;
                    setAlmondmilk(true)
                    console.log("almond milk added")
                } else {
                    order.modifications.almondmilk = false;
                    setAlmondmilk(false)
                    console.log("almond milk removed")
                }
                break;
            case "oatmilk":
                if (!order.modifications.oatmilk) {
                    order.modifications.oatmilk = true;
                    setOatmilk(true)
                    console.log("oatmilk added")
                } else {
                    order.modifications.oatmilk = false;
                    setOatmilk(false)
                    console.log("oatmilk removed")
                }
                break;
            case "stevia":
                if (!order.modifications.stevia) {
                    order.modifications.stevia = true;
                    setStevia(true)
                    console.log("stevia added")
                } else {
                    order.modifications.stevia = false;
                    setStevia(false)
                    console.log("stevia removed")
                }
                break;
            case "sugar":
                if (!order.modifications.sugar) {
                    order.modifications.sugar = true;
                    setSugar(true)
                    console.log("sugar added")
                } else {
                    order.modifications.sugar = false;
                    setSugar(false);
                    console.log("sugar removed")
                }
                break;
            default:
                console.log("something else pressed")
        }
        updateOrder(order)
    }

    function RenderPricesAndSizes() {
        return (
            <View style={styles.sizesContainer}>
                {size === "small"
                    ? <Text
                        style={styles.sizeChosen}
                        onPress={() => handleSizeChoice("small")}
                    >
                        SM: ${item.price.small.toFixed(2)}</Text>
                    : <Text
                        style={styles.sizes}
                        onPress={() => handleSizeChoice("small")}
                    >
                        SM: ${item.price.small.toFixed(2)}</Text>
                }
                {size === "medium"
                    ? <Text
                        style={styles.sizeChosen}
                        onPress={() => handleSizeChoice("medium")}
                    >
                        MD: ${item.price.medium.toFixed(2)}</Text>
                    : <Text
                        style={styles.sizes}
                        onPress={() => handleSizeChoice("medium")}
                    >
                        MD: ${item.price.medium.toFixed(2)}</Text>
                }
                {size === "large"
                    ? <Text
                        style={styles.sizeChosen}
                        onPress={() => handleSizeChoice("large")}
                    >
                        LG: ${item.price.large.toFixed(2)}</Text>
                    : <Text
                        style={styles.sizes}
                        onPress={() => handleSizeChoice("large")}
                    >
                        LG: ${item.price.large.toFixed(2)}</Text>
                }
            </View>
        )
    }

    function RenderMods() {
        return (
            <View>
                {cream
                    ? <Text
                        onPress={() => handleModToggle("cream")}
                        style={styles.selectedMod}>
                        Cream
                    </Text>
                    : <Text
                        onPress={() => handleModToggle("cream")}
                        style={styles.mod}>
                        No Creme
                    </Text>}

                {almondmilk
                    ? <Text
                        onPress={() => handleModToggle("almondmilk")}
                        style={styles.selectedMod}>Almond Milk</Text>
                    : <Text
                        onPress={() => handleModToggle("almondmilk")}
                        style={styles.mod}
                    >No Almond Milk</Text>
                }
                {oatmilk
                    ? <Text
                        onPress={() => handleModToggle("oatmilk")}
                        style={styles.selectedMod}>Oat Milk</Text>
                    : <Text
                        onPress={() => handleModToggle("oatmilk")}
                        style={styles.mod}
                    >No Oat Milk</Text>
                }
                {sugar
                    ? <Text
                        onPress={() => handleModToggle("sugar")}
                        style={styles.selectedMod}>Sugar</Text>
                    : <Text
                        onPress={() => handleModToggle("sugar")}
                        style={styles.mod}
                    >No Sugar</Text>
                }
                {stevia
                    ? <Text
                        onPress={() => handleModToggle("stevia")}
                        style={styles.selectedMod}>Stevia</Text>
                    : <Text
                        onPress={() => handleModToggle("stevia")}
                        style={styles.mod}
                    >No Stevia</Text>
                }
            </View >

        )
    }

    //for handling how many drinks you want
    function decrementOrder() {
        if (numberOfItems == 1) {
            return
        }
        setNumberOfItems(numberOfItems - 1)
        order.count = numberOfItems - 1;
        updateOrder(order);
        console.log(numberOfItems);
    }
    function incrementOrder() {
        setNumberOfItems(numberOfItems + 1)
        order.count = numberOfItems + 1;
        updateOrder(order);
        console.log(numberOfItems + 1);

    }

    //provides the 'cart(n)' on the header of the navigation
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Button onPress={() => navigation.navigate("Cart", { cart: cart })} title={`Cart (${cart.length})`} />
            ),
            title: `${item.name}`
        });
        //updates when the navigation is changed or when the cart is updated
    }, [navigation, cart])


    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Image source={item.img} style={{ width: 300, height: 300, marginHorizontal: 40 }} />
            <Text style={styles.itemName}>
                {item.name}
            </Text>
            <View>
                <RenderPricesAndSizes />
                <Button title="Show order" onPress={() => printOrder()} />
                <View style={styles.modContainer}>
                    <RenderMods />
                </View>
                <View style={styles.numberSelector}>
                    <Button style={styles.incDecBtns} title='-' onPress={() => decrementOrder()} />
                    <Text style={{ textAlign: 'center' }}>{numberOfItems}</Text>
                    <Button style={styles.incDecBtns} title='+' onPress={() => incrementOrder()} />
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
        justifyContent: 'space-around',
    },
    sizes: {
        padding: 20,
        backgroundColor: 'black',
        color: 'white',
        alignSelf: 'center'
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
    selectedMod: {
        backgroundColor: 'purple',
        marginVertical: 20,
        color: 'white',
        padding: 20,
        marginVertical: 10,
        textAlign: 'center'
    },
    mod: {
        backgroundColor: 'black',
        marginVertical: 20,
        color: 'white',
        padding: 20,
        marginVertical: 10,
        textAlign: 'center'
    },
    numberSelector: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 100,
        paddingVertical: 20,
        alignItems: 'center'
    },
    incDecBtns: {
        backgroundColor: 'black',
        color: 'white',
    }
})