# GitHub Explorer App 📱

Aplicativo mobile desenvolvido em **React Native**, que permite ao usuário fazer login/cadastro e explorar seus dados do GitHub (perfil, repositórios e issues) diretamente pelo app, utilizando a API oficial do GitHub.

> ⚠️ **Projeto desenvolvido no [Expo Snack](https://snack.expo.dev/)**
> Este projeto foi criado e testado inteiramente no ambiente online do Expo Snack. Por isso, **baixar o `.zip` e rodar localmente no VS Code (ou qualquer outro editor) não funciona diretamente** — o Snack gera a estrutura de arquivos para rodar no navegador dele (com preview via QR Code), e não como um projeto Expo/React Native tradicional pronto para `npm install` local.
> Para testar o app, acesse o link do Snack ou importe o código diretamente na plataforma.

## ✨ Funcionalidades

- **Autenticação** — Tela de Login e Cadastro com validação de campos
- **Integração com a API do GitHub** — busca de dados via token pessoal do usuário
- **Perfil GitHub** — exibição de avatar, nome, bio, seguidores, seguindo e total de repositórios
- **Listagem de Repositórios** — busca paginada (infinite scroll), filtro por nome e ordenação (A-Z, Z-A, mais estrelas)
- **Detalhes do Repositório** — descrição, linguagem, stars, forks, visibilidade e branch principal
- **Gerenciamento de Issues** — listagem, filtro por título e status, e alteração de estado (aberta/fechada) com gesto de swipe
- **Navegação completa** — Stack Navigator (Login/Cadastro/Home/Detalhes) + Drawer Navigator (Perfil, Dados GitHub, Repositórios, Issues)
- **Responsividade** — ajustes de layout para orientação retrato e paisagem

## 🛠️ Tecnologias

- React Native + Expo
- React Navigation (Stack e Drawer)
- Context API + useReducer (gerenciamento de estado)
- React Native Gesture Handler (swipe actions)
- React Native Paper / Picker
- GitHub REST API

## 📂 Estrutura do projeto

```
├── App.js
├── index.js
├── src/
│   ├── contexts/
│   │   ├── AuthContext.js       # autenticação do usuário
│   │   └── GithubContext.js     # dados do GitHub (perfil, repos, issues)
│   ├── routes/
│   │   ├── StackNavigator.js
│   │   └── DrawerNavigator.js
│   └── screens/
│       ├── Login.js
│       ├── Cadastro.js
│       ├── Perfil.js
│       ├── DadosGithub.js
│       ├── Repositorios.js
│       ├── DetalhesRepositorio.js
│       └── Issues.js
```

## 🔑 Como usar

1. Faça login ou cadastro dentro do próprio app (autenticação simulada, sem backend)
2. Acesse a tela **Perfil** e insira um [token de acesso pessoal do GitHub](https://github.com/settings/tokens)
3. Navegue pelas telas **Dados GitHub**, **Repositórios** e **Issues** para visualizar suas informações em tempo real

## 🚀 Rodando o projeto

Como foi feito no Expo Snack, a forma recomendada de testar é:

1. Acessar o projeto pelo link do Snack
2. Escanear o QR Code com o app **Expo Go** no celular, ou usar o preview web/emulador direto na plataforma

Se quiser rodar localmente fora do Snack, será necessário recriar o projeto do zero com `npx create-expo-app`, copiar os arquivos de `/src` e ajustar as dependências manualmente no `package.json` — o download direto do Snack não gera um projeto pronto para rodar em ambientes locais como o VS Code.

## 📌 Sobre o projeto

Projeto acadêmico desenvolvido com foco em praticar consumo de APIs REST, autenticação, gerenciamento de estado global com Context API e construção de interfaces responsivas em React Native.
