import React from 'react';
import { Button, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Center from './Center';

function Product({ route, navigation }) {
    return (
        <Center>
            <Text>{route.params.name}</Text>
            <Button
                title="Edit this Product"
                onPress={() => {
                    navigation.navigate('EditProduct', {
                        name: route.params.name
                    });
                }}
            />
        </Center>
    );
}

function EditProduct({ route, navigation }) {
    const [formState, setFormState] = React.useState();
    const submit = React.useRef(() => {});

    submit.current = () => {
        //api call with new form state
        setFormState(formState);
        navigation.goBack();
    };

    React.useEffect(() => {
        navigation.setParams({ submit });
    }, []);

    return (
        <Center>
            <Text>Editing {route.params.name}</Text>
        </Center>
    );
}

export const addProductRoutes = Stack => {
    return (
        <>
            <Stack.Screen
                options={({ route }) => ({
                    headerTitle: `EditProduct: ${route.params.name}`,
                    headerRight: () => (
                        <TouchableOpacity
                            style={{ paddingRight: 8 }}
                            onPress={() => {
                                //submit the form
                                if (route.params.submit) {
                                    route.params.submit.current();
                                }
                            }}>
                            <Text style={{ color: 'red' }}>Done</Text>
                        </TouchableOpacity>
                    )
                })}
                name="EditProduct"
                component={EditProduct}
            />
            <Stack.Screen
                options={({ route }) => ({
                    headerTitle: `Product: ${route.params.name}`
                })}
                name="Product"
                component={Product}
            />
        </>
    );
};
