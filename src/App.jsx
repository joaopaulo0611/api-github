import React, { useState } from 'react';
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
   const handleFormSubmit = async (event) => {
  event.preventDefault();
  try {
    const response = await fetch(`https://api.github.com/users/${username}`);
    if (!response.ok) {
      throw new Error('Usuário não encontrado.');
      }
      const data = await response.json();
      setUserData(data);
      } catch (error) {
        console.error(error);
      }
      };
    

    return(
      // Container principal que envolve todo o conteúdo do perfil
       <div className="profile-container">
         {/* Título do perfil do GitHub */}
         <h1>Perfil do GitHub</h1>
         {/* Formulário para buscar informações do usuário do GitHub */}
         <form onSubmit={handleFormSubmit}>
           <input
             type="text"
             placeholder="Digite o nome de usuário do GitHub"
             value={username}
             onChange={(e) => setUsername(e.target.value)}
             required
           />&nbsp;
           {/* Botão de busca no formulário */}
           <button type="submit">Buscar</button>
         </form>
         {/* Container das informações do perfil do GitHub */}
         <div className="profile-info">
           {/* Renderização condicional: Se userData existe, renderize o seguinte bloco */}
           {userData ? (
             <>
               {/* Imagem do avatar do usuário do GitHub */}
               <img 
                 className="avatar" 
                 src={userData.avatar_url} 
                 alt={`Avatar de ${userData.login}`} 
               />
               {/* Nome do usuário do GitHub */}
               <h2>{userData.name}</h2> 
               {/* Links para o perfil do GitHub e informações relacionadas */}
               <a 
              href={`https://github.com/${userData.login}`} 
              target="_blank" rel="noreferrer">
                   <p>Nome de usuário: {userData.login}</p>
               </a>
               <a
               href={`https://github.com/${userData.login}?tab=repositories`}
               target='_blank'>
                    <p>Repositórios públicos: {userData.public_repos}</p>
              </a>
              <a 
              href={`https://github.com/${userData.login}?tab=followers`}
              target="_blank">
                   <p>Seguidores: {userData.followers}</p>
              </a>
              <a
              href={`https://github.com/${userData.login}?tab=following`}
              target='_blank'>
                    <p>Seguindo: {userData.following}</p>
              </a>
             </>
           ) : null}
         </div>
       </div>
      );
           }

      export default App;
     
                
