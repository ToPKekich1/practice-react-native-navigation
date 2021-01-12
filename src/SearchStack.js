import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Center from './Center';
import { Button, Text } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import faker from 'faker';
import { addProductRoutes } from './AddProductRoutes';

const Stack = createStackNavigator();

function Search({ navigation }) {
    const [show, setShow] = React.useState(false);
    return (
        <Center>
            <Button
                title="Search Products"
                onPress={() => {
                    setShow(true);
                }}
            />
            {show ? (
                <FlatList
                    style={{ width: '100%' }}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate('Product', {
                                        name: item
                                    });
                                }}>
                                <Text style={{ fontSize: 36 }}>{item}</Text>
                            </TouchableOpacity>
                        );
                    }}
                    keyExtractor={(product, index) => product + index}
                    data={Array.from(Array(50), () => faker.commerce.product())}
                />
            ) : null}
        </Center>
    );
}

export const SearchStack = ({}) => {
    return (
        <Stack.Navigator initialRouteName="Search">
            <Stack.Screen name="Search" component={Search} />
            {addProductRoutes(Stack)}
        </Stack.Navigator>
    );
};
