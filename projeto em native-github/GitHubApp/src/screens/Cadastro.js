import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  useWindowDimensions,
} from 'react-native';

import { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

export default function Cadastro({ navigation }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  const { cadastrar } = useContext(AuthContext);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={[styles.caixa1, isLandscape && styles.caixa1Landscape]}>
        <Text style={[styles.titulo, isLandscape && styles.tituloLandscape]}>
          Cadastre-se
        </Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Nome</Text>

          <TextInput
            style={styles.input}
            placeholder="Digite seu nome"
            value={nome}
            onChangeText={setNome}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>

          <TextInput
            style={styles.input}
            placeholder="Digite seu email"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Senha</Text>

          <TextInput
            style={styles.input}
            placeholder="Digite sua senha"
            secureTextEntry
            value={senha}
            onChangeText={setSenha}
          />
        </View>

        <View style={styles.buttonView}>
          {erro ? <Text style={styles.erro}>{erro}</Text> : null}
          <Button
            color="#a875d1"
            title="Cadastrar"
            onPress={() => {
              if (!nome || !email || !senha) {
                setErro('Preencha todos os campos');
                return;
              }
              if (!email.includes('@') || !email.includes('.')) {
                setErro('Email inválido');
                return;
              }
              cadastrar(nome, email, senha);
              alert('Cadastro realizado!');
              navigation.navigate('Login');
            }}
          />
        </View>
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

  caixa1: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#f7edff',
    borderRadius: 30,
    padding: 30,
  },

  titulo: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
  },

  inputContainer: {
    marginBottom: 20,
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

  buttonView: {
    marginTop: 20,
    borderRadius: 10,
    overflow: 'hidden',
  },
  erro: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
  caixa1Landscape: {
  paddingVertical: 15,
},
tituloLandscape: {
  fontSize: 24,
  marginBottom: 15,
},
});
