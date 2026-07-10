import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from '../screens/Login';
import Cadastro from '../screens/Cadastro';
import DrawerNavigator from './DrawerNavigator';
import DetalhesRepositorio from '../screens/DetalhesRepositorio';

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} />

      <Stack.Screen name="Cadastro" component={Cadastro} />

      <Stack.Screen name="Home" component={DrawerNavigator} />

      <Stack.Screen
        name="DetalhesRepositorio"
        component={DetalhesRepositorio}
        options={{ title: 'Detalhes do Repositório' }}
      />
    </Stack.Navigator>
  );
}
