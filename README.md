# Api Repositórios do Github com React + TypeScript + Vite

Essa aplicação é um componente React que utiliza a API do GitHub para exibir repositórios de um usuário específico, permitindo ao usuário pesquisar repositórios pelo nome de usuário do GitHub.

🙋‍♂️ [Link do projeto](https://api-repositorios-github.vercel.app/)
  

![tela inicial](https://github.com/user-attachments/assets/925056ca-d940-4eb3-a337-dd6d19d1d740)


### 1. Importação de Bibliotecas e Tipos:

````ts
import axios from "axios";
import { useEffect, useState } from "react";
````
- axios: para realizar requisições HTTP à API do GitHub.
- useEffect e useState: Hooks do React. `useState` é usado para gerenciar estados (dados dinâmicos que mudam no componente) e `useEffect` permite executar efeitos colaterais (como a chamada à API) em resposta a mudanças de estado.
<hr>

### 2. Definição da Interface IRepository

```ts
interface IRepository {
  id: number;
  name: string;
  html_url: string;
  owner: {
    avatar_url: string;
    login: string;
    html_url: string;
  };
}
```

- A interface `IRepository` define o formato esperado dos dados de repositório recebidos da API do GitHub.
- Ela inclui `id`, `name`, `html_url` do repositório e informações do dono (`owner`), como o avatar e link para o perfil do GitHub.
<hr>

### 3. Função `GithubApiPage`

```ts
export function GithubApiPage() {
```

- Esse é o componente principal, onde a funcionalidade de busca e exibição dos repositórios é implementada.
<hr>

### 4. Definição de Estados com `useState`

```ts
const [repositories, setRepositories] = useState<IRepository[]>([]);
const [username, setUsername] = useState("");
const [searchUsername, setSearchUsername] = useState("");
```

- `repositories`: guarda a lista de repositórios do usuário pesquisado.
- `username`: armazena o nome de usuário que o usuário digita na caixa de texto.
- `searchUsername`: mantém o nome de usuário final para busca. Isso evita que a busca seja disparada a cada letra digitada.
<hr>


### 5. Função `fetchRepositories`

```ts
async function fetchRepositories(user: string) {
  try {
    const response = await axios.get(
      `https://api.github.com/users/${user}/repos`
    );
    const { data } = response;
    setRepositories(data);
  } catch (error) {
    console.error("Erro ao buscar repositórios:", error);
    setRepositories([]);
  }
}
```

- Função assíncrona que faz uma requisição à API do GitHub para obter os repositórios de um usuário específico (`user`).
- Em caso de sucesso, os dados (`data`) são armazenados no estado `repositories`.
- Em caso de erro, exibe um erro no console e limpa a lista de repositórios.
<hr>

### 6. `useEffect` para Disparar Busca

```ts
useEffect(() => {
  if (searchUsername) {
    fetchRepositories(searchUsername);
  }
}, [searchUsername]);
```

- O `useEffect` observa as mudanças em `searchUsername`.
- Sempre que `searchUsername` é atualizado, a função `fetchRepositories` é chamada com o valor atual, carregando os repositórios do usuário.
<hr>

### 7. Função `handleSearch`

```ts
function handleSearch() {
  setSearchUsername(username);
}
```

- Define o valor do `searchUsername` para o valor de `username `(o texto digitado pelo usuário). Isso efetivamente dispara uma nova busca ao clicar em “Pesquisar”.
<hr>

### 8. Renderização do Componente

```ts
return (
  <div className="container">
    <h3>Repositórios do Github</h3>
    <input
      type="text"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
      placeholder="Digite o nome do usuário"
    />
    <button onClick={handleSearch}>Pesquisar</button>
```
  
- Renderiza o título, um campo de entrada (`input`) para digitar o nome do usuário e um botão de pesquisa. O evento `onChange` atualiza o `username` com o que está sendo digitado.
<hr>

### 9. Exibição do Perfil

```ts
{repositories.length > 0 && (
  <div className="profile">
    <img
      src={repositories[0].owner.avatar_url}
      alt={repositories[0].owner.login}
    />
    <h3>
      <a href={repositories[0].owner.html_url} target="_blank">
        {repositories[0].owner.login}
      </a>
    </h3>
  </div>
)}
```

- Se houver repositórios, exibe o avatar, nome e link do perfil do usuário. Isso é possível porque todos os repositórios pertencem ao mesmo usuário, então o avatar e o nome são puxados do primeiro repositório da lista.
<hr>


### 10. Exibição da Lista de Repositórios

```ts
<div className="repositories">
  {repositories.map((repository) => (
    <p key={repository.id}>
      📚 <a href={repository.html_url} target="_blank">{repository.name}</a>
    </p>
  ))}
</div>
```

- Cada repositório é listado com seu nome e link. O `key` garante uma renderização eficiente dos itens em React.

![Captura de tela 2024-10-31 133018](https://github.com/user-attachments/assets/b6c7c5b3-1ff2-4331-b22f-adba8cf6600e)


### Resumo

Essa aplicação permite ao usuário:

1. Digitar um nome de usuário do GitHub.
2. Clicar em “Pesquisar” para buscar os repositórios desse usuário.
3. Exibir o avatar e nome do usuário, com um link para o perfil.
4. Listar os repositórios encontrados, com links para cada repositório.

A estrutura é eficiente e responsiva, atualizando a exibição sempre que a pesquisa é modificada.
