import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, TransitionPresets  } from '@react-navigation/native-stack';
import HomeScreen from './src/Screen/HomePageScreen';
import DetailScreen from './src/Screen/DetailScreen';
import ProductAdd from './src/Screen/ProductAdd'
export const iosTransitionSpec = {
  animation: "spring",
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 10,
    restSpeedThreshold: 10,
  },
}
const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="Anasayfa" component={HomeScreen}options={{
        headerShown:false,
        
      }} />
      <Stack.Screen name="Urunekle" component={ProductAdd}options={{
        headerShown:true,
        title:'Yeni Ürün Ekle',
        headerBackTitle: ''
      }} />
      <Stack.Screen name="Detaylar" component={DetailScreen} 
          options={{
            headerShown:true, 
            title:'Ürün Detayları',
            headerBackTitle: ''
          }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

