import { createContext, useReducer, useCallback } from 'react';

export const GithubContext = createContext();

const estadoInicial = {
  perfilGithub: null,
  repositorios: [],
  issues: [],
  loading: false,
  erro: null,
  pagina: 1,
  totalRepos: 0,
};

function githubReducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERRO':
      return { ...state, erro: action.payload };
    case 'SET_PERFIL':
      return { ...state, perfilGithub: action.payload };
    case 'SET_TOTAL_REPOS':
      return { ...state, totalRepos: action.payload };
    case 'SET_REPOSITORIOS':
      return { ...state, repositorios: action.payload };
    case 'ADD_REPOSITORIOS':
      return { ...state, repositorios: [...state.repositorios, ...action.payload] };
    case 'SET_PAGINA':
      return { ...state, pagina: action.payload };
    case 'SET_ISSUES':
      return { ...state, issues: action.payload };
    case 'ATUALIZAR_ISSUE':
      return {
        ...state,
        issues: state.issues.map((i) =>
          i.id === action.payload.id ? action.payload : i
        ),
      };
    default:
      return state;
  }
}

export function GithubProvider({ children }) {
  const [state, dispatch] = useReducer(githubReducer, estadoInicial);

  const buscarPerfilGithub = async (token) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_ERRO', payload: null });

      const response = await fetch('https://api.github.com/user', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error('Erro ao buscar perfil');

      const data = await response.json();
      dispatch({ type: 'SET_PERFIL', payload: data });
      dispatch({ type: 'SET_TOTAL_REPOS', payload: data.public_repos + (data.total_private_repos || 0) });
    } catch (error) {
      dispatch({ type: 'SET_ERRO', payload: error.message });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const buscarRepositorios = async (token, page = 1) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_ERRO', payload: null });

      if (state.totalRepos === 0) {
        const perfilResponse = await fetch('https://api.github.com/user', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (perfilResponse.ok) {
          const perfilData = await perfilResponse.json();
          dispatch({ type: 'SET_TOTAL_REPOS', payload: perfilData.public_repos + (perfilData.total_private_repos || 0) });
          if (!state.perfilGithub) dispatch({ type: 'SET_PERFIL', payload: perfilData });
        }
      }

      const response = await fetch(
        `https://api.github.com/user/repos?type=owner&page=${page}&per_page=5`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (!response.ok) throw new Error('Erro ao buscar repositórios');

      const data = await response.json();

      if (page === 1) {
        dispatch({ type: 'SET_REPOSITORIOS', payload: data });
      } else {
        dispatch({ type: 'ADD_REPOSITORIOS', payload: data });
      }

      dispatch({ type: 'SET_PAGINA', payload: page });
    } catch (error) {
      dispatch({ type: 'SET_ERRO', payload: error.message });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const buscarIssues = useCallback(async (token) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_ERRO', payload: null });

      console.log('token issues:', token);

      const response = await fetch('https://api.github.com/search/issues?q=author:@me+is:issue', {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log('status issues:', response.status);

      if (!response.ok) throw new Error('Erro ao buscar issues');

      const data = await response.json();
      console.log('data issues:', data);
      dispatch({ type: 'SET_ISSUES', payload: data.items });
    } catch (error) {
      dispatch({ type: 'SET_ERRO', payload: error.message });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  },[]);

  const alterarEstadoIssue = async (token, issue) => {
  const novoEstado = issue.state === 'open' ? 'closed' : 'open';
  
  const repoFullName = issue.repository_url.replace('https://api.github.com/repos/', '' );

  const response = await fetch(
    `https://api.github.com/repos/${repoFullName}/issues/${issue.number}`,
    {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ state: novoEstado } ),
    }
  );

  console.log('Status da alteração:', response.status);

  if (response.ok) {
    dispatch({ type: 'ATUALIZAR_ISSUE', payload: { ...issue, state: novoEstado } });
  }
};

  return (
    <GithubContext.Provider
      value={{
        perfilGithub: state.perfilGithub,
        repositorios: state.repositorios,
        issues: state.issues,
        loading: state.loading,
        erro: state.erro,
        pagina: state.pagina,
        totalRepos: state.totalRepos,
        buscarPerfilGithub,
        buscarRepositorios,
        buscarIssues,
        alterarEstadoIssue,
      }}>
      {children}
    </GithubContext.Provider>
  );
}