import React from 'react'
import { ScrollView, View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native'
import { Image, ListItem } from '@rneui/themed';
import { useSelector, useDispatch } from 'react-redux';
import { addItem } from '../redux/cartSlice';

export const MenuItem = ({ route, navigation }) => {

    //item chosen from previous menu
    const { item } = route.params;

    //cart state provided by redux
    const cart = useSelector(state => state.cart.value)
    const dispatch = useDispatch()

    const [order, updateOrder] = React.useState({ ...item });

    const [size, setSize] = React.useState(item.size);


    const [almondmilk, setAlmondmilk] = React.useState(item.modifications.almondmilk)
    const [oatmilk, setOatmilk] = React.useState(item.modifications.oatmilk)
    const [stevia, setStevia] = React.useState(item.modifications.stevia)
    const [sugar, setSugar] = React.useState(item.modifications.sugar)
    const [cream, setCream] = React.useState(item.modifications.cream)


    const [numberOfItems, setNumberOfItems] = React.useState(1);

    const [modsExpanded, setModsExpanded] = React.useState(false);

    function printOrder() {
        console.log(order);
    }

    function returnItemCount() {
        let totalItems = 0;
        if (!cart[0]) return 0
        for (let i = 0; i < cart.length; i++) {
            totalItems += cart[i].count;
        }
        return totalItems;
    }

    function handleSizeChoice(choosenSize) {
        let temp = { ...order };
        temp.size = choosenSize
        updateOrder({ ...temp })
        setSize(choosenSize)
    }

    function handleModToggle(mod) {
        let temp = { ...order.modifications }
        switch (mod) {
            case "cream":
                setCream(!cream);
                temp.cream = !temp.cream
                break;
            case "almondmilk":
                setAlmondmilk(!almondmilk);
                temp.almondmilk = !temp.almondmilk
                break;
            case "oatmilk":
                setOatmilk(!oatmilk);
                temp.oatmilk = !temp.oatmilk
                break;
            case "stevia":
                setStevia(!stevia);
                temp.stevia = !temp.stevia
                break;
            case "sugar":
                setSugar(!sugar);
                temp.sugar = !temp.sugar
                break;
            default: console.log("something else pressed");
        }
        updateOrder({ ...order, modifications: temp })
    }

    function RenderPricesAndSizes() {
        return (
            <View style={styles.sizesContainer}>
                {size === "small"
                    ? <Text style={styles.sizeChosen} onPress={() => handleSizeChoice("small")}> SM: ${item.price.small.toFixed(2)}</Text>
                    : <Text style={styles.sizes} onPress={() => handleSizeChoice("small")}>SM: ${item.price.small.toFixed(2)}</Text>
                }
                {size === "medium"
                    ? <Text style={styles.sizeChosen} onPress={() => handleSizeChoice("medium")}> MD: ${item.price.medium.toFixed(2)}</Text>
                    : <Text style={styles.sizes} onPress={() => handleSizeChoice("medium")}> MD: ${item.price.medium.toFixed(2)}</Text>
                }
                {size === "large"
                    ? <Text style={styles.sizeChosen} onPress={() => handleSizeChoice("large")}> LG: ${item.price.large.toFixed(2)}</Text>
                    : <Text style={styles.sizes} onPress={() => handleSizeChoice("large")}>LG: ${item.price.large.toFixed(2)}</Text>
                }
            </View>
        )
    }

    function RenderMods() {
        return (
            <>
                <ListItem.Content>
                    {cream
                        ? <Text onPress={() => handleModToggle("cream")} style={styles.selectedMod}>Cream</Text>
                        : <Text onPress={() => handleModToggle("cream")} style={styles.mod}>Cream</Text>}
                </ListItem.Content>
                <ListItem.Content>
                    {almondmilk
                        ? <Text onPress={() => handleModToggle("almondmilk")} style={styles.selectedMod}>Almond Milk</Text>
                        : <Text onPress={() => handleModToggle("almondmilk")} style={styles.mod} >Almond Milk</Text>
                    }
                </ListItem.Content>
                <ListItem.Content>
                    {oatmilk
                        ? <Text onPress={() => handleModToggle("oatmilk")} style={styles.selectedMod}>Oat Milk</Text>
                        : <Text onPress={() => handleModToggle("oatmilk")} style={styles.mod}>Oat Milk</Text>
                    }
                </ListItem.Content>
                <ListItem.Content>
                    {sugar
                        ? <Text onPress={() => handleModToggle("sugar")} style={styles.selectedMod}>Sugar</Text>
                        : <Text onPress={() => handleModToggle("sugar")} style={styles.mod}>Sugar</Text>
                    }
                </ListItem.Content>
                <ListItem.Content>
                    {stevia
                        ? <Text onPress={() => handleModToggle("stevia")} style={styles.selectedMod}>Stevia</Text>
                        : <Text onPress={() => handleModToggle("stevia")} style={styles.mod}>Stevia</Text>
                    }
                </ListItem.Content>
            </>

        )
    }

    //for handling how many drinks you want
    function decrementOrder() {
        if (numberOfItems == 1) return
        setNumberOfItems(numberOfItems - 1)
        updateOrder({ ...order, count: numberOfItems - 1 });
    }

    function incrementOrder() {
        setNumberOfItems(numberOfItems + 1)
        updateOrder({ ...order, count: numberOfItems + 1 });
    }

    //handles dispatch to redux store, then resets all 
    //variables for a new order
    function handleAddToCart() {
        dispatch(addItem(order))
        setCream(item.modifications.cream)
        setAlmondmilk(item.modifications.almondmilk)
        setOatmilk(item.modifications.oatmilk)
        setSugar(item.modifications.sugar)
        setStevia(item.modifications.stevia)
        setNumberOfItems(item.count)
        setSize(item.size)
    }

    //provides the 'cart(n)' on the header of the navigation
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Button onPress={() => navigation.navigate("Cart", { cart: cart })} title={`Cart (${returnItemCount()})`} />
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
                {/* Increment and decremnt view */}
                <View style={styles.numberSelector}>
                    <Button style={styles.incDecBtns} title='-' onPress={() => decrementOrder()} />
                    <Text style={{ textAlign: 'center' }}>{numberOfItems}</Text>
                    <Button style={styles.incDecBtns} title='+' onPress={() => incrementOrder()} />
                </View>
                {/* Add to cart button */}
                <TouchableOpacity style={styles.addToCartBtn} onPress={() => handleAddToCart()}>
                    <Text style={styles.addToCartText}>Add to Cart</Text>
                </TouchableOpacity>


                {/* render all the modifications*/}
                <ListItem.Accordion
                    content={
                        <>
                            <ListItem.Content>
                                <ListItem.Title>Modifications</ListItem.Title>
                            </ListItem.Content>
                        </>
                    }
                    isExpanded={modsExpanded}
                    onPress={() => {
                        setModsExpanded(!modsExpanded);
                    }}
                >
                    <View style={styles.modContainer}>
                        <RenderMods />
                    </View>
                </ListItem.Accordion>
                <Button title="Go Back" onPress={() => navigation.goBack()} />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        padding: 20,
        minHeight: '100%'
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
        color: 'white',
        borderRadius: 20,
        overflow: 'hidden'
    },
    selectedMod: {
        backgroundColor: 'purple',
        color: 'white',
        marginVertical: 10,
        padding: 10,
        textAlign: 'center',
        width: '100%',
        borderRadius: 20,
        overflow: 'hidden'
    },
    mod: {
        backgroundColor: 'black',
        color: 'white',
        marginVertical: 10,
        padding: 10,
        textAlign: 'center',
        width: '100%'
    },
    modContainer: {
        display: 'flex',
        marginVertical: 10
    },
    addToCartBtn: {
        display: 'flex',
        backgroundColor: 'black',

    },
    addToCartText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 20,
        marginVertical: 15,

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