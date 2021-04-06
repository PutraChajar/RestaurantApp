import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {View, Text, Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Homes from './menu/home/Homes';
import Masakan from './menu/makanan/Masakan';
import Restoran from './menu/Restoran';
import Kota from './menu/kota/Kota';
import Kategori from './menu/kategori/Kategori';

const Stack = createStackNavigator();

class Router extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Homes">
          <Stack.Screen 
            name="Homes" 
            component={Homes} 
            options={{headerShown: false}}
          />
          <Stack.Screen 
            name="Masakan" 
            component={Masakan} 
            options={{headerShown: false}}
          />
          <Stack.Screen 
            name="Restoran" 
            component={Restoran} 
            options={({route}) => ({title: route.params.nama_restoran})}
          />
          <Stack.Screen 
            name="Kota" 
            component={Kota} 
            options={{headerShown: false}}
          />
          <Stack.Screen 
            name="Kategori" 
            component={Kategori} 
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default Router;