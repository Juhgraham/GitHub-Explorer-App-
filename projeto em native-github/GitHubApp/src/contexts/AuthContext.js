import { createContext, useReducer } from "react";

export const AuthContext = createContext();

const estadoInicial = {
  usuario: null,
  usuarioLogado: null,
  tokenGithub: "",
};

function authReducer(state, action) {
  switch (action.type) {
    case 'CADASTRAR':
      return { ...state, usuario: action.payload };
    case 'LOGIN':
      return { ...state, usuarioLogado: action.payload };
    case 'ATUALIZAR_TOKEN':
      return { ...state, tokenGithub: action.payload };
    default:
      return state;
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, estadoInicial);

  const cadastrar = (nome, email, senha) => {
    dispatch({ type: 'CADASTRAR', payload: { nome, email, senha } });
  };

  const login = (email, senha) => {
    if (state.usuario?.email === email && state.usuario?.senha === senha) {
      dispatch({ type: 'LOGIN', payload: state.usuario });
      return true;
    }
    return false;
  };

  const atualizarToken = (token) => {
    dispatch({ type: 'ATUALIZAR_TOKEN', payload: token });
  };

  return (
    <AuthContext.Provider
      value={{
        usuario: state.usuario,
        usuarioLogado: state.usuarioLogado,
        tokenGithub: state.tokenGithub,
        cadastrar,
        login,
        atualizarToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}