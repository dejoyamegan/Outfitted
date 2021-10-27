import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View } from 'react-native';

import Login from './components/authentication/login';
import Signup from './components/authentication/signup';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator
      initialRouteName = "Signup"
      screenOptions={{
        headTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#4EA16D'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontFamily: 'PingFang HK'
        },
      }}>
        <Stack.Screen 
        name="Signup"
        component={Signup}
        options= {{ title: 'Signup'}}
        />
        <Stack.Screen 
          name="Login"
          component={Login}
          options= {
            {title: 'Login'},
            {headerLeft: null}
          }
        />
    </Stack.Navigator>
  )


}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack  />
    </NavigationContainer>
    // <View style={styles.container}>
    //   <Text>Open up App.js to start working on your app!</Text>
    //   <StatusBar style="auto" />
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
