Frontend - Cotação de Moedas (React)

Interface web desenvolvida em React como parte de um desafio técnico para vaga de desenvolvedor júnior. A aplicação exibe a cotação do Dólar em tempo real, consumindo uma API backend em .NET.

## ✨ Funcionalidades

- **Visualização em Tempo Real:** Exibe os valores de compra e venda do Dólar.
- **Atualização Automática:** Os dados na tela são atualizados a cada 5 segundos.
- **Atualização Manual:** Um botão permite que o usuário force uma nova busca pelos dados a qualquer momento.
- **Feedback Visual:** A interface informa o usuário sobre o status de "Carregando..." e exibe mensagens de erro caso a comunicação com a API falhe.
- **Design Limpo:** Uma interface simples e estilizada com CSS para uma experiência de usuário agradável.

## 🚀 Tecnologias Utilizadas

- **React**
- **Vite** como ferramenta de construção e servidor de desenvolvimento.
- **JavaScript (ES6+)**
- **CSS3** (utilizando Flexbox para layout)
- **Hooks do React:** `useState`, `useEffect`, `useCallback`.
- **`fetch` API** para comunicação com o backend.

## 🔧 Como Rodar o Projeto Localmente

### Pré-requisitos

- [Node.js](https://nodejs.org/en/) (versão LTS) instalado.
- O [backend (API)](https://github.com/SEU_USUARIO/ApiDefinitiva) deve estar rodando localmente em sua própria máquina.

### Instalação e Execução

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/SEU_USUARIO/cotacao-frontend.git](https://github.com/SEU_USUARIO/cotacao-frontend.git)
    ```
2.  **Navegue até a pasta do projeto:**
    ```bash
    cd cotacao-frontend
    ```
3.  **Configure a URL da API:**
    - No arquivo `src/services/apiService.js`, verifique se a constante `API_URL` aponta para o endereço correto do seu backend.
4.  **Instale as dependências:**
    ```bash
    npm install
    ```
5.  **Execute a aplicação:**
    ```bash
    npm run dev
    ```
    A aplicação estará disponível no endereço informado no terminal (ex: `http://localhost:5173`).
