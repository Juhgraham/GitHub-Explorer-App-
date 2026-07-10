import { useContext, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
} from 'react-native';

import { AuthContext } from '../contexts/AuthContext';
import { GithubContext } from '../contexts/GithubContext';

export default function DadosGithub() {
  const { tokenGithub } = useContext(AuthContext);
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  const { perfilGithub, loading, erro, buscarPerfilGithub } =
    useContext(GithubContext);

  useEffect(() => {
    if (tokenGithub) {
      buscarPerfilGithub(tokenGithub);
    }
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6A0DAD" />
        <Text>Carregando perfil...</Text>
      </View>
    );
  }

  if (erro) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.erro}>{erro}</Text>
      </View>
    );
  }

  return (
  <ScrollView contentContainerStyle={styles.container}>
    {perfilGithub && (
      <View style={styles.card}>
        <View style={isLandscape ? styles.topoLandscape : styles.topoPortrait}>
          <Image
            source={{ uri: perfilGithub.avatar_url }}
            style={[styles.avatar, isLandscape && styles.avatarLandscape]}
          />
          <Text style={styles.nome}>
            {perfilGithub.name || "Nome não informado"}
          </Text>
          <Text style={styles.login}>
            @{perfilGithub.login}
          </Text>
        </View>

        {isLandscape && (
          <View style={styles.bioLandscape}>
            <Text style={styles.bio}>
              {perfilGithub.bio || "Sem bio cadastrada"}
            </Text>
          </View>
        )}

        {!isLandscape && (
          <Text style={styles.bio}>
            {perfilGithub.bio || "Sem bio cadastrada"}
          </Text>
        )}

        <View style={styles.stats}>
          <View style={styles.statBox}>
            <Text style={styles.numero}>
              {perfilGithub.public_repos + (perfilGithub.total_private_repos || 0)}
            </Text>
            <Text style={styles.label}>Repositórios</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.numero}>{perfilGithub.followers}</Text>
            <Text style={styles.label}>Seguidores</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.numero}>{perfilGithub.following}</Text>
            <Text style={styles.label}>Seguindo</Text>
          </View>
        </View>
      </View>
    )}
  </ScrollView>
);
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F4F6F8',
    justifyContent: 'center',
    padding: 20,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

 card: {
  backgroundColor: "#FFF",
  borderRadius: 20,
  padding: 25,
  alignItems: "center",
  elevation: 5,
  flexWrap: "wrap",
  flexDirection: "row",
  justifyContent: "center",
},

  avatar: {
    width: 130,
    height: 130,
    borderRadius: 65,
    marginBottom: 15,
    borderWidth: 3,
    borderColor: '#6A0DAD',
  },

  nome: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#222',
  },

  login: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },

  bio: {
    textAlign: 'center',
    marginTop: 15,
    color: '#555',
    marginBottom: 25,
  },

  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },

  statBox: {
    alignItems: 'center',
  },

  numero: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6A0DAD',
  },

  label: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },

  erro: {
    color: 'red',
    fontSize: 16,
  },
avatarLandscape: {
  width: 80,
  height: 80,
  borderRadius: 40,
  marginRight: 20,
},
bioLandscape: {
  width: "50%",
  justifyContent: "center",
  alignItems: "center",
  paddingLeft: 10,
},
topoPortrait: {
  alignItems: "center",
  width: "100%",
},
topoLandscape: {
  alignItems: "center",
  width: "45%",
},
});
