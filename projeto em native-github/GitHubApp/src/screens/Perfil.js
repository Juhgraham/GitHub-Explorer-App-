import { useContext, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
} from 'react-native';

import { AuthContext } from '../contexts/AuthContext';

export default function Perfil() {
  const { usuarioLogado, tokenGithub, atualizarToken } =
    useContext(AuthContext);

  const [token, setToken] = useState(tokenGithub);

  const salvarToken = () => {
    atualizarToken(token);
    alert('Token atualizado com sucesso!');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {' '}
      <View style={styles.caixa}>
        {' '}
        <Text style={styles.titulo}>Perfil</Text>
        <Text style={styles.texto}>Usuário: {usuarioLogado?.nome}</Text>
        <Text style={styles.texto}>E-mail: {usuarioLogado?.email}</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Token do GitHub</Text>

          <TextInput
            style={styles.input}
            placeholder="Cole seu token aqui"
            value={token}
            onChangeText={setToken}
            autoCapitalize="none"
          />
        </View>
        <Button title="Salvar Token" color="#a875d1" onPress={salvarToken} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },

  caixa: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#f7edff',
    borderRadius: 30,
    padding: 30,
  },

  titulo: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 25,
  },

  texto: {
    fontSize: 16,
    marginBottom: 10,
  },

  inputContainer: {
    marginTop: 20,
    marginBottom: 25,
  },

  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: '500',
  },

  input: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 12,
    padding: 14,
    backgroundColor: '#fff',
  },
});
