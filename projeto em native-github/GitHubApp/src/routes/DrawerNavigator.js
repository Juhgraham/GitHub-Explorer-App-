import { createDrawerNavigator } from '@react-navigation/drawer';
import Perfil from '../screens/Perfil';
import DadosGithub from '../screens/DadosGithub';
import Repositorios from '../screens/Repositorios';
import Issues from '../screens/Issues';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator>

      <Drawer.Screen name="Perfil" component={Perfil} />

      <Drawer.Screen name="Dados GitHub" component={DadosGithub} />

      <Drawer.Screen name="Repositorios" component={Repositorios} />

      <Drawer.Screen name="Issues" component={Issues} />
    </Drawer.Navigator>
  );
}
