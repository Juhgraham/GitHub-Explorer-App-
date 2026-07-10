import { Text, StyleSheet, ScrollView } from 'react-native';

export default function DetalhesRepositorio({ route }) {
  const { repositorio } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {' '}
      <Text style={styles.nome}>{repositorio.name} </Text>
      <Text style={styles.info}>
        Descrição: {repositorio.description || 'Sem descrição'}
      </Text>
      <Text style={styles.info}>
        Linguagem: {repositorio.language || 'N/A'}
      </Text>
      <Text style={styles.info}>Stars: {repositorio.stargazers_count}</Text>
      <Text style={styles.info}>Forks: {repositorio.forks_count}</Text>
      <Text style={styles.info}>Visibilidade: {repositorio.visibility}</Text>
      <Text style={styles.info}>URL: {repositorio.html_url}</Text>
      <Text style={styles.info}>Criado em: {repositorio.created_at}</Text>
      <Text style={styles.info}>
        Última atualização: {repositorio.updated_at}
      </Text>
      <Text style={styles.info}>
        Branch principal: {repositorio.default_branch}
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },

  nome: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#6A0DAD',
  },

  info: {
    marginBottom: 10,
    fontSize: 16,
  },
});
