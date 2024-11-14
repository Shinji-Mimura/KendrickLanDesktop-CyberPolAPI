import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import './ProfilePage.css';
import api from '../../Services/api'

function ProfilePage() {
  // eslint-disable-next-line
  const cyberwar = 'TAC{AZisMissing:3ffc8408ca6de1a19ad48c6c2ba0289e53901708c8a316977a95da5106abe719}';
  const navigate = useNavigate();
  const [profile, setProfile] = useState({login:'1'});
  const [errorMessage, setErrorMessage] = useState('');

  function searchHandler(){
    console.log(`Carregando perfil...`)

    let authToken = localStorage.getItem('token');
    let login = localStorage.getItem('login');

    api.get(`/api/users/list?login=${login}`, {headers:{Authorization: authToken}})
      .then(res => {
        // Salva o token e redireciona para o próximo step
        setProfile(res.data.users[0])
      })
      .catch(err =>{
        if(err.response.data){
          console.error(err.response.data.error)
          setErrorMessage(err.response.data.error)
        } else {
          console.error(err.message)
          setErrorMessage('Não foi possível se comunicar com a API!')
        }
      })
  }

  useEffect(() => {
    searchHandler()
    window.dragElement(document.getElementById("page-profile"));
  }, [])

  function handleWindowClose() {
    if (window.confirm("Deseja voltar ao Menu?")) {
        navigate('/menu')
    }
  }

  return (
    <div id="page-profile" class="window" >
        <div id="page-profile-title-bar" class="title-bar" >
            <div class="title-bar-text">Buscador de Arquivos - Menu</div>
            <div class="title-bar-controls">
                <button aria-label="Fechar" id="close-btn" onClick={handleWindowClose}></button>
            </div>
        </div>
        <div class="window-body">
          <div id="login-form">
            <div class="form-group">
                <label>Documento:</label>
                <input type="text" placeholder="XXXXXXXXXXX" value={profile.login}/>
            </div>
            <div class="form-group">
                <label>Nome:</label>
                <input type="text" placeholder="Nome" value={profile.first_name}/>
            </div>
            <div class="form-group">
                <label>Sobrenome:</label>
                <input type="text" placeholder="Sobrenome" value={profile.last_name}/>
            </div>
            <div class="form-group">
                <label>E-mail:</label>
                <input type="text" placeholder="first.last@gciu.tsi" value={profile.mail}/>
            </div>
            <div class="form-group">
                <label>Data de Cadastro:</label>
                <input type="text" placeholder="YYYY/MM/DD hh:mm:ss" value={profile.created_at}/>
            </div>
            <small class="error-message">{errorMessage}</small>
          </div>
        </div>
    </div>
  );
}

export default ProfilePage;
