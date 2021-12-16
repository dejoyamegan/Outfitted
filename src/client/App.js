import * as React from 'react';
import { userRoute, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View } from 'react-native';
import { Button, DarkTheme, ThemeProvider, DefaultTheme } from 'react-native-ios-kit';
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
import AddCategoryForm from './components/closet/AddCategoryForm';
import OutfitView from './components/dressingroom/outfitview';
import ProjectTheme from './components/styles/ProjectTheme';
const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator
      initialRouteName = "Signup"
      screenOptions={{
        headerShown: true,
        headTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#fabdbb',
        },
        animationTypeForReplace: 'pop',
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontFamily: 'PingFangSC-Thin'
        },
      }}>
        <Stack.Screen 
        name="Signup"
        component={Signup}
        options= {{
            title: 'Signup'}}
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
                    {title: 'Dressing Room'}
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
                    {title: 'Add Item'}
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
               {title: 'Item View'}
             }
        />
        <Stack.Screen
             name="OutfitView"
             component={OutfitView}
             options= {
               {title: 'Outfit View'}
             }
        />
        <Stack.Screen
             name="AddCategoryForm"
             component={AddCategoryForm}
             options= {
               {title: 'Add Category'}
             }
        />

    </Stack.Navigator>
  )


}


export default function App() {
  return (
    <ThemeProvider theme={ProjectTheme}>
        <NavigationContainer>
              <MyStack />
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
