# 💻 Frontend - Cotação de Moedas (React com JWT)

Interface web desenvolvida em **React** como parte de um desafio técnico para vaga de desenvolvedor júnior.  
A aplicação consome uma **API backend em .NET** para exibir a cotação do **Dólar em tempo real**, implementando um fluxo de **autenticação JWT** e uma lógica de **atualização inteligente**.

---

## ✨ Funcionalidades

- **Fluxo de Autenticação JWT**  
  Tela de login que se comunica com o backend para obter um token JWT.  
  A sessão do usuário é persistida no **localStorage**.

- **Atualização Inteligente**  
  Auto-refresh a cada **5 segundos**, ativado apenas em dias úteis.

- **Verificação de Feriados**  
  A aplicação consome a **BrasilAPI** para buscar a lista de feriados nacionais e desativa as atualizações nesses dias, informando o usuário.

- **Feedback de UX**  
  A UI informa o usuário sobre o status de **"Carregando..."**, trata e exibe erros de forma amigável e mostra mensagens claras em dias não úteis.

- **Logout Seguro**  
  Permite que o usuário encerre sua sessão de forma simples e segura.

---

## 🚀 Tecnologias Utilizadas

- **React**  
- **Vite** como ferramenta de build e servidor de desenvolvimento  
- **JavaScript (ES6+)**  
- **CSS3**  
- **React Hooks**: `useState`, `useEffect`, `useCallback`  
- **fetch API** para comunicação com o backend e a API de feriados  
- **Variáveis de Ambiente** para configuração da URL da API  

---

## 🔧 Como Rodar o Projeto Localmente

### ✅ Pré-requisitos
- **Node.js (versão LTS)** instalado  
- O **backend (API)** deve estar rodando localmente

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