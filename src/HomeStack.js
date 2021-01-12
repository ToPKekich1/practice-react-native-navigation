import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Text, TouchableOpacity, FlatList, Button } from 'react-native';
import {} from 'react-native-gesture-handler';
import { AuthContext } from './AuthProvider';
import Center from './Center';
import faker from 'faker';
import { addProductRoutes } from './AddProductRoutes';

const Stack = createStackNavigator();

function Feed({ navigation }) {
    return (
        <Center>
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
        </Center>
    );
}

export const HomeStack = ({}) => {
    const { logout } = React.useContext(AuthContext);

    return (
        <Stack.Navigator initialRouteName="Feed">
            {addProductRoutes(Stack)}
            <Stack.Screen
                name="Feed"
                options={{
                    headerRight: () => {
                        return (
                            <TouchableOpacity
                                onPress={() => {
                                    logout();
                                }}>
                                <Text>LOGOUT</Text>
                            </TouchableOpacity>
                        );
                    }
                }}
                component={Feed}
            />
        </Stack.Navigator>
    );
};
