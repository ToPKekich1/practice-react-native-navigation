import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ActivityIndicator, AsyncStorage } from 'react-native';
import Center from './Center';
import { AuthContext } from './AuthProvider';
import { AppTabs } from './AppTabs';
import { AuthStack } from './AuthStack';

export const Routes = ({}) => {
    const { user, login } = React.useContext(AuthContext);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        AsyncStorage.getItem('user')
            .then(userString => {
                if (userString) {
                    login();
                }
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    if (loading) {
        return (
            <Center>
                <ActivityIndicator size="large" color="#000" />
            </Center>
        );
    }

    return (
        <NavigationContainer>
            {user ? <AppTabs /> : <AuthStack />}
        </NavigationContainer>
    );
};
