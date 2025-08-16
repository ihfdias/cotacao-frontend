# Frontend - Cotação de Moedas (React com JWT)

Interface web desenvolvida em React como parte de um desafio técnico para vaga de desenvolvedor júnior. A aplicação consome uma API backend em .NET para exibir a cotação do Dólar em tempo real, implementando um fluxo de autenticação completo com JWT.

## ✨ Funcionalidades

-   **Fluxo de Autenticação:** Apresenta uma tela de login que se comunica com o backend para obter um token JWT.
-   **Gerenciamento de Sessão:** O token JWT é armazenado no `localStorage` para manter o usuário autenticado, mesmo ao recarregar a página.
-   **Rotas Protegidas:** A tela de cotação só é acessível após o login bem-sucedido.
-   **Visualização em Tempo Real:** Exibe os valores de compra e venda do Dólar, com atualização automática a cada 5 segundos.
-   **Logout:** Permite que o usuário encerre sua sessão, limpando o token e retornando à tela de login.
-   **Feedback Visual:** A UI informa o usuário sobre o status de "Carregando...", "Entrando..." e exibe mensagens de erro de forma clara.

## 🚀 Tecnologias Utilizadas

-   **React**
-   **Vite** como ferramenta de construção e servidor de desenvolvimento.
-   **JavaScript (ES6+)**
-   **CSS3**
-   **Hooks do React:** `useState`, `useEffect`, `useCallback`.
-   **`fetch` API** para comunicação com o backend.
-   **Variáveis de Ambiente** para configuração da URL da API.

## 🔧 Como Rodar o Projeto Localmente

### Pré-requisitos

-   [Node.js](https://nodejs.org/en/) (versão LTS) instalado.
-   O [backend (API)](https://github.com/ihfdias/cotacao-backend) deve estar rodando localmente em sua própria máquina.

### Instalação e Execução

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/ihfdias/cotacao-frontend.git](https://github.com/ihfdias/cotacao-frontend.git)
    ```
2.  **Navegue até a pasta do projeto:**
    ```bash
    cd cotacao-frontend
    ```
3.  **Crie o arquivo de ambiente local:**
    -   Na raiz do projeto, crie um arquivo chamado `.env.local`.
    -   Dentro dele, adicione a linha (ajuste a porta se necessário):
        ```
        VITE_API_URL=http://localhost:5053/
        ```
4.  **Instale as dependências:**
    ```bash
    npm install
    ```
5.  **Execute a aplicação:**
    ```bash
    npm run dev
    ```
    A aplicação estará disponível no endereço informado no terminal (ex: `http://localhost:5173`). Use as credenciais `admin` e `12345` para logar.