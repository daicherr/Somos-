Markdown

# Somos+

Somos+ é uma plataforma social móvel focada em solidariedade. O aplicativo conecta pessoas e ONGs, permitindo a divulgação de campanhas de doação, compartilhamento de histórias e interação direta através de um feed social e chat em tempo real.

**Status do Projeto:** MVP (Minimum Viable Product) Funcional.

---

## Funcionalidades

* **Autenticação Completa:** Cadastro e Login de usuários (Pessoas e ONGs) com segurança JWT.
* **Feed Social:** Visualização de postagens gerais e Campanhas de Arrecadação com barra de progresso financeira.
* **Stories:** Barra de status no topo para atualizações rápidas.
* **Interações:** Sistema de Curtir e Comentar em publicações.
* **Criação de Conteúdo:** Upload de fotos da galeria, criação de Campanhas com meta financeira definida e Stories.
* **Explorar:** Barra de pesquisa para encontrar usuários e ONGs pelo nome.
* **Chat em Tempo Real:** Troca de mensagens direta entre usuários.
* **Perfil de Usuário:** Visualização de estatísticas (seguidores, posts), edição de perfil completa e galeria de postagens.

---

## Tecnologias Utilizadas

### Mobile (Frontend)
* React Native (Expo SDK 50+)
* React Navigation (Native Stack & Bottom Tabs)
* Axios (Consumo de API REST)
* Expo Image Picker (Seleção e upload de mídia)

### Backend (API)
* Node.js & Express (Servidor RESTful)
* MongoDB & Mongoose (Banco de dados NoSQL)
* JWT (Autenticação segura)
* Multer (Upload e armazenamento local de imagens)

---

## Como Rodar o Projeto

### Pré-requisitos
* Node.js instalado.
* Conta no MongoDB Atlas (ou instância local do MongoDB).
* Celular com o app Expo Go instalado ou Emulador (Android Studio / Xcode).

### 1. Configurando o Backend (plataforma-node-api)

1. Abra o terminal e acesse a pasta da API:
   ```bash
   cd plataforma-node-api
Instale as dependências:

Bash

npm install
Crie um arquivo .env na raiz da pasta plataforma-node-api com as seguintes variáveis:

Snippet de código

PORT=8000
MONGODB_URI=sua_string_de_conexao_mongodb
JWT_SECRET=sua_chave_secreta
Inicie o servidor:

Bash

node server.js
2. Configurando o Frontend (somos_)
Em outro terminal, acesse a pasta do aplicativo:

Bash

cd somos_
Instale as dependências:

Bash

npm install
Configuração de Rede: Abra o arquivo src/services/api.js. Substitua o endereço IP pelo IPv4 da sua máquina local (não utilize localhost se estiver testando em dispositivo físico).

JavaScript

// Exemplo: Se seu IP for 192.168.15.10
const BASE_URL = '[http://192.168.15.10:8000/api](http://192.168.15.10:8000/api)';
Inicie o Expo:

Bash

npx expo start -c
Escaneie o QR Code com o aplicativo Expo Go.

Estrutura do Projeto
/
├── plataforma-node-api/   # Backend (API REST)
│   ├── controllers/       # Regras de negócio
│   ├── models/            # Schemas do Banco de Dados
│   ├── routes/            # Definição das rotas da API
│   ├── uploads/           # Pasta de armazenamento de imagens
│   └── server.js          # Entrada do servidor
│
└── somos_/                # Frontend (App Mobile)
    ├── src/
    │   ├── components/    # Componentes reutilizáveis
    │   ├── context/       # Gerenciamento de Estado Global (Auth)
    │   ├── navigation/    # Configuração de Rotas
    │   ├── screens/       # Telas do App
    │   └── services/      # Configuração da API (Axios)
    └── App.js             # Ponto de entrada do App
Notas de Desenvolvimento
Rede: Certifique-se de que o celular e o computador estejam na mesma rede Wi-Fi para que o App consiga conectar na API local.

Firewall: Se as imagens ou dados não carregarem no celular, verifique se o Firewall do sistema operacional não está bloqueando a porta 8000.

Desenvolvido como projeto acadêmico/MVP.