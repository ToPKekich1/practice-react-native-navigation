import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Button, Text } from 'react-native';
import { AuthContext } from './AuthProvider';
import Center from './Center';

const Stack = createStackNavigator();

function Login({ navigation }) {
    const { login } = React.useContext(AuthContext);
    return (
        <Center>
            <Text>I am a login screen</Text>
            <Button
                title="log me in"
                onPress={() => {
                    // navigation.navigate('Register');
                    login();
                }}
            />
            <Button
                title="Register"
                onPress={() => {
                    // navigation.navigate('Register');
                    navigation.push('Register');
                }}
            />
        </Center>
    );
}

function Register({ navigation, route }) {
    return (
        <Center>
            <Text>I am a {route.name} screen </Text>
            <Button
                title="go to login"
                onPress={() => {
                    navigation.navigate('Login');
                }}
            />
        </Center>
    );
}

export const AuthStack = () => {
    return (
        <Stack.Navigator
            // screenOptions={{
            //     //удаляет хедер
            //     header: () => null
            // }}
            initialRouteName="Login">
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen
                name="Register"
                options={{
                    headerTitle: 'Sign up'
                }}
                component={Register}
            />
        </Stack.Navigator>
    );
};
