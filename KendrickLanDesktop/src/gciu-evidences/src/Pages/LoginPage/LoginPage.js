import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import './LoginPage.css';
import api from '../../Services/api'

function LoginPage() {
  const navigate = useNavigate();
  const [inputLogin, setInputLogin] = useState('');
  const [inputOtp, setInputOtp] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    window.dragElement(document.getElementById("page-login"));
  }, [])

  function loginHandler(event){
    console.log(`Autenticando-se com o usuário ${inputLogin}`)
    api.post('/api/auth/login', {'login':inputLogin})
      .then(res => {
        // Salva o token e redireciona para o próximo step
        localStorage.setItem('token', res.data.authorization);
        // navigate('/login-otp')
        setShowOtp(true)
        setErrorMessage('')
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

  function otpHandler(){
    console.log(`Autenticando-se com o otp ${inputOtp}`)

    let authToken = localStorage.getItem('token');

    api.post('/api/auth/otp', {'otp_code':inputOtp}, {headers:{Authorization: authToken}})
      .then(res => {
        // Salva o token e redireciona para o próximo step
        localStorage.setItem('token', res.data.authorization);
        localStorage.setItem('login', res.data.login);
        navigate('/menu')
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

  function handleWindowClose() {
    if (window.confirm("Deseja fechar o programa?")) {
      setInputLogin('')
      setInputOtp('')
      setErrorMessage('')
      setShowOtp(false)
    }
  }

  return (
      <div>
        <div id="page-login" class="window login-window">
          <div id="page-login-title-bar" class="title-bar">
              <div class="title-bar-text">Kendrick's Desktop</div>
              <div class="title-bar-controls">
                  <button aria-label="Fechar" id="close-btn" onClick={handleWindowClose}></button>
              </div>
          </div>
          <div class="window-body">
              
                { !showOtp && 
                  <div id="login-form">
                    <div class="form-group">
                        <label for="username">Usuário:</label>
                        <input type="text" placeholder="Entre com o login..." value={inputLogin} onInput={e => setInputLogin(e.target.value)}/>
                    </div>
                    <div class="form-group">
                        <button onClick={loginHandler} id="login-btn">Entrar</button>
                    </div>
                    <small class="error-message">{errorMessage}</small>
                  </div>
                }

                { showOtp && 
                  <div id="login-form">
                    <div class="form-group">
                        <label for="username">Usuário:</label>
                        <input type="text" placeholder="XXXXXXXXXXX" value={inputLogin} disabled/>
                    </div>
                    <div class="form-group">
                        <label for="username">Código OTP:</label>
                        <input type="text" placeholder="**********" value={inputOtp} onInput={e => setInputOtp(e.target.value)}/>
                    </div>
                    <div class="form-group">
                        <button onClick={otpHandler} id="login-btn">Entrar</button>
                    </div>
                    <small class="error-message">{errorMessage}</small>
                  </div>
                }

          </div>
        </div>
      </div>    
  );
}

export default LoginPage;


// <h1>Login Page</h1>
// <input type="text" placeholder="ID Investigador"  />
// <button onClick={loginHandler}>Entrar</button>
// <br/><small>{errorMessage}</small>