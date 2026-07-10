import { useContext, useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TextInput,
  useWindowDimensions,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Swipeable } from 'react-native-gesture-handler';
import { AuthContext } from '../contexts/AuthContext';
import { GithubContext } from '../contexts/GithubContext';

function CardIssue({ item, onAlterar }) {
  const ref = useRef(null);

  return (
    <Swipeable
      ref={ref}
      renderLeftActions={() => (
        <View style={[styles.acao, { backgroundColor: '#28a745' }]}>
          <Text style={styles.acaoTexto}>Abrir</Text>
        </View>
      )}
      renderRightActions={() => (
        <View style={[styles.acao, { backgroundColor: '#dc3545' }]}>
          <Text style={styles.acaoTexto}>Fechar</Text>
        </View>
      )}
      onSwipeableOpen={(direction) => {
  ref.current?.close();
  
  if (direction === 'left' && item.state === 'closed') {
    onAlterar(item);
  } else if (direction === 'right' && item.state === 'open') {
    onAlterar(item);
  }
}}
    >
      <View style={styles.card}>
        <Text style={styles.titulo}>{item.title}</Text>
        <Text style={styles.info}>Estado: {item.state}</Text>
        <Text style={styles.info}>Repositório: {item.repository?.full_name}</Text>
        <Text style={styles.info}>Autor: {item.user?.login}</Text>
      </View>
    </Swipeable>
  );
}

export default function Issues() {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;
  const { tokenGithub } = useContext(AuthContext);
  const { issues, loading, erro, buscarIssues, alterarEstadoIssue } =
    useContext(GithubContext);

  const [busca, setBusca] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('todas');

  useEffect(() => {
    if (tokenGithub) {
      buscarIssues(tokenGithub);
    }
  }, [tokenGithub, buscarIssues]);

  const listaFiltrada = issues
    .filter((i) => i.title.toLowerCase().includes(busca.toLowerCase()))
    .filter((i) => filtroEstado === 'todas' || i.state === filtroEstado);

  if (loading) return <ActivityIndicator size="large" />;
  if (erro) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.erro}>{erro}</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={isLandscape && styles.controlesLandscape}>
        <TextInput
          style={[styles.input, isLandscape && styles.inputLandscape]}
          placeholder="Filtro"
          value={busca}
          onChangeText={setBusca}
        />

        <View
          style={[
            styles.pickerContainer,
            isLandscape && styles.pickerLandscape,
          ]}>
          <Picker
            selectedValue={filtroEstado}
            onValueChange={(value) => setFiltroEstado(value)}
            style={isLandscape && { height: 55 }}>
            <Picker.Item label="Todas" value="todas" />
            <Picker.Item label="Abertas" value="open" />
            <Picker.Item label="Fechadas" value="closed" />
          </Picker>
        </View>
      </View>

      <FlatList
        data={listaFiltrada}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={
          <Text style={{ textAlign: 'center', marginTop: 20 }}>
            Nenhuma issue encontrada.
          </Text>
        }
        renderItem={({ item }) => (
          <CardIssue
            item={item}
            onAlterar={(issue) => alterarEstadoIssue(tokenGithub, issue)}
          />
        )}
        refreshing={loading}
        onRefresh={() => buscarIssues(tokenGithub)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    margin: 10,
    padding: 15,
    borderRadius: 12,
    elevation: 3,
  },
  titulo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6A0DAD',
  },
  info: {
    marginTop: 5,
    color: '#555',
  },
  acao: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 90,
    margin: 10,
    borderRadius: 12,
  },
  acaoTexto: {
    color: '#fff',
    fontWeight: 'bold',
  },
  input: {
    margin: 10,
    marginBottom: 5,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#DDD',
  },
  pickerContainer: {
    marginHorizontal: 10,
    marginBottom: 5,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#DDD',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  erro: {
    color: 'red',
    fontSize: 16,
  },
  controlesLandscape: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 10,
  },
  inputLandscape: {
    flex: 1,
    margin: 0,
    marginBottom: 5,
    padding: 6,
  },
  pickerLandscape: {
    flex: 1,
    marginHorizontal: 0,
    justifyContent: 'center',
  },
});
