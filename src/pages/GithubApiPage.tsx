import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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

export function GithubApiPage() {
  const [repositories, setRepositories] = useState<IRepository[]>([]); // Estado que armazena um array de repositórios.
  const [username, setUsername] = useState(""); // Estado para armazenar o nome de usuário
  const [searchUsername, setSearchUsername] = useState(""); // Estado que armazena valor digitado na pesquisa.

  async function fetchRepositories(user: string) {
    try {
      const response = await axios.get(
        `https://api.github.com/users/${user}/repos`
      );

      const { data } = response;

      setRepositories(data);
    } catch (error) {
      console.error("Erro ao buscar repositórios:", error);
      setRepositories([]); // Limpa a lista em caso de erro
    }
  }

  useEffect(() => {
    if (searchUsername) {
      fetchRepositories(searchUsername);
    }
  }, [searchUsername]); // Monitora oque está sendo digitado na barra de pesquisa.

  function handleSearch() {
    setSearchUsername(username); // Atualiza o nome de usuário para pesquisa
  }

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

      {/* Exibe a imagem do perfil */}
      {repositories.length > 0 && (
        <div className="profile">
          <img
            src={repositories[0].owner.avatar_url}
            alt={repositories[0].owner.login}
          />
          <h3>
            {" "}
            <Link to={repositories[0].owner.html_url} target="_blank">
              {repositories[0].owner.login}
            </Link>
          </h3>
          <h4></h4>
        </div>
      )}

      {/* Listagem de repositórios */}
      <div className="repositories">
        {repositories.map((repository) => (
          <p key={repository.id}>
            📚{" "}
            <Link to={repository.html_url} target="_blank">
              {repository.name}
            </Link>
          </p>
        ))}
      </div>
    </div>
  );
}
