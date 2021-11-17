import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View } from 'react-native';
import { DefaultTheme, ThemeProvider } from 'react-native-ios-kit';
import color from 'color';

import Login from './components/authentication/login';
import Signup from './components/authentication/signup';
import Closet from './components/closet/closet';
import DressingRoom from './components/dressingroom/dressingroom';
import Outfits from './components/outfits/outfits'
import AddItemForm from './components/closet/AddItemForm';
import Runway from './components/dressingroom/runway';
import Items from './components/closet/items';
import ItemView from './components/closet/itemView';
import OutfitView from './components/dressingroom/outfitview';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator
      initialRouteName = "Signup"
      screenOptions={{
        headTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#97bde8'
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
        <Stack.Screen
          name="Closet"
          component={Closet}
          options= {
            {title: 'Closet'}
          }
        />
        <Stack.Screen
                  name="DressingRoom"
                  component={DressingRoom}
                  options= {
                    {title: 'DressingRoom'}
                  }
                />
        <Stack.Screen
                  name="Outfits"
                  component={Outfits}
                  options= {
                    {title: 'Outfits'}
                  }
                />
        <Stack.Screen
                  name="AddItemForm"
                  component={AddItemForm}
                  options= {
                    {title: 'AddItemForm'}
                  }
                />
        <Stack.Screen
                  name="Runway"
                  component={Runway}
                  options= {
                    {title: 'Runway'}
                  }
                />
        <Stack.Screen
             name="Items"
             component={Items}
             options= {
               {title: 'Items'}
             }
        />
        <Stack.Screen
             name="ItemView"
             component={ItemView}
             options= {
               {title: 'ItemView'}
             }
        />
        <Stack.Screen
             name="OutfitView"
             component={OutfitView}
             options= {
               {title: 'OutfitView'}
             }
        />

    </Stack.Navigator>
  )


}


export default function App() {
  return (
    <ThemeProvider theme={DefaultTheme}>
        <NavigationContainer>
              <MyStack  />
        </NavigationContainer>
    </ThemeProvider>
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
