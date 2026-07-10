import { useContext, useEffect, useState } from 'react';
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
import { useNavigation } from '@react-navigation/native';
import { Swipeable } from 'react-native-gesture-handler';

import { AuthContext } from '../contexts/AuthContext';
import { GithubContext } from '../contexts/GithubContext';

function CardRepositorio({ item, onSwipe }) {
  return (
    <Swipeable
      renderRightActions={() => (
        <View style={styles.swipeAction}>
          <Text style={styles.swipeText}>Ver detalhes →</Text>
        </View>
      )}
      onSwipeableOpen={() => onSwipe(item)}>
      <View style={styles.card}>
        <Text style={styles.nome}>{item.name}</Text>
        <Text style={styles.descricao}>
          {item.description || 'Sem descrição'}
        </Text>
        <Text style={styles.info}>⭐ Stars: {item.stargazers_count}</Text>
        <Text style={styles.info}>💻 Linguagem: {item.language || 'N/A'}</Text>
        <Text style={styles.dica}>← deslize para ver detalhes</Text>
      </View>
    </Swipeable>
  );
}

export default function Repositorios() {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;
  const navigation = useNavigation();
  const { tokenGithub } = useContext(AuthContext);
  const {
    repositorios,
    loading,
    erro,
    buscarRepositorios,
    pagina,
    totalRepos,
  } = useContext(GithubContext);

  const [busca, setBusca] = useState('');
  const [ordem, setOrdem] = useState('az');

  const carregarMais = () => {
    if (repositorios.length < totalRepos && !loading) {
      buscarRepositorios(tokenGithub, pagina + 1);
    }
  };

  const porcentagem =
    totalRepos > 0 ? Math.round((repositorios.length / totalRepos) * 100) : 0;

  useEffect(() => {
    if (tokenGithub) buscarRepositorios(tokenGithub);
  }, []);

  const handleSwipe = (repositorio) => {
    navigation.navigate('DetalhesRepositorio', { repositorio });
  };

  const listaFiltrada = repositorios
    .filter((r) => r.name.toLowerCase().includes(busca.toLowerCase()))
    .sort((a, b) => {
      if (ordem === 'az') return a.name.localeCompare(b.name);
      if (ordem === 'za') return b.name.localeCompare(a.name);
      if (ordem === 'stars') return b.stargazers_count - a.stargazers_count;
      return 0;
    });

  if (loading && repositorios.length === 0) {
    return (
      <ActivityIndicator size="large" color="#6A0DAD" style={{ flex: 1 }} />
    );
  }

  if (erro) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: 'red' }}>{erro}</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
    {' '}
      <View
        style={[
          styles.progressoContainer,
          isLandscape && styles.progressoContainerLandscape,
        ]}>
        <Text style={isLandscape && styles.textoLandscape}>
          {repositorios.length} de {totalRepos} repositórios carregados
        </Text>
        <View style={[styles.barra, isLandscape && styles.barraLandscape]}>
          <View style={[styles.preenchimento, { width: `${porcentagem}%` }]} />
        </View>
        <Text style={isLandscape && styles.textoLandscape}>{porcentagem}%</Text>
      </View>

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
            selectedValue={ordem}
            onValueChange={(value) => setOrdem(value)}
            style={isLandscape && { height: 55 }}>
            <Picker.Item label="Ordenação" value="" />
            <Picker.Item label="A-Z" value="az" />
            <Picker.Item label="Z-A" value="za" />
            <Picker.Item label="⭐ Mais Stars" value="stars" />
          </Picker>
        </View>
      </View>

      <FlatList
        data={listaFiltrada}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CardRepositorio item={item} onSwipe={handleSwipe} />
        )}
        onEndReached={carregarMais}
        onEndReachedThreshold={0.5}
        refreshing={loading}
        onRefresh={() => buscarRepositorios(tokenGithub, 1)}
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
  nome: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6A0DAD',
  },
  descricao: {
    marginTop: 8,
    color: '#555',
  },
  info: {
    marginTop: 5,
  },
  dica: {
    marginTop: 10,
    fontSize: 11,
    color: '#aaa',
    textAlign: 'right',
  },
  swipeAction: {
    backgroundColor: '#6A0DAD',
    justifyContent: 'center',
    alignItems: 'center',
    width: 120,
    margin: 10,
    borderRadius: 12,
  },
  swipeText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
    paddingHorizontal: 10,
    textAlign: 'center',
  },
  progressoContainer: {
    padding: 15,
    backgroundColor: '#fff',
  },
  barra: {
    height: 12,
    backgroundColor: '#DDD',
    borderRadius: 10,
    marginVertical: 8,
    overflow: 'hidden',
  },
  preenchimento: {
    height: '100%',
    backgroundColor: '#6A0DAD',
    borderRadius: 10,
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
  progressoContainerLandscape: {
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  barraLandscape: {
    flex: 1,
    height: 6,
    marginVertical: 0,
  },
  textoLandscape: {
    fontSize: 11,
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
  },
});
